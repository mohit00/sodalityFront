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
  selector: 'app-tower-add',
  templateUrl: './tower-add.component.html',
  styleUrls: ['./tower-add.component.scss']
})
export class TowerAddComponent implements OnInit {
  firstFormGroup:FormGroup;
   pageType:any;
  constructor(private Router:Router, private fb: FormBuilder,private Service:TablesService,private AppLoaderService:AppLoaderService,private dialog:AppConfirmService) {
    this.createForm();
 
     setTimeout(()=>{    this.pageType = sessionStorage.getItem('breadCrumb');
    if(this.pageType=='Add'){
    this.createForm();
   }else if(this.pageType=='Update'){
    this.towerDetail();
   }
},100)
   

  }
  createForm(){
    this.firstFormGroup = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      no_of_tower: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
    }) 
  }
  
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
 }
  towerDetail(){
 this.Service.getTower().subscribe(res=>{
    
   this.updateForm(res);
 })    
  }
  updateForm(data){
     this.firstFormGroup = this.fb.group({
      name: [data.name, [
        Validators.required
      ]],
      id: [data.id, [
        Validators.required
      ]],
      no_of_tower: [data.no_of_tower, [
        Validators.required
      ]],
      description: [data.description, [
        Validators.required
      ]],
      uuId:[data.uuid, [
        Validators.required
      ]],
    }) 
  }
  ngOnInit() {
  }
  createTower(){
    this.AppLoaderService.open();

    this.Service.saveTower(this.firstFormGroup.value).subscribe(res=>{
      this.AppLoaderService.close();
      let dataJson = {
        title:'sucess',
        message:'Tower Successfully Created'
      }
     this.dialog.success(dataJson);
     this.Router.navigate(['Tower/List']);
    })
    
  }
  updateTower(){
    this.AppLoaderService.open();

     this.Service.updateTower(this.firstFormGroup.value).subscribe(res=>{
      this.AppLoaderService.close();
      let dataJson = {
        title:'sucess',
        message:'Tower Successfully Updated'
      }
     this.dialog.success(dataJson);
     this.Router.navigate(['Tower/List']);
    })
    
  }
}
