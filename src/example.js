"use strict" // Example usage of LineChart
$(function() {

    d3.tsv("data/data.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        console.log(data);
        var myChart = LineChart()
            .xValue(function(d) {
              console.log(d.date);
              return formatDate(d.date);})
            .yValue(function(d) { return +d["Wall"]; }) // Currently takes in only final one
            .width(1000)
            .height(500)
            .color("#AAA")
            .lineWidth(4)
            .xAxisTitle("Time")
            .yAxisTitle("Word Usage (per Million)")
            .title("Language in Motion (Mock Data)")

        var chartWrapper = d3.select("#vis")
                        .datum(data)
                        .call(myChart);
    })
})
