import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablesService } from '../manage-society/manage-society.service';
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-notice-post',
  templateUrl: './notice-post.component.html',
  styleUrls: ['./notice-post.component.scss']
})
export class NoticePostComponent implements OnInit {
  firstFormGroup: FormGroup;
  pageType: any;
  societyLogo: any = []
  categoryList: any;
  flatList: any = [];
  complainImage: any = [];
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
    this.Service.getCategoryResidentList((sessionStorage.getItem('uuId'))).subscribe(res => {
      this.categoryList = res;
    })
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
       window.open(environment.LOCAL_BASE+"/images/"+bill.name);
    }
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
      noticeTo: ['']
    })
  }
  // "residentUuid":"966436d6-b1ff-445f-97e1-a5b62f8a147e",
  // "unitUuid":"0fa7e2b7-1f29-4047-8eee-1fa9db867f92",
  // "categoryUuid":"3e3e1288-c749-47ff-b72c-251a6a93c778"
  public hasfirstError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }



  categoryDetail(id: any) {

    this.Service.noticeGetDetail(id).subscribe(res => {
      this.updateForm(res);
    })
  }

  updateForm(res) {
    console.log(JSON.stringify(res))
    this.complainImage = [];
    if(res.image){
      for(var i=0;i<res.image.length ;i++){
         this.complainImage.push({
          name:res.image[i].split('/')[2]
        })
      }
    } 
    this.firstFormGroup = this.fb.group({
      noticeId:[res.id],
      title: [res.title, [
        Validators.required
      ]
      ],
      description: [res.description],
       noticeTo: [res.noticeTo]
    })
  }
  ngOnInit() {
    this.categoryGetList();
   }
  createCategory() {
    this.fd = new FormData(); 
    this.firstFormGroup.value.id = JSON.parse(sessionStorage.getItem("data")).data.id;
    console.log(JSON.stringify(this.firstFormGroup.value))
    this.fd.append("data", JSON.stringify(this.firstFormGroup.value));
 let societyLogoArray =[];
if (this.complainImage.length > 0) {
  for (var i = 0; i < this.complainImage.length; i++) {
    if(this.complainImage[i].size){
      this.fd.append("files", this.complainImage[i]);

    }else{
       
      societyLogoArray.push(this.complainImage[i].name)
    }

  }
}else{
  this.fd.append("files", "");

} 
console.log(this.firstFormGroup.value)
    this.AppLoaderService.open();

    this.Service.noticeAdd(this.fd
    ).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'success',
        message: 'Notice Successfully Added'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Notice/List']);
    })

  }
  updateCategory() {
    this.fd = new FormData();
 
    let societyLogoArray =[];

    for (var i = 0; i < this.complainImage.length; i++) {
      if (this.complainImage[i].size) {
        this.fd.append("files", this.complainImage[i]);
      }else{
       
        societyLogoArray.push(this.complainImage[i].name)
      }
    }
    this.firstFormGroup.value.images = societyLogoArray;
    console.log(JSON.stringify(this.firstFormGroup.value));
    this.fd.append("data", JSON.stringify(this.firstFormGroup.value));
    this.AppLoaderService.open();

    this.Service.noticeUpdate(this.fd
    ).subscribe(res => {
      this.AppLoaderService.close();
      let dataJson = {
        title: 'Success',
        message: 'Notice Successfully Updated'
      }
      this.dialog.success(dataJson);
      this.Router.navigate(['Notice/List']);
    })

  }
}
