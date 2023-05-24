laraImport("lara.mutation.Mutator");
laraImport("kadabra.KadabraNodes");
laraImport("weaver.WeaverJps");
laraImport("weaver.Weaver");

class NotSerializableOperatorMutator extends Mutator {
    constructor() {
        super("NotSerializableOperatorMutator");

        this.mutationPoints = [];
        this.currentIndex = 0;
        this.mutationPoint = undefined;
        this.previousValue = undefined;
        this.removedInterface = undefined;
    }

    addJp($joinpoint) {

        if ($joinpoint.instanceOf("class")) {

            if ($joinpoint.interfaces.contains("java.io.Serializable")) {
                this.mutationPoints.push($joinpoint);
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
            println("this.isMutated   " + this.mutationPoint);
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


        this.previousValue = this.mutationPoint;

        this.removedInterface = this.mutationPoint.removeInterface("java.io.Serializable");


        println("/*--------------------------------------*/");
        println("Mutating operator n." + this.currentIndex + ": " + this.removedInterface
            + " to " + "\"\"");
        println("/*--------------------------------------*/");

    }

    _restorePrivate() {
        this.mutationPoint = this.mutationPoint.addImplement(this.removedInterface);
        this.previousValue = undefined;
        this.removedInterface = undefined;

    }


    toString() {
        return `Not Serializable Operator Mutator from ${this.$original} to ${this.$expr}, current mutation points ${this.mutationPoints}, current mutation point ${this.mutationPoint} and previoues value ${this.previousValue}`;
    }
    toJson() {
        return {
            mutationOperatorArgumentsList: [],
            operator: this.name,
        }
    }

}
