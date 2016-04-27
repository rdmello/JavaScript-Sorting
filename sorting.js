// Rylan Dmello
// Apr 13 2016
// Much better sorting algorithms

"use strict";

// Function that prints to screen instead of console for mobile devices
var printMe = function (string) {
    var outDiv = $(".out");
    outDiv.append("<br/> >> "+string);
}

// Generate array filled with random integers
var generate_random = function(size, maxval) {
    var newarr = []; 
    for(var i=0; i<size; i++) newarr[i] = Math.round(maxval*Math.random());
    return newarr; 
}

// Pad numbers for equal width
function pad (n, width) {
    n = n + ''; 
    return (n.length >= width) ? n : new Array(width-n.length + 1).join('0') + n; 
}

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

var sortObject = function(array) {
    return {
        origArray: _.clone(array), 
        array: array, 
        insertIndex: 0, 
        readIndex: 0, 
        minIndex: 0, 
        isComplete: false
    }
}

var selectionSort = function() {
    if (!this.isComplete) {
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
        if (this.readIndex === this.array.length) {
            this.isComplete = true; 
        } else if (this.readIndex === this.insertIndex) {
            this.array.move(this.readIndex, this.minIndex); 
            this.readIndex++; 
            this.insertIndex = 0; 
            this.minIndex = 0; 
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

var selectionSortIterator = function(s) {
    s.sort(); 
    printMe(pad(s.insertIndex,2)+"|"+pad(s.readIndex,2)+"|"+s.array); 
    if(!s.isComplete) {setTimeout(selectionSortIterator, 10, s);}
    else {
        printMe("Final array is sorted? "+s.array.isSorted()); 
        printMe("Final array is rearrangement of original? "+s.array.isRearrangement(s.origArray)); 
        printMe("Exiting, bye!..."); 
    }
}

var runtests = function (numels, maxnum, numtrials) {
    var s1 = sortObject(generate_random(12, maxnum)); 
    var s2 = sortObject(generate_random(12, maxnum)); 
    s1.sort = selectionSort; 
    s2.sort = insertionSort; 
    selectionSortIterator(s1); 
    selectionSortIterator(s2); 
}

var runMultiple = function (myfunc, numels, maxnum, numtrials) {

    var times = []; 
    var sortSuccess = []; 
    var rearrangeSuccess = []; 

    for (var i=0; i<numtrials; i++) {
        var init_array = generate_random(numels, maxnum); 
        var test_array = _.clone(init_array); 
        var t0 = performance.now(); 
        var final_array = myfunc(test_array); 
        var t1 = performance.now(); 
        times.push(t1-t0); 
        sortSuccess.push(final_array.isSorted()); 
        rearrangeSuccess.push(final_array.isRearrangement(init_array)); 
    }

    return {
        times: times, 
        sortSuccess: sortSuccess, 
        rearrangeSuccess: rearrangeSuccess, 
        avgTime: times.reduce(function(prev, cur){return prev+cur}, 0)/times.length, 
        avgSortSuccess: sortSuccess.reduce(function(prev, cur) {return prev&&cur}), 
        avgRearrangeSuccess: rearrangeSuccess.reduce(function(prev, cur) {return prev&&cur})
    }
}

$(function(){runtests(1000,2000,100);}); 


