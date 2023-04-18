laraImport("lara.mutation.Mutator");
laraImport("kadabra.KadabraNodes");
laraImport("weaver.WeaverJps");
laraImport("weaver.Weaver");

class NullIntentOperatorMutator extends Mutator {
    constructor() {
        super("NullIntentOperatorMutator");

        this.mutationPoints = [];
        this.currentIndex = 0;
        this.mutationPoint = undefined;
        this.previousValue = undefined;
        this.initialValue = undefined;
    }

    addJp($joinpoint) {
        if (
            $joinpoint.type === "Intent" && $joinpoint.instanceOf('expression') && !$joinpoint.instanceOf('var')
        ) {
            this.mutationPoints.push($joinpoint);
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

        if (this.currentIndex == 0) {
            this.initialValue = this.mutationPoint;
            println("initialValueIntent   " + this.initialValue);

        }

        this.currentIndex++;


        this.originalParent = this.mutationPoint.copy();

        this.mutationPoint = this.mutationPoint.insertReplace("null");


        println("/*--------------------------------------*/");
        println("Mutating operator n." + this.currentIndex + ": " + this.originalParent
            + " to " + this.mutationPoint);
        println("/*--------------------------------------*/");


    }



    _restorePrivate() {

        println("Restore_mutationPoint " + this.mutationPoint)
        this.mutationPoint.operator = this.initialValue;
        this.previousValue = undefined;
        this.mutationPoint = undefined;
    }

    toString() {
        return `Null Intent Operator Mutator from ${this.$original} to ${this.$expr}, current mutation points ${this.mutationPoints}, current mutation point ${this.mutationPoint} and previoues value ${this.previousValue}`;
    }
}
