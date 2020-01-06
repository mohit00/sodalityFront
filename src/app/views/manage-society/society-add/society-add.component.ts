import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { FileUploader } from 'ng2-file-upload';
import { TablesService } from '../manage-society.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NavigationService } from 'app/shared/services/navigation.service';
   
@Component({
  selector: 'app-society-add',
  templateUrl: './society-add.component.html',
  styleUrls: ['./society-add.component.scss'],
  animations: egretAnimations

})
export class SocietyAddComponent implements OnInit {
  pageType:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  billLogo: any = [];
  societyLogo: any = [];
  adImage: any = [];
  imageList: any = [];
  public billLogo1: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  userDetail: any;
  userData: any;
  constructor(    private navService: NavigationService,
   private Router:Router, private fb: FormBuilder,private Service:TablesService,private AppLoaderService:AppLoaderService,private dialog:AppConfirmService) {
    this.userDetail = JSON.parse(sessionStorage.getItem("data"));
  }
  public hasfirstError = (controlName: string, errorName: string) => {
     return this.firstFormGroup.controls[controlName].hasError(errorName);
  }
  ngOnInit() {
    this.createForm();

    this.pageType = sessionStorage.getItem('breadCrumb');
     if(this.pageType=='Add'){
      this.createForm();
     }else if(this.pageType=='Update'){
      this.societyDetail();
     }
    
  }
  societyDetail(){
    this.userData = JSON.parse(sessionStorage.getItem('data'))
    let detailId  ="";
    if (this.userData.data.user_type == 'Society') {
      detailId = sessionStorage.getItem("uuId")

    }else{
      detailId = sessionStorage.getItem("detailUuid")

    }
    this.Service.societyget(detailId).subscribe(res=>{
       
       this.updateForm(res)
    })
   }
   dataDetail:any;
   updateForm(data){
     
    this.dataDetail = data;
    if(data.societyDetail.billLogo){
      this.billLogo.push({name:data.societyDetail.billLogo.split('/')[2]})

    }
    if(data.societyDetail.societyLogo){
      this.societyLogo.push({name:data.societyDetail.societyLogo.split('/')[2]})

    }
    if(data.societyDetail.imageList){
      for(var i=0;i<data.societyDetail.imageList.image.length;i++){
        this.imageList.push({name:data.societyDetail.imageList.image[i].split('/')[2]});
        
      }
    }
       
    if(data.societyDetail.adImage){
      for(var i=0;i<data.societyDetail.adImage.image.length;i++){
        this.adImage.push({name:data.societyDetail.adImage.image[i].split('/')[2]});
        
      }
    }
         

        

    this.firstFormGroup = this.fb.group({
      name: [data.societyDetail.societyName, [
        Validators.required
      ]],
      societyDisplayName: [data.societyDetail.societyDisplayName, [
        Validators.required
      ]],
      email: [{value:data.email,   disabled: true} ,[
        Validators.required,
        Validators.email
      ]], password: [{value:data.password,   disabled: true} , [
        Validators.required
      ]],
      contactNumber: [parseInt(data.societyDetail.contactNumber),[
        Validators.required
      ]],
      contactEmail: [data.societyDetail.contactEmail, [
        Validators.email
      ]],
      registeredAddress: [data.societyDetail.registeredAddress],
      aboutSociety: [data.societyDetail.aboutSociety],
    });
    this.secondFormGroup = this.fb.group({
      BillName: [data.societyDetail.billName],
      Registration: [data.societyDetail.registration],
      GSTINT: [data.societyDetail.gstint],
      PAN: [data.societyDetail.pan],
      TAN: [data.societyDetail.tan],
      serviceTax: [data.societyDetail.serviceTax],
      BillAddress: [data.societyDetail.billAddress],
      billLogo: [data.societyDetail.billLogo]
    });
    this.thirdFormGroup = this.fb.group({
      societyLogo: [''],
      adImage: [''],
      albumImage: [''],
    })
   }
  createForm(){
    this.firstFormGroup = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      societyDisplayName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      contactNumber: ['',[
        Validators.required
      ]],
      contactEmail: ['', [
        Validators.email
      ]],
      registeredAddress: [''],
      aboutSociety: [''],
    });
    this.secondFormGroup = this.fb.group({
      BillName: [''],
      Registration: [''],
      GSTINT: [''],
      PAN: [''],
      TAN: [''],
      serviceTax: [''],
      BillAddress: [''],
      billLogo: ['']
    });
    this.thirdFormGroup = this.fb.group({
      societyLogo: [''],
      adImage: [''],
      albumImage: [''],
    })
  }
 tet:any;
