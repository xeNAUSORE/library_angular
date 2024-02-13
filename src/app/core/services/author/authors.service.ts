import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//RX
import {Observable} from "rxjs";
//Model
import { Author } from '../../../shared/models/author';
//CFG
import { BASE_API_URL } from '../../../config/constants/injection';

@Injectable({
	providedIn: 'root'
})
export class AuthorsService {

	constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseUrl: string) {
	}

	getAuthorList(): Observable<Author[]> { return this.http.get<Author[]>(`${this.baseUrl}/authors`) }
	getAuthor(id: number): Observable<Author> { return this.http.get<Author>(`${this.baseUrl}/authors/${id}`) }
	createAuthor(author: Author): Observable<Author> { return this.http.post<Author>(`${this.baseUrl}/authors`, author) }
	editAuthor(author: Author): Observable<Author> { return this.http.put<Author>(`${this.baseUrl}/authors/${author.id}`, author) }
	deleteAuthor(id: number): Observable<boolean> { return this.http.delete<boolean>(`${this.baseUrl}/authors/${id}`) }
}
