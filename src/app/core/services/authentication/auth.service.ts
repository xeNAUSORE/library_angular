import { Inject, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of, Observable, BehaviorSubject} from "rxjs";
//CFG
import { BASE_API_URL } from '../../../config/constants/injection';
//Models
import { User } from '../../../shared/models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseUrl: string) {
	}

	getAuthenticatedRefresh(): Observable<boolean> {
		return this.isAuth.asObservable()
	}
	
	setAuthenticatedRefresh(isAuth: boolean): void {
		return this.isAuth.next(isAuth)
	}

	login(user: any): Observable<User> {
		return this.http.post<User>(`${this.baseUrl}/admins/login`, user);
	}

	logout(): Observable<boolean>{
		localStorage.removeItem('authenticatedUser')
		return of(true)
	}
	
	createAccount(user: any): Observable<User> {
		return this.http.post<User>(`${this.baseUrl}/members`, user);
	}

	isAuthenticated(){
		return localStorage.getItem('authenticatedUser') != null
	}

	getToken(){
		const user = localStorage.getItem('authenticatedUser') ?? null
		return user != null ? JSON.parse(user) : null 
	}
}
