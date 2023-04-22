laraImport("lara.mutation.Mutator");
laraImport("kadabra.KadabraNodes");
laraImport("weaver.WeaverJps");
laraImport("weaver.Weaver");

class InvalidKeyIntentOperatorMutator extends Mutator {
    constructor() {
        super("InvalidKeyIntentOperatorMutator");

        this.mutationPoints = [];
        this.currentIndex = 0;
        this.mutationPoint = undefined;
        this.previousValue = undefined;
    }

    /*&&
            $joinpoint.typeReference === "Intent" &&
            $joinpoint.name === "<init>"
            && $joinpoint.type === "Executable"
    /*** IMPLEMENTATION OF INSTANCE METHODS ***/

    addJp($joinpoint) {


        if ($joinpoint.type === "Intent" && $joinpoint.instanceOf('expression') && !$joinpoint.instanceOf('var')
        ) {
            if (jp.children[0].name === "<init>" && jp.children[0].type === "Executable") {


                this.mutationPoints.push(jp.children[1]);

                debug(
                    "Adicionou um ponto de mutação " +
                    this.$expr +
                    " a " +
                    $joinpoint +
                    " na linha " +
                    $joinpoint.line
                );
                return true;
            }
        }
        return false;
    }

    hasMutations() {
        return this.currentIndex < this.mutationPoints.length;
    }

    getMutationPoint() {
        if (this.isMutated) {
            return this.mutationPoint;
        } else {
            if (this.currentIndex < this.mutationPoints.length) {
                return this.mutationPoints[this.currentIndex];
            } else {
                return undefined;
            }
        }
    }

    _mutatePrivate() {
        this.mutationPoint = this.mutationPoints[this.currentIndex];

        this.currentIndex++;

        this.originalParent = this.mutationPoint.copy();

        println(" this.originalParent" + this.originalParent);
        this.mutationPoint = this.mutationPoint.insertReplace("null");


        println("/*--------------------------------------*/");
        println("Mutating operator n." + this.currentIndex + ": " + this.originalParent
            + " to " + this.mutationPoint);
        println("/*--------------------------------------*/");


        println(" this.mutationPoint" + this.mutationPoint);
    }



    _restorePrivate() {
        //this.mutationPoint.operator = this.previousValue;
        this.previousValue = undefined;
        this.mutationPoint = undefined;
    }

    toString() {
        return `Invalid Key Intent Operator Mutator from ${this.$original} to ${this.$expr}, current mutation points ${this.mutationPoints}, current mutation point ${this.mutationPoint} and previoues value ${this.previousValue}`;
    }
}
