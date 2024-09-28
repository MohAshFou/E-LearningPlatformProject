import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthService } from '../../../../Services/User/user-auth.service';

@Component({
  selector: 'app-nav-par',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './nav-par.component.html',
  styleUrl: './nav-par.component.css'
})
export class NavParComponent {
  Name:string="Mohamed"
  constructor(private service:UserAuthService){


  }

  ngOnInit(): void {
    this.service.getRoleAndName().subscribe({
     next: (d) => {
        this.Name= d.username
     },
     error: (e: any) => {

     }
   });
   }



}
