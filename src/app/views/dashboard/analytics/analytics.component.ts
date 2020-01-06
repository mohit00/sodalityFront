import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from 'tinycolor2';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';
import HC_solidgauge from 'highcharts/modules/solid-gauge';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
HC_more(Highcharts);
HC_solidgauge(Highcharts);

highcharts3D(Highcharts);

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  animations: egretAnimations
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;

  sessionOptions: any;
  sessions: any;
  sessionsData: any;

  trafficGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];

  constructor(
    private themeService: ThemeService
  ) {}

  highcharts = Highcharts;
  chartOptions = {   
   chart: {
     type: 'pie',
     options3d: {
         enabled: true,
         alpha: 45
     }
 },
 title: {
   text: ''
 },
 subtitle: {
     text: ''
 },
 plotOptions: {
     pie: {
         innerSize: 100,
         depth: 45
     }
 },
 series: [{
     name: 'Load',
     dataLabels: {
       enabled: false
     },
     data: [
         ['Tower 1', 8],
         ['Tower 2', 3],
         ['Tower 3', 1],
         ['Tower 4', 6],
         ['Tower 5', 8],
         ['Tower 6', 4],
      ]
   }]
  };

  barchartOptions = {      
   chart: {
      type: 'column',
      options3d: {
         enabled: true,
         alpha: 7,
         beta: 18,
         depth: 70
      }
   },         
   title : {
      text: ''   
   },
   yAxis: {
     title: {
         text: null
     }
   },
   series : [{
     name: 'Water level',
      data: [['T-1',29.9],
             ['T-2',71.5],
             ['T-3',106.4],
             ['T-4',129.2],
             ['T-4',144.0], 
             ['T-4',176.0], 
             ['T-4', 135.6], 
             ['T-4',148.5]], 
    }]
};

linechartOptions = {   
  chart: {
     type: "spline"
  },
  title: {
     text: ""
  },
  subtitle: {
     text: ""
  },
  xAxis:{
     categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  yAxis: {          
     title:{
        text:""
     } 
  },
  tooltip: {
     valueSuffix:" "
  },
  series: [{
     name: 'DG',
     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
  },
  {
     name: 'Grid',
     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
  }]
};

gaugeChartOptions = {      
chart: {
  type: 'gauge',
  plotBackgroundColor: null,
  plotBackgroundImage: null,
  plotBorderWidth: 0,
  plotShadow: false
},

title: {
  text: ''
},

pane: {
  startAngle: -150,
  endAngle: 150,
  background: [{
      backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
              [0, '#FFF'],
              [1, '#333']
          ]
      },
      borderWidth: 0,
      outerRadius: '109%'
  }, {
      backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
              [0, '#333'],
              [1, '#FFF']
          ]
      },
      borderWidth: 1,
      outerRadius: '107%'
  }, {
      // default background
  }, {
      backgroundColor: '#DDD',
      borderWidth: 0,
      outerRadius: '105%',
      innerRadius: '103%'
  }]
},

// the value axis
yAxis: {
  min: 0,
  max: 200,

  minorTickInterval: 'auto',
  minorTickWidth: 1,
  minorTickLength: 10,
  minorTickPosition: 'inside',
  minorTickColor: '#666',

  tickPixelInterval: 30,
  tickWidth: 2,
  tickPosition: 'inside',
  tickLength: 10,
  tickColor: '#666',
  labels: {
      step: 2,
      rotation: 'auto'
  },
  title: {
      text: 'km/h'
  },
  plotBands: [{
      from: 0,
      to: 120,
      color: '#55BF3B' // green
  }, {
      from: 120,
      to: 160,
      color: '#DDDF0D' // yellow
  }, {
      from: 160,
      to: 200,
      color: '#DF5353' // red
  }]
},

series: [{
  name: 'Speed',
  data: [80],
  tooltip: {
      valueSuffix: ' km/h'
  }
}]
};

