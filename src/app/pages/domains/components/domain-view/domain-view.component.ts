import { Component, OnDestroy, OnInit  } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//MAterial
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
//Component
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { BookListComponent } from '../../../../shared/components/book-list/book-list.component'
//Model
import { Domain } from '../../../../shared/models/domain';
import { Book } from '../../../../shared/models/book';
//Services
import { DomainsService } from '../../../../core/services/domain/domains.service';

@Component({
	selector: 'app-domain-view',
	standalone: true,
	imports: [TitlePageComponent, BookListComponent, MatCardModule, MatListModule, RouterLink, MatButtonModule, MatIconModule, MatChipsModule, NgIf],
	templateUrl: './domain-view.component.html',
	styleUrl: './domain-view.component.scss'
})
export class DomainViewComponent implements OnDestroy, OnInit {
	////////////////////////////////////////
	// Properties
	isDataloaded: boolean = false
	domain!: Domain 
	domainBooks: Book[]  = [] 
	
	private domainSubscription!: Subscription

	constructor(private domainsService: DomainsService, private router: Router, private activatedRoute: ActivatedRoute){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/domains')
		else {
			const id = parseInt(paramId)
			this.domainSubscription = this.domainsService.getDomain(id).subscribe({
				next: (data) => { 
					this.domain = data
					this.domainBooks = data.books ?? []
					this.isDataloaded = true
				},
				error: (err) => { this.router.navigateByUrl('/domains') }
			})
		}
	}
	ngOnDestroy(): void{
		if(this.domainSubscription)
			this.domainSubscription.unsubscribe()
	}
}