view(bill) {
     //  console.log(bill)
     if(bill.size){
      const reader = new FileReader();
      reader.readAsDataURL(bill);
      reader.onload =  ()=> {
        console.log(reader.result);
        this.tet = reader.result;
        console.log(this.tet)
        var win = window.open();
        win.document.write('<iframe src="' + this.tet  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
      };
     }else{
      window.open(environment.LOCAL_BASE+"/images/"+bill.name);
     }
  }
  handleFileInput(files: any, type) {
    if (type == 'bill') {
      this.billLogo=[];

      for(var i=0;i<files.length;i++){
        this.billLogo.push(files[i])
      }

    }
    if (type == 'logo') {
      this.societyLogo=[];

      for(var i=0;i<files.length;i++){
        this.societyLogo.push(files[i])
      }
     } if (type == 'ad') {
       for(var i=0;i<files.length;i++){
        this.adImage.push(files[i])
      }
    } if (type == 'album') {
       for(var i=0;i<files.length;i++){
        this.imageList.push(files[i])
      }
    }


  }
  fd: FormData;
  createSociety() {
    

    this.fd = new FormData();
    if (this.imageList.length > 0) {
      for (var i = 0; i < this.imageList.length; i++) {
        this.fd.append("files", this.imageList[i]);

      }
    }else{
      this.fd.append("files", "");

    }
    if (this.adImage.length > 0) {
      for (var i = 0; i < this.adImage.length; i++) {
        this.fd.append("adImage", this.adImage[i]);

      }
    }else{
      this.fd.append("adImage", "");

    }
    if (this.billLogo.length > 0) {
      for (var i = 0; i < this.billLogo.length; i++) {
        this.fd.append("billLogo", this.billLogo[i]);

      }
    }else{
      this.fd.append("billLogo", "");

    }
    if (this.societyLogo.length > 0) {
      for (var i = 0; i < this.societyLogo.length; i++) {
        this.fd.append("societyLogo", this.societyLogo[i]);

      }
    }else{
      this.fd.append("societyLogo", "");

    }

    let dataJson = {
      password: this.firstFormGroup.value.password,
      user_type: 'Society',
      parent_id: this.userDetail.data.id,
      email: this.firstFormGroup.value.email,
      userDetail: {
        societyName: this.firstFormGroup.value.name,
        societyDisplayName: this.firstFormGroup.value.societyDisplayName,
        registeredAddress: this.firstFormGroup.value.registeredAddress,
        BillAddress: this.secondFormGroup.value.BillAddress,
        BillName: this.secondFormGroup.value.BillName,
        Registration: this.secondFormGroup.value.Registration,
        GSTINT: this.secondFormGroup.value.GSTINT,
        PAN: this.secondFormGroup.value.PAN,
        TAN: this.secondFormGroup.value.TAN,
        serviceTax: this.secondFormGroup.value.serviceTax,
        contactNumber: this.firstFormGroup.value.contactNumber,
        contactEmail: this.firstFormGroup.value.contactEmail,
        aboutSociety: this.firstFormGroup.value.aboutSociety
      }

    }


    this.fd.append("data", JSON.stringify(dataJson));
    console.log(this.fd)
    this.AppLoaderService.open();

this.Service.societySave(this.fd).subscribe(res=>{
  this.AppLoaderService.close();
  let dataJson = {
    title:'sucess',
    message:'Society Successfully Created'
  }
 this.dialog.success(dataJson);
 this.Router.navigate(['society/List']);
})
}

  updateSociety(){
    let billLogoArray=[];
let imageListArray=[];
let adImageArray=[];
let societyLogoArray=[];
   

    this.fd = new FormData();
    if (this.imageList.length > 0) {
      for (var i = 0; i < this.imageList.length; i++) {
        if(this.imageList[i].size){
          this.fd.append("files", this.imageList[i]);

        }else{
          imageListArray.push(this.imageList[i].name)
        }

      }
    }else{
      this.fd.append("files", "");

    }
    if (this.adImage.length > 0) {
      console.log(JSON.stringify(this.adImage))
      for (var i = 0; i < this.adImage.length; i++) {
        if(this.adImage[i].size){
          this.fd.append("adImage", this.adImage[i]);
          
        }else{
          adImageArray.push(this.adImage[i].name)
        }

      }
    }else{
      this.fd.append("adImage", "");

    }
    if (this.billLogo.length > 0) {
      for (var i = 0; i < this.billLogo.length; i++) {
        if(this.billLogo[i].size){
          this.fd.append("billLogo", this.billLogo[i]);

        }else{
          billLogoArray.push(this.billLogo[i].name);
        }

      }
    }else{
      this.fd.append("billLogo", "");

    }
    if (this.societyLogo.length > 0) {
      for (var i = 0; i < this.societyLogo.length; i++) {
        if(this.societyLogo[i].size){
          this.fd.append("societyLogo", this.societyLogo[i]);

        }else{
           
          societyLogoArray.push(this.societyLogo[i].name)
        }

      }
    }else{
      this.fd.append("societyLogo", "");

    }



    let dataJson = {
      id:this.dataDetail.id,

      password: this.dataDetail.password,
      user_type: 'Society',
      parent_id: this.userDetail.data.id,
      email: this.dataDetail.email,
      uuid:this.dataDetail.uuid,
      userDetail: {
        id:this.dataDetail.societyDetail.id.toString(),
  createdDate:this.dataDetail.createdDate,
        societyName: this.firstFormGroup.value.name,
        societyDisplayName: this.firstFormGroup.value.societyDisplayName,
        registeredAddress: this.firstFormGroup.value.registeredAddress,
        BillAddress: this.secondFormGroup.value.BillAddress,
        BillName: this.secondFormGroup.value.BillName,
        Registration: this.secondFormGroup.value.Registration,
        GSTINT: this.secondFormGroup.value.GSTINT,
        PAN: this.secondFormGroup.value.PAN,
        TAN: this.secondFormGroup.value.TAN,
        serviceTax: this.secondFormGroup.value.serviceTax,
        contactNumber: this.firstFormGroup.value.contactNumber,
        contactEmail: this.firstFormGroup.value.contactEmail,
        aboutSociety: this.firstFormGroup.value.aboutSociety,
        imageListArray:imageListArray,
        billLogoArray:billLogoArray[0],
        societyLogoArray:societyLogoArray[0],
        adImageArray:adImageArray,
        albumId:this.dataDetail.societyDetail.imageList.id.toString(),
        adId:this.dataDetail.societyDetail.adImage.id.toString() 


      } 
    }
    this.fd.append("data", JSON.stringify(dataJson));
    console.log(this.fd)
    this.AppLoaderService.open();

this.Service.societyUpdate(this.fd).subscribe(res=>{
  console.log(JSON.stringify(res))
  if(this.userData.data.user_type == "Society"){
    this.userData.data.societyDetail.societyDisplayName = res.societyDetail.societyDisplayName;
    this.userData.data.societyDetail.societyLogo = res.societyDetail.societyLogo;
  sessionStorage.setItem("data",JSON.stringify(this.userData))
    this.navService.publishNavigationChange(this.userData.data.user_type);
  }


  this.AppLoaderService.close();
  let dataJson = {
    title:'sucess',
    message:'Society Updated Created'
  }
 this.dialog.success(dataJson);
 if(this.userData.data.user_type =="Society"){
   
 }else{
  this.Router.navigate(['society/List']);

 }
})
  }
  remove(index, type) {
    if (type == 'bill') {
       this.billLogo.splice(index, 1);
     }
    if (type == 'logo') {
       this.societyLogo.splice(index, 1);
 
    } if (type == 'ad') {
      this.adImage.splice(index, 1);

     }
    if (type == 'album') {
      this.imageList.splice(index, 1);

     }
    
  }

  
}
