laraImport("lara.mutation.IterativeMutation");
laraImport("lara.mutation.MutationResult");


class ArithmeticOperatorDeletionMutation extends IterativeMutation {
	constructor() {
		//Parent constructor
		super("ArithmeticOperatorDeletionMutation");
	}



	/*** IMPLEMENTATION OF INSTANCE METHODS ***/

	isMutationPoint($jp) {
		return $jp.instanceOf("binaryExpression");
	}

	*mutate($jp) {


		let leftOperand = $jp.lhs.copy();

		debug("/*--------------------------------------*/");
		debug("Mutating operator: " + $jp + " to " + leftOperand);
		debug("/*--------------------------------------*/");

		yield new MutationResult(leftOperand);


		let rightOperand = $jp.rhs.copy();

		debug("/*--------------------------------------*/");
		debug("Mutating operator: " + $jp + " to " + rightOperand);
		debug("/*--------------------------------------*/");

		yield new MutationResult(rightOperand);
	}
}