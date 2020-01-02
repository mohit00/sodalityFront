import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FileUploader } from 'ng2-file-upload';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

 
@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss'],
  animations: egretAnimations
})

export class StaffAddComponent implements OnInit {
  pageType:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  pic: any = [];
  public pic1: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  userDetail: any;
  constructor(private Router:Router, private fb: FormBuilder,private Service:TablesService,private AppLoaderService:AppLoaderService,private dialog:AppConfirmService) {
    this.userDetail = JSON.parse(sessionStorage.getItem("data"));
  }
  public hasfirstError = (controlName: string, errorName: string) => {
     return this.firstFormGroup.controls[controlName].hasError(errorName);
  }
  ngOnInit() {
    this.createForm();
    this.categoryList();
    this.pageType = sessionStorage.getItem('breadCrumb');
     if(this.pageType=='Add'){
      }else if(this.pageType=='Update'){
      this.staffDetail();
     }
  }

  staffDetail(){
    this.Service.staffget(sessionStorage.getItem("detailUuid")).subscribe(res=>{
      this.updateForm(res)
    })
  }

  dataDetail:any;
  updateForm(data){
     
    this.dataDetail = data;
    if(data.staffDetals.pic){
      this.pic.push({name:data.staffDetals.pic.split('/')[2]})
    }
    this.firstFormGroup = this.fb.group({
      id:[data.id],
      name: [data.staffDetals.name, [
        Validators.required
      ]],
      email: [data.email, [
        Validators.required,
        Validators.email
      ]], password: [data.password, [
        Validators.required
      ]],
      staffDetailId:[data.staffDetals.id],
      employeeId: [data.staffDetals.employeeId, [
        Validators.required
      ]],
      mobileNumber: [parseInt(data.staffDetals.mobileNumber), [
        Validators.required
      ]],
      designation: [data.staffDetals.designation, [
        Validators.required
      ]],
      categoryId: [data.staffDetals.category.uuid],
      dateOfBirth: [data.staffDetals.dateOfBirth],
      address: [data.staffDetals.address],
    });
    this.secondFormGroup = this.fb.group({
      dateOfCardIssue: [data.staffDetals.dateOfCardIssue],
      validUpto: [data.staffDetals.validUpto],
      from: [data.staffDetals.from],
      to: [data.staffDetals.to],
      aadharNo: [data.staffDetals.aadharNo],
      chooseStaffWorkArea: [data.staffDetals.chooseStaffWorkArea],
      policeVerification: [data.staffDetals.policeVerification]
    });
    this.thirdFormGroup = this.fb.group({
      pic: [data.staffDetals.pic]
    });
  }

