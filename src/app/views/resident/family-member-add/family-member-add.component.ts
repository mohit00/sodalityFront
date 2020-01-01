import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-family-member-add',
  templateUrl: './family-member-add.component.html',
  styleUrls: ['./family-member-add.component.scss']
})
export class FamilyMemberAddComponent implements OnInit {
  firstFormGroup: FormGroup;
  pageType: any;
  fd: FormData;
  constructor(private route: ActivatedRoute, private Router: Router, private fb: FormBuilder, private Service: TablesService, private AppLoaderService: AppLoaderService, private dialog: AppConfirmService) {
    this.createForm();
    setTimeout(() => {
    this.pageType = sessionStorage.getItem('breadCrumb');
       if (this.pageType == 'Family Add') {
        this.createForm();
      } else if (this.pageType == 'Family Update') {     
        this.categoryDetail(sessionStorage.getItem(this.Service.FAMILY_MEMBER_UUID));
      }
    }, 100)
  }
  residentListData:any;
  residentList(){
    this.Service.getResidentList().subscribe(res=>{
       this.residentListData =res.data;
       console.log(JSON.stringify(this.residentListData));
     })
  }
  createForm() {
    this.firstFormGroup = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],mobileNumber: ['', [
        Validators.required
      ]],name: ['', [
        Validators.required
      ]],relationShip: ['', [
        Validators.required
      ]],parent_id: [sessionStorage.getItem(this.Service.FAMILY_Owner_UUID), [
        Validators.required
      ]]
    })
  }
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }
  categoryDetail(id: any) { 
    this.Service.familyGetDetail(id).subscribe(res => {
       this.updateForm(res);
    })
  }
  updateForm(res: any) {
    console.log(JSON.stringify(res))
    this.firstFormGroup = this.fb.group({ 
      id:[res.id],
      detailId:[res.familyDetail.id],
      uuid:[res.uuid],
      email: [res.email, [
        Validators.required
      ]],
      password: [res.password, [
        Validators.required
      ]],mobileNumber: [res.familyDetail.mobileNumber, [
        Validators.required
      ]],name: [res.familyDetail.name, [
        Validators.required
      ]],relationShip: [res.familyDetail.relationShip, [
        Validators.required
      ]],parent_id: [sessionStorage.getItem(this.Service.FAMILY_Owner_UUID), [
        Validators.required
      ]]
    })
  }

  ngOnInit() {
    this.residentList();
  }
  
  addFamilyMember() {
    console.log(JSON.stringify( (this.firstFormGroup.value)))

    this.fd = new FormData();
sessionStorage.setItem(this.Service.FAMILY_Owner_UUID,this.firstFormGroup.value.parent_id);
    this.AppLoaderService.open();
   let dataJson = {
       password:this.firstFormGroup.value.password,
       parent_id:this.firstFormGroup.value.parent_id,
      email:this.firstFormGroup.value.email,
      userDetail:{
      name:this.firstFormGroup.value.name,
      mobileNumber:this.firstFormGroup.value.mobileNumber.toString(),
      relationShip:this.firstFormGroup.value.relationShip,
      descirption:this.firstFormGroup.value.descirption
        }
       
       }
     this.fd.append("data", JSON.stringify(dataJson));
    //  this.fd.append("file","")
    this.Service.familySave(this.fd).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Family Successfully Added'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Resident/Family/Member/List']);
    })

  }
  updateFamilyMember() {
    let dataJson = {
      id:this.firstFormGroup.value.id,
      password:this.firstFormGroup.value.password,
      parent_id:this.firstFormGroup.value.parent_id,
     email:this.firstFormGroup.value.email,
     userDetail:{
       id:this.firstFormGroup.value.detailId,
     name:this.firstFormGroup.value.name,
     mobileNumber:this.firstFormGroup.value.mobileNumber.toString(),
     relationShip:this.firstFormGroup.value.relationShip,
     descirption:this.firstFormGroup.value.descirption
       }
      
      }
      console.log(JSON.stringify(dataJson));
      this.fd = new FormData();
      this.fd.append("data", JSON.stringify(dataJson));
    this.AppLoaderService.open();
    this.Service.familyUpdate(this.fd).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'sucess',
        message: 'Family Successfully  Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Resident/Family/Member/List']);
    })

  }
}
