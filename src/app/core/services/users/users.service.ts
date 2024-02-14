import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//RX
import {Observable} from "rxjs";
//Model
import { User } from '../../../shared/models/user';
//CFG
import { BASE_API_URL } from '../../../config/constants/injection';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseUrl: string) {
	}

	getUserList(): Observable<User[]> { return this.http.get<User[]>(`${this.baseUrl}/lectors`) }
	getUser(id: number): Observable<User> { return this.http.get<User>(`${this.baseUrl}/lectors/${id}`) }
	createUser(user: User): Observable<User> { return this.http.post<User>(`${this.baseUrl}/lectors`, user) }
	editUser(user: User): Observable<User> { return this.http.put<User>(`${this.baseUrl}/lectors/`, user) }
	deleteUser(id: number): Observable<boolean> { return this.http.delete<boolean>(`${this.baseUrl}/lectors/${id}`) }
}