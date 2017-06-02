"use strict"
// TODO: Get multiple lines working (mark code that will 100% have to change to make it work), write out which word is which line, multiple colors for different lines, transitions
// Use TP4 code since data format matches that
var LineChart = function() {
    // Set default values
    var margin = {
        top: 50,
        right: 120,
        bottom: 60,
        left: 80
    };

    var width = 1200; // 900 + 300
    var height = 560;
    var xScale = d3.scaleTime().rangeRound([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    var xValue = function(d) {return d[0]} // Values by default are set to first values in array
    var yValue = function(d) {return d[1]}
    var color = "#228b22" // This one is more arbitrary than the other defaults: I just like dark green
    var line = d3.line() 
                .x(function(d) {return xScale(xValue)})
                .y(function(d) {return yScale(yValue)}) 
    var focusColor = "black" // Colors the vertical "focus line"
    var lineWidth = 1.5
    var title = "Chart Title"
    var xAxisTitle = "X Axis"
    var yAxisTitle = "Y Axis"
    var drawWidth = width - margin.left - margin.right - 300; // Ensures enough space for the text to appear
    var drawHeight = height - margin.top - margin.bottom;
    var words = [] // Words to include within chart, put in as an array
    var textFunction = function(d) {return yValue}

    function myChart(selection) {
        selection.each(function (data) {
            // Filter out data using words
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            var data = data.filter(function(d) {
                for(var i = 0 ; i < words.length; i++) {
                    if(words[i] == d.word) {
                        return true;
                    }
                }
                return false;
            })
            
            // Sort words into buckets. Done after filtering so that it doesn't take a million years to do this
            var dataHolder = []
            for(var i = 0; i < words.length; i++) {
                var wordArray = []
                for(var j = 0; j < data.length; j++) {
                    if(words[i] == data[j].word) {
                        wordArray.push(data[j])
                    }
                }
                dataHolder[i] = wordArray
            }
            data = dataHolder; // For less confusion later

            // Update the x-scale
            xScale.domain(d3.extent(data, function (d) {return xValue(d)}))
                .rangeRound([0, drawWidth]);

            // Update the y-scale
            yScale.domain([d3.min(data, function (d) { return yValue(d) * 0.9}), d3.max(data, function (d) { return yValue(d) * 1.1})]) // Makes sure graph is always scaled to minimum and maximums of the graph
                .range([drawHeight, 0]) // THIS MUST CHANGE: if statement/loop which checks min/max for all lines

            // Creating SVG and G elements, renders in whatever element the chart is called in
            var svg = d3.select(this).selectAll("svg").data([data]).enter().append("svg")
            // Create chart elements
            var gEnter = svg.append("g");
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

            var overlay = gEnter.append('rect')
                .attr("class", "overlay")
                .attr('width', drawWidth)
                .attr('height', drawHeight);

            // Update the outer dimensions.
            svg.attr("width", width)
                .attr("height", height)

            // Update the inner dimensions.
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            // Update the x-axis.
            g.select(".x.axis")
                .attr("transform", "translate(0," + yScale.range()[0] + ")") // Probably needs to change
                .call(xAxis)

            // Update the y-axis.
            g.select(".y.axis")
                .call(yAxis)

            // Update the line path CHECK TO SEE IF THIS WORKS
            var paths = g.selectAll(".path").data(data)
            paths.enter()
                .append("path")
                .attr("class", "path")
                .attr("d", function(d){
                    console.log(d)
                    return line(d)})
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", lineWidth)

            function drawHovers(date) {
                // Get hover data by using the bisector function to find the y values
                var bisector = d3.bisector(function(d, x) {
                    return xValue(d) - x
                }).left

                var dat = []
                for(var i = 0; i < data.length; i++) {
                    data[i].sort(function(a, b) {
                        return xValue(a) - xValue(b)
                    })
                    dat[i] = data[i][bisector(data[i], date)] // Check if this is correct
                }
                data.sort(function (a, b) { // Sort by date CHECK THIS a[0] - b[0]
                    return xValue(a) - xValue(b)
                })
       /*         var dat = [data[bisector(data, date)]]
                var datas = []
                for(var i = 1; i < dat[0].length; i++) {
                    datas[i-1] = {
                        date: dat[0][0],
                        value: dat[0][i]
                    }
                } */

                // Do a data-join (enter, update, exit) to draw circles
                var circles = g.selectAll(".hoverCircle").data(dat)
                circles.enter()
                        .append("circle")
                        .attr("class", "hoverCircle")
                        .attr("r", 10)
                        .attr("cx", function(d){return xScale(xValue(d))})
                        .attr("cy", function(d){return yScale(yValue(d))})
            
                circles.attr("cx", function(d){return xScale(xValue(d))}) // Necessary for updates, same with text below
                        .attr("cy", function(d){return yScale(yValue(d))})

                circles.exit().remove()

                // Do a data-join (enter, update, exit) draw text
                var text = g.selectAll(".hoverText").data(dat)

                text.enter() 
                        .append("text")
                        .attr("class", "hoverText")
                        .attr("x", function(d){return xScale(xValue(d)) + 10})
                        .attr("y", function(d){return yScale(yValue(d)) -5}) // Swap out with textFunction, change example.js
                        .text(function(d){return textFunction(d)})
            
                text.attr("x", function(d){return xScale(xValue(d)) + 10})
                        .attr("y", function(d){return yScale(yValue(d)) -5})
                        .text(function(d){return textFunction(d)})
                text.exit().remove()
                // "Word Usage: " + d.value + " Per Million in " + d.date.getFullYear()

                // http://bl.ocks.org/mikehadlow/93b471e569e31af07cd3 inspiration for focus lines
                var focusLine = g.selectAll(".focusLine").data(dat)

                focusLine.enter()
                    .append("line")
                    .attr("class", "focusLine")
                    .attr("fill", "none")
                    .attr("stroke", focusColor)
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", lineWidth)
                    .attr("x1", function(d) {return xScale(xValue(d))})
                    .attr("y1", 0)
                    .attr("x2", function(d) {return xScale(xValue(d))})
                    .attr("y2", drawHeight)
                
                focusLine.attr("x1", function(d) {return xScale(xValue(d))})
                    .attr("y1", 0)
                    .attr("x2", function(d) {return xScale(xValue(d))})
                    .attr("y2", drawHeight)

                focusLine.exit().remove()
            }

            overlay.on("mousemove", function () { // http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774
                var date = xScale.invert(d3.mouse(this)[0])
                drawHovers(date)
            })

            overlay.on("mouseout", function () { //http://stackoverflow.com/questions/16260285/d3-removing-elements
                d3.selectAll(".hoverCircle").remove()
                d3.selectAll(".hoverText").remove()
                d3.selectAll(".focusLine").remove()
            })
        })
    }

    // Getter/Setters
    myChart.margin = function (value) { // Ensure to set margins for top, left, right, and bottom, or graph will look messed up
        if (!arguments.length) {
            return margin;
        }
        margin = value; // Whenever margins, width, or height are updated, drawWidth and drawHeight must also be updated
        drawWidth = width - margin.left - margin.right - 300;
        drawHeight = height - margin.top - margin.bottom;
        return myChart;
    }

    myChart.width = function (value) {
        if (!arguments.length) {
            return width;
        }
        width = value + 300;
        drawWidth = width - margin.left - margin.right - 300;
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

    myChart.focusColor = function (value) {
        if (!arguments.length) {
            return focusColor;
        }
        focusColor = value;
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
        line.x(function(d) {return xScale(xValue)}); // Check to see if this and line.y are necessary
        return myChart;
    };

    myChart.yValue = function (value) {
        if (!arguments.length) return yValue;
        yValue = value;
        line.y(function(d) {return yScale(yValue)});
        return myChart;
    };

    myChart.words = function(value) { // Must be an array of words that you want to see in chart, else fails
        if (!arguments.length) return words; 
        words = value;
        return myChart;
    }

    myChart.textFunction = function(value) {
        if (!arguments.length) return textFunction; 
        textFunction = value;
        return myChart;
    }

    return myChart;
};