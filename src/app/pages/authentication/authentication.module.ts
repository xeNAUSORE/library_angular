import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routing
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		LoginComponent,
	]
})
export class AuthenticationModule { }
