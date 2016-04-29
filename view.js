// Rylan Dmello Apr 28 2016
// View based on d3.js for sorting project

var svgTarget, mySvg; 
var svgTarget2, mySvg2; 

var loadView = function() {
    svgTarget = document.getElementsByClassName("svgtarget")[0]; 
    svgTarget2 = document.getElementsByClassName("svgtarget2")[0]; 

    mySvg = d3.select(svgTarget)
                    .append("svg")
                    .attr("width", svgTarget.clientWidth)
                    .attr("height", svgTarget.clientHeight)
                    .style("border", "solid black 1px"); 

    mySvg2 = d3.select(svgTarget2)
                    .append("svg")
                    .attr("width", svgTarget2.clientWidth)
                    .attr("height", svgTarget2.clientHeight)
                    .style("border", "solid black 1px"); 


}

var dispRects = function (array, svgtarg) {

    var thisSvg; 
    if(svgtarg==1) {thisSvg = mySvg} else {thisSvg = mySvg2}; 

    var rects = thisSvg.selectAll("rect").data(array);

    rects.attr("class", "update")
                              .transition()
                              .duration(50)
                              .attr("height", function(d) {return d})
                              .attr("y", function (d) {return svgTarget.clientHeight-d;})
                              .attr("x", function(d, i) {
                                  return i*svgTarget.clientWidth/array.length;
                              });  
                     
    rects.enter().append("rect").attr("class", "enter").attr("width", svgTarget.clientWidth/array.length)
                              .attr("height", function(d) {return d})
                              .attr("x", function(d, i) {
                                  return i*svgTarget.clientWidth/array.length;
                              })
                              .attr("y", function (d) {return svgTarget.clientHeight-d;}); 


    rects.exit().remove(); 

}




