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
            .colorScale(["Blue", "Brown"])

        var chartWrapper = d3.select("#vis")
                        .datum(data)
                        .call(chart);
        var update = function(index) {
            switch (index) {
                case 0:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'blue';
                    break;
                case 1:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'red';
                    break;
                case 2:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'orange';
                    break;
                case 3:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'black';
                    break;
                case 4:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'green';
                    break;
                case 5:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'purple';
                    break;
                case 6:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'black';
                    break;
                case 7:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'green';
                    break;
                case 8:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'purple';
                    break;
                case 9:
                    console.log("HIHIHIHIHIH")
                    var words = ["War", "Peace"];
                    var fillColor = 'red';
                    break;
                case 10:
                    var words = ["War", "Peace"];
                    var fillColor = 'green';
                    break;
                case 11:
                    var words = ["War", "Peace"];
                    var fillColor = 'red';
                    break;
                case 12:
                    var fillColor = 'orange';
                    break;
                case 13:
                    var fillColor = 'yellow';
                    break;
                case 14:
                    var fillColor = 'purple';
                    break;
                default:
                    var fillColor = 'blue';
                    break;
            }
            chart.words(words);
            // chart.fillColor(fillColor);
            chartWrapper.datum(data).call(chart);

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

    // $('#TechnologyButton').click(changeChartFilter);

    // function changeChartFilter(event, element){
    //         console.log(event);
    //         console.log("HI");
    //         d3.csv('data/ngramClassification.csv', function(error, data2) {
    //         console.log(data2);
    //         console.log(data2);
    //         console.log(data2[0]['Type']);
    //         var nested_data = d3.nest().key(function(d) { return d.Type; })
    //         .entries(data2);
    //         console.log(nested_data);
    //         return nested_data;
    //     });
    // };

        // Initialize charting tool
        var myChart = BarChart().xVar('name')
            .yVar('value')
            .xAxisLabel('Bar')
            .yAxisLabel('Arbitrary Value')
            .width(500)
            .height(250);

    // $("a").on('click', function(event) {
    //   if (this.hash !== "") {
    //     event.preventDefault();
    //     var hash = this.hash;
    //     $('html, body').animate({
    //       scrollTop: $(hash).offset().top
    //     }, 800, function(){
    //       window.location.hash = hash;
    //     });
    //   }
    // });

    // Initialize charting tool
    // var myChart = BarChart().xVar('name')
    //     .yVar('value')
    //     .xAxisLabel('Bar')
    //     .yAxisLabel('Arbitrary Value')
    //     .width(500)
    //     .height(250);


        // Build chart
        // var chart = d3.select('#vis')
        //     .datum(data)
        //     .call(myChart);

    $('#title').css({
      visibility: 'hidden'
    });

    $('#vis').lockLocation(780, 7450);
    $('#title').showTitle();


        // var update = function(index) {
        //     switch (index) {
        //         case 0:
        //             var fillColor = 'blue';
        //             break;
        //         case 1:
        //             var fillColor = 'red';
        //             break;
        //         case 2:
        //             var fillColor = 'orange';
        //             break;
        //         case 3:
        //             var fillColor = 'black';
        //             break;
        //         case 4:
        //             var fillColor = 'green';
        //             break;
        //         case 5:
        //             var fillColor = 'purple';
        //             break;
        //         case 6:
        //             var fillColor = 'black';
        //             break;
        //         case 7:
        //             var fillColor = 'green';
        //             break;
        //         case 8:
        //             var fillColor = 'purple';
        //             break;
        //         case 9:
        //             var fillColor = 'red';
        //             break;
        //         case 10:
        //             var fillColor = 'green';
        //             break;
        //         case 11:
        //             var fillColor = 'red';
        //             break;
        //         case 12:
        //             var fillColor = 'orange';
        //             break;
        //         case 13:
        //             var fillColor = 'yellow';
        //             break;
        //         case 14:
        //             var fillColor = 'purple';
        //             break;
        //         default:
        //             var fillColor = 'blue';
        //             break;
        //     }
        //     myChart.fillColor(fillColor);
        //     chart.datum(data).call(myChart);

        // };
        // // Create scroller
        // var scroll = scroller()
        //     .container(d3.select('#graphic'));

        // // Select all steps
        // scroll(d3.selectAll('.step'));

        // // Add the update function to all steps
        // scroll.on('active', function(index) {
        //     update(index);
        // })
});
