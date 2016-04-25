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


var runtests = function (numels, maxnum) {

    printMe("Number of elements: "+numels+" and maxval: "+maxnum); 
/*    
    var init_array = generate_random(numels, maxnum);
    var t0 = performance.now(); 
    var isort_result = insertionSort(init_array); 
    var t1 = performance.now(); 
    printMe(isort_result.isSorted()+' Insertion sort time: '+(t1-t0));
*/
    var init_array = generate_random(numels, maxnum);
    var t0 = performance.now(); 
    var msort_result = mergeSort(init_array); 
    var t1 = performance.now(); 
    printMe(msort_result.isSorted()+' Merge sort time: '+(t1-t0));

    var init_array = generate_random(numels, maxnum);
    var t0 = performance.now(); 
    var msort_result2 = mergeSort2(init_array, 0, init_array.length-1); 
    var t1 = performance.now(); 
    printMe(msort_result2.isSorted()+' Merge2 sort time: '+(t1-t0));

}

$(function(){runtests(10000,2000);}); 


