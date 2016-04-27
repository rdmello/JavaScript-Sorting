// Rylan Dmello
// Apr 13 2016
// Much better sorting algorithms

"use strict";

// Function that prints to screen instead of console for mobile devices
var printMe = function (string, classname) {
    var outDiv = $(classname);
    outDiv.append("<br/> >> " + string);
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
    printMe(pad(s.insertIndex,2)+"|"+pad(s.readIndex,2)+"|"+s.array, s.display); 
    
    if(!s.isComplete) {
        setTimeout(selectionSortIterator, 10, s);
    } else {
        printMe("Final array is sorted? "+s.array.isSorted(), s.display); 
        printMe("Final array is rearrangement of original? "+s.array.isRearrangement(s.origArray), s.display); 
        printMe("Exiting, bye!...", s.display); 
    }
}

var runtests = function (numels, maxnum) {
    var s1 = sortObject(generate_random(numels, maxnum)); 
    s1.sort = selectionSort; 
    s1.display = ".out1"; 

    var s2 = sortObject(generate_random(numels, maxnum)); 
    s2.sort = insertionSort; 
    s2.display = ".out2";
    
    selectionSortIterator(s1); 
    selectionSortIterator(s2); 
}


$(function(){runtests(12,2000);}); 


