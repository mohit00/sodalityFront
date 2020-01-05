import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-complain-add',
  templateUrl: './staff-complain-add.component.html',
  styleUrls: ['./staff-complain-add.component.scss']
})
export class StaffComplainAddComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup:FormGroup;
  pageType: any;
  societyLogo: any = []
  categoryList: any;
  flatList: any = [];
  complainImage: any = [];
  fd: FormData;
  AssignedToList: any;
  complainUUid: any;
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


  handleFileInput(files: any, type) {

    this.complainImage = [];

    for (var i = 0; i < files.length; i++) {
      this.complainImage.push(files[i])
    }




  }
  remove(index, type) {

    this.complainImage.splice(index, 1);


  }
  view(bill) {
    //  console.log(bill)
    if (bill.size) {
      const reader = new FileReader();
      reader.readAsDataURL(bill);
      reader.onload = () => {
        console.log(reader.result);
        var win = window.open();
        win.document.write('<iframe src="' + reader.result + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
      };
    } else {
      //  window.open(environment.LOCAL_BASE+"resources/images/"+bill.name);
    }
  }
  getFlatList() {
    this.Service.getResidentUnitUuid(sessionStorage.getItem("uuId")).subscribe(res => {
      if (res.data.length > 0) {

        this.flatList = res.data;
      } else {

      }
    })
  }

  createForm() {
    this.firstFormGroup = this.fb.group({
      title: ['', [
        Validators.required
      ]
      ],
      description: [''],
      residentUuid: [''],
      unitUuid: [''],
      categoryUuid: [''],
      assignToId: [],

    })
    this.secondFormGroup = this.fb.group({
      status: ['', [
        Validators.required
      ]],
      comment: ['', [
        Validators.required
      ]],
      commentByUuid: ['' ] 
    })
  }
  // "residentUuid":"966436d6-b1ff-445f-97e1-a5b62f8a147e",
  // "unitUuid":"0fa7e2b7-1f29-4047-8eee-1fa9db867f92",
  // "categoryUuid":"3e3e1288-c749-47ff-b72c-251a6a93c778"
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }
  addComplain(){
    this.AppLoaderService.open();

    this.Service.commentAdd(this.secondFormGroup.value).subscribe(res=>{
      this.AppLoaderService.close();

      let dataJson = {
        title: 'success',
        message: 'Comment Successfully Added'
      }
      this.dialog.success(dataJson);
       this.getCommentList(this.complainUUid);
    })
  }


  categoryDetail(id: any) {

    this.Service.getComplainDetail(id).subscribe(res => {
      this.updateForm(res);
    })
  }
  complainCommentList:any;
getCommentList(data){
  let datajson = {
    uuid:data
  }
  this.Service.commentGet(datajson).subscribe(res=>{
    console.log(JSON.stringify(res))
    this.complainCommentList =res.data
  })
}
  updateForm(res) {
    this.complainUUid = res.uuid;
    this.getCommentList(res.uuid);
    console.log(JSON.stringify(res))
    this.getStaffListByCategory(res.category.uuid);
    this.firstFormGroup = this.fb.group({
      title: [{ value: res.title, disabled: true }, [
        Validators.required
      ]
      ],
      complainId: { value: res.uuid, disabled: true },
      description: [{ value: res.description, disabled: true }],
      residentUuid: [{ value: res.resident.uuid, disabled: true }],
      unitUuid: [{ value: res.unit.uuid, disabled: true }],
      categoryUuid: [{ value: res.category.uuid, disabled: true }],
      assignToId: [],
    })
    this.secondFormGroup = this.fb.group({
      status: ['', [
        Validators.required
      ]],
      comment: ['', [
        Validators.required
      ]],
      commentByUuid: [sessionStorage.getItem("uuId") ],
      complainUuid:[res.uuid]

    })
    if (res.images) {
      this.complainImage = res.images

    }

  }
  getStaffListByCategory(data) {
    this.Service.getStaffListByCategory(data).subscribe(res => {
      this.AssignedToList = res.data;
    })
  }
  ngOnInit() {
    this.getFlatList();
  }
  createCategory() {
    this.fd = new FormData();

    this.firstFormGroup.value.residentUuid = sessionStorage.getItem("uuId");
    if (this.flatList.length > 1) { } else {
      this.firstFormGroup.value.unitUuid = this.flatList[0].uuid

    }
    for (var i = 0; i < this.complainImage.length; i++) {
      if (this.complainImage[i].size) {
        this.fd.append("files", this.complainImage[i]);

      }

    }
    this.fd.append("data", JSON.stringify(this.firstFormGroup.value));
    this.AppLoaderService.open();
    this.Service.complainSave(this.fd
    ).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Complain Successfully Added'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['SocietyComplain/List']);
    })
  }
  updateCategory() {
    console.log(JSON.stringify(this.firstFormGroup.getRawValue()))
    this.AppLoaderService.open();

    this.Service.complainAssignTo(this.firstFormGroup.getRawValue()
    ).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Complain Successfully Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['SocietyComplain/List']);
    })

  }
}
