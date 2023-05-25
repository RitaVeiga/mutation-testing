laraImport("lara.mutation.Mutator");
laraImport("kadabra.KadabraNodes");
laraImport("weaver.WeaverJps");
laraImport("weaver.Weaver");

class ForLoopReplacementOperatorMutator extends Mutator {
    constructor() {
        super("ForLoopReplacementOperatorMutator");

        this.arrayLength = 0;
        this.mutationPoints = [];
        this.currentIndex = 0;
        this.mutationPoint = undefined;
        this.previousValue = undefined;
    }


    addJp(joinpoint) {

        //println("addJp: " + joinpoint.ast);

        if (((joinpoint.parent.type == "for"))) {


            if (joinpoint.instanceOf('statement') && joinpoint.instanceOf("localVariable")) {

                if (joinpoint.children[1].instanceOf('literal')) {
                    // println("addJp: " + joinpoint.children[1]);
                    this.mutationPoints.push(joinpoint.children[1]);
                }

            }
            if (joinpoint.instanceOf('expression') && joinpoint.type == "boolean") {
                println("AQYUIIIIIIIIIIII: " + joinpoint.ast);

                if (joinpoint.children[1].instanceOf('literal')) {
                    println("addJp: " + joinpoint.children[1]);
                    // this.arrayLength = joinpoint.children[1];
                    this.mutationPoints.push(joinpoint.children[1]);
                }
            }
            println("addJp: " + joinpoint.ast);
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
        let randomIndex = Math.floor(Math.random() * (3 + 1));

        this.mutationPoint = this.mutationPoints[this.currentIndex];
        println("this.random" + randomIndex);


        this.previousValue = this.mutationPoint.copy();
        println("this.previousValue" + this.previousValue);

        println("qqq" + this.previousValue == randomIndex)

        while (this.previousValue == randomIndex) {
            randomIndex = Math.floor(Math.random() * (5 + 1));

        };
        this.mutationPoint = this.mutationPoint.insertReplace(randomIndex.toString());
        this.currentIndex++;
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
        return `For Loop Replacement Operator Mutator from ${this.previousValue} to ${this.mutationPoint}, current mutation points ${this.mutationPoints}, current mutation point ${this.mutationPoint} and previous value ${this.previousValue}`;
    }

    toJson() {
        return {
            mutationOperatorArgumentsList: [],
            operator: this.name,
        };
    }
}
