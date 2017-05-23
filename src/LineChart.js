"use strict"
/* When data is input, the data must be formatted using d3.timeParse
ex: 
        var formatDate = d3.timeParse("%Y$m$d");
        var myChart = LineChart()
            .xValue(function(d) { return formatDate(d.date); })
            .yValue(function(d) { return [+d["New York"], +d["San Francisco"]]; })
            At current time only one yValue can be accepted, multiple will not work
*/
var LineChart = function () {
    // Set default values
    var margin = {
        top: 50,
        right: 120,
        bottom: 60,
        left: 80
    };

    var width = 900;
    var height = 560;
    var xScale = d3.scaleTime().rangeRound([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale)
    var xValue = function (d) { return d[0] } // Values by default are set to first two values in array
    var yValue = function (d) { return d[1] }
    var color = "#228b22" // This one is more arbitrary than the other defaults: I just like dark green
    var line = d3.line().x(X).y(Y)  // Alternatively you can think of it as being dark green to represent money since many line charts plot time vs money
    var lineWidth = 1.5
    var title = "Chart Title"
    var xAxisTitle = "X Axis"
    var yAxisTitle = "Y Axis"
    var drawWidth = width - margin.left - margin.right;
    var drawHeight = height - margin.top - margin.bottom;

    function myChart(selection) {
        selection.each(function (data) {
            // Convert data
            data = data.map(function (d, i) { // Maps every x,y pair into an array
                return [xValue.call(data, d, i), yValue.call(data, d, i)];
            });

            // Update the x-scale.
            xScale.domain(d3.extent(data, function (d) { return d[0]; }))
                .rangeRound([0, drawWidth]);

            // Update the y-scale.
            yScale.domain([d3.min(data, function (d) { return d[1] * 0.9 }), d3.max(data, function (d) { return d[1] * 1.1; })]) // Makes sure graph is always scaled to minimum and maximums of the graph
                .range([drawHeight, 0])

            // Creating SVG and G elements, renders in whatever element the chart is called in
            var svg = d3.select(this).selectAll("svg").data([data]).enter().append("svg")
            // Create chart elements
            var gEnter = svg.append("g");
            gEnter.append("path").attr("class", "line");
            gEnter.append("g").attr("class", "x axis");
            gEnter.append("g").attr("class", "y axis");

            gEnter.append("text").attr("class", "title")
                .attr("transform", "translate(" + width / 3 + ", -20)")
                .style("text-anchor", "middle")
                .text(title)

            gEnter.append("text").attr("class", "title")
                .attr("transform", "translate(" + width / 3 + "," + (height - margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text(xAxisTitle)

            gEnter.append("text").attr("class", "title")
                .attr("transform", "rotate(-90) translate(" + -(height / 3) + ", -40)")
                .style("text-anchor", "middle")
                .text(yAxisTitle)

            // Get hover data by using the bisector function to find the y values

            var overlay = gEnter.append('rect') // UNFINISHED, WILL THROW ERRORS WHENEVER YOU MOUSE OVER CHART
                .attr("class", "overlay")
                .attr('width', drawWidth)
                .attr('height', drawHeight);

            function drawHovers(date) {
                var bisector = d3.bisector(function(d, x) {
                    return d[0] - x
                }).left

           //     var dat = new Array; // New array because previously I realized if I reused selectedData everything would be messed up
                data.sort(function (a, b) { // Sort by date
                    return a[0] - b[0]
                })
                var dat = [data[bisector(data, date)]]

                // Do a data-join (enter, update, exit) to draw circles
                var circles = g.selectAll(".hoverCircle").data(dat)
                circles.enter()
                        .append("circle")
                        .attr("class", "hoverCircle")
                        .attr("r", 10)
                        .attr("cx", function(d){return xScale(d[0])})
                        .attr("cy", function(d){return yScale(d[1])})
                
                circles.attr("cx", function(d){return xScale(d[0])}) // Necessary for updates, same with text below
                        .attr("cy", function(d){return yScale(d[1])})

                circles.exit().remove()

                // Do a data-join (enter, update, exit) draw text
                var text = g.selectAll(".hoverText").data(dat)

                text.enter() 
                        .append("text")
                        .attr("class", "hoverText")
                        .attr("x", function(d){return xScale(d[0]) + 10})
                        .attr("y", function(d){return yScale(d[1]) -5})
                        .text(function(d){return "Word Usage: " + d[1] + " Per Million in " + d[0].getFullYear()})
            
                text.attr("x", function(d){return xScale(d[0]) + 10})
                        .attr("y", function(d){return yScale(d[1]) -5})
                        .text(function(d){return "Word Usage: " + d[1] + " Per Million in " + d[0].getFullYear()})

                text.exit().remove()
            }

            var overlay = gEnter.append('rect') // UNFINISHED, WILL THROW ERRORS WHENEVER YOU MOUSE OVER CHART
                .attr("class", "overlay")
                .attr('width', drawWidth)
                .attr('height', drawHeight);

            overlay.on("mousemove", function () { // http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774 STILL UNFINISHED
                var date = xScale.invert(d3.mouse(this)[0])
                drawHovers(date)
            })

            overlay.on("mouseout", function () { //http://stackoverflow.com/questions/16260285/d3-removing-elements
                d3.selectAll(".hoverCircle").remove()
                d3.selectAll(".hoverText").remove()
            })

            // Update the outer dimensions.
            svg.attr("width", width)
                .attr("height", height)

            // Update the inner dimensions.
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            // Update the line path.
            g.select(".line")
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", lineWidth)
                .attr("d", line)

            // Update the x-axis.
            g.select(".x.axis")
                .attr("transform", "translate(0," + yScale.range()[0] + ")")
                .call(xAxis)

            // Update the y-axis.
            g.select(".y.axis")
                .call(yAxis)
        })
    }

    // Getter/Setters
    myChart.margin = function (value) { // Ensure to set margins for top, left, right, and bottom, or graph will look messed up
        if (!arguments.length) {
            return margin;
        }
        margin = value; // Whenever margins, width, or height are updated, drawWidth and drawHeight must also be updated
        drawWidth = width - margin.left - margin.right;
        drawHeight = height - margin.top - margin.bottom;
        return myChart;
    }

    myChart.width = function (value) {
        if (!arguments.length) {
            return width;
        }
        width = value;
        drawWidth = width - margin.left - margin.right;
        return myChart;
    };

    myChart.height = function (value) {
        if (!arguments.length) {
            return height;
        }
        height = value;
        drawHeight = height - margin.top - margin.bottom;

        return myChart;
    };

    myChart.color = function (value) {
        if (!arguments.length) {
            return color;
        }
        color = value;
        return myChart;
    }

    myChart.lineWidth = function (value) {
        if (!arguments.length) {
            return lineWidth;
        }
        lineWidth = value;
        return myChart
    }

    myChart.title = function (value) {
        if (!arguments.length) {
            return title;
        }
        title = value;
        return myChart;
    }

    myChart.xAxisTitle = function (value) {
        if (!arguments.length) {
            return xAxisTitle;
        }
        xAxisTitle = value;
        return myChart;
    }

    myChart.yAxisTitle = function (value) {
        if (!arguments.length) {
            return yAxisTitle;
        }
        yAxisTitle = value;
        return myChart;
    }

    // Specifies the xValue and yValue respectively to set to
    myChart.xValue = function (value) {
        if (!arguments.length) return xValue;
        xValue = value;
        return myChart;
    };

    myChart.yValue = function (value) {
        if (!arguments.length) return yValue;
        yValue = value;
        return myChart;
    };

    // The x-accessor for the path generator; xScale * xValue.
    function X(d) {
        return xScale(d[0]);
    }

    // The y-accessor for the path generator; yScale * yValue.
    function Y(d) {
        return yScale(d[1]);
    }

    return myChart;
};