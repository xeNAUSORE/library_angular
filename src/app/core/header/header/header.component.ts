import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//Material
import { MatToolbar } from "@angular/material/toolbar";
import { MatAnchor } from "@angular/material/button";
//Service
import { AuthService } from '../../services/authentication/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [ MatToolbar, MatAnchor, NgIf, RouterLink ] ,
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
	isAuthenticated = false
	
	private authSubscription!: Subscription

	constructor(private authService: AuthService, private router: Router) {
	}

	ngOnInit(): void{
		let isAuthOldValue = this.isAuthenticated
		this.authSubscription = this.authService.getAuthenticatedRefresh().subscribe((value: boolean) => {
			if(value) this.isAuthenticated = value
			else this.isAuthenticated = this.authService.isAuthenticated()
		})

		if(isAuthOldValue != this.isAuthenticated) this.authService.setAuthenticatedRefresh(this.isAuthenticated)
	}

	logout(){
		this.authService.logout().subscribe(res => {
			this.authService.setAuthenticatedRefresh(false);
			this.router.navigateByUrl('/auth/login')
		})
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe()
	}
}
