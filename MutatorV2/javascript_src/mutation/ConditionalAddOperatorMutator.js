laraImport("lara.mutation.Mutator");

/**
 *  @param {$joinPoint} $joinPoint - A join point to use as starting point to search for conditionals to insert '!'.
 */
class ConditionalAddOperatorMutator extends Mutator {
    //Parent constructor
    constructor() {

        super("ConditionalAddOperatorMutator");

        this.extraArgs = arrayFromArgs(arguments, 1);

        this.toMutate = [];
        this.totalMutations = -1;
        this.currentIndex = 0;

        this.$conditional = undefined;
        this.$originalConditional = undefined;


        // Checks
        if (this.extraArgs.length != 0)
            throw new Error("Expected only 1 argument but received " + (this.extraArgs.length + 1));

    }


    addJp($joinpoint) {
        //println("JP -> " +$joinpoint);

        if ($joinpoint.instanceOf('if') || $joinpoint.instanceOf('ternary') || $joinpoint.instanceOf('loop')) {

            if ($joinpoint.cond.instanceOf('unaryExpression') && $joinpoint.cond.operator === '!')
                this.toMutate.push($joinpoint);
            else
                if ($joinpoint.cond.instanceOf('unaryExpression') && $joinpoint.cond.operator === '!')
                    this.toMutate.push($joinpoint);
                else
                    if ($joinpoint.cond.instanceOf('unaryExpression') && $joinpoint.cond.operator === '!')
                        this.toMutate.push($joinpoint);

            this.totalMutations = this.toMutate.length;
            println("totalMutations" + this.totalMutations);
            return true;
        } else {

            return false;

        }
    }

    hasMutations() {
        return this.currentIndex < this.totalMutations;
    }


    _mutatePrivate() {
        println("aquu");
        this.$conditional = this.toMutate[this.currentIndex++];

        this.$originalConditional = this.$conditional.copy();

        let cond = this.$conditional.cond;
        let newSrc = "!(" + cond.srcCode + ")";
        cond.insertReplace(newSrc);

        println("/*--------------------------------------*/");
        println("Mutating operator n." + this.currentIndex + ": " + this.$originalConditional
            + " to " + this.$conditional);
        println("/*--------------------------------------*/");

    }

    _restorePrivate() {
        this.$conditional = this.$conditional.insertReplace(this.$originalConditional);
        this.$originalConditional = undefined;
        this.$conditional = undefined;
    }

    getMutationPoint() {
        if (this.isMutated) {
            return this.$conditional;
        } else {
            if (this.currentIndex < this.toMutate.length) {
                return this.toMutate[this.currentIndex];
            } else {
                return undefined;
            }
        }
    }
}