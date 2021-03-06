import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {


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
      ]],
    })
  }

  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }



  categoryDetail(id: any) { 

    this.Service.getCategory(id).subscribe(res => {
       this.updateForm(res);
    })
  }
  
  updateForm(res: { title: any; id: any; parrentAccount: any; uuid: any; }) {
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
      ]],
      uuId: [res.uuid, [
        Validators.required
      ]],
    })
  }
  ngOnInit() {
  }
  createCategory() {
    this.AppLoaderService.open();

    this.Service.saveCategory(this.firstFormGroup.value).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Category Successfully Created'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Category/List']);
    })

  }
  updateCategory() {
    this.AppLoaderService.open();

    this.Service.updateCategory(this.firstFormGroup.value).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'sucess',
        message: 'Category Successfully Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Category/List']);
    })

  }
}
