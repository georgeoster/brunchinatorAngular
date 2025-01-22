import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { inject } from '@angular/core';
import { ROUTE_NAMES } from './utils/types/globalsConsts';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.isLoggedIn) {
    return true;
  }
  router.navigateByUrl(ROUTE_NAMES.SIGN_IN);
  return false;
};
