// Rylan Dmello Mar 25 2016
// Trying to implement a binary heap (:
// That will satisfy the heap ordering property
// In order to build a priority queue system. 
// Operations: Insert, RemoveMin, GetMin


var btree = function () {
    
    var dataArray = [0]; 
    var mytree = {}; 

    mytree.length = 0; 

    mytree.getMin = function () {
        return dataArray[1]?dataArray[1]:null;
    }

    mytree.heapify = function(array) {
        this.length = array.length;
        array.push(array[0]);
        for(var i=0; i<array.length; i++) {
            
    
        }
    }

    mytree.insert = function(addme) {
        dataArray.push(addme);
        this.length++;
        bubbleup(mytree.length);
    }

    var bubbleup = function(position) {
        var me = dataArray[position];
        var parentPos = Math.floor(position/2);
        parentPos = (parentPos<1)?1:parentPos;
        var myparent = dataArray[parentPos];

        if (me<myparent) {
            dataArray[parentPos] = me; 
            dataArray[position] = myparent; 
            bubbleup(parentPos);
        }
    }

    mytree.removeMin = function () {
        var toBeRemoved = this.getMin();
        dataArray[1] = dataArray.pop();
        this.length--;
        bubbleDown(1);
        return toBeRemoved;
    }

    var bubbleDown = function(position) {
        var me = dataArray[position];
        var ltPos = 2*position;
        var rtPos = (2*position)+1;
        var lt = dataArray[ltPos];
        var rt = dataArray[rtPos];

        var win = rt==null||lt<rt?lt:rt;
        var winPos = (win===lt)?ltPos:rtPos;

        if (me>win) {
            dataArray[winPos] = me;
            dataArray[position] = win; 
            bubbleDown(winPos);
        }
    }

    mytree.printAll = function() {
        for(var i=0; i<mytree.length; i++) {
            console.log("Element "+i+" is: "+dataArray[i+1]);
        }
    }

    mytree.populate = function(n) {
        for (var i=0; i<n; i++) {
            this.insert(Math.floor(100*Math.random()));
        }
    }

    mytree.printree = function(){
        for (var i=0; i<Math.floor(Math.log2(this.length))+1; i++) {
            var cur = "";
            for (var j=0; j<Math.pow(2,i); j++) {
                cur += " "+dataArray[(Math.pow(2,i-1))+j];
            }
            console.log(cur);
        }
    }

    return mytree;
}


