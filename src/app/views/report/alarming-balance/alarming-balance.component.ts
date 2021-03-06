import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from '../report.service';
import { FacilityServiceService } from 'app/views/dashboard/service/facility-service.service';

@Component({
  selector: 'app-alarming-balance',
  templateUrl: './alarming-balance.component.html',
  styleUrls: ['./alarming-balance.component.scss']
})
export class AlarmingBalanceComponent implements OnInit {
  Formgroup: FormGroup;


  mode: string[] = [
    'ALL', 'XE-MAIN','WEB', 'PAYTM', 'HDFC', 'MOBIKWIK', 'IVRS'
  ];

  states: string[] = [
    'Alabama', 'Alaska'
  ];

  format: string[] = [
    'pdf',
    'csv'
  ];
tokenId:any;
  userData: any;
  constructor(private fb :FormBuilder,private ReportService:ReportServiceService,private FacilityService:FacilityServiceService) {
    this.userData = JSON.parse(sessionStorage.getItem("data"));

    this.Formgroup = this.fb.group({
      name: ['alarming_balance', [
        Validators.required
      ]],
      format:['pdf']
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
execute(form){
  if(form.valid){}else{return false;}
 let url = `/webapi/report?token_id=${this.tokenId}&report=${this.Formgroup.value.name}&format=${this.Formgroup.value.format}`
   
 this.ReportService.retportset(url);
}
  selectedStates = this.states; 
  selectedMode = this.mode; 
  selectedFormat = this.format; 

   onKey(value) { 
      this.selectedStates = this.search(value);
      this.selectedMode = this.searchMode(value);
      this.selectedFormat = this.searchFormat(value);
   }
  

   search(value: string) { 
    let filter = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().startsWith(filter));
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
