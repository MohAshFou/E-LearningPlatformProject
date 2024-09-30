import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {




   Controller ='Account/'

   private authSubject:BehaviorSubject<boolean>
  constructor( private rout:ActivatedRoute , private  Clinent:HttpClient) {

    this.authSubject=new BehaviorSubject<boolean>(false)


  }

  login(email: string, password: string):Observable<any> {
    const user = { Email: email, Password: password };

     return  this.Clinent.post<any>(`${environment.baseUrl}${this.Controller}Login`, user);
  }

  Logout(){

    localStorage.removeItem("token");
    localStorage.removeItem('mm');

    this.authSubject.next(false)

     }

    getUserLogged():boolean{
      return  localStorage.getItem("token")?true:false
     }

 getAthSubject():BehaviorSubject<boolean>{

    return this.authSubject
 }
getToken(){

  return localStorage.getItem("token")?localStorage.getItem("token"):null
}


getRoleAndName(): Observable<any> {

  return this.Clinent.get<any>(`${environment.baseUrl}${this.Controller}getuserinfo`);
}



}









