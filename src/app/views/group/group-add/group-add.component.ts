import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FileUploader } from 'ng2-file-upload';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
  
@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {
  pageType: any;
  firstFormGroup: FormGroup;
   visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
    

  pic: any = [];
  public pic1: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  userDetail: any;
  towerList: any;
  flatList: any;
  tet: string | ArrayBuffer;
  constructor(private Router: Router, private fb: FormBuilder, private Service: TablesService, private AppLoaderService: AppLoaderService, private dialog: AppConfirmService) {
    this.userDetail = JSON.parse(sessionStorage.getItem("data"));

   
  }
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }
 groupDetail(data){
   this.Service.groupGetDetail(data).subscribe(res=>{
     this.updateForm(res);
   })
 }
  ngOnInit() {
    this.createForm();
     this.pageType = sessionStorage.getItem('breadCrumb');
    if (this.pageType == 'Add') {
    } else if (this.pageType == 'Update') {
      this.groupDetail(sessionStorage.getItem("detailUuid"))
     }
  }

 
// getFlatTower(){
//   this.Service.getParentUuid().subscribe(res=>{

//   })
// }
  dataDetail: any;
  updateForm(data) { 
    this.pic=[];
    if(data.userDetail.profileImage){
      this.pic.push({name:data.userDetail.profileImage.split("/")[2]})
    }
    this.firstFormGroup = this.fb.group({
      Id:[data.id], 
      password: [data.password, [
        Validators.required
      ]],
      detailid:[data.userDetail.id],

      email: [data.email,[
        Validators.required
      ]], name: [data.userDetail.name,[
        Validators.required
      ]], address: [data.userDetail.address,[
      ]], phoneNumber: [parseInt(data.userDetail.phoneNumber),[
      ]]
    }); 
  }
  
  createForm() {
    this.firstFormGroup = this.fb.group({ 
      password: ['', [
        Validators.required
      ]],

      email: ['',[
        Validators.required
      ]], name: ['',[
        Validators.required
      ]], address: ['',[
      ]], phoneNumber: ['',[
      ]]
    }); 
  }

 
   
   
  view(pic) {
    if (pic.size) {
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = () => {
        console.log(reader.result);
        this.tet = reader.result;
        console.log(this.tet)
        var win = window.open();
        win.document.write('<iframe src="' + this.tet + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
      };
    } else {
      window.open(environment.LOCAL_BASE + "/images/" + pic.name);
    }
  }
  handleFileInput(files: any, type) {
    if (type == 'pic') {
      this.pic = [];
      for (var i = 0; i < files.length; i++) {
        this.pic.push(files[i])
      }
    }
  }
  
  fd: FormData;
  createGroup() {

  
    this.fd = new FormData();
    if (this.pic.length > 0) {
      for (var i = 0; i < this.pic.length; i++) {
        this.fd.append("files", this.pic[i]);
      }
    } else {
      this.fd.append("files", "");
    }
    let dataJson = {
      email: this.firstFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      parent_id: this.userDetail.data.id,
       "userDetail": {
        "name":this.firstFormGroup.value.name,
        "address":this.firstFormGroup.value.address,
            "phoneNumber":this.firstFormGroup.value.phoneNumber 
        }

    }
    
     this.fd.append("data", JSON.stringify(dataJson));
     this.AppLoaderService.open();

    this.Service.groupSave(this.fd).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Group Successfully Created'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Group/List']);
    })
  }

  UpdateGroup() { 
    

  
    this.fd = new FormData();
    if (this.pic.length > 0) {
      for (var i = 0; i < this.pic.length; i++) {
        this.fd.append("files", this.pic[i]);
      }
    } else {
      this.fd.append("files", "");
    }
    let dataJson = {
      id:this.firstFormGroup.value.Id,
      email: this.firstFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      parent_id: this.userDetail.data.id,
       "userDetail": {
         id:this.firstFormGroup.value.detailid,
        "name":this.firstFormGroup.value.name,
        "address":this.firstFormGroup.value.address,
            "phoneNumber":this.firstFormGroup.value.phoneNumber 
        }

    }
    
     this.fd.append("data", JSON.stringify(dataJson));
     this.AppLoaderService.open();

    this.Service.groupUpdate(this.fd).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Group Successfully Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Group/List']);
    })
  }

  remove(index, type) {
    if (type == 'pic') {
      this.pic.splice(index, 1);
    }
  }



}
