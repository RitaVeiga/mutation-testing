package app;

public class BitwiseTests {
    // operators: &, |, ^, ~, <<, >>

    public static int bitwiseOperatorAnd(int value) {
        int a;
        a = 0 & value;
        return a;
    }

    public static int bitwiseOperatorOr(int value) {
        int a;
        a = 0 | value;
        return a;
    }

    public static int bitwiseOperatorXOr(int value) {
        int a;
        a = 0 ^ value;
        return a;
    }

    public static boolean bitwiseOperatorNot(boolean value) {
        boolean a = false;
        boolean b = a;
        return b;
    }

    public static int bitwiseOperatorLeft(int value) {
        int a = 0;
        a = 111 << value;
        return a;
    }

    public static int bitwiseOperatoRight(int value) {
        int a;
        a = 111 >> value;
        return a;
    }
}
