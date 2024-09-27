import { Component } from '@angular/core';
import { UserAuthService } from '../../../Services/User/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( private ser:UserAuthService){}
  st:string=""

  log(e:any,s:any){
   let x=    this.ser.login(e,s)
      if (x === true) {
                  this.st= "done"
           return
      }

        this.st= "invaild"
  }

}
