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
// import HC_exporting from 'highcharts/modules/exporting';
// HC_exporting(Highcharts);
HC_more(Highcharts);
HC_solidgauge(Highcharts);

highcharts3D(Highcharts);
import { FacilityServiceService } from '../service/facility-service.service'
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
userData:any;
  sessionOptions: any;
  sessions: any;
  sessionsData: any;

   weekChartGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];
  dgGridchart;
  dgGridcomsumption;
  dgGridupdateFlag: boolean = false;
  waterchart;
  watercomsumption;
  waterupdateFlag: boolean = false;
  amrGridchart;
  amrGridcomsumption;
  amrGridupdateFlag: boolean = false;
  currentLoadGridchart;
  currentLoadGridcomsumption;
  currentLoadGridupdateFlag: boolean = false;
  dgFuelGridchart;
  dgFuelGridcomsumption;
  dgFuelGridupdateFlag: boolean = false;
  towerList: any =[];

  constructor(
    private themeService: ThemeService,
    private service: FacilityServiceService
  ) {
    this.userData = JSON.parse(sessionStorage.getItem("data"));
    const self = this;

    this.dgGridcomsumption = dgGridchart => {
      self.dgGridchart = dgGridchart;
    };
    this.watercomsumption = waterchart => {
      self.waterchart = waterchart;
    };
    this.amrGridcomsumption = amrGridchart => {
      self.amrGridchart = amrGridchart;
    };
    this.currentLoadGridcomsumption = currentLoadGridchart => {
      self.currentLoadGridchart = currentLoadGridchart;
    };
    this.dgFuelGridcomsumption = dgFuelGridchart => {
      self.dgFuelGridchart = dgFuelGridchart;
    };
  }

  highcharts = Highcharts;
  currentLoadChartOptions = {
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

  WaterConsumptionOption = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [

      ],
      labels: {
        step: 1,
        formatter: function (e) {
          // var ghours   = Math.floor(parseInt(this.y) / 60);
          // var gminutestime = Math.floor((parseInt(this.y) - ((ghours * 3600)) / 60));
          // var gseconds = Math.floor((parseInt(this.y)* 60) - (ghours * 3600) - (gminutestime * 60));

          return e.value.split('@')[0].substring(0, 4) + '...<br>' + e.value.split('@')[1].substring(0, 10);
        }
      }, style: {
        fontSize: '10px'
      }
    },
    yAxis: [{
      min: 0,
      max: 100,

      title: {
        text: 'Water level'
      }
    }, {
      title: {
        text: 'Capacity'
      },
      opposite: true
    }],
    legend: {
      shadow: false
    },
    tooltip: {
      shared: true
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0
      }
    },
    series: [{
      name: '',
      color: '#66a6fa',
      data: [],
      pointPadding: 0.05,
      pointPlacement: -0.2
    }, {
      name: '',
      color: '#3483eb',
      data: [],
      pointPadding: 0.1,
      pointPlacement: -0.2
    }]
  }

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

  dgFuelchartOptions = {
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
        y: 80,
        fontSize:'9px'
      }]
    }, {
      name: 'Exercise',
      data: [{
        color: Highcharts.getOptions().colors[1],
        radius: '87%',
        innerRadius: '63%',
        y: 65,
        fontSize:'9px'
      }]
    }, {
      name: 'Stand',
      data: [{
        color: Highcharts.getOptions().colors[2],
        radius: '62%',
        innerRadius: '38%',
        y: 50,
        fontSize:'9px'
      }]
    }]
  };

  amrChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: ''
  },
  tooltip: {
      pointFormat: ''
  },
  plotOptions: {
    series: {
        dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y:.1f}%'
        },
        events: {
          click: (function (event) {
            console.log(event.point)
              console.log(event.point.name)
              console.log(JSON.stringify(event.point.extradata))
// 
console.log(event.point.index)
if(event.point.extradata.type == "Gateway"){
  this.getTowerWithDic(event.point.extradata.id,event.point.index,event.point.name,event.point);

}else if(event.point.extradata.type == "Tower"){
  this.getTowerDic(event.point.extradata.dataloggerId ,event.point.extradata.tower_id,event.point.index,event.point.name,event.point);

}
             // this.openDialog('supplygraph', event.point.category.split(" ")[0], 'currentDay', this.hour);
          }).bind(this)
       }
    }
   
},


    series: [
        {
            name: "Data Logger",
            colorByPoint: true,
            data: [
                ]
        }
    ],
    drilldown: {
        series: [ 
        ]
    }
  }

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
  headerCount: any = {};
  flatCount() {
    this.service.flatCount().subscribe(res => {
      this.headerCount.flat_count = res.flat_count;
      // alert(JSON.stringify(res))
      this.reCharge()
      this.getCurrentStatus();

    })
  }
  reCharge() {
    this.service.Recharge().subscribe(res => {
       this.headerCount.Recharge = res.total_recharge;
      if(res.total_recharge.current_day_recharge){

      }else{
        res.total_recharge.current_day_recharge = 0;
      }
      if(res.total_recharge.previous_day_recharge){

      }else{
        res.total_recharge.previous_day_recharge = 0;

      }
    this.headerCount.Recharge  = res.total_recharge.current_day_recharge;
      this.dailyConsuption();
    })
  }
  dailyConsuption() {
    this.service.dailyConsumption().subscribe(res => {
      this.headerCount.daily_consumption = res.daily_consumption.current_day_consumption;
      this.monthlyConsumption();
    })
  }
  monthlyConsumption() {
    this.service.monthlyConsumption().subscribe(res => {
      this.headerCount.monthly_consumption = res.monthly_consumption.current_month_consumption;
      this.waterConsumption();
      this.getdataLogger();
    })
  }
  sensorShow:boolean=false;
  sensorList(data){
    this.amrGridchart.showLoading()
    this.amrChartOptions.series[0].data  = [];
    this.amrChartOptions.series[0].name = "Sensor"
    this.amrChartOptions.drilldown.series =[];
    console.log(data.value)
    this.service.sensorList(data.value).subscribe(res=>{
      this.sensorShow=true;
      this.amrGridupdateFlag = true;

      for(var i=0;i<res.resource.sensor.length;i++){
        this.amrChartOptions.series[0].data.push({
          name: res.resource.sensor[i].name,
          y: 1,
           extradata:res.resource.sensor[i]
        })
  
      }
      setTimeout(() => {
  
  
        this.amrGridchart.hideLoading()
        this.amrGridupdateFlag = false
      }, 200)
      console.log(res)

    })
  }
  getdataLogger(){
    this.sensorShow=false;

    this.amrGridchart.showLoading()
this.getDICList();
this.amrChartOptions.series[0].data  = [];
    this.service.getDataLogger().subscribe(res=>{
      this.amrChartOptions.series[0].name = "Gateway"
      this.amrChartOptions.series[0].colorByPoint = true;

      for(var i =0 ;i<res.resource.datalogger.length;i++){
          
         this.amrGridupdateFlag = true;
         res.resource.datalogger[i].type ="Gateway"

         this.amrChartOptions.series[0].data.push({
          name: res.resource.datalogger[i].name,
          y: 1,
          drilldown:res.resource.datalogger[i].name,
          extradata:res.resource.datalogger[i]
        })
          
    
        setTimeout(() => {
  
  
          this.amrGridchart.hideLoading()
          this.amrGridupdateFlag = false
        }, 200)
      }
    })
  }
  getTowerWithDic(id,index,name,point){
   
    // this.amrGridchart.showLoading()
    this.amrGridchart.showLoading()

    this.service.getTowerDataLogger(id).subscribe(res=>{
      console.log(JSON.stringify(res));

      this.amrChartOptions.drilldown.series[index] = [];
      this.amrChartOptions.drilldown.series[index].data =[];
      this.amrChartOptions.drilldown.series[index].name = 'Tower';
      this.amrChartOptions.drilldown.series[index].id = name;
      for(var i=0;i<res.resource.tower.length ;i++){
        res.resource.tower[i].type ="Tower"
        res.resource.tower[i].dataloggerId = id;
        this.amrChartOptions.drilldown.series[index].data.push(
          {
            name: res.resource.tower[i].tower_name,
            y: res.resource.tower[i].count,
            drilldown:res.resource.tower[i].tower_name,
            extradata:res.resource.tower[i]
        }
        )
      }
   
      setTimeout(() => {
  
  
        this.amrGridchart.hideLoading()
        this.amrGridupdateFlag = false
        this.amrGridchart.addSeriesAsDrilldown(point, this.amrChartOptions.drilldown.series[index]);

      }, 200)
    })
  }
  dicsList:any;
  getDICList(){
    this.service.getDICList().subscribe(res=>{
       
     this.dicsList =  res.resource.dic
    })
  }
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  getTowerDic(dataloggerId,towerId,index,name,point){
    this.amrGridchart.showLoading()

    this.service.getTowerDics(dataloggerId,towerId).subscribe(res=>{
       this.dicsList = res.resource.dic 
      this.amrGridchart.hideLoading()

    }) 
  }
  
  waterConsumption() {
    this.waterchart.showLoading()

    this.service.waterConsumption().subscribe(res => {
      
      this.waterupdateFlag = true


      this.WaterConsumptionOption.series[0].name = "Capacity"
      this.WaterConsumptionOption.series[0].data = res.resource.capacity
      this.WaterConsumptionOption.series[1].name = "Level"
      for(var i=0;i<res.resource.level.length ;i++){
        if(res.resource.level[i] <20){
          this.WaterConsumptionOption.series[1].data.push({
            y:res.resource.level[i] ,
            color:'#ff0000'
          })
        }else{
          this.WaterConsumptionOption.series[1].data.push({
            y:res.resource.level[i] ,
            color:'#3483eb'
          })
        } 
      }
      this.WaterConsumptionOption.xAxis.categories = res.resource.name
      console.log("Water Consumption" + JSON.stringify(res))
      setTimeout(() => {
        this.waterchart.hideLoading()
        this.waterupdateFlag = false
      }, 200)

      this.dgGridConsumption();
    })
  }
  dgGridConsumption() {
    this.dgGridchart.showLoading()
    this.service.dgGridConsumption().subscribe(res => {
      console.log("DG Grid" + JSON.stringify(res))
      this.dgGridupdateFlag = true;
      this.linechartOptions.xAxis.categories = res.resource.date
      this.linechartOptions.series[0].data = res.resource.dg;
      this.linechartOptions.series[1].data = res.resource.grid
      setTimeout(() => {
        this.dgGridchart.hideLoading()
        this.dgGridupdateFlag = false
      }, 200)
      this.loadConsumption();
    })
  }
  loadConsumption() {
    this.currentLoadGridchart.showLoading()
    this.service.loadConsumption().subscribe(res => {
      console.log(JSON.stringify(res))
      this.currentLoadGridupdateFlag = true;
      this.currentLoadChartOptions.series[0].data = res.resource['Tower-Load'];
      setTimeout(() => {
        this.currentLoadGridchart.hideLoading()
        this.currentLoadGridupdateFlag = false
      }, 200)
      this.armData();
    })
  }
  measurmentUnit:any;
  getCurrentStatus(){
    this.service.getCurrent().subscribe(res=>{
      this.measurmentUnit = res.measurement_unit;
    })
  }
  armData() {
    this.service.amrDashBoard().subscribe(res => {
      this.amrGridchart.showLoading()

      console.log(JSON.stringify(res))
      // this.amrGridupdateFlag = true;
      // this.amrChartOptions.series[0].name = "Gateway"
      // this.amrChartOptions.series[1].name = "DIC"

      // this.amrChartOptions.series[2].name = "Meter"

      // this.amrChartOptions.series[0].data  = [res.resource.dl_count]

      // this.amrChartOptions.series[1].data = [res.resource.dl_count]

      // this.amrChartOptions.series[2].data  = [res.resource.meter_count]

  
      setTimeout(() => {


        this.amrGridchart.hideLoading()
        this.amrGridupdateFlag = false
      }, 200)
      this.dgFuelLevel();
    })
  }
  dgFuelLevel() {
    this.dgFuelGridchart.showLoading();

    this.service.dgFuelLevel().subscribe(res => {
      this.dgFuelGridupdateFlag = true

      let dataJson = {
        color: '',
        radius: 113,
        innerRadius: 0,
        y: 0
      }
      this.dgFuelchartOptions.series = [];
      for (var i = 0; i < res.resource.length; i++) {
        res.resource[i].data = [];
        dataJson.radius = 113;

        dataJson.color = Highcharts.getOptions().colors[i];
        dataJson.innerRadius = dataJson.radius - ((i + 1) * 24 + (i + 1));

        dataJson.radius = dataJson.radius - (i * 24 + i) - 1
        dataJson.y = res.resource[i].fuel_level

        res.resource[i].data.push({
          color: dataJson.color,
          radius: dataJson.radius +'%',
          innerRadius: dataJson.innerRadius+'%',
          y: dataJson.y
        })
        console.log(JSON.stringify(res.resource[i]))

        this.dgFuelchartOptions.series.push(res.resource[i]);
      }

      console.log(JSON.stringify(this.dgFuelchartOptions))
       setTimeout(() => {
        this.dgFuelGridchart.hideLoading()
        this.dgFuelGridupdateFlag = false
      }, 200)
      this.townWeekWiseCharge();
    })
  }
  townWeekWiseCharge(){
    this.service.townWeekWiselLevel().subscribe(res=>{
      this.weekChartGrowthChart.xAxis.data=res.resource.Date;
      this.weekChartGrowthChart.series[0].data=res.resource.Amount;
      // for(var i=0 ;i<res.resource.length ;i++){
      //   this.weekChartGrowthChart.xAxis.data.push(res.resource[i].Date)
      //   this.weekChartGrowthChart.series[0].data.push(res.resource[i].Amount)
      // }
      this.weekChartInits.setOption(this.weekChartGrowthChart);
      this.meterStatus();
    })
  }

  meterStatusData:any;
  meterStatus(){
    this.service.meterStatus().subscribe(res=>{
      this.meterStatusData = res.resource
      this.towerLowBalance();
    })
  }
  lowbalanceInit;
  weekChartInits;
  weekChartInit(e){
    this.weekChartInits = e;

  }
  lowBalanceInit(e){
    this.lowbalanceInit = e;
  }
  towerLowBalance(){
    this.service.towerLowBalance().subscribe(res=>{
      let towerName =[]
      let towerBalance = []
      for(var i =0 ;i<res.resource.length ;i++){
        towerName.push(res.resource[i].tower);
        towerBalance.push(res.resource[i].low_balance)
      }
      this.dailyTrafficChartBar.xAxis[0].data =towerName

      this.dailyTrafficChartBar.series[0].data = towerBalance
      this.lowbalanceInit.setOption(this.dailyTrafficChartBar);
      this.towerPowerStatus();
    })
  }
  current:number = 3;
  towerPowerStatus(){
    this.towerList = [] 
    this.service.towerPowerStatus().subscribe(res=>{
       for(var i=0 ;i<res.resource.length ;i++){
        if(res.resource[i].sensor.length > 0){
          this.towerList.push(res.resource[i])
        }
      }
      console.log(JSON.stringify(this.towerList))
    })
  }
  ngAfterViewInit() { 
  }
  ngOnInit() {
    setTimeout(() => {
      this.waterupdateFlag = true;
      this.waterchart.reflow();
      this.amrGridupdateFlag = true;
      this.amrGridchart.reflow()
      this.currentLoadGridupdateFlag = true;
      this.currentLoadGridchart.reflow()
      this.dgGridupdateFlag = true
      this.dgFuelGridchart.reflow();
      this.waterchart.showLoading();
      this.amrGridchart.showLoading();
      this.currentLoadGridchart.showLoading();
      this.dgFuelGridchart.showLoading();

    }, 100);
     if(this.userData.data.societyDetail.amrAccess){
      this.service.login(this.userData.data.societyDetail.amrUserName, this.userData.data.societyDetail.amrpassword).subscribe(res => {
        this.service.setTokenId(res.token_id);
        this.flatCount();
      })
    }
    if(this.userData.data.societyDetail.ibmsAccess){

    this.service.login(this.userData.data.societyDetail.ibmsUserName, this.userData.data.societyDetail.ibmspassword).subscribe(res => {

      this.service.setIBMSTOKEN(res.token_id);
    })
  }
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
          data: [],
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
          name: "Tower Balance",
          data: [],
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
    this.weekChartGrowthChart = {
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
        data: [],
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
          name: "Amount",
          type: "line",
          smooth: false,
          data: [],
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
