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
    }

    addJp($joinpoint) {


        //  println("joinpoint   " + $joinpoint.interfaces);


        // println("joinpoint   " + $joinpoint.superClassJp);



        if ($joinpoint.instanceOf("class")) {

            println("jointPoint type class   " + $joinpoint);

            println("reference   " + $joinpoint.type);
            if ($joinpoint.type === 'Serializable') {
                // println("jointPoint type Serializable   " + $joinpoint);
                //   this.mutationPoints.push($joinpoint.children[0]);
                // return true;
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
        println("this.mutationPoint" + this.mutationPoint)
        this.currentIndex++;

        this.previousValue = this.mutationPoint.copy();

        this.mutationPoint = this.mutationPoint.insertReplace("\"\"");


        println("/*--------------------------------------*/");
        println("Mutating operator n." + this.currentIndex + ": " + this.previousValue
            + " to " + this.mutationPoint);
        println("/*--------------------------------------*/");


        println(" this.mutationPoint" + this.mutationPoint);
    }

    _restorePrivate() {
        this.mutationPoint = this.mutationPoint.insertReplace(this.previousValue);
        this.previousValue = undefined;
        this.mutationPoint = undefined;
    }


    toString() {
        return `Not Serializable Operator Mutator from ${this.$original} to ${this.$expr}, current mutation points ${this.mutationPoints}, current mutation point ${this.mutationPoint} and previoues value ${this.previousValue}`;
    }
}
