import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//RX
import {Observable} from "rxjs";
//Model
import { Domain } from '../../../shared/models/domain';
//CFG
import { BASE_API_URL } from '../../../config/constants/injection';

@Injectable({
	providedIn: 'root'
})
export class DomainsService {

	constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseUrl: string) {
	}

	getDomainList(): Observable<Domain[]> { return this.http.get<Domain[]>(`${this.baseUrl}/domains`) }
	getDomain(id: number): Observable<Domain> { return this.http.get<Domain>(`${this.baseUrl}/domains/${id}`) }
	createDomain(domain: Domain): Observable<Domain> { return this.http.post<Domain>(`${this.baseUrl}/domains`, domain) }
	editDomain(domain: Domain): Observable<Domain> { return this.http.put<Domain>(`${this.baseUrl}/domains/${domain.id}`, domain) }
	deleteDomain(id: number): Observable<boolean> { return this.http.delete<boolean>(`${this.baseUrl}/domains/${id}`) }
}