  createForm(){
    this.firstFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]], password: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      employeeId: ['', [
        Validators.required
      ]],
      mobileNumber: ['', [
        Validators.required,
      ]],
      designation: ['', [
        Validators.required
      ]],
      categoryId: [''],
      dateOfBirth: [''],
      address: [''],
    });
    this.secondFormGroup = this.fb.group({
      dateOfCardIssue: [''],
      validUpto: [''],
      from: [''],
      to: [''],
      aadharNo: [''],
      chooseStaffWorkArea: [''],
      policeVerification: [''],
    });
    this.thirdFormGroup = this.fb.group({
      pic: ['']
    })
  }
  tet:any;
  view(pic) {
       if(pic.size){
        const reader = new FileReader();
        reader.readAsDataURL(pic);
        reader.onload =  ()=> {
          console.log(reader.result);
          this.tet = reader.result;
          console.log(this.tet)
          var win = window.open();
          win.document.write('<iframe src="' + this.tet  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
        };
       }else{
        window.open(environment.LOCAL_BASE+"resources/images/"+pic.name);
       }
    }
    handleFileInput(files: any, type) {
      if (type == 'pic') {
        this.pic=[];
        for(var i=0;i<files.length;i++){
          this.pic.push(files[i])
        }
      }
    }
    categoryListData:any;
    categoryList(){
      this.Service.getCategoryList(JSON.parse(sessionStorage.getItem('data')).data.id).subscribe(res=>{
        this.categoryListData = res;
       })
    }
  fd: FormData;
  createStaff() {
    this.fd = new FormData();
    if (this.pic.length > 0) {
      for (var i = 0; i < this.pic.length; i++) {
        this.fd.append("pic", this.pic[i]);
      }
    }else{
      this.fd.append("pic", "");
    } 
    let dataJson = {
      email:this.firstFormGroup.value.email,
      password:this.firstFormGroup.value.password,
      parent_id: this.userDetail.data.id, 
      userDetail: {
        name: this.firstFormGroup.value.name,
        employeeId: this.firstFormGroup.value.employeeId,
        mobileNumber: this.firstFormGroup.value.mobileNumber,
        designation: this.firstFormGroup.value.designation,
        categoryId: this.firstFormGroup.value.categoryId,
        dateOfBirth: this.firstFormGroup.value.dateOfBirth,
        address: this.firstFormGroup.value.address,
        dateOfCardIssue: this.secondFormGroup.value.dateOfCardIssue,
        validUpto: this.secondFormGroup.value.validUpto,
        from: this.secondFormGroup.value.from,
        to: this.secondFormGroup.value.to,
        aadharNo: this.secondFormGroup.value.aadharNo,
        chooseStaffWorkArea: this.secondFormGroup.value.chooseStaffWorkArea,
        policeVerification: this.secondFormGroup.value.policeVerification,
      }
    }
    console.log(JSON.stringify(dataJson));
    this.fd.append("data", JSON.stringify(dataJson));
    console.log(this.fd)
     this.AppLoaderService.open();

    this.Service.staffSave(this.fd).subscribe(res=>{
       this.AppLoaderService.close();
      let dataJson = {
        title:'success',
        message:'Staff Successfully Created'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Staff/List']);
    })
  }

 updateStaff(){
  this.fd = new FormData();
  if (this.pic.length > 0) {
    for (var i = 0; i < this.pic.length; i++) {
      this.fd.append("pic", this.pic[i]);
    }
  }else{
    this.fd.append("pic", "");
  } 
  let dataJson = {
    id:this.firstFormGroup.value.id,
    email:this.firstFormGroup.value.email,
    password:this.firstFormGroup.value.password,
    userDetail: {
      id:this.firstFormGroup.value.staffDetailId,
      name: this.firstFormGroup.value.name,
      employeeId: this.firstFormGroup.value.employeeId,
      mobileNumber: parseInt(this.firstFormGroup.value.mobileNumber),
      designation: this.firstFormGroup.value.designation,
      categoryId: this.firstFormGroup.value.categoryId,
      dateOfBirth: this.firstFormGroup.value.dateOfBirth,
      address: this.firstFormGroup.value.address,
      dateOfCardIssue: this.secondFormGroup.value.dateOfCardIssue,
      validUpto: this.secondFormGroup.value.validUpto,
      from: this.secondFormGroup.value.from,
      to: this.secondFormGroup.value.to,
      aadharNo: this.secondFormGroup.value.aadharNo,
      chooseStaffWorkArea: this.secondFormGroup.value.chooseStaffWorkArea,
      policeVerification: this.secondFormGroup.value.policeVerification,
    }
  }
  console.log(JSON.stringify(dataJson));
  this.fd.append("data", JSON.stringify(dataJson));
  console.log(this.fd)
   this.AppLoaderService.open();

  this.Service.staffUpdate(this.fd).subscribe(res=>{
    this.AppLoaderService.close();
    let dataJson = {
      title:'success',
      message:'Staff Successfully Updated'
    }
    this.dialog.success(dataJson);
    this.Router.navigate(['Staff/List']);
  })
}

remove(index, type) {
  if (type == 'pic') {
     this.pic.splice(index, 1);
   }
}

 

}
