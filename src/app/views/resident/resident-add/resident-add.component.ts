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

  dataDetail: any;
  updateForm(data) {

    this.dataDetail = data;
    // if (data.residentDetals.pic) {
    //   this.pic.push({ name: data.residentDetals.pic.split('/')[2] })
    // }
    this.fruits = data.flatOwned;
    this.firstFormGroup = this.fb.group({
      email: [data.email, [
        Validators.required,
        Validators.email
      ]], alternateEmailId: ['', [

        Validators.email
      ]], password: [data.email, [
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
      mobileNumber: [data.residentDetail.mobileNumber, [
        Validators.required
      ]],

      alternateMobileNumber: [data.residentDetail.alternateMobileNumber]
    });
    this.secondFormGroup = this.fb.group({
      landLine: [data.residentDetail.landLine],
      intercom: [data.residentDetail.intercom, [
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
      mobileNumber: ['', [
        Validators.required
      ]],

      alternateMobileNumber: ['']
    });
    this.secondFormGroup = this.fb.group({
      landLine: [''],
      intercom: ['', [
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
      window.open(environment.LOCAL_BASE + "resources/images/" + pic.name);
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
    this.Service.getCategoryList().subscribe(res => {
      this.categoryListData = res;
    })
  }
  fd: FormData;
  createResident() {
    alert(JSON.stringify(this.fruits))
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
        "mobileNumber": this.firstFormGroup.value.mobileNumber.toString(),
        "alternateMobileNumber": (this.firstFormGroup.value.alternateMobileNumber).toString(),
        "alternateEmailId": this.firstFormGroup.value.alternateEmailId,
        "landLine": this.secondFormGroup.value.landLine.toString(),
        "intercom": (this.secondFormGroup.value.intercom).toString(),
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
        message: 'resident Successfully Created'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Resident/List']);
    })
  }

  updateResident() {
    this.fd = new FormData();
    if (this.pic.length > 0) {
      for (var i = 0; i < this.pic.length; i++) {
        this.fd.append("pic", this.pic[i]);
      }
    } else {
      this.fd.append("pic", "");
    }
    let dataJson = {
      id: this.firstFormGroup.value.id,
      email: this.firstFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      userDetail: {
        id: this.firstFormGroup.value.residentDetailId,
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

    this.Service.residentUpdate(this.fd).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'resident Successfully Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['resident/List']);
    })
  }

  remove(index, type) {
    if (type == 'pic') {
      this.pic.splice(index, 1);
    }
  }



}
