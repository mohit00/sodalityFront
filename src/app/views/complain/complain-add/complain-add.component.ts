import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablesService } from '../../manage-society/manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complain-add',
  templateUrl: './complain-add.component.html',
  styleUrls: ['./complain-add.component.scss']
})
export class ComplainAddComponent implements OnInit {
  firstFormGroup: FormGroup;
  pageType: any;
  societyLogo: any = []
  categoryList: any;
  flatList: any =[];
  complainImage: any=[];
  fd: FormData;
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
  categoryGetList() {
      this.Service.getCategoryList(JSON.parse(sessionStorage.getItem('data')).data.parrentAccount.id).subscribe(res=>{
         this.categoryList =res;
      })
  }
  handleFileInput(files: any, type) {
  
      this.complainImage=[];

      for(var i=0;i<files.length;i++){
        this.complainImage.push(files[i])
      }
 
     


  }
  remove(index, type) {
  
      this.complainImage.splice(index, 1);

    
  }
  view(bill) {
    //  console.log(bill)
    if(bill.size){
     const reader = new FileReader();
     reader.readAsDataURL(bill);
     reader.onload =  ()=> {
       console.log(reader.result);
         var win = window.open();
       win.document.write('<iframe src="' + reader.result  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
     };
    }else{
    //  window.open(environment.LOCAL_BASE+"resources/images/"+bill.name);
    }
 }
  getFlatList() {
    this.Service.getResidentUnitUuid(sessionStorage.getItem("uuId")).subscribe(res=>{
      if(res.data.length > 0){
         
          this.flatList = res.data;
      }else{

      }
    })
  }
  
  createForm() {
    this.firstFormGroup = this.fb.group({
      title: ['', [
        Validators.required
      ]
    ],
    description:[''],
    residentUuid:[''],
    unitUuid:[''],
    categoryUuid:['']
    })
  }
	// "residentUuid":"966436d6-b1ff-445f-97e1-a5b62f8a147e",
	// "unitUuid":"0fa7e2b7-1f29-4047-8eee-1fa9db867f92",
	// "categoryUuid":"3e3e1288-c749-47ff-b72c-251a6a93c778"
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }



  categoryDetail(id: any) {
    alert(id)
    this.Service.getComplainDetail(id).subscribe(res => {
      this.updateForm(res);
    })
  }
 
  updateForm(res) {
    this.complainImage = res.images;
    this.firstFormGroup = this.fb.group({
      title: [res.title, [
        Validators.required
      ]
    ],
    id: res.id,
     uuid :res.uuid,
     description:[res.description],
    residentUuid:[res.resident.uuid],
    unitUuid:[res.unit.uuid],
    categoryUuid:[res.category.uuid],
     })
  }
  ngOnInit() {
    this.categoryGetList();
    this.getFlatList();
  }
  createCategory() {
    this.fd = new FormData();

    this.firstFormGroup.value.residentUuid = sessionStorage.getItem("uuId");
    if(this.flatList.length > 1){}else{
      this.firstFormGroup.value.unitUuid = this.flatList[0].uuid

    }
    for (var i = 0; i < this.complainImage.length; i++) {
      if(this.complainImage[i].size ){
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
      this.Router.navigate(['Complain/List']);
    })
    
  }
  updateCategory() {
    this.fd = new FormData();

     if(this.flatList.length > 1){}else{
      this.firstFormGroup.value.unitUuid = this.flatList[0].uuid

    }
    for (var i = 0; i < this.complainImage.length; i++) {
      if(this.complainImage[i].size ){
        this.fd.append("files", this.complainImage[i]);

      } 

    }
    this.fd.append("data", JSON.stringify(this.firstFormGroup.value));

 
    this.AppLoaderService.open();

    this.Service.updateComplain(this.fd
      ).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Complain Successfully Added'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Complain/List']);
    })
    

  }
}
