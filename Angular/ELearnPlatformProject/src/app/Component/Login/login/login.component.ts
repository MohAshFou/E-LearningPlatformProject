import { Component } from '@angular/core';
import { UserAuthService } from '../../../Services/User/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( private ser:UserAuthService , private rou:Router){}

   err=""
   log(email: string, password: string) {
    this.ser.login(email, password).subscribe({
      next: (d) => {
        const token = d.token;
        localStorage.setItem('token', token);
        let randomStr=  this.generateRandomString(50)
        let leftStrin=randomStr.substring(0,randomStr.length/2)
        let RigStrin=randomStr.substring(randomStr.length/2,randomStr.length-1)
         let r=leftStrin+d.role+RigStrin
     console.log(r)
        localStorage.setItem('mm', r);
        this.goTopag(d.role);
      },
      error: (e: any) => {
        this.err = "The username or password is incorrect";
      }
    });
  }

  goTopag(role:string){

    if (role.toUpperCase()=='A') {
      this.rou.navigate(['/admin'])
      return
    }
    if (role.toUpperCase()=='S') {
      this.rou.navigate(['/student'])
      return
    }
    if (role.toUpperCase()=='T') {
      this.rou.navigate(['/teacher'])
      return
    }


  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkl#@!$%^&&(*)_+_mnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
