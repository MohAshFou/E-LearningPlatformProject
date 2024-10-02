import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Student } from '../../Models/Student/student';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
   Controller = 'Account/';
   private authSubject: BehaviorSubject<boolean>;

   constructor(private client: HttpClient) {
     this.authSubject = new BehaviorSubject<boolean>(false);
   }

   login(email: string, password: string): Observable<any> {
     const user = { Email: email, Password: password };
     return this.client.post<any>(`${environment.baseUrl}${this.Controller}Login`, user);
   }

   logout() {
     localStorage.removeItem("token");
     localStorage.removeItem('mm');
     this.authSubject.next(false);
   }

   getUserLogged(): boolean {
     return !!localStorage.getItem("token");
   }

   getAuthSubject(): BehaviorSubject<boolean> {
     return this.authSubject;
   }

   getToken(): string | null {
     return localStorage.getItem("token");
   }

   getRoleAndName(): Observable<any> {
     return this.client.get<any>(`${environment.baseUrl}${this.Controller}getuserinfo`);
   }

   registerStudent(student: Student): Observable<any> {
     return this.client.post(`${environment.baseUrl}${this.Controller}register`, student);
   }

   ISExpired(): Observable<any> {
     return this.client.get(`${environment.baseUrl}${this.Controller}ISExpired`);
   }
}
