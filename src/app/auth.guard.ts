import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthgoogleService } from './authgoogle.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService: AuthgoogleService = Inject(AuthgoogleService);
  const router: Router = Inject(Router);

  const isLoggedIn = loginService.getLoggedProfile();

  if (isLoggedIn) {
    return true;
  }

  router.navigate(['']);
  return false;
};
