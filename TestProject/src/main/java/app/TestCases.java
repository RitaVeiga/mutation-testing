package app;

import java.util.List;

public class TestCases {

    public static int arithmeticOperatorDivision(int value) {
        int a;
        a = 23 + value;
        return a;
    }

    public static int arithmeticOperatorMinus(int value) {
        int a;
        a = 23 - value + 3;
        return a;
    }

    public int unaryTest2() {

        int a = 10;
        int b = 15;
        if (!(a < b)) {
            return a;
        }
        return b;

    }

    public Object constructorCallOperator() {
        Intent o = new Intent();
        return o;
    }

    // public Object returnValueOperator() {
    // return new Object();
    // }

    // public int conditionalsOperatorMinus(int value) {
    // int a;
    // a = 6;
    // if (a < value) {
    // a++;
    // }
    // return a;
    // }

    // public String ternaryOperator() {
    // boolean condition = true;
    // String result = (condition) ? "True" : "False";
    // return result;
    // }

}

// public int foo3() {
// int i = 42;
// return i;
// }

// public int someNonVoidMethod() {
// return 5;
// }

// public void foo() {
// int i = someNonVoidMethod(); // do more stuff with i
// }

// public Object someNonVoidMethod2() {
// return new Object();
// }

// public void foo() {
// Object o = someNonVoidMethod(); // do more stuff with o
// }
/*
 * public static int arithmeticOperatorPlus(int value) {
 *
 * int a;
 * a = 2 + value;
 *
 * return a;
 * }
 *
 *
 *
 * public static int conditionalsOperatorMinus2(int value) {
 * int a;
 * a = 6;
 * if (a != value) {
 * a+1;
 * }
 * return a;
 * }
 *
 *
 * public boolean logicalTest() {
 *
 * var boolean1 = true;
 * var boolean2 = false;
 * return (boolean1 || boolean2);
 *
 * }
 *
 * public boolean logicalTest2() {
 *
 * var boolean1 = true;
 * var boolean2 = false;
 *
 * var boolean3 = false;
 * return (boolean1 && boolean2 || boolean3);
 *
 * }
 *
 * public int bitwiseTest() {
 *
 * var boolean1 = 11;
 * var boolean2 = 11;
 * return (boolean1 & boolean2);
 *
 * }
 *
 *
 * public int assignmentTest() {
 * int a = 11;
 * int b = 0;
 * b += a + 2;
 * return b;
 * }
 *
 * public int assignmentTest2() {
 * int a = 11;
 * int b = 0;
 * b -= a + 2;
 * return b;
 * }
 *
 * public int unaryTest() {
 *
 * int a = 10;
 * int b = ++a;
 * return b;
 *
 * }
 *
 * public int unaryTest2() {
 *
 * int a = 10;
 * int b = a;
 * return b;
 *
 * }
 *
 *
 * public static String constOperator() {
 *
 * String MaxAllowed = new String("ola");
 * MaxAllowed.compareToIgnoreCase("");
 * return MaxAllowed;
 *
 * }
 *
 * public static int conditionalsOperatorMinus(int value) {
 * int a;
 * a = 6;
 * if (a < value) {
 * a++;
 * }
 * return a;
 * }
 *
 * public static int arithmeticOperatorMinus(int value) {
 * int a;
 * a = 2 - value;
 * return a;
 * }
 *
 * public static int arithmeticOperatorMultiplication(int value) {
 * int a;
 * a = 2 * value;
 * return a;
 * }
 *
 * public static int arithmeticOperatorDivision(int value) {
 * int a;
 * a = 2 / value;
 * return a;
 * }
 *
 * public static int arithmeticOperatorPercentage(int value) {
 * int a;
 * a = 2 % value;
 * return a;
 * }
 *
 * public static boolean conditionalOperator1(boolean value) {
 * boolean a;
 * a = true;
 * if (a) {
 * return false;
 * }
 * return a;
 * }
 *
 * public static boolean conditionalOperator2(boolean value) {
 * boolean a;
 * a = true || value;
 * return a;
 * }
 *
 * public static boolean removeConditionalOperator2(boolean value) {
 * boolean a = false;
 *
 * if (a == value) {
 * return true;
 * }
 * return false;
 * }
 *
 * public void constantOperatorInline() {
 *
 * int i;
 * i = 42;
 * }
 *
 * public int someNonVoidMethod() {
 * return 5;
 * }
 *
 * public void nonVoidMethodCallMutator() {
 * int i = someNonVoidMethod(); // do more stuff with i
 * }
 *
 * public Object returnValueMutator() {
 * return new Object();
 * }
 *
 * public int unaryMutator(final List a) {
 *
 * int len = a.size(), i, dup = -1;
 * int[] arr = new int[len];
 * for (i = 0; i < len; i++) {
 * arr[i] = (int) a.get(i);
 * dup = arr[i];
 * }
 * return dup;
 *
 * }
 *
 * public String nullifyReturnValuelMutator() {
 * String o = new String("ola");
 * return o;
 * }
 *
 * public int someNonVoidMethod2(int v) {
 * return v;
 * }
 *
 * public void nullifyReturnValuelMutator2() {
 * int c = 5;
 * int o = someNonVoidMethod2(c);
 *
 * }
 *
 * public int findViewById() {
 * int i = 2;
 * return i;
 * }
 *
 * public int findViewByIdDeletionMutator() {
 *
 * int i = findViewById();
 * return i;
 * }
 *
 * public void bitwiseTest() {
 *
 * int number1 = 12;
 * int number2 = 25;
 * int result = 0;
 *
 * // bitwise OR between 12 and 25
 * result = number1 | number2;
 *
 * }
 *
 * public void removeNullCheck() {
 * String a = null;
 * if (a == null) {
 * a = "new String";
 * }
 * }
 *
 * public static Object declarationWithInitialization(int i) {
 * return null;
 * }
 *
 * }
 */
