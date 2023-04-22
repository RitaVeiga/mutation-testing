package app;

public class LogicalTests {
    // operators: &&, ||, !

    public static boolean logicalOperatorAnd(boolean value) {
        boolean a;
        a = true && value;
        return a;
    }

    public static boolean logicalOperatorOr(boolean value) {
        boolean a;
        a = true || value;
        return a;
    }

    public static boolean logicalOperatorNot(boolean value) {
        boolean a;
        a = !value;
        return a;
    }

}
