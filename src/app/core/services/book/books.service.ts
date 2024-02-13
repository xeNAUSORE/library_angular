import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//RX
import {Observable} from "rxjs";
//CFG
import { BASE_API_URL } from '../../../config/constants/injection';
//Model
import { Book } from '../../../shared/models/book';

@Injectable({
	providedIn: 'root'
})
export class BooksService {

	constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseUrl: string) {
	}

	getBookList(): Observable<Book[]> { return this.http.get<Book[]>(`${this.baseUrl}/books`) }
	getBook(id: number): Observable<Book> { return this.http.get<Book>(`${this.baseUrl}/books/${id}`) }
	createBook(domain: Book): Observable<Book> { return this.http.post<Book>(`${this.baseUrl}/books`, domain) }
	editBook(domain: Book): Observable<Book> { return this.http.put<Book>(`${this.baseUrl}/books`, domain) }
	deleteBook(id: number): Observable<boolean> { return this.http.delete<boolean>(`${this.baseUrl}/books/${id}`) }

}
