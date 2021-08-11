import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  isTrue : boolean = true;

  statesApiData : any;
  districtsApiData : any;

  

  useremail  = sessionStorage.getItem('email');

  welcomeForm : any

  
  
  constructor(private userService: UserService, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.welcomeForm = new FormGroup({
      statename: new FormControl(""),
      districtname : new FormControl("")
    });
    this.getAllStates();
  }
  getAllStates(){
    this.userService.getStates().subscribe(
      (data : any) =>{
        this.statesApiData = data.states;
        console.log(this.statesApiData);
      },
      (err: any) =>{
        this.snackbar.open("No Data found", '', {duration:3000});
      }
    );
  }
  getAllDistricts(id : any){ 
    this.userService.getDistrcts(id).subscribe(
      (data : any) =>{
        this.districtsApiData = data.districts;
        console.log(this.districtsApiData);
      },
      (error : any)=>{
        this.snackbar.open("Error While Retriving", "", {duration:5000});
      }
    );

  }
  loadDistrict(stateId: any){
    console.log(stateId);
    this.getAllDistricts(stateId);
  }

}
