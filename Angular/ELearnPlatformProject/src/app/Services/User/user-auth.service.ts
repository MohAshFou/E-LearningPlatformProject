import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

   private authSubject:BehaviorSubject<boolean>
  constructor( private rout:ActivatedRoute) {

 this.authSubject=new BehaviorSubject<boolean>(false)

  }



  login(){
    //  to return 

    let retuURL=this.rout.snapshot.queryParamMap.get('returnURL') ||'/'

     //localStorage.setItem("token","gghhhhhhhhhhhhhhhh");



      // send true all in subicribe
      this.authSubject.next(true)

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
