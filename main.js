// Rylan Dmello
// April 8 2016

console.log("Hello!");

"use strict";

var generate_random = function(size, maxval) {
    var myarr = [];
    for (var i=0; i<size; i++) myarr[i] = Math.round(maxval*Math.random());
    return myarr;                               
}

Array.prototype.isSorted = function() {
    for (var i=0; i<this.length-1; i++) {
        if(this[i]>this[i+1]) {return false;}
    }
    return true;
}

Array.prototype.swap = function(i,j) {
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
    return this; 
}

// 1. INSERTION SORTING
// Apr 8 2016
var insertion_sort = function(array) {
    
    for(var i=0; i<array.length; i++) {
        
        var newvalue = array[i];
        var newpos = i; // Set default newposition to current position
        
        // Find new position of array element being considered
        for (var j=0; j<i; j++) {
            if(array[j]>array[i]) {newpos = j;break;}
        }

        // Shift required elements forward in the array
        for (var j=i; j>newpos; j--) array[j] = array[j-1];

        array[newpos] = newvalue; // Set newvalue at correct location
        
    }

    return array;
}

// 2. SELECTION SORTING
// Apr 8 2016
var selection_sort = function(array) {

    for (var i=0; i<array.length; i++) {

        var minindex = i; 
        for (var j=i; j<array.length; j++) {
            if(array[j]<array[minindex]) minindex = j;
        }
        
        var minval = array[minindex];
        for (var j=minindex; j>i; j--) array[j] = array[j-1]; 
        array[i] = minval;
    }
     
    return array;
}

// 3. MERGE SORT
// Apr 8 2016
var merge_sort = function(array, start, end) {
    var newarray=[];
    var lt = [array[start]]; var lti = 0; 
    var rt = [array[end]]; var rti = 0;

    if (end-start > 1) {
        var mid = Math.floor(start+((end-start)/2));
        lt = merge_sort(array, start, mid);
        rt = merge_sort(array, mid+1, end);
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


// 4. HEAP SORT 
// Apr 8 2016
var heap_sort = function(array) {
    var myheap = btree(); 
    for (var i=0; i<array.length; i++) myheap.insert(array[i]); 
    for (var i=0; i<array.length; i++) array[i] = myheap.removeMin(); 
    return array; 
}

// 5. QUICK SORT
// Apr 8 2016
var quick_sort = function(array, start, end) {

    //var pivot = start+Math.floor((end-start+1)*Math.random()); // Random pivot
    var pivot = start+Math.floor((end-start)/2); // Random pivot
    array.swap(pivot, end); // Pivot is at end of array
    var pivotval = array[end];

    var j = end;
    for (var i=start; i<j; i++) {
        if(array[i]>pivotval){
            array.swap(i, j-1); j--; i--;
        }
    }
    array.swap(end, j);
    pivot = j;

    if(j-start-1>=1) quick_sort(array, start, j-1);
    if(end-j-1>=1)   quick_sort(array, j+1, end); 

    return array; 
}


//var numels = 40000; var maxnum = 100000000; 
//var init_array = generate_random(numels, maxnum);
//console.log('The initial array is: '+init_array);
//console.log('Is the inital array sorted? ' + init_array.isSorted());

/*
// insertion sort test
var init_array = generate_random(numels, maxnum);
var t0 = performance.now(); 
var isort_result = insertion_sort(init_array); 
var t1 = performance.now(); 
console.log((t1-t0)+' Insertion sort result: '+isort_result.isSorted());

// selection sort test
var init_array = generate_random(numels, maxnum);
var t0 = performance.now(); 
var ssort_result = selection_sort(init_array); 
var t1 = performance.now(); 
console.log((t1-t0)+' Selection sort result: '+ssort_result.isSorted());
*/

var runtests = function(numels, maxnum) {
    //var numels = 40000; 
    //var maxnum = 100000000; 
    // merge sort test
    var init_array = generate_random(numels, maxnum);
    var t0 = performance.now(); 
    var msort_result = merge_sort(init_array, 0, init_array.length-1); 
    var t1 = performance.now(); 
    console.log((t1-t0)+' Merge sort result: '+msort_result.isSorted());

    // heap sort test
    var init_array = generate_random(numels, maxnum);
    var t0 = performance.now(); 
    var hsort_result = heap_sort(init_array); 
    var t1 = performance.now(); 
    console.log((t1-t0)+' Heap sort result: '+hsort_result.isSorted());

    // quick sort test
    var init_array = generate_random(numels, maxnum);
    var t0 = performance.now(); 
    var qsort_result = quick_sort(init_array, 0, init_array.length-1); 
    var t1 = performance.now(); 
    console.log((t1-t0)+' Quick sort result: '+qsort_result.isSorted());
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

runtests(40000, 10000000);

