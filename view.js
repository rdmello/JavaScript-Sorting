// Rylan Dmello Apr 28 2016
// View based on d3.js and vue.js for sorting project

var svgTargets; 
var mySvgs; 

var loadView = function() {
    svgTargets = document.getElementsByClassName("svgt"); 

    mySvgs = d3.selectAll(".svgt")
        .append("svg")
        .attr("width", svgTargets[0].clientWidth)
        .attr("height", svgTargets[0].clientHeight)
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

    var thisSvg = mySvgs.filter(function(d,i){return i===svgtarg-1});
    var rects = thisSvg.selectAll("rect").data(dispObj);

    rects.attr("class", "update")
        .style("fill", function(d){
            if(d[0].isGray) {return "rgb(230,230,230)"}
            else if(d[1] === sortObj.array[sortObj.readIndex]) {return "#4daf4a"}    
            else if(d[1] === sortObj.array[sortObj.insertIndex]) {return "#377eb8"}    
            else if(d[1] === sortObj.array[sortObj.minIndex]) {return "black"}    
        })
        .transition()
        .duration(sortObjects[svgtarg-1].timeDelay*3/4)
        .attr("x", function(d) {
            return d[0].newIndex*svgTargets[0].clientWidth/dispObj.length;
        });  

    rects.enter().append("rect").attr("class", "enter")
        .attr("width", svgTargets[0].clientWidth/dispObj.length)           
        .attr("height", function(d) {return d[1]*svgTargets[0].clientHeight/maxheight})             
        .attr("x", function(d){return d[0].newIndex*svgTargets[0].clientWidth/dispObj.length})
        .attr("y", function (d) {return svgTargets[0].clientHeight-(d[1]*svgTargets[0].clientHeight/maxheight)})
        .attr("rx", 5)
        .attr("ry", 5); 

    rects.exit().remove(); 

    var lines = thisSvg.selectAll("line").data([sortObj.start, sortObj.end]); 

    lines.attr("class", "lineUpdate")
        .transition()
        .duration(sortObjects[svgtarg-1].timeDelay*3/4)
        .attr("x1", function(d) {return d*svgTargets[0].clientWidth/sortObj.array.length;})
        .attr("x2", function(d) {return d*svgTargets[0].clientWidth/sortObj.array.length;})

    lines.enter().append("line").attr("class", "lineEnter")
        .attr("x1", function(d) {return d*svgTargets[0].clientWidth/sortObj.array.length;})
        .attr("y1", 0)
        .attr("x2", function(d) {return d*svgTargets[0].clientWidth/sortObj.array.length;})
        .attr("y2", svgTargets[0].clientHeight);

    lines.exit().remove(); 
}


