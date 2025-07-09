import { ApexOptions } from "apexcharts";

export const visitorOptions: ApexOptions = {
  series: [44, 55, 41, 17],
  labels: ["The Passersby", "The Occasionals", "The Regulars", "The Superfans"],
  chart: { width: "100%", height: 500, type: "donut" },
  colors: ["#4aa4d9", "#ef3f3e", "#9e65c2", "#6670bd", "#FF9800"],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show : false,
  },
  responsive: [
    {
      breakpoint: 1838,
      options: {
        chart: {
          height: 290,
        },
      },
    },
    {
      breakpoint: 1525,
      options: {
        chart: {
          height: 320,
        },
      },
    },
    {
      breakpoint: 1490,
      options: {
        chart: {
          width: 320,
          offsetX: -20,
        },
      },
    },
    {
      breakpoint: 1410,
      options: {
        chart: {
          width: 300,
          offsetX: -20,
        },
      },
    },
    {
      breakpoint: 1440,
      options: {
        chart: {
          width: 280,
          offsetX: -20,
        },
      },
    },
    {
      breakpoint: 1388,
      options: {
        chart: {
          offsetX: -30,
        },
      },
    },
    {
      breakpoint: 1370,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1330,
      options: {
        chart: {
          height: 250,
        },
      },
    },
    {
      breakpoint: 1255,
      options: {
        chart: {
          height: 200,
          offsetX: -50,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          width: 500,
          height: 290,
          offsetX: 70,
        },
        legend: {
          show : true,
          offsetY: 50,
        },
      },
    },
    {
      breakpoint: 1158,
      options: {
        chart: {
          height: 280,
        },
        legend: {
          offsetY: 10,
        },
      },
    },
    {
      breakpoint: 670,
      options: {
        chart: {
          height: 280,
          offsetX: 20,
        },
        legend: {
          position: "bottom",
          offsetY: 20,
        },
      },
    },
    {
      breakpoint: 598,
      options: {
        chart: {
          height: 280,
          offsetX: -10,
        },

        legend: {
          fontSize: "12px",
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 575,
      options: {
        chart: {
          height: 280,
          offsetX: -10,
        },

        legend: {
          show: false,
        },
      },
    },
    {
      breakpoint: 481,
      options: {
        chart: {
          height: 280,
          offsetX: -30,
        },

        legend: {
          show: false,
        },
      },
    },
    {
      breakpoint: 436,
      options: {
        chart: {
          height: 280,
          offsetX: -60,
        },

        legend: {
          show: false,
        },
      },
    },
    {
      breakpoint: 390,
      options: {
        chart: {
          height: 250,
          offsetX: -100,
        },

        legend: {
          show: false,
        },
      },
    },
    {
      breakpoint: 330,
      options: {
        chart: {
          height: 200,
          offsetX: -130,
        },

        legend: {
          show: false,
        },
      },
    },
  ],
};

 export const barChartOptions:ApexOptions = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      }
    ],
   colors: ["#4aa4d9", "#747dc6", "#ef3f3e"],
   chart: {
     type: "bar",
     height: 300,
   },
   plotOptions: {
     bar: {
       horizontal: false,
       columnWidth: "55%",
     },
   },
   dataLabels: {
     enabled: false,
   },
   stroke: {
     show: true,
     width: 2,
     colors: ["transparent"],
   },
   xaxis: {
     categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
   },
   yaxis: {
     title: {
       text: "$ (thousands)",
     },
   },
   legend: { offsetY: -10 },
   fill: {
     opacity: 1,
   },
   tooltip: {
     y: {
       formatter: function (val) {
         return "$ " + val + " thousands";
       },
     },
   },

   responsive: [
     {
       breakpoint: 1837,
       options: {
         chart: {
           height: 323,
         },
         legend: {
           position: "bottom",
         },
       },
     },
     {
       breakpoint: 1572,
       options: {
         chart: {
           height: 318,
         },
         legend: {
           position: "bottom",
         },
       },
     },
     {
       breakpoint: 1525,
       options: {
         chart: {
           height: 345,
         },
         legend: {
           position: "bottom",
         },
       },
     },
     {
       breakpoint: 1387,
       options: {
         chart: {
           height: 343,
         },
         legend: {
           position: "bottom",
         },
       },
     },
     {
      breakpoint: 1370,
      options: {
        chart: {
          height: 330,
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 1330,
      options: {
        chart: {
          height: 280,
        },
        legend: {
          position: "bottom",
        },
      },
    },
     {
       breakpoint: 1255,
       options: {
         chart: {
           height: 230,
         },
       },
     },
     {
       breakpoint: 650,
       options: {
         chart: {
           height: 250,
         },
       },
     },
     {
       breakpoint: 584,
       options: {
         chart: {
           height: 200,

          offsetX: -10,
        },

         legend: {
           fontSize: "12px",
           position: "bottom",
           offsetX: 5,
           MarginBottom: "5px",
           horizontalAlign: "center",
           markers: {
             width: 10,
             height: 10,
           },
         },

         yaxis: {
           tooltip: {
             enabled: false,
             offsetX: 0,
           },
         },
       },
     },
     {
       breakpoint: 438,
       options: {
         chart: {
           height: 200,
         },
       },
     },
     {
       breakpoint: 371,
       options: {
         chart: {
           height: 200,
           width: "115%",
           offsetX: -25,
         },

         legend: {
           offsetY: -5,
         },
       },
     },
   ],
 };


 export const  trafficOptions:ApexOptions = {
   series: [
     {
       name: "Referral Traffic",
       data: [
         45, 40, 140, 70, 150, 260, 240, 380, 110, 180, 270, 115, 70, 65, 50,
       ],
     },
   ],
   chart: {
     type: "area",
     height: 370,
     stacked: true,
     events: {
       selection: function (chart, e) {
       },
     },
   },
   stroke: {
     show: true,
     curve: "smooth",
     lineCap: "butt",
     colors: undefined,

    dashArray: 0,
  },
  markers: {
    size: 6,
    colors: "#fff",
    strokeColors: "#747dc6",
    strokeWidth: 4,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    offsetX: 0,
    offsetY: 0,
    onClick: undefined,
    onDblClick: undefined,
    showNullDataPoints: true,
    hover: {
      size: undefined,
      sizeOffset: 3,
    },
  },
  colors: ["#747dc6"],
  dataLabels: {
    enabled: false,
  },
  grid: {
    padding: {
      right: 0,
      bottom: 0,
      left: 0,
      top: 0,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.2,
      shade: "light",
      type: "vertical",
     },
   },
   legend: {
     position: "top",
     horizontalAlign: "left",
   },
   xaxis: {
     categories: ["jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","jan","Feb","mar",],
   },
   responsive: [
     {
      breakpoint: 1400,
      options: {
        chart: {
          height: 290,
          width: "100%",
          offsetX: 0,
        },
      },
    },
     {
       breakpoint: 992,
       options: {
         chart: {
           height: 210,
           width: "100%",
           offsetX: 0,
         },
       },
     },
     {
       breakpoint: 578,
       options: {
         chart: {
           height: 200,
           width: "105%",
           offsetX: -20,
           offsetY: 10,
         },
       },
     },
     {
       breakpoint: 430,
       options: {
         chart: {
           width: "108%",
         },
       },
     },
     {
       breakpoint: 330,
       options: {
         chart: {
           width: "112%",
         },
       },
     },
   ],
 };
