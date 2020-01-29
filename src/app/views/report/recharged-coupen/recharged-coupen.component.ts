import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from '../report.service';
import { FacilityServiceService } from 'app/views/dashboard/service/facility-service.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-recharged-coupen',
  templateUrl: './recharged-coupen.component.html',
  styleUrls: ['./recharged-coupen.component.scss'],
 
})
export class RechargedCoupenComponent implements OnInit {
  Formgroup: FormGroup;


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
      from_date: ['', [
       ]],
      to_date: ['', [
       ]], report: ['recharge_coupon'],
       format:['PDF'],
       from_flat:['', [
        Validators.required
      ]],
      to_flat:['', [
        Validators.required
      ]],
      mode:['ALL', [
        Validators.required
      ]],
      date:['', [
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
  selectedStates :any; 
  selectedStates2:any;
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
     this.Formgroup.value.from_date = this.pipe.transform(this.Formgroup.value.date.begin,"yyyy-MM-dd");
    this.Formgroup.value.to_date = this.pipe.transform(this.Formgroup.value.date.end,"yyyy-MM-dd");
    if(form.valid){}else{return false;}
let url = `webapi/report?from_date=${this.Formgroup.value.from_date}&to_date=${this.Formgroup.value.to_date}&token_id=${this.tokenId}&report=${this.Formgroup.value.report}&format=${this.Formgroup.value.format}&from_flat=${this.Formgroup.value.from_flat}&to_flat=${this.Formgroup.value.to_flat}&mode=${this.Formgroup.value.mode}`
   
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
