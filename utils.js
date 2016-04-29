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
    for(var i=0; i<size; i++) newarr[i] = (maxval/10)+Math.round(9*maxval*Math.random()/10);
    return newarr; 
}

// Pad numbers for equal width
function pad (n, width) {
    n = n + ''; 
    return (n.length >= width) ? n : new Array(width-n.length + 1).join('0') + n; 
}


