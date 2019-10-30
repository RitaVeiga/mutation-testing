package app.operators;

import org.suikasoft.jOptions.Datakey.DataKey;
import org.suikasoft.jOptions.Datakey.KeyFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


public final class ConditionalOperators extends Operators{

    /***
     * Conditional Operators
     */

    private static List<String> identifiers = new ArrayList<>();
    public final static String TYPE = "Conditional";

    public final static String AND = "&&";
    public final static String OR = "||";

    public final static List<String> AND_OP = Arrays.asList(OR);
    public final static List<String> OR_OP = Arrays.asList(AND);

    public final static List<List<String>> MUTATORS = Arrays.asList(AND_OP,OR_OP);
    public final static List<String> OPERATORS = Arrays.asList(AND,OR);

    @Override
    public List<List<String>> getMutators() {
        return MUTATORS;
    }

    @Override
    public List<String> getOperators() {
        return OPERATORS;
    }

    @Override
    public List<DataKey> getDataKeys()  {
        List<DataKey> dataKeysList = new ArrayList<>();
        MUTATORS.forEach(stringList -> {
            String operator = OPERATORS.stream().filter(s -> !stringList.contains(s)).collect(Collectors.joining());
            String operatorIdentifier = TYPE+" "+operator;
            identifiers.add(operatorIdentifier);
            dataKeysList.add(
                KeyFactory.multipleStringList(operatorIdentifier, stringList).setLabel(operator+"  ")
                        .setDefault(() -> stringList));
        });
        return dataKeysList;
    }

    @Override
    public List<String> getIdentifiers() {
        return identifiers;
    }

    @Override
    public String getType() {
        return TYPE;
    }
}
