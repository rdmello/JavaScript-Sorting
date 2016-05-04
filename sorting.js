// Rylan Dmello
// Apr 13 2016
// Much better sorting algorithms

"use strict";

var sortData = function (title, sortFcn, initArray, dispClass) {

    var obj = {}; 
    obj.title = title; 
    obj.history = [];
    obj.isSorted = false; 
    obj.timeDelay = 200; 
    obj.play = true; 

    // Step up sorting function and start sorting
    obj.sort = sortFcn; 
    // obj.sort(_.clone(initArray));

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

var insertionSort = function (array) {

    var origArray = _.clone(array); 
    var newSortStep = _.partial(sortStep, array, origArray, array, _, _, _, 0, _, _); 
    this.history.push(newSortStep(0, 0, 0, 0, false)); 

    for (var i=0; i< array.length; i++) {
        this.history.push(newSortStep(i, i, i, i+1, false)); 
        for (var j=0; j<i; j++) {
            this.history.push(newSortStep(j, i, j, i+1, false)); 
            if (array[i] < array[j]) break;
        }
        array.move(i, j); 
        this.history.push(newSortStep(j, i, j, i+1, false)); 
    }

    this.history.push(newSortStep(array.length, array.length, array.length, 0, true)); 
}

var quickSort = function (array) {

    var origArray = _.clone(array); 
    var newSortStep = _.partial(sortStep, array, origArray, array, _, _, _, _, _, _); 
    this.history.push(newSortStep(0, 0, 0, 0, array.length, false)); 
    var that = this; 
    var addHistory = function(a,b,c,d,e){that.history.push(newSortStep(a,b,c,d,e,false))}; 

    qRec(array, 0, array.length, addHistory);  

    this.history.push(newSortStep(array.length, array.length, array.length, array.length, array.length, true)); 
}

var qRec = function (array, start, end, addHist) {

    var pivotIndex = end-1; 
    var i = start; var j = end-2; 
    while(i<=j){
        if(array[i] > array[end-1]) {
            array.swap(i, j); j = j-1; i = i-1; 
        }
        if (j<start) break; 
        i = i+1; 
        addHist(j, end-1, i, start, end); 
    }
    pivotIndex = j+1;
    array.swap(end-1, pivotIndex); 
    addHist(end-1, pivotIndex, j+1, start, end); 

    if (pivotIndex-start>1) qRec(array, start, pivotIndex, addHist); 
    if (end-pivotIndex > 1) qRec(array, pivotIndex+1, end, addHist); 
}

var mergeSort = function (array) {

    var origArray = _.clone(array); var n = array.length; 
    var newSortStep = _.partial(sortStep, array, origArray, array, _, _, _, _, _, _);
    this.history.push(newSortStep(0, 0, 0, 0, array.length, false)); 
    var that = this; 
    var addHistory = function(a,b,c,d,e) {that.history.push(newSortStep(a,b,c,d,e,false))}; 
    mRec(array, 0, array.length, addHistory); 
    this.history.push(newSortStep(n, n, n, n, n, true));
}

var mRec = function (array, start, end, addHist) {
    var mid = start+Math.ceil((end-start)/2);
    
    if(mid - start > 1) mRec (array, start, mid, addHist); 
    if(end - mid > 1) mRec (array, mid, end, addHist); 

    var i = start; var j = mid;
    while (i<end && j<end) {
        if (array[i] < array[j]) {++i;}
        else {array.move(j, i); ++i; ++j}
        addHist(i, j, j, start, end);
    }
}

var sortIterator = function (s) {
    if (s.play) s.display(); 
    if (!s.isSorted) setTimeout(sortIterator, s.timeDelay, s); 
}

var s1, s2, s3, s4;
var sortObjects;

document.addEventListener('DOMContentLoaded', function(){
    
    var newarr = generate_random(30, 10000); 
    s1 = sortData("Selection Sort", selectionSort, newarr, 1); 
    s2 = sortData("Insertion Sort", insertionSort, newarr, 2); 
    s3 = sortData("Quick Sort", quickSort, newarr, 3); 
    s4 = sortData("Merge Sort", mergeSort, newarr, 4); 
    sortObjects = [s1, s2, s3, s4]; 

    new Vue({
        el: '#myapp', 
        data: {
            sortViews: sortObjects
        },
        methods: {
            stopPlay: function(index) {
                sortObjects[index].play = false; 
            },
            startPlay: function(index) {
                sortObjects[index].play = true; 
            },
            redoMe: function(index) {
                sortObjects[index].history = []; 
                sortObjects[index].isSorted = false; 
                sortObjects[index].timeDelay = 200; 
                sortObjects[index].play = true; 
                sortObjects[index].current = 0; 
                sortObjects[index].sort(_.clone(newarr)); 
                sortIterator(sortObjects[index]);
            },
            slowDown: function(index) {
                sortObjects[index].timeDelay = sortObjects[index].timeDelay/0.7;
            },
            speedUp: function(index) {
                sortObjects[index].timeDelay = sortObjects[index].timeDelay*0.7;
            }
        }
    })     
    
    loadView(); 
    s1.sort(_.clone(newarr)); 
    s2.sort(_.clone(newarr)); 
    s3.sort(_.clone(newarr)); 
    s4.sort(_.clone(newarr)); 
    sortIterator(s1); 
    sortIterator(s2); 
    sortIterator(s3); 
    sortIterator(s4); 

    var formNodeList = document.getElementsByClassName('pure-form'); 
    for (var i = 0; i<formNodeList.length; i++) {
        formNodeList[i].addEventListener('submit', function (e) {e.preventDefault()},false);
    }; 
}); 

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


