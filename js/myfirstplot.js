 //the label
 var label_div = d3.select("#my_dataviz").append("div")
 .attr("class", "label")
 .style("opacity", 0);

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = window.innerWidth*0.75 - margin.left - margin.right,
height = window.innerHeight*0.8 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json("data/spotify.json",function(data) {

// Add X axis
var x = d3.scaleLinear()
.domain([0, 200])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([-45, 0])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add dots
svg.append('g')
.selectAll("dot")
.data(data)
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.tempo); } )
  .attr("cy", function (d) { return y(d.avg_loudness); } )
  .attr("r", 5)
  .style("fill", function(d){
    switch(d.genre){
        case "animerock":
            return "#ff0000";
            break;
        case "classical":
            return "#0000ff";
            break;
        case "lofichill":
            return "#00ff00";
            break;
        default:
            return "#FF0000";
    };
  })
  .on('mouseover', function (d, i) {
    d3.select(this).transition()
          .duration('100')
          .attr("r", 10);
    label_div.html("("+d.tempo+","+d.avg_loudness+")")
    .style("left", (d3.event.pageX ) + "px")
      .style("top", (d3.event.pageY-100) + "px");
    label_div.transition()
          .duration(100)
          .style("opacity", 1);
    })  
  .on('mouseout', function (d, i) {
      d3.select(this).transition()
            .duration('200')
            .attr("r", 5);
        label_div.transition()
            .duration('200')
            .style("opacity", 0);
    });

})
