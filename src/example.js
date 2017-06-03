"use strict" // Example usage of LineChart
$(function() {

    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var myChart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Biodiversity", "Bangladesh"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1950), formatDate(2000)])
            .colorScale(["Blue", "Brown"])

        var chartWrapper = d3.select("#vis")
                        .datum(data)
                        .call(myChart);
    })
})
