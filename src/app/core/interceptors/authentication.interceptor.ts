import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
//RX
import { Observable } from "rxjs";
//Services
import { AuthService } from "../services/authentication/auth.service"

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
	const authService = inject(AuthService);
	let token = null //authService.getToken();

	if (token) {
		token = `Bearer ${token}`

		const cloned = req.clone({
			setHeaders: {
				authorization: token,
			},
		});

		return next(cloned);  
	} 
	else return next(req);
};