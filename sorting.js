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

var selectionSortObject = function(array) {
    return {
        origArray: _.clone(array), 
        array: array, 
        insertIndex: 0, 
        readIndex: 0, 
        minIndex: 0, 
        currentMin: array[0],
        isComplete: false
    }
}

var selectionSort = function(s) {

    // Exit if sorting process is complete
    if (!s.isComplete) {
        // Exit if insertIndex reaches end of array
        if (s.insertIndex === s.array.length) { 
            s.isComplete = true; 
        } else if (s.readIndex === s.array.length) {
            // If readIndex is at end of array, swap insertIndex and minIndex and reset readIndex
            s.array.swap(s.insertIndex, s.minIndex); 
            s.insertIndex++; 
            s.readIndex = s.insertIndex; 
            s.minIndex  = s.insertIndex; 
        } else if (s.readIndex === s.minIndex) {
            s.currentMin = s.array.read(s.minIndex); 
            s.readIndex++; 
        } else if (s.array.read(s.readIndex) < s.currentMin) {
            // Otherwise update minIndex based on the new readIndex
            s.minIndex = s.readIndex; 
        } else {
            s.readIndex++; 
        }
    }
    return; 
}

var selectionSortIterator = function(s) {
    selectionSort(s); 
    printMe(pad(s.insertIndex,2)+"|"+pad(s.readIndex,2)+"|"+s.array); 
    if(!s.isComplete) {setTimeout(selectionSortIterator, 50, s);}
    else {
        printMe("Final array is sorted? "+s.array.isSorted()); 
        printMe("Final array is rearrangement of original? "+s.array.isRearrangement(s.origArray)); 
        printMe("Exiting, bye!..."); 
    }
}

var runtests = function (numels, maxnum, numtrials) {
    var s = selectionSortObject(generate_random(12, maxnum)); 
    selectionSortIterator(s); 
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


