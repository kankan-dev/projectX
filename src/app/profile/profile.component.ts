import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/usermodel';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email : any;
  user : any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.userService.getUserByEmail(this.email).subscribe(
      (data : any)=>{
        this.user = data;
        console.log(this.user);
      },
      (err: any)=>{
        console.log(err);
      }
    );


  }
  


}
