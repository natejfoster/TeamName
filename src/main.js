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
     /* ********************************** Data prep  ********************************** */
    $('#TechnologyButton').click(changeChartFilter);

    function changeChartFilter(event, element){
            console.log(event);
            console.log("HI");
            d3.csv('data/ngramClassification.csv', function(error, data2) {
            console.log(data);
            data = data2
            console.log(data);
            console.log(data[0]['Type']);
            var nested_data = d3.nest().key(function(d) { return d.Type; })
            .entries(data);
            console.log(nested_data);
            return nested_data;
        });
    };
       
    
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

        $('#vis').lockLocation(720, 3400);

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
                case 4:
                    var fillColor = 'green';
                    break;
                case 5:
                    var fillColor = 'purple';
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

        // Select all steps
        scroll(d3.selectAll('.step'));

        // Add the update function to all steps
        scroll.on('active', function(index) {
            update(index);
        })
});
