import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { WelcomeComponent } from '../welcome/welcome.component';
import { UserModel } from '../models/usermodel';
import { LoginErrorComponent } from '../login-error/login-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  loginFormData = new UserModel();
  postData : any;
  loginForm : any;
  constructor(private router: Router, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl(),
      password : new FormControl(),
    })
  }
  submit(form : any): any{
    this.isSubmitted=true;
    console.log(form);
    this.loginFormData.email = form.value.email;
    this.loginFormData.password = form.value.password;
    this.userService.loginUser(this.loginFormData).subscribe(
      (data : any) =>{
        this.postData = data;
        sessionStorage.setItem('email', form.value.email);
        this.router.navigateByUrl('/dashboard');
      },
      (err: any) =>{
        this.dialog.open(LoginErrorComponent);
      }
    );
    
  }
  openDialog(){
    this.dialog.open(WelcomeComponent);
  }

}
