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
         let r="fvbgfnmnm@#$"+d.role+"cvb@@#$asdfghnm,,mnbvcx34@#$bghhhtgrgthyh;lkjhgfdsxcvbnm"
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

}
