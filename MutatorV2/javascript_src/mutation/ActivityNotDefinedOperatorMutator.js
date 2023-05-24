laraImport("lara.mutation.Mutator");
laraImport("kadabra.KadabraNodes");
laraImport("weaver.WeaverJps");
laraImport("weaver.Weaver");

class ActivityNotDefinedOperatorMutator extends Mutator {
    constructor(xmlNode) {
        super("ActivityNotDefinedOperatorMutator");
        this.mutationPoints = [];
        this.currentIndex = 0;
        this.mutationPoint = undefined;
        this.previousValue = undefined;

    }

    /*** IMPLEMENTATION OF INSTANCE METHODS ***/
    addJp(xmlNode) {
        if (
            xmlNode.instanceOf("AndroidManifest")
        ) {
            this.mutationPoints.push(xmlNode);

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
        this.currentIndex++;


        //debug(`${this.getName()}: from ${this.mutationPoint} to ${this.$expr}`);

        this.previousValue = this.mutationPoint.operator;
        this.mutationPoint.operator = this.$expr;

        println("/*--------------------------------------*/");
        println("Mutating operator n." + this.currentIndex + ": " + this.previousValue
            + " to " + this.mutationPoint);
        println("/*--------------------------------------*/");

    }

    _restorePrivate() {

        this.mutationPoint.operator = this.previousValue;

        println("Restore_mutationPoint " + this.mutationPoint)
        this.previousValue = undefined;
        this.mutationPoint = undefined;
    }

    toString() {
        return `Activity Not Defined Operator Mutator from ${this.$original} to ${this.$expr}, current mutation points ${this.mutationPoints}, current mutation point ${this.mutationPoint} and previoues value ${this.previousValue}`;
    }
}
