// Rylan Dmello
// Apr 13 2016
// Much better sorting algorithms

"use strict";

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

var selectionSort = function (array) {

    var origArray = _.clone(array); 
    var newSortStep = _.partial(sortStep, array, origArray, array, _, _, _, _, array.length, _); 
    this.history.push(newSortStep(0, 0, 0, 0, false)); 

    for (var i=0; i<array.length; i++) {
        this.history.push(newSortStep(i, i, i, i, false)); 
        var minIndex = i; 
        for (var j=i+1; j<array.length; j++) {
            if (array[minIndex] > array[j]) minIndex = j; 
            this.history.push(newSortStep(i, j, minIndex, i, false)); 
        }
        array.swap(minIndex, i); 
        this.history.push(newSortStep(i, array.length, i, i, false)); 
    }

    this.history.push(newSortStep(array.length, array.length, array.length, array.length, true)); 
}

var sortIterator = function (s) {
    s.display(); 
    if (!s.isSorted) setTimeout(sortIterator, 20, s); 
}

var s1, s2;
var runtests = function (numels, maxnum) {
    
    var newarr = generate_random(numels, maxnum); 
    s1 = sortData(selectionSort, newarr, 1); 
    sortIterator(s1); 
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


