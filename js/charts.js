// $(document).ready(function() {



// 	var data = [
//     {
//         value: 300,
//         color:"#F7464A",
//         highlight: "#FF5A5E",
//         label: "Red"
//     },
//     {
//         value: 50,
//         color: "#46BFBD",
//         highlight: "#5AD3D1",
//         label: "Green"
//     },
//     {
//         value: 100,
//         color: "#FDB45C",
//         highlight: "#FFC870",
//         label: "Yellow"
//     }
// ]


// 	// Get context with jQuery - using jQuery's .get() method.
// // var ctx = $("#myChart").get(0).getContext("2d");
// // var myDoughnutChart = new Chart(ctx).Doughnut(data,{
// //     animateScale: true
// // });

// // $("#slider").roundSlider();
// // This will get the first returned node in the jQuery collection.
// });


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