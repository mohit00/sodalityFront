import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from '../report.service';
import { FacilityServiceService } from 'app/views/dashboard/service/facility-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flat-debit-credit',
  templateUrl: './flat-debit-credit.component.html',
  styleUrls: ['./flat-debit-credit.component.scss']
})
export class FlatDebitCreditComponent implements OnInit {
  Formgroup: FormGroup;


  mode: string[] = [
    'ALL', 'REACHARGE_ADJ','OTHER'
  ];

  states: string[] = [
    'Alabama', 'Alaska'
  ];

  format: string[] = [
    'pdf','csv'
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
      type:['ALL'],
      report:['flat_debit_credit']
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


 let url = `webapi/report?from_date=${this.Formgroup.value.from_date}&to_date=${this.Formgroup.value.to_date}&token_id=${this.tokenId}&report=flat_debit_credit&format=${this.Formgroup.value.format}&type=${this.Formgroup.value.type}`
 this.ReportService.retportset(url);
}

  selectedStates = this.states; 
  selectedMode = this.mode; 
  selectedFormat = this.format; 

   
  
 
  
  ngOnInit() {
  }

}
