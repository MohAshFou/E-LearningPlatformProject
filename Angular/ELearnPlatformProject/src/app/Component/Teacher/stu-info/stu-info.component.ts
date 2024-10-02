import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthService } from '../../../Services/User/user-auth.service';

@Component({
  selector: 'app-stu-info',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './stu-info.component.html',
  styleUrl: './stu-info.component.css'
})
export class StuInfoComponent  implements OnInit{

  Name:string="Mohamed"
  Number:number=15;
  constructor(private service:UserAuthService){


  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
    this.service.getRoleAndName().subscribe({
     next: (d) => {
        this.Name= d.username
     },
     error: (e: any) => {

     }
   });

   }
  }


}
