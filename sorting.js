// Rylan Dmello
// Apr 13 2016
// Much better sorting algorithms

"use strict";

var sortObject = function(array) {
    return {
        origArray: _.clone(array), 
        array: array, 
        insertIndex: 0, 
        readIndex: 0, 
        minIndex: 0,
        start: 0, 
        end: array.length,
        displayClass: 1,
        history: [], 
        undo: function(numSteps) {
            numSteps = typeof numSteps === 'undefined' ? 1 : numSteps; 
            var old; 
            for (var i=0; i<numSteps; i++) old = this.history.pop(); 
            this.array = old.array; 
            this.insertIndex = old.insertIndex; 
            this.readIndex = old.readIndex; 
            this.minIndex = old.minIndex; 
            this.start = old.start; 
            this.end = old.end;
            this.isComplete = old.isComplete; 
            this.display(this.displayClass); 
        },
        makeSortHistory: function() {
            this.history.push({
                array: _.clone(this.array),
                insertIndex: this.insertIndex, 
                readIndex: this.readIndex, 
                minIndex: this.minIndex, 
                start: this.start, 
                end: this.end,
                isComplete: this.isComplete
            })
        },
        display: function(nSvg){
            dispRects(this, nSvg); 
        },
        isComplete: false
    }
}

var sortData = function (sortFcn, initArray, dispClass) {

    var obj = {}; 
    obj.history = [];
    obj.isSorted = false; 

    // Step up sorting function and start sorting
    obj.sort = sortFcn; 
    obj.sort(_.clone(initArray));

    // Display properties
    obj.current = 0; 
    obj.displayClass = dispClass; 
    obj.display = function() { 
        dispRects(obj.history[obj.current], this.displayClass); 
        if (obj.history[obj.current].isComplete) {obj.isSorted = true}; 
        obj.current++; 
    };

    return obj; 
}

var sortStep = function (array, origArray, dispArray, insertIndex, readIndex, minIndex, start, end, isComplete) {
    return {
        array: _.clone(array), 
        origArray: _.clone(origArray),
        dispArray: _.clone(dispArray), 
        insertIndex: insertIndex, 
        readIndex: readIndex, 
        minIndex: minIndex, 
        start: start, 
        end: end, 
        isComplete: isComplete
    };
}

var selectionSort2 = function (array) {

    var origArray = _.clone(array); 
    // Push first frame to history stack 
    this.history.push(sortStep(array, origArray, array, 0, 0, 0, 0, array.length, false)); 

    for (var i=0; i<array.length; i++) {
        this.history.push(sortStep(array, origArray, array, i, i, i, i, array.length, false)); 
        var minIndex = i; 
        for (var j=i+1; j<array.length; j++) {
            if (array[minIndex] > array[j]) minIndex = j; 
            this.history.push(sortStep(array, origArray, array, i, j, minIndex, i, array.length, false)); 
        }
        array.swap(minIndex, i); 
        this.history.push(sortStep(array, origArray, array, i, array.length, i, i, array.length, false)); 
    }

    this.history.push(sortStep(array, origArray, array, array.length, array.length, array.length, array.length, array.length, true)); 

}


var selectionSort = function() {
    if (!this.isComplete) {
        this.makeSortHistory(); 
        this.start = this.insertIndex+1; 
        this.display(1); 
        
        if (this.insertIndex === this.array.length) { 
            this.isComplete = true; 
        } else if (this.readIndex === this.array.length) {
            this.array.swap(this.insertIndex, this.minIndex); 
            this.insertIndex++; 
            this.readIndex = this.insertIndex; 
            this.minIndex  = this.insertIndex;
        } else {
            if (this.array.compare(this.readIndex, this.minIndex) === -1) this.minIndex = this.readIndex; 
            this.readIndex++; 
        }
    }
}

var insertionSort = function (s) {
    if (!this.isComplete) {
        this.makeSortHistory(); 
        this.display(2);

        if (this.readIndex === this.array.length) {
            this.isComplete = true; 
        } else if (this.readIndex === this.insertIndex) {
            this.array.move(this.readIndex, this.minIndex); 
            this.readIndex++; 
            this.insertIndex = 0; 
            this.minIndex = 0; 
            this.end = this.readIndex; 
        } else {
            if (this.array.compare(this.insertIndex, this.readIndex) === 1) {
                this.insertIndex = this.readIndex; 
            } else {
                this.insertIndex++; 
                this.minIndex++; 
            }
        }
    }
}

var sortIterator = function(s) {
    s.sort(); 
    printMe("("+pad(s.insertIndex,2)+") ("+pad(s.readIndex,2)+") "+s.array, s.displayClass);

    if(!s.isComplete) {
        setTimeout(sortIterator, 20, s);
    } else {
        printMe("Final array is sorted? "+s.array.isSorted(), s.displayClass); 
        printMe("Final array is rearrangement of original? "+s.array.isRearrangement(s.origArray), s.displayClass); 
        printMe("Exiting, bye!...", s.displayClass); 
    }
}

var sortIterator2 = function (s) {
    s.display(); 
    if (!s.isSorted) setTimeout(sortIterator2, 20, s); 
}

var s1, s2;
var runtests = function (numels, maxnum) {
    
    var newarr = generate_random(numels, maxnum); 
    
    s1 = sortObject(_.clone(newarr)); 
    s1.sort = selectionSort; 
    s1.displayClass = 1; 

    s2 = sortData(selectionSort2, newarr, 2); 

    // s2 = sortObject(_.clone(newarr)); 
    // s2.sort = insertionSort; 
    // s2.displayClass = 2;

    sortIterator(s1); 
    sortIterator2(s2); 
    // sortIterator(s2); 
}

document.addEventListener('DOMContentLoaded', function(){loadView(); runtests(30,10000);}); 

// Swap elements in array for comparison based sorting
Array.prototype.swap = function (i,j) {
    var temp = this[i];
    this[i] = this[j]; 
    this[j] = temp;
    return this;
}

// Read elements from array
Array.prototype.read = function (i) {
    return this[i]; 
}

// Compare array elements
Array.prototype.compare = function (i, j) {
    if (this[i] === this[j]) return 0; 
    else return this[i]>this[j]? 1 : -1; 
}

// Move an array element to another position
Array.prototype.move = function (from, to) {
    var temp = this.splice(from, 1); 
    this.splice(to, 0, temp[0]); 
    return temp; 
}


