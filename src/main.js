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

$(function() {
    // Initialize charting tool
    var myChart = BarChart().xVar('name')
        .yVar('value')
        .xAxisLabel('Bar')
        .yAxisLabel('Arbitrary Value')
        .width(500)
        .height(250);

    // Build chart
    var chart = d3.select('#vis')
        .datum(data)
        .call(myChart);

    $('#vis').lockLocation(720, 2950);

    var update = function(index) {
        switch (index) {
            case 0:
                var fillColor = 'blue';
                break;
            case 1:
                var fillColor = 'red';
                break;
            case 2:
                var fillColor = 'orange';
                break;
            case 3:
                var fillColor = 'black';
                break;
            default:
                var fillColor = 'black';
                break;
        }
        myChart.fillColor(fillColor);
        chart.datum(data).call(myChart);
    };
    // Create scroller
    var scroll = scroller()
        .container(d3.select('#graphic'));

    // Pass in a selection of all elements that you wish to fire a step event:
    scroll(d3.selectAll('.step')); // each section with class `step` is a new step

    // Specify the function you wish to activate when a section becomes active
    scroll.on('active', function(index) {
        update(index);
    })
});
