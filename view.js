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

var dispRects = function (dispObj, svgtarg) {

    var maxheight = dispObj[0][1]; 
    for (var i=0; i<dispObj.length; i++) {
        maxheight = maxheight > dispObj[i][1] ? maxheight : dispObj[i][1]; 
    }

    var thisSvg; 
    if(svgtarg==1) {thisSvg = mySvg} else {thisSvg = mySvg2}; 

    var rects = thisSvg.selectAll("rect").data(dispObj);

    rects.attr("class", "update")
         //.attr("height", function(d) {return d})
         //.attr("y", function (d) {return svgTarget.clientHeight-d;})
         .transition()
         .duration(100)
         .attr("x", function(d) {
             return d[0]*svgTarget.clientWidth/dispObj.length;
         });  
                     
    rects.enter().append("rect").attr("class", "enter")
                 .attr("width", svgTarget.clientWidth/dispObj.length)           
                 .attr("height", function(d) {return d[1]*150/maxheight})             
                 .attr("x", d => d[0]*svgTarget.clientWidth/dispObj.length)
                 .attr("y", function (d) {return svgTarget.clientHeight-(d[1]*150/maxheight)}); 


    rects.exit().remove(); 

}




