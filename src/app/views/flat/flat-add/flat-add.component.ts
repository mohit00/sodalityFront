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
  selector: 'app-flat-add',
  templateUrl: './flat-add.component.html',
  styleUrls: ['./flat-add.component.scss']
})
export class FlatAddComponent implements OnInit {

 
  firstFormGroup:FormGroup;
   pageType:any;
  towerList: any;
  unitType: any;
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
      unit_no: ['', [
        Validators.required
      ]],
      Description: ['', [
        
      ]],
      unit_type: ['', [
        Validators.required
      ]], 
      parentId: ['', [
        Validators.required
      ]], 
      unit_super_area: ['', [
        Validators.required
      ]], 
      sanctionedLoadGrid: ['', [
        Validators.required
      ]], 
      sanctionedLoadBackUp: ['', [
        Validators.required
      ]], 
      soldStatus: ['', [
        Validators.required
      ]], UOM: ['', [
        Validators.required
      ]] ,unit_remark: ['', [
         
      ]],pipeGas: [false, [
         
      ]]
    }) 
  }
  
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
 }
 getUnitTypeList() {
  this.Service.getUnitTypeList().subscribe(res=>{
        this.unitType=res.data;
    })
}
  towerDetail(){
 this.Service.getFlat().subscribe(res=>{
    
   this.updateForm(res);
 })    
  }
  updateForm(data){
    console.log(JSON.stringify(data))
     this.firstFormGroup = this.fb.group({
      unit_no: [data.unit_no, [
        Validators.required
      ]],id: [data.id, [
        Validators.required
      ]],
      Description: [data.description, [
        
      ]],
      unit_type: [data.unit_type, [
        Validators.required
      ]], 
      parentId: [{value:sessionStorage.getItem('toweruuId'),disabled: true,} , [
        Validators.required
      ]], 
      uuId:[data.uuid, [
        Validators.required
      ]], 
      unit_super_area: [data.unit_super_area, [
        Validators.required
      ]], 
      sanctionedLoadGrid: [data.sanctionedLoadGrid, [
        Validators.required
      ]], 
      sanctionedLoadBackUp: [data.sanctionedLoadBackUp, [
        Validators.required
      ]], 
      soldStatus: [data.soldStatus, [
        Validators.required
      ]],UOM: [data.uom, [
        Validators.required
      ]],unit_remark: [data.unit_remark.uuid, [
         
      ]],pipeGas: [data.pipeGas, [
         
      ]]
    }) 
  }
  ngOnInit() {
    this.getTowerList();
    this.getUnitTypeList();
  }
  createUnit(){
    this.AppLoaderService.open();

    this.Service.FlatAdd(this.firstFormGroup.value).subscribe(res=>{
      this.AppLoaderService.close();
      let dataJson = {
        title:'sucess',
        message:'Flat Successfully Created'
      }
     this.dialog.success(dataJson);
     this.Router.navigate(['Unit/List']);
    })
    
  }
  updateUnit(){
    this.AppLoaderService.open();
console.log(JSON.stringify(this.firstFormGroup.value))
     this.Service.FlatUpdate(this.firstFormGroup.value).subscribe(res=>{
      this.AppLoaderService.close();
      let dataJson = {
        title:'sucess',
        message:'Flat Successfully Updated'
      }
     this.dialog.success(dataJson);
     this.Router.navigate(['Unit/List']);
    })
    
  }
 
  getTowerList(){
    this.Service.getTowerList().subscribe(res=>{
       this.towerList =res.data;
 
    })

  }
}
