// $(document).ready(function() {






// 	// Get context with jQuery - using jQuery's .get() method.
// // var ctx = $("#myChart").get(0).getContext("2d");
// // var myDoughnutChart = new Chart(ctx).Doughnut(data,{
// //     animateScale: true
// // });

// // $("#slider").roundSlider();
// // This will get the first returned node in the jQuery collection.
// });
function makeMiniWeight(canvas, weight) {
    
    var data = [
        {
            value: weight,
            color:"#FFB300",
            highlight: "#25D463",
        },
        {
            value: 1-weight,
            color: "transparent",
            highlight: "transparent",
        },
    ]
    var options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : false,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,
        
        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,
    }
    var myDoughnutChart = new Chart(canvas.get(0).getContext("2d")).Doughnut(data,options);
    return myDoughnutChart;
}

function updateWeight(chart, weight) {
    chart.segments[0].value = weight;
    chart.segments[1].value = 1-weight;
    chart.update();
}
function showWeightAdjuster(revIndex) {
    var index = attributes.length - revIndex - 1;
    var weight = attributes[index].weight;
    var options = {
        max: 1,
        step: .01,
        width: 22,
        radius: 85,
        value: weight,
        startAngle: 90,
        sliderType: "min-range",
        handleSize: "+5",
        showTooltip: false,
    };
    $('#weight-adjuster-content').roundSlider(options);
}
$('#weight-adjuster-modal').on('hidden.bs.modal', function (e) {
  // do something...
})

function generateGraph(results) {
    google.load("visualization", "1", { packages:["corechart"], callback:drawChart });
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable(results);

        var options = {
          title: $("#title-input").val(),
          titleTextStyle: { color: '#FFC233' /* yellow */ },
          vAxis: {title: 'Accumulated Score',
                  titleTextStyle: {
                        color: '#ACA7DC' //purple
                    },
                  textStyle: {
                        color: '#ACA7DC' //purple
                    },
                  gridlines: {
                        color: "transparent",
                        count: -1
                  }
                },
          hAxis: {textStyle: {
                    color: '#FFC233' //yellow
                    }
                },
          legend: { position: 'bottom',
                    textStyle: {
                       color: '#ACA7DC' //purple
                    }
                 },
          tooltip: {textStyle: {color: '#4F46AF' }},//dark purple
          isStacked: true,
          backgroundColor: {fill: "transparent"},
          backgroundColor: "transparent",
          areaOpacity: .7,
          // fontName: ,
          colors: ["#25D463", "#188B40", "#86EAA9", "#827CCB", "#ACA7DC", "#5950B9"],
          animation: {duration: 1500,
                        startup: true,
                        easing: "out"
                    }
        };

        var chart = new google.visualization.SteppedAreaChart(document.getElementById("results-container"));

        chart.draw(data, options);
    }
}