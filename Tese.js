laraImport("mutation.InvalidKeyIntentPutExtraOperatorMutator");
laraImport("mutation.InvalidValueIntentPutExtraOperatorMutator");
laraImport("mutation.IntentPayloadReplacementOperatorMutator");
laraImport("mutation.InvalidMethodCallArgumentOperatorMutator");
laraImport("mutation.BinaryMutator");
laraImport("mutation.NullIntentOperatorMutator");
laraImport("mutation.StringArgumentReplacementOperatorMutator");
laraImport("lara.Io");
laraImport("kadabra.KadabraNodes");


//const fileName="/Users/anaritaveiga/mutation-testing/TestProject/src/main/java/app/TestCases.java";

const outputPath = "/Users/anaritaveiga/KadabraFiles/outputAqui/app";
const filePath = "/Users/anaritaveiga/mutation-testing/TestProject/src/main/java/app/TestCases.java";
const projectPath = "/Users/anaritaveiga/KadabraFiles";

const fileName = filePath.substring(
 filePath.lastIndexOf(Io.getSeparator()) + 1);

//println(""+ fileName);
var Mutators=[
  	//new ConditionalMutator("?:"),
	new BinaryMutator("+", "-"),
     new BinaryMutator("-", "+"),
	//new UnaryAddOperatorMutator("++"),
	//new AssignmentOperatorMutator("+=","&="),
	//new AssignmentOperatorMutator("-=","/="),
    //  new ConstructorCallMutator(),
  //   new NullIntentOperatorMutator(),
   // new InvalidKeyIntentPutExtraOperatorMutator(),
  //  new NullValueIntentPutExtraOperatorMutator(),
   // new RandomActionIntentDefinitionOperatorMutator(),
   //new InvalidKeyIntentPutExtraOperatorMutator(),
    // new InvalidValueIntentPutExtraOperatorMutator(),
   // new IntentPayloadReplacementOperatorMutator(),
//	new InvalidDateOperatorMutator(),
//new InvalidMethodCallArgumentOperatorMutator(),
//new StringArgumentReplacementOperatorMutator(),
];


  let mutationPoints = 0;

  for (var jp of Query.root().descendants) {

    var $call = jp.ancestor("call");

//println("AAAAAAA"+jp.ast);
    // Ignore nodes that are children of $call with the name <init>
    if ($call !== undefined && $call.name === "<init>") continue;

    // Ignore nodes inside variable declarations
    //if ($jp.ancestor("localVariable") !== undefined) {
    //  continue;
    //}

//println(jp.ast);




    let needElseIf = false;
    let firstTime = true;

if (mutationPoints >= 2) {
      needElseIf = true;
    }


    for (mutator of Mutators) {

   // println(mutator);
    //println(mutator.addJp(jp));
      if (mutator.addJp(jp)) {
        mutationPoints++;
       // println(mutationPoints);
    //    println(jp);

   //  println(jp.ast);

      }
    }




    for (mutator of Mutators) {
    // println(mutator.addJp(jp));
      while (mutator.hasMutations()) {
     // println("mmm"+mutator.hasMutations());
        // Mutate

        //	println(jp.ast);
 // println(jp);
        mutator.mutate();
// println("AAAAAAA"+jp.ast);



        var mutated = mutator.getMutationPoint().isStatement
          ? mutator.getMutationPoint()
          : mutator.getMutationPoint().ancestor("statement");

        let mutantId =
          mutator.getName() +
          "_" +
          fileName.replace(".java", "") +
          "_" +
          Strings.uuid();



        if (needElseIf) {
          if (mutationPoints > 1) {
            if (firstTime) {
              mutated.insertBefore(
                'if(System.getProperty("MUID") == "' +
                  mutantId +
                  '"){\n' +
                  mutated.srcCode +
                  ";\n}"
              );

              firstTime = false;
            } else {
              mutated.insertBefore(
                'else if(System.getProperty("MUID") == "' +
                  mutantId +
                  '"){\n' +
                  mutated.srcCode +
                  ";\n}"
              );
            }
            mutationPoints--;
          } else {
            mutated.insertBefore(
              'else if (System.getProperty("MUID") == "' +
                mutantId +
                '"){\n' +
                mutated.srcCode +
                ";\n}else{\n\t"
            );
            mutated.insertAfter("}");
          }
        } else {
          mutated.insertBefore(
            'if (System.getProperty("MUID") == "' +
              mutantId +
              '"){\n' +
              mutated.srcCode +
              ";\n}else{\n\t"
          );
          mutated.insertAfter("}");
        }
      } mutator.restore();
    }


saveFile(mutator);
    }


  function saveFile(mutator){
let relativePath = Io.getRelativePath(filePath, projectPath);

  let newFolder =
    mutator.getName() +
    fileName;




  Io.writeFile(
    outputPath+ Io.getSeparator() +newFolder ,
    Query.root().code
  );
}
