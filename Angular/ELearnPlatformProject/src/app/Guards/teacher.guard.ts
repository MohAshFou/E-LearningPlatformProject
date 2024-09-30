import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../Services/User/user-auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
export const teacherGuard:  CanActivateFn = async (route, state:RouterStateSnapshot) => {

  const aut = inject(UserAuthService);
  const rout = inject(Router);

    let role = localStorage.getItem('mm')

    if ( role?.charAt(25) === 'T') {
            return true;
          } else {
            rout.navigate(['/Login']);
            return false;
          }
  }
