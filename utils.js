// Rylan Dmello Apr 29 2016
// Utility functions for sorting.js

// Function that prints to screen instead of console for mobile devices
var printMe = function (string, classname) {
    /*
    var outDiv = document.getElementsByClassName(classname)[0];
    outDiv.innerHTML += "<br/> $ " + string;
    */
 //   console.log(string); 
}

// Generate array filled with random integers
var generate_random = function(size, maxval) {
    var newarr = []; 
    while (newarr.length!==size) {
        var el = (maxval/10)+Math.round(9*maxval*Math.random()/10); 
        if (_.indexOf(newarr, el) === -1) newarr.push(el); 
    }
    return newarr; 
}

// Pad numbers for equal width
function pad (n, width) {
    n = n + ''; 
    return (n.length >= width) ? n : new Array(width-n.length + 1).join('0') + n; 
}

// Rylan Dmello Apr 24 2016
// Tests for sortedness

// Check that array is sorted
Array.prototype.isSorted = function() {
    for (var i=1; i<this.length; i++) {
        if(this[i]<this[i-1]) {
            console.log(i); 
            console.log(this); 
            return false; 
        }
    }
    return true; 
}

// Check that new array is rearrangement of old
// To make sure that no new elements have been added
Array.prototype.isRearrangement = function(array) {

    // Check that arrays are the same size
    if (array.length !== this.length) {
        console.log('Sorted and Unsorted arrays have different lengths'); 
        return false; 
    }

    // Check that arrays don't contain any new elements
    if ((_.difference(this, array).length!==0)||(_.difference(array, this).length!==0)) {
        console.log('Sorted and Unsorted arrays have different elements'); 
        return false; 
    }

    // Go element-by-element and check that each element is counted only once
    var tempArray = array.slice(); // Copies initial unsorted array to new array
    this.forEach(function(e,i) {
        tempArray.forEach(function(e2,i2) {
            if(e2===e) tempArray.splice(i2, 1)
        })
    });

    if (tempArray.length !== 0) return false; 

    return true; 
}

Array.prototype.isSortedRearrangement = function(old) {
    var b1 = this.isSorted();
    var b2 = this.isRearrangement(old); 
    return [b1, b2];
}


