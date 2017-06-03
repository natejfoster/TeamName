// Main.js
var data = [{
    name: 'Left Bar',
    value: 11
}, {
    name: 'Right Bar',
    value: 34
}];


// Function to lock and unlock the position of the vis based on the passed in
// start and stop values.
$.fn.lockLocation = function(start, stop) {
  $(window).scroll(function(location) {
    if ($(window).scrollTop() < start) {
      $('#vis').css({
        position: 'absolute',
        top: start
      });
    } else if ($(window).scrollTop() > stop) {
      $('#vis').css({
        position: 'absolute',
        top: stop
      });
    } else {
      $('#vis').css({
        position: 'fixed',
        top: '0px'
      })
    }
  })
}

$.fn.showTitle = function() {
  $(window).scroll(function(location) {
    if ($(window).scrollTop() > 200) {
      $('#title').css({
        visibility: 'visible'
      });
    } else if ($(window).scrollTop() <= 200) {
      $('#title').css({
        visibility: 'hidden'
      });
    };
  });
}

$(function() {
     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
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
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green"])

        // var chartWrapper = d3.select("#vis")
                        // .datum(data)
                        // .call(chart);
        var update = function(index) {
            switch (index) {
                case 0:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 1:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 2:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 3:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 4:
                    var colorScale = ["Green", "Red"];
                    var words = ["War", "Peace"];
                    break;
                case 5:
                    var colorScale = ["Green", "Red"];
                    var words = ["War", "Peace"];
                    break;
                case 6:
                    var colorScale = ["Green", "Red"];
                    var words = ["War", "Peace"];
                    break;
                case 7:
                    var colorScale = ["Green", "Red"];
                    var words = ["War", "Peace"];
                    break;
                case 8:
                    var colorScale = ["Green", "Red"];
                    var words = ["War", "Peace"];
                    break;
                case 9:
                    var colorScale = ["Green", "Red"];
                    var words = ["War", "Peace"];
                    break;
                case 10:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 11:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 12:             
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 13:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                case 14:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
                default:
                    var words = ["War", "Peace"];
                    var colorScale = ["Green", "Red"];
                    break;
            }
            chart.words(words);
            chart.colorScale(colorScale);
            // chartWrapper.datum(data).call(chart);
            chart.colorScale(["Blue", "Blue"]);
            // chartWrapper.datum(data).call(chart);
        };
        // Create scroller
        var scroll = scroller()
            .container(d3.select('#graphic'));

        // Select all steps
        scroll(d3.selectAll('.step'));

        // Add the update function to all steps
        scroll.on('active', function(index) {
            update(index);
        })
    })
    
     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Happy", "Angry"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green"])

        var chartWrapper = d3.select("#vis1")
                        .datum(data)
                        .call(chart);
     });

        
     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Fuck", "Shit", "Damn"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis2")
                        .datum(data)
                        .call(chart);
     });

             
     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Ought", "Thee"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis3")
                        .datum(data)
                        .call(chart);
     });

    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Russia", "USSR"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Red"])

        var chartWrapper = d3.select("#vis4")
                        .datum(data)
                        .call(chart);
     });

   

    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Automobile"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green"])

        var chartWrapper = d3.select("#vis5")
                        .datum(data)
                        .call(chart);
     });
    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Aviators", "Biplane", "Taxi"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis6")
                        .datum(data)
                        .call(chart);
     });
    
    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Automotive", "Broadcasting", "Airscrew"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis7")
                        .datum(data)
                        .call(chart);
     });

    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Broadcasts"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis8")
                        .datum(data)
                        .call(chart);
     });

     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Jeeps", "Radar"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis9")
                        .datum(data)
                        .call(chart);
     });


     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Transistors", "Radar"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis10")
                        .datum(data)
                        .call(chart);
     });

    d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Astronaut", "Aerospace", "Software"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis11")
                        .datum(data)
                        .call(chart);
     });

     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Microprocessor"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1961), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis12")
                        .datum(data)
                        .call(chart);
     });

     d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Microsoft", "Robotics"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1980), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange"])

        var chartWrapper = d3.select("#vis13")
                        .datum(data)
                        .call(chart);
     });
        d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["Netscape", "Cyberspace", "HTML", "URL", "HTTP"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(1990), formatDate(2000)])
            .colorScale(["Blue", "Green", "Orange", "Purple", "Red", "Brown"])

        var chartWrapper = d3.select("#vis14")
                        .datum(data)
                        .call(chart);
     });
        d3.tsv("data/words.tsv", function(error, data) {
        var formatDate = d3.timeParse("%Y");
        var chart = LineChart()
            .categories(function(d) {return d.word})
            .xValue(function(d) { return formatDate(+d.year)})
            .yValue(function(d) { return +d.occurences})
            .focusColor("steelblue")
            .height(500)
            .lineWidth(4)
            .xAxisTitle("Year")
            .yAxisTitle("Number of Occurences")
            .title("Language in Motion")
            .words(["ITunes", "Google", "Microarrays", "DVDS", "Blogs"])
            .textFunction(function(d) {return d.word + " occurences in " + d.year + ": " + d.occurences})
            .timeRange([formatDate(2000), formatDate(2008)])
            .colorScale(["Blue", "Green", "Orange", "Purple", "Red"])

        var chartWrapper = d3.select("#vis15")
                        .datum(data)
                        .call(chart);
     });
   
    $('#title').css({
      visibility: 'hidden'
    });

    $('#vis').lockLocation(780, 7450);
    $('#title').showTitle();


    
});
