public class Test2 {
	
	private String b;
	private Test2 c; 
	//Constructor
	public Test2(String b) {
		this.b = new String("");
		this.c = null;
	}
	
	//Global variable declaration
	public int test1() {
		this.b = new String("");
		int a = c.test2("");
		a += a;
		return 0;
	}

	public int test2(String object) {
		if (null != object) {
			return 1;
		}
		if (object == null) {
			return 2;
		}
		b += b;
		return -1;
	}	
	
	public String test3(double a) {
		return new String("");
	}				
}
