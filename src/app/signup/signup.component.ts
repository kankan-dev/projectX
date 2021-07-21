import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from '../models/usermodel';
import { Genders } from '../models/gendermodel';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm : any ;
  allUsers : any;
  userFormData = new UserModel();
  isSubmitted:boolean = false;

  isNotMatching:boolean = false;
  
  gender = [
    {
      value: 'Male',
      name: 'Male'
    },
    {
      value: 'Female',
      name: 'Female'
    },
    {
      value:'Other',
      name: 'Other'
    }
  ];
  constructor(private userService: UserService, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      uname : new FormControl(""),
      email : new FormControl(""),
      address : new FormControl(""),
      phone : new FormControl(""),
      gender : new FormControl(""),
      dob : new FormControl(""),
      password : new FormControl(""),
      cpassword : new FormControl("")
    });
    this.getAllUsers();
    

  }
  submit(form:any) : any{
    this.isSubmitted=true;
    console.log(form);
    if(form.value.password == form.value.cpassword){
      this.isNotMatching = false;
      if(form.valid){
        this.userFormData.address = form.value.address;
        this.userFormData.dob = form.value.dob;;
        this.userFormData.email = form.value.email;
        this.userFormData.gender = form.value.gender;;
        this.userFormData.password = form.value.password;
        this.userFormData.phone = form.value.phone;
        this.userFormData.uname = form.value.uname;
        
        this.userService.createUser(this.userFormData).subscribe(
          (data : any)=>{
            console.log(data);
           this.snackbar.open("Account Created Successfully!! Log in to visit dashboard", " ", {duration:5000})
          },
          (err:any) =>{
            console.log(err);
            this.snackbar.open("Same Username or Email Id already exists!", "", {duration:5000})
          }
        );
  
      }else{
        return;
      }
      
    }else{
      this.isNotMatching=true;
    }
   
  }
  
  getAllUsers(){
     this.userService.getUsers().subscribe(
       (data:any) =>{
         this.allUsers = data;
         console.log(this.allUsers);
       },
       (err:any) =>{
         console.log(err);
       }
     );
  }
  resetForm(){
    this.signupForm.reset();
    this.isSubmitted = false;
  }
  checkPassword(){
    if(this.signupForm.controls.cpassword.touched){
      if(this.signupForm.value.password == this.signupForm.value.cpassword){
        this.isNotMatching= false;
      }
      else{
        this.isNotMatching = true; 
      }
    }
    
    
  }
  

}
