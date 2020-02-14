import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from '../report.service';
import { FacilityServiceService } from 'app/views/dashboard/service/facility-service.service';

@Component({
  selector: 'app-meter-status',
  templateUrl: './meter-status.component.html',
  styleUrls: ['./meter-status.component.scss']
})
export class MeterStatusComponent implements OnInit {
  Formgroup: FormGroup;


  mode: any = [{
    value:'N',
    name:'Connected'
  },{
    value:'Y',
    name:'Disconnected'
  }
  
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
      name: ['meter_status', [
        Validators.required
      ]],
      format:['pdf'],
      state:['Disconnected'],
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

  selectedStates = this.states; 
  selectedMode = this.mode; 
  selectedFormat = this.format; 
  execute(form){
     if(form.valid){}else{return false;}
    let url = `/webapi/report?state=${this.Formgroup.value.state}&token_id=${this.tokenId}&report=${this.Formgroup.value.name}&format=${this.Formgroup.value.format}`
      
    this.ReportService.retportset(url);
  }
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
