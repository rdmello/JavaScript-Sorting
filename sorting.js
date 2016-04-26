// Rylan Dmello
// Apr 13 2016
// Much better sorting algorithms

"use strict";

// Function that prints to screen instead of console for mobile devices
var printMe = function (string) {
    var outDiv = $(".out");
    outDiv.append("<br/> >> ");
    outDiv.append(string);
}

// Generate array filled with random integers
var generate_random = function(size, maxval) {
    var newarr = []; 
    for(var i=0; i<size; i++) newarr[i] = Math.round(maxval*Math.random());
    return newarr; 
}

// Swap elements in array for comparison based sorting
Array.prototype.swap = function (i,j) {
    var temp = this[i];
    this[i] = this[j]; 
    this[j] = temp;
    return this;
}

// Implement insertion sort for array 
var insertionSort = function (array) {
    var current=0, j=0; 
    for (var i=0; i<array.length; i++) {
        current = (array.splice(i, 1))[0]; 
        for (j=0; j<i; j++) {
            if (current<array[j]) {
                break;
            }
        }
        array.splice(j, 0, current); 
    }
    return array; 
}

// Implement Mergesort for an array
var mergeSort = function (array) {
    var mid = Math.floor(array.length/2);
    var leftArray = [array[0]]; 
    var rightArray= [array[array.length-1]];

    if (array.length > 1) {
        leftArray = mid>0 ? mergeSort(array.slice(0, mid)) : leftArray;
        rightArray= array.length-1!==mid ? mergeSort(array.slice(mid, array.length)) : rightArray; 
    } else return array; 

    var lt = 0, rt = 0; 
    for (var i = 0; i<array.length; i++) {
        if (typeof rightArray[rt]==='undefined'||leftArray[lt]<=rightArray[rt]) {
            array[i] = leftArray[lt]; lt++; 
        } else {
            array[i] = rightArray[rt]; rt++;
        };
    };
    return array; 
}

var mergeSort2 = function(array, start, end) {
    var newarray=[];
    var lt = [array[start]]; var lti = 0; 
    var rt = [array[end]]; var rti = 0;

    if (end-start > 1) {
        var mid = Math.floor(start+((end-start)/2));
        lt = mergeSort2(array, start, mid);
        rt = mergeSort2(array, mid+1, end);
    }
    
    for(var i=0; i<=end-start; i++){
        if((rt[rti]==undefined) || (lt[lti]<=rt[rti])){
            newarray[i]=lt[lti]; lti++;
        } else {
            newarray[i]=rt[rti]; rti++;
        }
    }
   
    return newarray;
}

var selectionSortObject = {
    origArray: 0,
    array: 0, 
    insertIndex: 0, 
    readIndex: 0, 
    minIndex: 0, 
    isComplete: false, 
}

var selectionSort = function() {
    var s = selectionSortObject; 

    // Exit if sorting process is complete
    if(s.isComplete) return; 
    
    // Exit if insertIndex reaches end of array
    if (s.insertIndex === s.array.length) {
        s.isComplete = true; 
        return; 
    }

    // If readIndex is at end of array, swap insertIndex and minIndex and reset readIndex
    if (s.readIndex === s.array.length) {
        var temp = s.array[s.insertIndex]; 
        s.array[s.insertIndex] = s.array[s.minIndex];
        s.array[s.minIndex] = temp;

        s.insertIndex++; 
        s.readIndex = s.insertIndex; 
        s.minIndex  = s.insertIndex; 
        return;
    }

    // Otherwise update minIndex based on the new readIndex
    if (s.array[s.readIndex]<s.array[s.minIndex]) s.minIndex = s.readIndex; 
    s.readIndex++; 
    return; 
}

var selectionSortIterator = function() {
    var s = selectionSortObject; 
    selectionSort(); 
    printMe(s.insertIndex+"|"+s.readIndex+"|"+s.array); 
    if(!s.isComplete) {setTimeout(selectionSortIterator, 50);}
    else {
        printMe("Final array is sorted? "+s.array.isSorted()); 
        printMe("Final array is rearrangement of original? "+s.array.isRearrangement(s.origArray)); 
        printMe("Exiting, bye!..."); 
    }
}

var runtests = function (numels, maxnum, numtrials) {

    printMe("Number of elements: "+numels+" and maxval: "+maxnum+" and numtrials: "+numtrials);

    /*
    var mergesorttests = runMultiple(mergeSort, numels, maxnum, numtrials); 
    printMe('MERGE SORT 1: '+mergesorttests.avgRearrangeSuccess+' time: '+mergesorttests.avgTime);

    var mergesorttests2 = runMultiple(_.partial(mergeSort2, _, 0, numels-1), numels, maxnum, numtrials); 
    printMe('MERGE SORT 2: '+mergesorttests2.avgRearrangeSuccess+' time: '+mergesorttests2.avgTime);
    */

    selectionSortObject.origArray = generate_random(15, maxnum); 
    selectionSortObject.array = selectionSortObject.origArray; 
    selectionSortIterator(); 
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