solidgaugechartOptions = {      
  chart: {
    type: 'solidgauge',
    height: '110%',
},

title: {
    text: '',
    style: {
        fontSize: '24px'
    }
},
tooltip: {
  borderWidth: 0,
  backgroundColor: 'none',
  shadow: false,
  style: {
      fontSize: '16px'
  },
  valueSuffix: '%',
  pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
  positioner: function (labelWidth) {
      return {
          x: (this.chart.chartWidth - labelWidth) / 2,
          y: (this.chart.plotHeight / 2) + 15
      };
  }
},

pane: {
  startAngle: 0,
  endAngle: 360,
  background: [{ // Track for Move
      outerRadius: '112%',
      innerRadius: '88%',
      backgroundColor: new Highcharts.Color(Highcharts.getOptions().colors[0])
          .setOpacity(0.3)
          .get(),
      borderWidth: 0
  }, { // Track for Exercise
      outerRadius: '87%',
      innerRadius: '63%',
      backgroundColor: new Highcharts.Color(Highcharts.getOptions().colors[1])
          .setOpacity(0.3)
          .get(),
      borderWidth: 0
  }, { // Track for Stand
      outerRadius: '62%',
      innerRadius: '38%',
      backgroundColor: new Highcharts.Color(Highcharts.getOptions().colors[2])
          .setOpacity(0.3)
          .get(),
      borderWidth: 0
  }]
},

yAxis: {
  min: 0,
  max: 100,
  lineWidth: 0,
  tickPositions: []
},

plotOptions: {
  solidgauge: {
      dataLabels: {
          enabled: false
      },
      linecap: 'round',
      stickyTracking: false,
      rounded: true
  }
},

series: [{
  name: 'Move',
  data: [{
      color: Highcharts.getOptions().colors[0],
      radius: '112%',
      innerRadius: '88%',
      y: 80
  }]
}, {
  name: 'Exercise',
  data: [{
      color: Highcharts.getOptions().colors[1],
      radius: '87%',
      innerRadius: '63%',
      y: 65
  }]
}, {
  name: 'Stand',
  data: [{
      color: Highcharts.getOptions().colors[2],
      radius: '62%',
      innerRadius: '38%',
      y: 50
  }]
}]
};

doughnutChartOptions = {      
chart: {
  renderTo: 'container',
  type: 'pie'
},
title: {
  text: ''
},
yAxis: {
  title: {
      text: ''
  }
},
plotOptions: {
  pie: {
      shadow: false
  }
},
/*tooltip: {
  formatter: function() {
      return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
  }
},*/
series: [{
  name: 'AMR',
  data: [["Gateway",6],["DIC",4],["Meter",7]],
  size: '60%',
  innerSize: '70%',
  showInLegend:false,
  dataLabels: {
      enabled: false
  }
}]
};


doughnutChartColors1: any[] = [{
  backgroundColor: ['#44ad3e', '#49c7f5',]
}];
  doughnutChartColors2: any[] = [{
  backgroundColor: ['#44ad3e', '#49c7f5',]
}];
total1: number = 500;
data1: number = 200;
doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

