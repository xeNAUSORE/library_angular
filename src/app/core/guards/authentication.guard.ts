import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { Router } from "@angular/router";
//Service
import { AuthService } from '../services/authentication/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
	const auth = inject(AuthService);
	const router = inject(Router);
  
	if(!auth.isAuthenticated()){
		router.navigateByUrl('/auth/login')
		return false
	}
	
	return true
};
