import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../Services/User/user-auth.service';
import { ɵnormalizeQueryParams } from '@angular/common';

export const authGuard: CanActivateFn = (route, state:RouterStateSnapshot) => {

  let aut= inject(UserAuthService)
  let rout= inject(Router)

  if (aut.getUserLogged()) {
      return true;
    }
    else{

     rout.navigate(['/Login']) ,{queryParams:{returnURL:state.url}}
      return false;
    }




};
