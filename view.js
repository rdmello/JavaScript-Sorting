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
        .style("border", "solid rgb(160, 160, 160) 1px"); 

    mySvg2 = d3.select(svgTarget2)
        .append("svg")
        .attr("width", svgTarget2.clientWidth)
        .attr("height", svgTarget2.clientHeight)
        .style("border", "solid rgb(160, 160, 160) 1px"); 

    sortGroup = mySvg.append("g"); 
    sortGroup2 = mySvg2.append("g"); 

}

var dispRects = function (sortObj, svgtarg) {

    var tempArray = sortObj.array; 
    var indexArray = sortObj.origArray.map(function(el) {return _.indexOf(tempArray, el)});
    var dispObj = _.zip(indexArray, sortObj.origArray); 

    var maxheight = dispObj[0][1]; 
    for (var i=0; i<dispObj.length; i++) {
        maxheight = maxheight > dispObj[i][1] ? maxheight : dispObj[i][1]; 
    }

    var thisSvg; 
    if(svgtarg==1) {thisSvg = mySvg} else {thisSvg = mySvg2}; 

    var rects = thisSvg.selectAll("rect").data(dispObj);

    rects.attr("class", "update")
        .style("fill", function(d){
            if(d[1] === sortObj.array[sortObj.readIndex]) {return "#4daf4a"}    
            else if(d[1] === sortObj.array[sortObj.insertIndex]) {return "#377eb8"}    
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
        .attr("x", function(d){return d[0]*svgTarget.clientWidth/dispObj.length})
        .attr("y", function (d) {return svgTarget.clientHeight-(d[1]*svgTarget.clientHeight/maxheight)})
        .attr("rx", 5)
        .attr("ry", 5); 

    rects.exit().remove(); 

    var lines = thisSvg.selectAll("line").data([sortObj.start, sortObj.end]); 

    lines.attr("class", "lineUpdate")
        .transition()
        .duration(150)
        .attr("x1", function(d) {return d*svgTarget.clientWidth/sortObj.array.length;})
        .attr("x2", function(d) {return d*svgTarget.clientWidth/sortObj.array.length;})

    lines.enter().append("line").attr("class", "lineEnter")
        .attr("x1", function(d) {return d*svgTarget.clientWidth/sortObj.array.length;})
        .attr("y1", 0)
        .attr("x2", function(d) {return d*svgTarget.clientWidth/sortObj.array.length;})
        .attr("y2", svgTarget.clientHeight);

    lines.exit().remove(); 

}


