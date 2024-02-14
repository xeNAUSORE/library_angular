import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//RX
import {Observable} from "rxjs";
//Model
import { Rental } from '../../../shared/models/rental';
//CFG
import { BASE_API_URL } from '../../../config/constants/injection';

@Injectable({
	providedIn: 'root'
})
export class RentalsService {

	constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseUrl: string) {
	}

	getRentalList(): Observable<Rental[]> { return this.http.get<Rental[]>(`${this.baseUrl}/rentals`) }
	getRental(id: number): Observable<Rental> { return this.http.get<Rental>(`${this.baseUrl}/rentals/${id}`) }
	createRental(rental: Rental): Observable<Rental> { return this.http.post<Rental>(`${this.baseUrl}/rentals`, rental) }
	editRental(rental: Rental): Observable<Rental> { return this.http.put<Rental>(`${this.baseUrl}/rentals`, rental) }
	deleteRental(id: number): Observable<boolean> { return this.http.delete<boolean>(`${this.baseUrl}/rentals/${id}`) }

	returnRental(rental: any): Observable<Rental> { return this.http.put<Rental>(`${this.baseUrl}/rentals/returnBook/${rental.id}`, rental) }
}