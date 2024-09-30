import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../Services/User/user-auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
  const aut = inject(UserAuthService);
  const rout = inject(Router);

  // return aut.getRoleAndName().pipe(
  //   map(d => {
  //     if (d.role && d.role.toUpperCase() === 'A') {
  //       return true;
  //     } else {
  //       rout.navigate(['/Login']);
  //       return false;
  //     }
  //   }),
  //   catchError(() => {
  //     rout.navigate(['/Login']);
  //     return of(false);
  //   })
  // );

let role = localStorage.getItem('mm')

if ( role?.charAt(25)=== 'A') {
        return true;
      } else {
        rout.navigate(['/Login']);
        return false;
      }


};
