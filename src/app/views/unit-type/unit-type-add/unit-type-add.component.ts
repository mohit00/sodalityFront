import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-type-add',
  templateUrl: './unit-type-add.component.html',
  styleUrls: ['./unit-type-add.component.scss']
})
export class UnitTypeAddComponent implements OnInit {


  firstFormGroup: FormGroup;
  pageType: any;
  constructor(private route: ActivatedRoute, private Router: Router, private fb: FormBuilder, private Service: TablesService, private AppLoaderService: AppLoaderService, private dialog: AppConfirmService) {
    this.createForm();


    setTimeout(() => {
    this.pageType = sessionStorage.getItem('breadCrumb');
      if (this.pageType == 'Add') {
        this.createForm();
      } else if (this.pageType == 'Update') {
     
        
        this.categoryDetail(sessionStorage.getItem('detailUuid'));
      }
    }, 100)
  }
  createForm() {
    this.firstFormGroup = this.fb.group({
      title: ['', [
        Validators.required
      ]],carpetArea: ['', [
        Validators.required
      ]],builtUpArea: ['', [
        Validators.required
      ]],superBuiltUpArea: ['', [
        Validators.required
      ]],
    })
  }

  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }



  categoryDetail(id: any) { 

    this.Service.unitTypeget(id).subscribe(res => {
       this.updateForm(res);
    })
  }
  
  updateForm(res: any) {
    console.log(JSON.stringify(res))
    this.firstFormGroup = this.fb.group({
      title: [res.title, [
        Validators.required
      ]],
      id: [res.id, [
        Validators.required
      ]], 
      uuid: [res.uuid],
      parrentAccount: [res.parrentAccount, [
        Validators.required
      ]] ,
        carpetArea: [res.carpetArea, [
        Validators.required
      ]],builtUpArea: [res.builtUpArea, [
        Validators.required
      ]],superBuiltUpArea: [res.superBuiltUpArea, [
        Validators.required
      ]],
    })
  }

  ngOnInit() {
  }
  createUnitType() {
    this.AppLoaderService.open();
    this.firstFormGroup.value.parent_id = (sessionStorage.getItem('uuId'));
    console.log(JSON.stringify(this.firstFormGroup.value))
    this.Service.unitTypeSave(this.firstFormGroup.value).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Unit Type Successfully Created'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['UnitType/List']);
    })

  }
  updateUnitType() {
    this.AppLoaderService.open();
    this.firstFormGroup.value.parent_id = (sessionStorage.getItem('uuId'));

    this.Service.unitTypeUpdate(this.firstFormGroup.value).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'sucess',
        message: 'Unit Type Successfully Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['UnitType/List']);
    })

  }
}
