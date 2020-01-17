import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthService} from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss']
})
export class Signin2Component implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder,private AuthService:AuthService,private Router:Router) {}
  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
    this.signupForm = this.fb.group(
      {
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }
  signin(){
    if(this.signupForm.valid){
       this.AuthService.login(this.signupForm.value).subscribe(res=>{
        if(res.status){
          sessionStorage.setItem('data',JSON.stringify(res));
          if(res.data.user_type == 'SuperAdmin'){
            
            this.Router.navigate(['dashboard/Admin']);

          }
          if(res.data.user_type == 'Admin'){
            this.Router.navigate(['dashboard/Group']);

          }
          if(res.data.user_type == 'Resident'){
            this.Router.navigate(['dashboard/Resident']);

          }
          if(res.data.user_type == 'Staff'){
            this.Router.navigate(['dashboard/Staff']);

          }
          if(res.data.user_type == 'Society'){
            this.Router.navigate(['dashboard/Society']);

          }
          if(res.data.user_type == 'FamilyMember'){
            this.Router.navigate(['dashboard/Resident']);

          }
        }else{
          alert(res.messasge)
        }
      })

    }else{

    }
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
    }
  }
}
