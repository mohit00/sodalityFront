import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { ReportServiceService } from '../report.service';
import { FacilityServiceService } from 'app/views/dashboard/service/facility-service.service';
import { DatePipe } from '@angular/common';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthly-date-wise',
  templateUrl: './monthly-date-wise.component.html',
  styleUrls: ['./monthly-date-wise.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
 
export class MonthlyDateWiseComponent implements OnInit {
  Formgroup: FormGroup;

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  mode: string[] = [
    'ALL', 'XE-MAIN','WEB', 'PAYTM', 'HDFC', 'MOBIKWIK', 'IVRS'
  ];

  states: string[] = [
    'Alabama', 'Alaska'
  ];

  format: string[] = [
    'pdf'
  ];
tokenId:any;
  userData: any;
  constructor(private pipe:DatePipe,private fb :FormBuilder,private ReportService:ReportServiceService,private FacilityService:FacilityServiceService) {
    this.userData = JSON.parse(sessionStorage.getItem("data"));

    this.Formgroup = this.fb.group({
 report: ['monthly_month_wise'],
       format:['pdf'],
       from_flat:['', [
        Validators.required
      ]], to_flat:['', [
        Validators.required
      ]]
  })
  if(FacilityService.tokenId){
    this.tokenId  = FacilityService.tokenId;
    this.getLocationList(this.tokenId)

  }else{
    this.FacilityService.login(this.userData.data.societyDetail.amrUserName, this.userData.data.societyDetail.amrpassword).subscribe(res => {
      this.FacilityService.setTokenId(res.token_id);
      this.tokenId  = FacilityService.tokenId;
      this.getLocationList(this.tokenId)

     })
     
  }
}
locationList:any;
getLocationList(tokeId){
  this.FacilityService.getLocationList(tokeId).subscribe(res=>{
    console.log(JSON.stringify(res))
    this.locationList = res.resource.location;
    this.selectedStates = res.resource.location
    this.selectedStates2 = res.resource.location

  })
}
selectedStates2:any
  selectedStates :any; 
   selectedMode = this.mode; 
  selectedFormat = this.format; 

   onKey(value) { 
      this.selectedStates = this.search(value);
    }
    onKey2(value) { 
      this.selectedStates2 = this.search(value);
    }
   

   search(value: string) { 
    let filter = value.toLowerCase();
    return this.locationList.filter(option => option.name.toLowerCase().startsWith(filter));
  }

  execute(form){
    
     this.Formgroup.value.date = this.pipe.transform(this.date.value,"yyyy-MM");
     if(form.valid){}else{return false;}
let url = `webapi/report?date=${this.Formgroup.value.date}&token_id=${this.tokenId}&report=${this.Formgroup.value.report}&format=${this.Formgroup.value.format}&from_flat=${this.Formgroup.value.from_flat}&to_flat=${this.Formgroup.value.to_flat}`
 this.ReportService.retportset(url);
 
  }
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.Formgroup.controls[controlName].hasError(errorName);
  }
  searchMode(value: string) { 
    let filter = value.toLowerCase();
    return this.mode.filter(option => option.toLowerCase().startsWith(filter));
  }

  searchFormat(value: string) { 
    let filter = value.toLowerCase();
    return this.format.filter(option => option.toLowerCase().startsWith(filter));
  }
  
  ngOnInit() {
  }

}