total2: number = 600;
data2: number = 400;
doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];
doughnutLabels = ['Activated', 'Connected']
doughnutChartType = 'doughnut';
doughnutOptions: any = {
  cutoutPercentage: 85,
  responsive: true,
  legend: {
    display: false,
    position: 'bottom'
  },
  elements: {
    arc: {
      borderWidth: 0,
    }
  },
  tooltips: {
    enabled: true
  }
};


  ngAfterViewInit() {}
  ngOnInit() {
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initTrafficVsSaleChart(activeTheme);
      this.initSessionsChart(activeTheme);
      this.initTrafficSourcesChart(activeTheme)
      this.initDailyTrafficChartBar(activeTheme)
      this.initTrafficGrowthChart(activeTheme)

    });
    this.initTrafficVsSaleChart(this.themeService.activatedTheme);
    this.initSessionsChart(this.themeService.activatedTheme);
    this.initTrafficSourcesChart(this.themeService.activatedTheme)
    this.initDailyTrafficChartBar(this.themeService.activatedTheme)
    this.initTrafficGrowthChart(this.themeService.activatedTheme)

    this.countryTrafficStats = [
      {
        country: "Basement Light 1",
        Status: "Y"
      },
      {
        country: "Basement Light 2",
        Status: "N"
      },
      {
        country: "Lobby Light 1",
        Status: "Y"
      },
      {
        country: "Lobby Light 2",
        Status: "Y"
      },
      {
        country: "Lobby Light 3",
        Status: "N"
      },
      {
        country: "Main Gate 1",
        Status: "N"
      },
      {
        country: "Main Gate 1",
        Status: "Y"
      }
    ];

    
    this.bounceRateGrowthChart = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["0", "1", "2", "3", "4"],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Bounce Rate",
          type: "line",
          smooth: false,
          data: [0, 20, 90, 120, 190],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(244, 67, 54, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(244, 67, 54, .4)"
                  }
                ]
              }
            }
          }
        }
      ]
    };
  }

  initTrafficVsSaleChart(theme) {
    this.trafficVsSaleOptions = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "80px",
        right: "30px",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15"
        ],
        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },

        axisLine: {
          show: false,
          lineStyle: {
            show: false
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          name: "Traffic",
          label: { show: false, color: "#0168c1" },
          type: "bar",
          barGap: 0,
          color: tinyColor(theme.baseColor).setAlpha(.4).toString(),
          smooth: true
        },
        {
          name: "Sales",
          label: { show: false, color: "#639" },
          type: "bar",
          color: tinyColor(theme.baseColor).toString(),
          smooth: true
        }
      ]
    };
    
    this.trafficData = [
      1400,
      1350,
      950,
      1150,
      950,
      1260,
      930,
      1450,
      1150,
      1400,
      1350,
      950,
      1150,
      950,
      1260
    ];
    this.saleData = [
      500,
      700,
      350,
      840,
      750,
      800,
      700,
      500,
      700,
      650,
      104,
      750,
      800,
      700,
      500
    ];
    this.trafficVsSale = {
      series: [
        {
          data: this.trafficData
        },
        {
          data: this.saleData
        }
      ]
    };
  }

  initSessionsChart(theme) {
    this.sessionOptions = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "60",
        right: "15",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ],
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          data: [],
          type: "line",
          name: "User",
          smooth: true,
          color: tinyColor(theme.baseColor).toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: "rgba(16, 23, 76, 1)",
              borderColor: "rgba(16, 23, 76, .4)",
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        }
      ]
    };
    this.sessionsData = [
      140,
      135,
      95,
      115,
      95,
      126,
      93,
      145,
      115,
      140,
      135,
      95,
      115,
      95,
      126,
      125,
      145,
      115,
      140,
      135,
      95,
      115,
      95,
      126,
      93,
      145,
      115,
      140,
      135,
      95
    ];

    this.sessions = {
      series: [
        {
          data: this.sessionsData
        }
      ]
    };
  }

  initTrafficSourcesChart(theme) {
    this.trafficSourcesChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: [
        tinyColor(theme.baseColor).setAlpha(.6).toString(),
        tinyColor(theme.baseColor).setAlpha(.7).toString(),
        tinyColor(theme.baseColor).setAlpha(.8).toString()
      ],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["55%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(15, 21, 77, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 335,
              name: "Direct"
            },
            {
              value: 310,
              name: "Search Eng."
            },
            { value: 148, name: "Social" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  initDailyTrafficChartBar(theme) {
    this.dailyTrafficChartBar = {
      legend: {
        show: false
      },
      grid: {
        left: "8px",
        right: "8px",
        bottom: "0",
        top: "0",
        containLabel: true
      },
      tooltip: {
        show: true,
        backgroundColor: "rgba(0, 0, 0, .8)"
      },
      xAxis: [
        {
          type: "category",
          // data: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          data: ["1", "2", "3", "4", "5", "6", "7"],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false,
            formatter: "${value}"
          },
          min: 0,
          max: 100000,
          interval: 25000,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            interval: "auto"
          }
        }
      ],

      series: [
        {
          name: "Online",
          data: [35000, 69000, 22500, 60000, 50000, 50000, 30000],
          label: { show: true, color: tinyColor(theme.baseColor).toString(), position: "top" },
          type: "bar",
          barWidth: "12",
          color: tinyColor(theme.baseColor).toString(),
          smooth: true,
          itemStyle: {
            barBorderRadius: 10
          }
        }
      ]
    };
  }

  initTrafficGrowthChart(theme) {
    this.trafficGrowthChart = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["0", "1", "2", "3", "4"],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Visit",
          type: "line",
          smooth: false,
          data: [0, 40, 140, 90, 160],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: tinyColor(theme.baseColor).toString()
                  },
                  {
                    offset: 1,
                    color: tinyColor(theme.baseColor).setAlpha(.6).toString()
                  }
                ]
              }
            }
          }
        }
      ]
    };
  }

}
