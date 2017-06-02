"use strict" // Example usage of LineChart
$(function() {

    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var myChart = LineChart()
            .xValue(function(d) {
                formatDate(+d.year)
            })
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .color("#AAA")
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Biodiversity", "Bangladesh"])
            .textFunction(function(d) {return d.value})

        var chartWrapper = d3.select("#vis")
                        .datum(data)
                        .call(myChart);
    })
})
