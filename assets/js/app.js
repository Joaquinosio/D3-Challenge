// @TODO: YOUR CODE HERE!

// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60}
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    //Read the data
    d3.csv("assets/data/data.csv").then(function(data) {
    
        // Add X axis
        var xLinearScale = d3.scaleLinear()
            .domain([30,
                d3.max(data, d => d.age * 1.2) 
            ])
            .range([0, width]);

        // svg.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     // .call(d3.axisBottom(xLinearScale));
        
        // Add Y axis
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.healthcare)]) 
            .range([height, 0]);

        // svg.append("g")
        //     .call(d3.axisLeft(yLinearScale));
        
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // append x axis
        var xAxis = svg.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
        
        // append y axis
        svg.append("g")
            .call(leftAxis);

        // Add dots
        svg
            .selectAll("g circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function (d) { return xLinearScale(d.age); } )
                .attr("cy", function (d) { return yLinearScale(d.healthcare); } )
                .attr("r", 10)
                .style("fill", "#69b3a2")
})
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);
