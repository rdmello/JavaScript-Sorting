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

    sortGroup = mySvg.append("g"); 
    sortGroup2 = mySvg2.append("g"); 

}

var dispRects = function (dispObj, svgtarg, sortObj) {

    var maxheight = dispObj[0][1]; 
    for (var i=0; i<dispObj.length; i++) {
        maxheight = maxheight > dispObj[i][1] ? maxheight : dispObj[i][1]; 
    }

    var thisSvg; 
    if(svgtarg==1) {thisSvg = mySvg} else {thisSvg = mySvg2}; 

    var rects = thisSvg.selectAll("rect").data(dispObj);

    rects.attr("class", "update")
        .style("fill", function(d){
            if(d[1] === sortObj.array[sortObj.readIndex]) {return "blue"}    
            else if(d[1] === sortObj.array[sortObj.insertIndex]) {return "green"}    
            else if(d[1] === sortObj.array[sortObj.minIndex]) {return "black"}    
        })
        .transition()
        .duration(150)
        .attr("x", function(d) {
            return d[0]*svgTarget.clientWidth/dispObj.length;
        });  

    rects.enter().append("rect").attr("class", "enter")
        .attr("width", svgTarget.clientWidth/dispObj.length)           
        .attr("height", function(d) {return d[1]*svgTarget.clientHeight/maxheight})             
        .attr("x", function(d){return d[0]*svgTarget.clientHeight/dispObj.length})
        .attr("y", function (d) {return svgTarget.clientHeight-(d[1]*svgTarget.clientHeight/maxheight)})
        .attr("rx", 5)
        .attr("ry", 5); 

    rects.exit().remove(); 

}




