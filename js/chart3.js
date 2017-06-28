var margin = {top: 80, right: 40, bottom: 30, left: 40},
width = 1000 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Parse the date / time
// var parseDate = d3.time.format("%Y").parse;

// Set the ranges
// Change
var x3 = d3.scale.ordinal().rangeRoundBands([0, width], .3);
var y3 = d3.scale.linear().range([height, 0]).nice();

// Define the axes
var xAxis3 = d3.svg.axis()
.scale(x3)
.orient("bottom");
// .tickFormat(d3.time.format("%Y"));

var yAxis3 = d3.svg.axis()
.scale(y3)
.orient("left")
.tickFormat(function(d) {return '$' + d;});


// Adds the svg canvas
var svg3 = d3.select("#area3")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("best_weekends.csv", function(error, data) {

    data.forEach(function(d) {
        d.title = d.title;
        d.opening_gross = +d.opening_gross;
    });

    // Scale the range of the data
    x3.domain(data.map(function(d) { return d.title; }));
    y3.domain([0, d3.max(data, function(d) { return d.opening_gross; })]);

    // Add the X Axis
    svg3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis3)
    .style("font-size", "10px")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

    // Add the Y Axis
    svg3.append("g")
    .attr("class", "y axis")
    .call(yAxis3)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Opening Gross (in millions)");

    svg3.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .style("fill", "steelblue")
    .attr("x", function(d) { return x3(d.title); })
    .attr("width", x3.rangeBand())
    .attr("y", function(d) { return y3(d.opening_gross); }) 
    .attr("height", function(d) { return height - y3(d.opening_gross); });

    // Chart Title
    svg3.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("The 10 Best Opening Weekends");

     // text label for the x axis
     svg3.append("text")
     .attr("x", width / 2 )
     .attr("y", height + (margin.bottom))
     .style("text-anchor", "middle")
     .style();
     
     // // text label for the y axis
     // svg3.append("text")
     // .attr("transform", "rotate(-90)")
     // .attr("y", 0 - margin.left)
     // .attr("x",0 - (height / 2))
     // .attr("dy", "1em")
     // .style("text-anchor", "middle")
     // .text("Opening Gross (in Millions)");

     // sets the text
     var yTextPadding = 10;
     svg3.selectAll(".bartext")
     .data(data)
     .enter()
     .append("text")
     .attr("class", "bartext")
     .attr("text-anchor", "middle")
     .attr("fill", "white")
     .attr("x", function(d) {
        return x3(d.title) + x3.rangeBand()/2;
    })
     .attr("y", function(d) {
        return (height - yTextPadding);
    })
     .text(function(d){
        return d.opening_gross;
    });

 });