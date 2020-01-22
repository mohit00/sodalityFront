import { Component, OnInit,Inject } from "@angular/core";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from 'tinycolor2';
import { TablesService } from 'app/views/manage-society/manage-society.service';
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DisccustionDialogComponent} from '../../disccustion-dialog/disccustion-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-cryptocurrency",
  templateUrl: "./cryptocurrency.component.html",
  styleUrls: ["./cryptocurrency.component.scss"],
  animations: egretAnimations
})
export class CryptocurrencyComponent implements OnInit {
  cryptoChart: any;
  cryptoDonutChart: any;
  activeTrades: any[];
  trendingCurrencies: any[];
  imageUrl: string ="";
  animal: string;
  name: string;

  firstFormGroup: FormGroup;
 
  constructor( 
    private AppLoaderService:AppLoaderService,
    private fb: FormBuilder,   
    public dialog: MatDialog,
    private themeService: ThemeService,
    private serive :TablesService,
    private dialog2: AppConfirmService
  ) {
    this.firstFormGroup = this.fb.group({

      description: ['']
    }
      );
  
    this.userData = JSON.parse(sessionStorage.getItem("data"));
    if(this.userData.data.user_type == "Resident"){
      this.imageUrl = 'http://localhost:8080/'+this.userData.data.residentDetail.profileImage
serive.loaderCheck.subscribe((data)=>{
  this.notificationList = JSON.parse(data.body).data;
})
    }
    this.getParentUUid();
  }
  commentAdd(noticeuuid){
    let dataJson ={
      noticeUuid:noticeuuid,
      uuid:this.userData.data.uuid,
      description:this.firstFormGroup.value.description
    }
 
   

    this.serive.notificationAdd(dataJson).subscribe(res=>{
       this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Comment Successfully Added'
      }
      let index = this.notificationList.findIndex(x => {
        
      
        return x.uuid ===noticeuuid
      });
    
        this.getCommentfromService(noticeuuid,this.notificationList[index]);
      this.dialog2.success(dataJson);
    })
  }
  commentList:any =[];;
  getCommentfromService( notificationuuid,data){
   
     
       let dataJson = {
        notificationuuid
      }
      this.serive.notificationGet(dataJson).subscribe(res=>{
        data.comment = res;
       })
     
   
  }
  getComment( notificationuuid,data){
    data.comment = [];
     
    data.commentshow=!data.commentshow;
    if(data.commentshow){
      let dataJson = {
        notificationuuid
      }
      this.serive.notificationGet(dataJson).subscribe(res=>{
        data.comment = res;
       })
    }
   
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DisccustionDialogComponent, {
      width: '800px',
      panelClass: 'my-class',

      data: {parentId: this.parentUuid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }



   /** @docsNotRequired */
   ngOnDestroy(): void {this.serive._disconnect() }
  userData:any;
  parentUuid:any;
  getParentUUid(){
    this.serive.getParentUuid(this.userData.data.uuid).subscribe(res => {
      this.parentUuid = res.uuid;
      this.serive._connect(this.parentUuid)
      this.getAllNotificaiton();
      
    })
  }
  notificationList:any;
  getAllNotificaiton(){
    this.serive.getAllNotification(this.parentUuid,this.userData.data.residentDetail.residentType).subscribe(res=>{
      console.log(JSON.stringify(res))
      this.notificationList = res.data;
    })
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

  ngOnInit() {
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initCryptoChart(activeTheme);
    });
    this.initCryptoChart(this.themeService.activatedTheme);

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
    this.activeTrades = [
      {
        icon: "assets/images/cryptocurrencies/BTC.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      },
      {
        icon: "assets/images/cryptocurrencies/ADA.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      },
      {
        icon: "assets/images/cryptocurrencies/LTC.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      },
      {
        icon: "assets/images/cryptocurrencies/AE.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      }
    ];

    this.trendingCurrencies = [
      {
        currency: "Bitcoin",
        rate: 3800
      },
      {
        currency: "Bitcoin",
        rate: 3800
      },
      {
        currency: "Bitcoin",
        rate: 3800
      },
      {
        currency: "Bitcoin",
        rate: 3800
      }
    ];
  }

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
          name: "Bitcoin",
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
          name: "Ethereum (ETH)",
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
}
