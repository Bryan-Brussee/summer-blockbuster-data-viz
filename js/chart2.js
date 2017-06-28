// Set the dimensions of the canvas / graph

var margin = {top: 80, right: 40, bottom: 30, left: 40},
width = 1000 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y").parse;

// Set the ranges
var x2 = d3.time.scale().range([0, width]);
var y2 = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis2 = d3.svg.axis().scale(x2)
.orient("bottom").ticks(5);

var yAxis2 = d3.svg.axis().scale(y2)
.orient("left")
.tickFormat(function(d) {return '$' + d;});

// Define the line
var valueline = d3.svg.line()
.x(function(d) { return x2(d.year); })
.y(function(d) { return y2(d.opening_gross); });

// Adds the svg canvas
var chart2 = d3.select("#area2")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("best_movies.csv", function(error, data) {
    data.forEach(function(d) {
        d.year = parseDate(d.year);
        d.opening_gross = +d.opening_gross;
    });

    // Scale the range of the data
    x2.domain(d3.extent(data, function(d) { return d.year; }));
    y2.domain([0, d3.max(data, function(d) { return d.opening_gross; })]).nice();

    // Add the valueline path.
    chart2.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

    // Add the X Axis
    chart2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis2)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Year");

    // Add the Y Axis
    chart2.append("g")
    .attr("class", "y axis")
    .call(yAxis2)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Opening Gross (in millions)");

});