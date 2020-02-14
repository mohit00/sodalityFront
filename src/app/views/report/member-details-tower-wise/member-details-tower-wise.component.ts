import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from '../report.service';
import { FacilityServiceService } from 'app/views/dashboard/service/facility-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-member-details-tower-wise',
  templateUrl: './member-details-tower-wise.component.html',
  styleUrls: ['./member-details-tower-wise.component.scss']
})
export class MemberDetailsTowerWiseComponent implements OnInit {
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
      name: ['member_details', [
        Validators.required,
        
      ]],
      from_flat:[],
      to_flat:[],
       format:['pdf']
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
}  public hasfirstError = (controlName: string, errorName: string) => {
  return this.Formgroup.controls[controlName].hasError(errorName);
}
  selectedStates = this.states; 
  selectedMode = this.mode; 
  selectedFormat = this.format; 
  selectedStates2:any;
   onKey(value) { 
      this.selectedStates = this.search(value);
 
   }
  
   onKey2(value) { 

    this.selectedStates2 = this.search2(value);
  }

 search2(value: string) { 
  let filter = value.toLowerCase();
  return this.locationList.filter(option => option.name.toLowerCase().startsWith(filter));
}

searchMode2(value: string) { 
  let filter = value.toLowerCase();
  return this.mode.filter(option => option.toLowerCase().startsWith(filter));
}

searchFormat2(value: string) { 
  let filter = value.toLowerCase();
  return this.format.filter(option => option.toLowerCase().startsWith(filter));
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
  execute(form){
    if(form.valid){}else{return false;}
let url = `/webapi/report?from_flat=${this.Formgroup.value.from_flat}&to_flat=${this.Formgroup.value.to_flat}&token_id=${this.tokenId}&report=${this.Formgroup.value.name}&format=${this.Formgroup.value.format}`
  
this.ReportService.retportset(url);

 }

  ngOnInit() {
  }

}
