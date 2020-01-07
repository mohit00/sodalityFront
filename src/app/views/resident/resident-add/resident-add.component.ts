import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FileUploader } from 'ng2-file-upload';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-resident-add',
  templateUrl: './resident-add.component.html',
  styleUrls: ['./resident-add.component.scss'],
  animations: egretAnimations

})
export class ResidentAddComponent implements OnInit {
  pageType: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: any = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  residentLogo: any[];



  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  removechip(fruit: string): void {
    const index = this.fruits.map(function (d) { return d['uuid']; }).indexOf(fruit)

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value)

    this.fruits.push({
      unitNo: (event.option.value).unitNo,
      uuid: (event.option.value).uuid

    });
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => {

      return fruit.toLowerCase().indexOf(filterValue) === 0
    });
  }

  pic: any = [];
  public pic1: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  userDetail: any;
  towerList: any;
  flatList: any;
  constructor(private Router: Router, private fb: FormBuilder, private Service: TablesService, private AppLoaderService: AppLoaderService, private dialog: AppConfirmService) {
    this.userDetail = JSON.parse(sessionStorage.getItem("data"));

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }
  public hasSecondError = (controlName: string, errorName: string) => {
    return this.secondFormGroup.controls[controlName].hasError(errorName);
  }
  ngOnInit() {
    this.createForm();
    this.categoryList();
    this.getTowerList();
    this.pageType = sessionStorage.getItem('breadCrumb');
    if (this.pageType == 'Add') {
    } else if (this.pageType == 'Update') {
      this.residentDetail();
    }
  }

  residentDetail() {
    this.Service.residentget(sessionStorage.getItem("detailUuid")).subscribe(res => {
      console.log(JSON.stringify(res))
      this.updateForm(res)
    })
  }
// getFlatTower(){
//   this.Service.getParentUuid().subscribe(res=>{

