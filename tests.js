// Rylan Dmello Apr 24 2016
// Tests for sortedness

// Check that array is sorted
Array.prototype.isSorted = function() {
    var numUnSorted = this.filter((c,i,a)=>c<a[i-1]).length;
    return numUnSorted===0;
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
    

