// Rylan Dmello Apr 28 2016
// View based on d3.js for sorting project

var svgTarget, mySvg; 
var svgTarget2, mySvg2; 
var svgTarget3, mySvg3; 
var svgTarget4, mySvg4; 

var loadView = function() {
    svgTarget = document.getElementsByClassName("svgtarget")[0]; 
    svgTarget2 = document.getElementsByClassName("svgtarget2")[0]; 
    svgTarget3 = document.getElementsByClassName("svgtarget3")[0]; 
    svgTarget4 = document.getElementsByClassName("svgtarget4")[0]; 

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

    mySvg3 = d3.select(svgTarget3)
        .append("svg")
        .attr("width", svgTarget3.clientWidth)
        .attr("height", svgTarget3.clientHeight)
        .style("border", "solid rgb(160, 160, 160) 1px");

    mySvg4 = d3.select(svgTarget4)
        .append("svg")
        .attr("width", svgTarget4.clientWidth)
        .attr("height", svgTarget4.clientHeight)
        .style("border", "solid rgb(160, 160, 160) 1px"); 

}

var dispRects = function (sortObj, svgtarg) {

    var tempArray = sortObj.array; 
    var isGray = sortObj.array.map(function(e,i) {
        if (i<sortObj.start || i>=sortObj.end) {return true}
        else return false; 
    }); 
    var indexArray = sortObj.origArray.map(function(el) {
        var newIndex = _.indexOf(tempArray, el); 
        return {
            newIndex: newIndex, 
            isGray: isGray[newIndex]
        }
    });
    var dispObj = _.zip(indexArray, sortObj.origArray); 

    var maxheight = dispObj[0][1]; 
    for (var i=0; i<dispObj.length; i++) {
        maxheight = maxheight > dispObj[i][1] ? maxheight : dispObj[i][1]; 
    }

    var thisSvg; 
    if(svgtarg==1) {thisSvg = mySvg} 
    else if (svgtarg == 2) {thisSvg = mySvg2}
    else if (svgtarg == 3) {thisSvg = mySvg3}
    else {thisSvg = mySvg4}; 

    var rects = thisSvg.selectAll("rect").data(dispObj);

    rects.attr("class", "update")
        .style("fill", function(d){
            if(d[0].isGray) {return "rgb(230,230,230)"}
            else if(d[1] === sortObj.array[sortObj.readIndex]) {return "#4daf4a"}    
            else if(d[1] === sortObj.array[sortObj.insertIndex]) {return "#377eb8"}    
            else if(d[1] === sortObj.array[sortObj.minIndex]) {return "black"}    
        })
        .transition()
        .duration(150)
        .attr("x", function(d) {
            return d[0].newIndex*svgTarget.clientWidth/dispObj.length;
        });  

    rects.enter().append("rect").attr("class", "enter")
        .attr("width", svgTarget.clientWidth/dispObj.length)           
        .attr("height", function(d) {return d[1]*svgTarget.clientHeight/maxheight})             
        .attr("x", function(d){return d[0].newIndex*svgTarget.clientWidth/dispObj.length})
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


