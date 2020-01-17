import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ThemeService } from 'app/shared/services/theme.service';
import tinyColor from 'tinycolor2';
import { NavigationService } from 'app/shared/services/navigation.service';
import * as Highcharts from 'highcharts';
 import HC_solidgauge from 'highcharts/modules/solid-gauge';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

HC_exporting(Highcharts);
HC_more(Highcharts);
HC_solidgauge(Highcharts);
@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss'],
  animations: egretAnimations
})
export class GroupDashboardComponent implements OnInit {

  lineChartSteppedData: Array <any> = [{
    data: [1, 8, 4, 8, 2, 2, 9],
    label: 'Order',
    borderWidth: 0,
    fill: true,
    // steppedLine: true
  }, {
    data: [6, 2, 9, 3, 8, 2, 1],
    label: 'New client',
    borderWidth: 1,
    fill: true,
    // steppedLine: true
  }];
  public lineChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'];
  /*
  * Full width Chart Options
  */
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  };

  public lineChartColors: Array<any> = [];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  

  // Chart grid options
  doughnutChartColors1: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)',]
  }];
    doughnutChartColors2: any[] = [{
    backgroundColor: ['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .15)',]
  }];
  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 600;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];
  doughnutLabels = ['Spent', 'Remaining']
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

  photos = [{
    name: 'Photo 1',
    url: 'assets/images/sq-15.jpg'
  }, {
    name: 'Photo 2',
    url: 'assets/images/sq-8.jpg'
  }, {
    name: 'Photo 3',
    url: 'assets/images/sq-9.jpg'
  }, {
    name: 'Photo 4',
    url: 'assets/images/sq-10.jpg'
  }, {
    name: 'Photo 5',
    url: 'assets/images/sq-11.jpg'
  }, {
    name: 'Photo 6',
    url: 'assets/images/sq-12.jpg'
  }]
  tickets = [{
    img: 'assets/images/face-1.jpg',
    name: 'Mike Dake',
    text: 'Excerpt pipe is used.',
    date: new Date('07/12/2017'),
    isOpen: true
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Doe',
    text: 'My dashboard is not working.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-3.jpg',
    name: 'Jhonson lee',
    text: 'Fix stock issue',
    date: new Date('04/10/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-4.jpg',
    name: 'Mikie Jyni',
    text: 'Renew my subscription.',
    date: new Date('07/7/2017'),
    isOpen: false
  }]
  // users
  users = [
    {
      "name": "Snow Benton",
      "membership": "Paid Member",
      "phone": "+1 (956) 486-2327",
      "photo": "assets/images/face-4.jpg",
      "address": "329 Dictum Court, Minnesota",
      "registered": "2016-07-09"
    },
    {
      "name": "Kay Sellers",
      "membership": "Paid Member",
      "phone": "+1 (929) 406-3172",
      "photo": "assets/images/face-2.jpg",
      "address": "893 Garden Place, American Samoa",
      "registered": "2017-02-16"
    }
  ]
  projects = [{
    name: 'User Story',
    user: 'Watson Joyce',
    progress: 100,
    leader: 'Snow Benton'
  }, {
    name: 'Design Data Model',
    user: 'Morris Adams',
    progress: 30,
    leader: 'Watson Joyce'
  }, {
    name: 'Develop CR Algorithm',
    user: 'Jhone Doe',
    progress: 70,
    leader: 'Ada Kidd'
  }, {
    name: 'Payment Module',
    user: 'Ada Kidd',
    progress: 50,
    leader: 'Snow Benton'
  }, {
    name: 'Discount Module',
    user: 'Workman Floyd',
    progress: 50,
    leader: 'Robert Middleton'
  }]
userData:any;
  constructor(
    private themeService: ThemeService
  ,private navService:NavigationService) { 
    
    const self = this;

    this.societyRevenue = societyRevenuechart => {
      self.societyRevenuechart = societyRevenuechart;
    };

  }
  societyRevenuechart;
  societyRevenue;
  RevenueupdateFlag:boolean = false;
  ngOnInit() {
    setTimeout(() => {
      this.RevenueupdateFlag = true;
      this.societyRevenuechart.reflow();
    }, 1000);

    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.setChartColor(activeTheme);
    });
    this.setChartColor(this.themeService.activatedTheme);  
  }
  setChartColor(theme) {
    this.lineChartColors = [{
      backgroundColor: tinyColor(theme.baseColor).setAlpha(.6),
      borderColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: tinyColor(theme.baseColor).setAlpha(.4),
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointHoverBackgroundColor: theme.baseColor,
      pointHoverBorderColor: theme.baseColor
    }, {
      backgroundColor: 'rgba(0, 0, 0, .08)',
      borderColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0.06)',
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      pointHoverBorderColor: 'rgba(0, 0, 0, 0)'
    }]    
  }
  highcharts = Highcharts;
  revenueChartOption = {chart: {
    type: 'column'
},
title: {
    text: ''
},
subtitle: {
    text: 'Revenue per Society/Month'
},
accessibility: {
    announceNewData: {
        enabled: true
    }
},
xAxis: {
    type: 'category'
},
yAxis: {
    title: {
        text: 'Total percent market share'
    }

},
legend: {
    enabled: false
},
plotOptions: {
    series: {
        borderWidth: 0,
        dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
        }
    }
},

tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
},

series: [
    {
        name: "Browsers",
        colorByPoint: true,
        data: [
            {
                name: "Society 1",
                y: 62.74,
                drilldown: "Chrome"
            },
            {
                name: "Society 2",
                y: 10.57,
                drilldown: "Firefox"
            },
            {
                name: "Society 3",
                y: 7.23,
                drilldown: "Internet Explorer"
            },
            {
                name: "Society 4",
                y: 5.58,
                drilldown: "Safari"
            },
            {
                name: "Society 5",
                y: 4.02,
                drilldown: "Edge"
            },
            {
                name: "Society 6",
                y: 1.92,
                drilldown: "Opera"
            },
            {
                name: "Society 7",
                y: 7.62,
                drilldown: null
            }
        ]
    }
],
drilldown: {
    series: [
        {
            name: "Chrome",
            id: "Chrome",
            data: [
                [
                    "v65.0",
                    0.1
                ],
                [
                    "v64.0",
                    1.3
                ],
                [
                    "v63.0",
                    53.02
                ],
                [
                    "v62.0",
                    1.4
                ],
                [
                    "v61.0",
                    0.88
                ],
                [
                    "v60.0",
                    0.56
                ],
                [
                    "v59.0",
                    0.45
                ],
                [
                    "v58.0",
                    0.49
                ],
                [
                    "v57.0",
                    0.32
                ],
                [
                    "v56.0",
                    0.29
                ],
                [
                    "v55.0",
                    0.79
                ],
                [
                    "v54.0",
                    0.18
                ],
                [
                    "v51.0",
                    0.13
                ],
                [
                    "v49.0",
                    2.16
                ],
                [
                    "v48.0",
                    0.13
                ],
                [
                    "v47.0",
                    0.11
                ],
                [
                    "v43.0",
                    0.17
                ],
                [
                    "v29.0",
                    0.26
                ]
            ]
        },
        {
            name: "Firefox",
            id: "Firefox",
            data: [
                [
                    "v58.0",
                    1.02
                ],
                [
                    "v57.0",
                    7.36
                ],
                [
                    "v56.0",
                    0.35
                ],
                [
                    "v55.0",
                    0.11
                ],
                [
                    "v54.0",
                    0.1
                ],
                [
                    "v52.0",
                    0.95
                ],
                [
                    "v51.0",
                    0.15
                ],
                [
                    "v50.0",
                    0.1
                ],
                [
                    "v48.0",
                    0.31
                ],
                [
                    "v47.0",
                    0.12
                ]
            ]
        },
        {
            name: "Internet Explorer",
            id: "Internet Explorer",
            data: [
                [
                    "v11.0",
                    6.2
                ],
                [
                    "v10.0",
                    0.29
                ],
                [
                    "v9.0",
                    0.27
                ],
                [
                    "v8.0",
                    0.47
                ]
            ]
        },
        {
            name: "Safari",
            id: "Safari",
            data: [
                [
                    "v11.0",
                    3.39
                ],
                [
                    "v10.1",
                    0.96
                ],
                [
                    "v10.0",
                    0.36
                ],
                [
                    "v9.1",
                    0.54
                ],
                [
                    "v9.0",
                    0.13
                ],
                [
                    "v5.1",
                    0.2
                ]
            ]
        },
        {
            name: "Edge",
            id: "Edge",
            data: [
                [
                    "v16",
                    2.6
                ],
                [
                    "v15",
                    0.92
                ],
                [
                    "v14",
                    0.4
                ],
                [
                    "v13",
                    0.1
                ]
            ]
        },
        {
            name: "Opera",
            id: "Opera",
            data: [
                [
                    "v50.0",
                    0.96
                ],
                [
                    "v49.0",
                    0.82
                ],
                [
                    "v12.1",
                    0.14
                ]
            ]
        }
    ]
}}
  // revenueChartOption
}