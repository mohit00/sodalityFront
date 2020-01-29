import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from '../report.service';
import { FacilityServiceService } from 'app/views/dashboard/service/facility-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-printed-coupon',
  templateUrl: './printed-coupon.component.html',
  styleUrls: ['./printed-coupon.component.scss']
})
export class PrintedCouponComponent implements OnInit {
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
      format: ['pdf', [
        Validators.required
      ]],date: ['', [
        Validators.required
      ]],
      from_date:[],
      to_date:[],
      report:['printed_coupon']
  })
  if(FacilityService.tokenId){
    this.tokenId  = FacilityService.tokenId;
  }else{
    this.FacilityService.login(this.userData.data.societyDetail.amrUserName, this.userData.data.societyDetail.amrpassword).subscribe(res => {
      this.FacilityService.setTokenId(res.token_id);
      this.tokenId  = FacilityService.tokenId;

     })

  }
}
public hasfirstError = (controlName: string, errorName: string) => {
  return this.Formgroup.controls[controlName].hasError(errorName);
}

execute(form){
   if(form.valid){

  }else{
    return false;
  }
  this.Formgroup.value.from_date = this.pipe.transform(this.Formgroup.value.date.begin,"yyyy-MM-dd");
  this.Formgroup.value.to_date = this.pipe.transform(this.Formgroup.value.date.end,"yyyy-MM-dd");
 let url = `webapi/report?from_date=${this.Formgroup.value.from_date}&to_date=${this.Formgroup.value.to_date}&token_id=${this.tokenId}&report=${this.Formgroup.value.report}&format=${this.Formgroup.value.format}`
 this.ReportService.retportset(url);
}

  selectedStates = this.states; 
  selectedMode = this.mode; 
  selectedFormat = this.format; 

   
  
 
  
  ngOnInit() {
  }

}