//   })
// }
  dataDetail: any;
  updateForm(data) {
    this.pic = [];
    if(data.residentDetail.profileImage){
      this.pic.push({
        name:data.residentDetail.profileImage.split('/')[2]
      })
    }
    if(data.flatOwned){
      for(var i=0;i<data.flatOwned.length ;i++){
        this.fruits.push({
          unitNo:data.flatOwned[i].unit_no,
          uuid:data.flatOwned[i].uuid
        })
      }
    }

    this.dataDetail = data;
    // if (data.residentDetals.pic) {
    //   this.pic.push({ name: data.residentDetals.pic.split('/')[2] })
    // }
    // this.fruits = data.flatOwned;
    this.firstFormGroup = this.fb.group({
      id: [data.id, [
        Validators.required 
       ]],
       detailId:[data.residentDetail.id],
      email: [data.email, [
        Validators.required,
        Validators.email
      ]], alternateEmailId: ['', [

        Validators.email
      ]], password: [data.password, [
        Validators.required
      ]],
      firstName: [data.residentDetail.firstName, [
        Validators.required
      ]],
      middleName: [data.residentDetail.middleName, [
      ]],
      lastName: [data.residentDetail.lastName, [
        Validators.required,
      ]],
      mobileNumber: [parseInt(data.residentDetail.mobileNumber), [
        Validators.required
      ]],

      alternateMobileNumber: [parseInt(data.residentDetail.alternateMobileNumber)]
    });
     
    this.secondFormGroup = this.fb.group({
      landLine: [parseInt(data.residentDetail.landLine)],
      intercom: [parseInt(data.residentDetail.intercom), [
        Validators.required,
      ]],
      flatOwned: data.flatOwned,
      clubMembership: [data.residentDetail.clubMembership],
      residentType: [data.residentDetail.residentType],
      occupation: [data.residentDetail.occupation],
      accessCardNumber: [data.residentDetail.accessCardNumber],
      residentResiding: [data.residentDetail.residentResiding],
      towerId: [],
      possesionDate: [data.residentDetail.possesionDate],
      serviceStartDate: [data.residentDetail.serviceStartDate
      ],
    });
    this.thirdFormGroup = this.fb.group({
      pic: ['']
    })
  }

  createForm() {
    this.firstFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]], alternateEmailId: ['', [

        Validators.email
      ]], password: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      middleName: ['', [
      ]],
      lastName: ['', [
        Validators.required,
      ]],
      mobileNumber: [, [
        Validators.required
      ]],

      alternateMobileNumber: [""]
    });
    this.secondFormGroup = this.fb.group({
      landLine: [],
      intercom: [, [
        Validators.required,
      ]],
      flatOwned: [],
      clubMembership: [false],
      residentType: [''],
      occupation: [''],
      accessCardNumber: [''],
      residentResiding: [false],
      towerId: [],
      possesionDate: [],
      serviceStartDate: [],
    });
    this.thirdFormGroup = this.fb.group({
      pic: ['']
    })
  }

  tet: any;
  getTowerList() {
    this.Service.getTowerList().subscribe(res => {
      console.log(JSON.stringify(res.data))
      this.towerList = res.data;
    })

  }
   
  getflatList(data) {
    let dataJson = {
      "parentId": data
    }
    this.Service.getFlatList(dataJson).subscribe(res => {
      console.log(JSON.stringify(res))
      this.flatList = res.data;
    })
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
  categoryListData: any;
  categoryList() {
    this.Service.getCategoryList(JSON.parse(sessionStorage.getItem('data')).id).subscribe(res => {
      this.categoryListData = res;
    })
  }
  fd: FormData;
  createResident() {
     this.secondFormGroup.value.flatOwned = [];

    for (var i = 0; i < this.fruits.length; i++) {
      this.secondFormGroup.value.flatOwned.push(this.fruits[i].uuid);
    }
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
      "flatOwned": this.secondFormGroup.value.flatOwned,
      "userDetail": {
        "firstName": this.firstFormGroup.value.firstName,
        "middleName": this.firstFormGroup.value.middleName,
        "lastName": this.firstFormGroup.value.lastName,
        "clubMembership": this.secondFormGroup.value.clubMembership,
        "mobileNumber": this.firstFormGroup.value.mobileNumber,
        "alternateMobileNumber": parseInt(this.firstFormGroup.value.alternateMobileNumber),
        "alternateEmailId": this.firstFormGroup.value.alternateEmailId,
        "landLine": parseInt(this.secondFormGroup.value.landLine),
        "intercom": parseInt(this.secondFormGroup.value.intercom),
        residentType: this.secondFormGroup.value.residentType,
        "occupation": this.secondFormGroup.value.occupation,
        "accessCardNumber": this.secondFormGroup.value.accessCardNumber,
        "residentResiding": this.secondFormGroup.value.residentResiding,
        "possesionDate": this.secondFormGroup.value.possesionDate,
        "serviceStartDate": this.secondFormGroup.value.serviceStartDate,
      }

    }
    console.log(JSON.stringify(dataJson));
    this.fd.append("data", JSON.stringify(dataJson));
    console.log(this.fd)
    this.AppLoaderService.open();

    this.Service.residentSave(this.fd).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Resident Successfully Created'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Resident/List']);
    })
  }

  updateResident() {
    this.secondFormGroup.value.flatOwned = [];

    for (var i = 0; i < this.fruits.length; i++) {
      this.secondFormGroup.value.flatOwned.push(this.fruits[i].uuid);
    }
    this.fd = new FormData();
    if (this.pic.length > 0) {
      for (var i = 0; i < this.pic.length; i++) {
        this.fd.append("pic", this.pic[i]);
      }
    } else {
      this.fd.append("pic", "");
    }
    console.log(JSON.stringify(this.firstFormGroup.getRawValue().id));
    let dataJson = {
      id: this.firstFormGroup.getRawValue().id,
      email: this.firstFormGroup.getRawValue().email,
      password: this.firstFormGroup.getRawValue().password,
      "flatOwned": this.secondFormGroup.value.flatOwned,

      userDetail: {
        id:this.firstFormGroup.value.detailId,
        "firstName": this.firstFormGroup.value.firstName,
        "middleName": this.firstFormGroup.value.middleName,
        "lastName": this.firstFormGroup.value.lastName,
        "clubMembership": this.secondFormGroup.value.clubMembership,
        "mobileNumber": this.firstFormGroup.value.mobileNumber,
        "alternateMobileNumber": this.firstFormGroup.value.alternateMobileNumber,
        "alternateEmailId": this.firstFormGroup.value.alternateEmailId,
        "landLine": this.secondFormGroup.value.landLine,
        "intercom": (this.secondFormGroup.value.intercom),
        residentType: this.secondFormGroup.value.residentType,
        "occupation": this.secondFormGroup.value.occupation,
        "accessCardNumber": this.secondFormGroup.value.accessCardNumber,
        "residentResiding": this.secondFormGroup.value.residentResiding,
        "possesionDate": this.secondFormGroup.value.possesionDate,
        "serviceStartDate": this.secondFormGroup.value.serviceStartDate,
      }
    }
    console.log(JSON.stringify(dataJson));
    this.fd.append("data", JSON.stringify(dataJson));
    console.log(this.fd)
    this.AppLoaderService.open();

    this.Service.residentUpdate(this.fd).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'resident Successfully Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Resident/List']);
    })
  }

  remove(index, type) {
    if (type == 'pic') {
      this.pic.splice(index, 1);
    }
  }



}
