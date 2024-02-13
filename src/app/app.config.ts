import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { BASE_API_URL } from './config/constants/injection'
import { authenticationInterceptor } from './core/interceptors/authentication.interceptor'
import { environment } from './config/environments/environment.development'

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([authenticationInterceptor])),
		{
			provide: BASE_API_URL,
			useValue: environment.BASE_API_URL,
		}, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
	],
};
