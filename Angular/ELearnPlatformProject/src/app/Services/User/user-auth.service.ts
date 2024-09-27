import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

   private authSubject:BehaviorSubject<boolean>
  constructor( private rout:ActivatedRoute , private  Clinent:HttpClient) {

 this.authSubject=new BehaviorSubject<boolean>(false)


  }



  login(email: string, password: string): void {
    const user = { Email: email, Password: password };


    this.Clinent.post<any>(`${environment.baseUrl}Account/Login`, user).subscribe({
      next: (d) => {
        const token = d.token;
        const returnURL = this.rout.snapshot.queryParamMap.get('returnURL') || '/';
        localStorage.setItem('token', token);

        this.authSubject.next(true);
      },
      error: (e) => {
       
        this.authSubject.next(false);
      }
    });
  }


  Logout(){

   // localStorage.removeItem("token");

    this.authSubject.next(false)

     }

     getUserLogged():boolean{
    //                  اكيد هنتحقق ف الاول
      return  localStorage.getItem("token")?true:false
     }

 getAthSubject():BehaviorSubject<boolean>{

    return this.authSubject
 }
getToken(){

  return localStorage.getItem("token")?localStorage.getItem("token"):null
}

}
