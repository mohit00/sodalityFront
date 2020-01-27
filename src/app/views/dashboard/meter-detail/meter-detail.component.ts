
import { Component, OnInit } from "@angular/core";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from 'tinycolor2';
import * as Highcharts from "highcharts";
import { FacilityServiceService } from '../service/facility-service.service'

@Component({
  selector: 'app-meter-detail',
  templateUrl: './meter-detail.component.html',
  styleUrls: ['./meter-detail.component.scss'],
  animations: egretAnimations
})
export class MeterDetailComponent implements OnInit {
  cryptoChart: any;
  cryptoDonutChart: any;
  activeTrades: any[];
  trendingCurrencies: any[];
  trafficSourcesChart: any;
  monthlyTrafficChartBar: any;
  sensorid: string;
  sensorDetails: any;
  constructor(
    private themeService: ThemeService,
    private service: FacilityServiceService
  ) {
    this.sensorid = sessionStorage.getItem("sensorId")
    this.sensorDetail();
  }
  applicationLoadInits;
  dailyInits;
  monthlyBillInits;
  applicationLoad(e) {
    this.applicationLoadInits = e;

  }
  monthlyBillInit(e){
    this.monthlyBillInits = e;
  }
  dailyInit(e){
    this.dailyInits =e ;
  }
  dailyConsumption() {
    this.service.sensorDailyDetail(sessionStorage.getItem("tokenId"), this.sensorid).subscribe(res=>{
      console.log("Daily Con" + JSON.stringify(res))
      let dgArray = [];
       
      for(var i =0 ;i<res.resource.sensor.length;i++){

      }
    })
   }
  monthConsumption() {
    this.service.sensorMonthlyDetail(sessionStorage.getItem("tokenId"), this.sensorid).subscribe(res=>{

    })
   }
  monthConsumptionBill() {
    this.service.sensorMonthlyBill(sessionStorage.getItem("tokenId"), this.sensorid).subscribe(res=>{
        console.log("Month ly bill"+JSON.stringify(res))
        let dateArray = [];
        let valueArray = [];
        for(var i=0 ;i<res.resource.sensor.length ;i++){
          dateArray.push(res.resource.sensor[i].date)
          valueArray.push(res.resource.sensor[i].consumed_amt)
        }
        this.monthlyTrafficChartBar.xAxis.data = dateArray;
        this.monthlyTrafficChartBar.series[0].data = valueArray;
        this.monthlyTrafficChartBar.series[0].name = "Consumed Amt"
              this.monthlyBillInits.setOption(this.monthlyTrafficChartBar)

    })
   }
  sensorDetail() {
    this.monthConsumptionBill();
    this.dailyConsumption();
    this.service.sensorDetail(sessionStorage.getItem("tokenId"), this.sensorid).subscribe(res => {
      this.sensorDetails = res.resource.sensor;
      this.trafficSourcesChart.series[0].data[0].value = this.sensorDetails.dg_load
      this.trafficSourcesChart.series[0].data[1].value = this.sensorDetails.grid_load
      this.applicationLoadInits.setOption(this.trafficSourcesChart);
      console.log(JSON.stringify(res));
      if (this.sensorDetails.active_cut_off == 'Y') {
        this.activeTrades[0].icon = "assets/images/Light.png";
        this.activeTrades[0].value = "Yes";
      } else {
        this.activeTrades[0].icon = "assets/images/Light-off.png";
        this.activeTrades[0].value = "N0";
      }
      this.activeTrades[1].value = 'Rs. ' + this.sensorDetails.active_cut_off_min_balance;
      this.activeTrades[2].value = this.sensorDetails.mobile_no;
      if (this.sensorDetails.notification_sms == 'Y') {
        this.activeTrades[3].value = "Yes"
      } else {
        this.activeTrades[3].value = "No"

      }
      if (this.sensorDetails.notification_email == 'Y') {
        this.activeTrades[4].value = "Yes"
      } else {
        this.activeTrades[4].value = "No"

      }

    })
  }
  ngOnInit() {
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initTrafficSourcesChart(activeTheme)
      this.initCryptoChart(activeTheme);
    });
    this.initCryptoChart(this.themeService.activatedTheme);
    this.initTrafficSourcesChart(this.themeService.activatedTheme)
    this.cryptoDonutChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: ["#03A9F4", "#039BE5", "#fcc02e"],
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
          radius: ["65%", "85%"],
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
                color: "rgba(0, 0, 0, 0.8)"
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

    this.monthlyTrafficChartBar = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "4%",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ],
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
          name: "Bill",
          type: "line",
          smooth: true,
          data: [
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
          ],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "#f6be1a"
          },
          areaStyle: {
            color: "rgb(136, 227, 252)",
            opacity: 1
          }
        }
      ]
    };

    this.activeTrades = [
      {
        icon: "assets/images/Light.png",
        details: "Active Cut Off",
        value: "Yes"
      },
      {
        icon: "assets/images/consumer_balance.png",
        details: "Active Cut Off Min Balance",
        value: "15.00"
      },
      {
        icon: "assets/images/help_request.png",
        details: "Mobile Number",
        value: "987654321"
      },
      {
        icon: "assets/images/alarm.png",
        details: "SMS Notification",
        value: "No"
      },
      {
        icon: "assets/images/cryptocurrencies/AE.png",
        details: "Email Notification",
        value: "Yes"
      }
    ];

    this.trendingCurrencies = [
      {
        details: "Active Cut Off",
        value: "Yes"
      },
      {
        details: "Active Cut Off Min Balance",
        value: 100
      },
      {
        details: "Mobile Number",
        value: 3800
      },
      {
        details: "SMS Notification",
        value: "No"
      },
      {
        details: "Email Notification",
        value: "Yes"
      }
    ];
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
              formatter: "{b} \n{c}"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 5,
              name: "DG Load"
            },
            {
              value: 4,
              name: "Grid Load"
            }

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


  initCryptoChart(theme) {
    this.cryptoChart = {
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
        right: "20",
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
          data: [
            640,
            1040,
            840,
            1240,
            1040,
            1440,
            1240,
            1640,
            1440,
            1840,
            1640,
            2040,
            1840,
            2240,
            2040,
            2440,
            2240,
            2640,
            2440,
            2840,
            2640,
            3040,
            2840,
            3240,
            3040,
            3440,
            3240,
            3640,
            3440,
            3840
          ],
          type: "line",
          name: "Grid",
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
              color: tinyColor(theme.baseColor).toString(),
              borderColor: tinyColor(theme.baseColor).setAlpha(.4).toString(),
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        },
        {
          data: [
            240,
            640,
            440,
            840,
            640,
            1040,
            840,
            1240,
            1040,
            1440,
            1240,
            1640,
            1440,
            1840,
            1640,
            2040,
            1840,
            2240,
            2040,
            2440,
            2240,
            2640,
            2440,
            2840,
            2640,
            3040,
            2840,
            3240,
            3040,
            3440
          ],
          type: "line",
          name: "DG",
          smooth: true,
          color: "rgba(0, 0, 0, .3)",
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: "rgba(0, 0, 0, .5)",
              borderColor: "rgba(0, 0, 0, .2)",
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
  }

  highcharts = Highcharts;
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
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    tooltip: {
      valueSuffix: " "
    },
    series: [{
      name: 'DG',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    },
    {
      name: 'Grid',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }]
  };


}
