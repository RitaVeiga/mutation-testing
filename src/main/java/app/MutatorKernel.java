package app;

import app.operators.Operators;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.suikasoft.jOptions.Interfaces.DataStore;
import org.suikasoft.jOptions.app.AppKernel;
import pt.up.fe.specs.util.SpecsIo;
import pt.up.fe.specs.util.utilities.Replacer;
import weaver.gui.KadabraLauncher;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.Collectors;

public class MutatorKernel implements AppKernel {

    public static final Logger LOGGER = Logger.getLogger(MutatorKernel.class);
    private static Boolean isInterrupted = false;
    private static int threadCount = 0;

    public int execute(DataStore dataStore) {
        LOGGER.info("CONFIG:" + dataStore);

        isInterrupted = false;

        File projectPath = dataStore.get(Tese_UI.PROJECT_FILE);
        String classFilesPath = dataStore.get(Tese_UI.PROJECT_CLASS_FILE).getAbsolutePath();
        String laraPath = dataStore.get(Tese_UI.LARA_FILE).isFile() ? dataStore.get(Tese_UI.LARA_FILE).getAbsolutePath() : "src/Lara_Files/Main.lara";
        String outputPath = dataStore.get(Tese_UI.OUTPUT_FILE).getAbsolutePath() + File.separator +"Output";

        try{
            File tempOutputDir = new File(outputPath);
            if(!tempOutputDir.exists())
                tempOutputDir.mkdir();
            FileUtils.cleanDirectory(tempOutputDir);
            tempOutputDir = new File(outputPath+"_Main");
            if(!tempOutputDir.exists())
                tempOutputDir.mkdir();
            FileUtils.cleanDirectory(tempOutputDir);
        }catch (IOException e){
            LOGGER.error(e);
            Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
        }

        List<File> filesList = getFiles(projectPath, new ArrayList<>());

        List<String []> listArguments = new ArrayList<>();

        if(filesList.isEmpty())
            filesList.add(projectPath);

        for(File file : filesList) {
            if(file.getName().matches("(.{0,})(.java$)")){
                JSONObject laraArguments = new JSONObject();

                List<String> arguments = new ArrayList<>(Arrays.asList(laraPath,  "-p", file.getAbsolutePath(), "-o", outputPath + "_Main" +
                        "" + File.separator + file.getName()));

                if(!classFilesPath.equals(System.getProperty("user.dir"))) {
                    arguments.add("-I");
                    arguments.add(classFilesPath);
                }

                laraArguments.put("outputPath", outputPath);
                String packageName = getPackageString(file);
                laraArguments.put("packageName", packageName.isBlank() ? file.getName() : packageName+"."+file.getName());


                String absolutePath = file.getAbsolutePath();
                int lastIndex  = absolutePath.lastIndexOf(getPackageString(file).replace(".", File.separator)) ;
                laraArguments.put("outputFolder", getOutputPath(absolutePath.substring(0, lastIndex > 0 && lastIndex < absolutePath.length() ? lastIndex : absolutePath.length()),projectPath,outputPath));

                String templatePath = "src/Lara_Files/template.lara";
                String mutatorsPath = "src/Lara_Files/Mutators.lara";

                Replacer replacer = null;

                try {
                    replacer = new Replacer(new String(Files.readAllBytes(Paths.get(templatePath))));
                } catch (IOException e) {
                    LOGGER.error(e);
                    Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
                    return -1;
                }

                replacer.replace("<IMPORT>", "");//Operators.getImportString());
                replacer.replace("<MUTATORS>", Operators.generateMutatorString(dataStore));

                SpecsIo.write(new File(mutatorsPath), replacer.toString());

                arguments.add("-av");
                arguments.add(laraArguments.toJSONString());


                arguments.add("-b");
                arguments.add("2");
                arguments.add("-s");
                arguments.add("-Q");
                arguments.add("-d");
                arguments.add("-X");

                listArguments.add(arguments.toArray(String[]::new));
            }
            else{
                try {
                    File outputFolder = new File(getOutputPath(file.getAbsolutePath(),projectPath, outputPath));

                    FileUtils.copyFile(file, outputFolder);

                } catch (IOException e) {
                    LOGGER.error(e);
            Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));
                    break;
                }
            }
        }

        threadCount = 0;
        executeParallel(listArguments.toArray(String[][]::new), dataStore.get(Tese_UI.NUMBER_OF_THREADS) < filesList.size() ? dataStore.get(Tese_UI.NUMBER_OF_THREADS) : filesList.size());

        compileMutantIds(new File(outputPath + File.separator + "mutantsIdentifiers"));

        return 0;
    }


    private String getOutputPath(String  originalPath, File projectPath, String outputPath){

        return outputPath + File.separator + "mutatedFiles" + originalPath.replace(projectPath.getAbsolutePath(),"" );
    }



    public static boolean executeParallel(String [][] args, int threads) {

        var customThreadPool = threads > 0 ? new ForkJoinPool(threads) : new ForkJoinPool();

        LOGGER.info("Launching " + args.length + " instances of Kadabra in parallel, using " + threads + " threads");

        try {
            var results = customThreadPool.submit(() -> Arrays.asList(args).parallelStream()
                    .map(MutatorKernel::executeSafe)
                    .collect(Collectors.toList())).get();

            return results.stream()
                    .filter(result -> result == false)
                    .findFirst()
                    .orElse(true);
        } catch (InterruptedException e) {
            LOGGER.error(e);
            Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
            isInterrupted = true;
            Thread.currentThread().interrupt();
            return false;
        } catch (ExecutionException e) {
            LOGGER.error("Unrecoverable exception while executing parallel instances of Kadabra: " + e);
            Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
            return false;
        }

    }

    private static boolean executeSafe(String[] args) {
        if(!isInterrupted)
        try {
            LOGGER.info("New Thead. Thread count -> " + ++threadCount);
            LOGGER.info(" ARGS: " + String.join(" ", Arrays.asList(args)));
            return KadabraLauncher.execute(args);
        } catch (Exception e) {
            LOGGER.error("Exception during Kadabra execution: " + e);
            Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
            return false;
        }
        return true;
    }

    public static List<File> getFiles(File directory, List<File> list){
        File[] fList = directory.listFiles();
        if(fList != null)
            for (File file : fList) {
                if (file.isFile())
                    list.add(file);
                else
                    if(file.isDirectory() && !file.getName().matches("test*.{0,}")) //Regex to ignore the folders with name starting as test
                        list = getFiles(file, list);

            }
        return list;
    }

    public static boolean  compileMutantIds(File folder){
        if(!folder.isDirectory())
            return false;

        File[] fList = folder.listFiles(File::isFile);
        JSONParser parser = new JSONParser();
        JSONArray identifiersList = new JSONArray();

        if(fList != null)
            for (File file : fList) {
                    try {
                        FileReader fr = new FileReader(file);
                        Object obj = parser.parse(fr);

                        JSONObject jsonObject = (JSONObject) obj;
                        JSONArray jsonArray = (JSONArray) jsonObject.get("identifiers");

                        identifiersList.addAll(jsonArray);
                        fr.close();
                    } catch (ParseException | IOException e) {
                        LOGGER.error(e);
                        Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
                    }
            }
        try {
            FileWriter jsonFileWriter = new FileWriter(folder.getParentFile().getAbsolutePath()+File.separator+ "mutantsIdentifiers.json");

            JSONObject finalResult = new JSONObject();
            finalResult.put("identifiers", identifiersList);
            jsonFileWriter.write(finalResult.toJSONString());

            jsonFileWriter.flush();
            jsonFileWriter.close();

            LOGGER.info("Generated "+identifiersList.size()+" mutants");
        }catch (IOException e){
            LOGGER.error(e);
            Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
            return false;
        }

        return true;
    }


    public static String getPackageString(File file){
        try {
            BufferedReader brTest = new BufferedReader(new FileReader(file));
            String text = "NOT A JAVA CLASS";

            boolean isPackage = false;
            boolean isNotPackage = false;
            boolean insideComment = false;
            while(!isPackage && !isNotPackage){
                text = brTest.readLine().trim();
                if(text == null)
                    break;
                if(!insideComment) {
                    if(text.matches("(^\\/\\*.*.{0,})"))
                        insideComment = true;
                    if (text.matches("^package*.{0,}")) {
                        isPackage = true;
                        return text.replace("package", "")
                                .replace(";", "").trim();
                    } else if (!text.matches("(^\\/\\/*.{0,})"))
                        if (text.matches("(^import*.{0,})") || text.matches("(^.{0,}class*.{0,})") || text.matches("(^.{0,}interface*.{0,})"))
                            return "";
                } else {
                    if(text.matches("(.*.{0,}\\*\\/$)"))
                        insideComment = false;
                }
            }

            return null;
        } catch (IOException e) {
            LOGGER.error(e);
            Arrays.stream(e.getStackTrace()).forEach(stackTraceElement -> LOGGER.error("\tat "+ stackTraceElement));;
            return null;
        }

    }


}
