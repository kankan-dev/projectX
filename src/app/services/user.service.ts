import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/usermodel';


const URL = environment.apiURL;
const GET_USERS = "root/users"
const CREATE_USER = "root/newuser"
const LOGIN = "root/login"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }
 
  getUsers(){
    return this.httpClient.get(`${URL}${GET_USERS}`);
  }
  createUser(user : UserModel){
    
    return this.httpClient.post(`${URL}${CREATE_USER}`,user);

  }
  loginUser(user : UserModel){
    return this.httpClient.post(`${URL}${LOGIN}`,user);
  }
}
