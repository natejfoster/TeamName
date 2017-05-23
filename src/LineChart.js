"use strict"
var LineChart = function() {
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
  var xValue = function(d){return d[0]} // Values by default are set to first two values in array
  var yValue = function(d){return d[1]}
  var color = "#228b22" // This one is more arbitrary than the other defaults: I just like dark green
  var line = d3.line().x(X).y(Y)  // Alternatively you can think of it as being dark green to represent money since many line charts plot time vs money
  var lineWidth = 1.5 
  var title = "Chart Title"
  var xAxisTitle = "X Axis"
  var yAxisTitle = "Y Axis"
  var drawWidth = width - margin.left - margin.right;
  var drawHeight = height - margin.top - margin.bottom;

  function myChart(selection) { 
    selection.each(function(data) {
      // Convert data
      data = data.map(function(d, i) { // Maps every x,y pair into an array
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });
      
      // Update the x-scale.
      xScale.domain(d3.extent(data, function(d) { return d[0]; }))
          .rangeRound([0, drawWidth]);

      // Update the y-scale.
      yScale.domain([d3.min(data, function(d) {return 0}), d3.max(data, function(d) { return d[1]; })]) // Makes sure graph is always scaled to minimum and maximums of the graph
          .range([drawHeight, 0])
      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]).enter().append("svg")
      // Create chart elements
      var gEnter = svg.append("g"); // Only occurs if there is an svg that must be appended
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");

      gEnter.append("text").attr("class", "title")
            .attr("transform", "translate(" + width / 3 + ", -20)")
            .style("text-anchor", "middle")
            .text(title)

      gEnter.append("text").attr("class", "title")
            .attr("transform", "translate(" + width / 3 + ","  + (height - margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text(xAxisTitle)

      gEnter.append("text").attr("class", "title")
            .attr("transform", "rotate(-90) translate(" + -(height / 3) + ", -40)")
            .style("text-anchor", "middle")
            .text(yAxisTitle)

      var overlay = gEnter.append('rect') // UNFINISHED, WILL THROW ERRORS
            .attr("class", "overlay")
            .attr('width', drawWidth)
            .attr('height', drawHeight);

      overlay.on("mousemove", function() { // http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774 STILL UNFINISHED
             var year = xScale.invert(d3.mouse(this)[0])
             drawHovers(year)
      })

      overlay.on("mouseout", function() { //http://stackoverflow.com/questions/16260285/d3-removing-elements
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
  myChart.margin = function(value) {
    if(!arguments.length) {
      return margin;
    }
    margin = value;
    return myChart;
  }

  myChart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    drawWidth = width - margin.left - margin.right;
    return myChart;
  };

  myChart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    drawHeight = height - margin.top - margin.bottom;
    return myChart;
  };

  myChart.color = function(value) {
    if(!arguments.length) {
      return color;
    }
    color = value;
    return myChart;
  }

  myChart.lineWidth = function(value) {
    if(!arguments.length) {
      return lineWidth;
    }
    lineWidth = value;
    return myChart
  }

  myChart.title = function(value) {
    if(!arguments.length) {
      return title;
    }
    title = value;
    return myChart;
  }

  myChart.xAxisTitle = function(value) {
    if(!arguments.length) {
      return xAxisTitle;
    }
    xAxisTitle = value;
    return myChart;
  }

  myChart.yAxisTitle = function(value) {
    if(!arguments.length) {
      return yAxisTitle;
    }
    yAxisTitle = value;
    return myChart;
  }

// Specifies the xValue and yValue respectively to set to, if not just arr[0] and arr[1]
  myChart.xValue = function(value) {
    if (!arguments.length) return xValue;
    xValue = value;
    return myChart;
  };

  myChart.yValue = function(value) {
    if (!arguments.length) return yValue;
    yValue = value;
    return myChart;
  };

  // The x-accessor for the path generator; xScale * xValue.
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for the path generator; yScale * yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  return myChart;
};