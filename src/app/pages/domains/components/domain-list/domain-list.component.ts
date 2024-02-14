import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'
import { NgFor, NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//MAterial
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';

//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { Domain } from '../../../../shared/models/domain';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ModalConfirmDeleteComponent } from '../../../../shared/components/modal-confirm-delete/modal-confirm-delete.component';
//Services
import { DomainsService } from '../../../../core/services/domain/domains.service';
//Pipes
import { SearchPipe } from '../../../../shared/pipes/search.pipe';

@Component({
	selector: 'app-domain-list',
	standalone: true,
	providers:[SearchPipe],
	imports: [TitlePageComponent, SearchComponent, SearchPipe, ErrorCardComponent, MatCardModule, MatListModule, RouterLink, NgFor,NgIf, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './domain-list.component.html',
	styleUrl: './domain-list.component.scss'
})
export class DomainListComponent implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	searchText: string = ''
	domains: Domain[] = [
		{
			id:1,
			name:'Science fiction',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, erat non gravida faucibus, diam nisl aliquam quam, eu lacinia elit purus nec eros. Proin eget vulputate lectus.',
			books: [
				{ 
					id:1, 
					title:'Star wars', 
					description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, erat non gravida faucibus, diam nisl aliquam quam, eu lacinia elit purus nec eros. Proin eget vulputate lectus.',
					author: null,
					rentals: null,
					domain:null
				}
			]
		},
		{
			id:2,
			name:'Polar',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, erat non gravida faucibus, diam nisl aliquam quam, eu lacinia elit purus nec eros. Proin eget vulputate lectus.',
			books: [
				{ 
					id:1, 
					title:'ça', 
					description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, erat non gravida faucibus, diam nisl aliquam quam, eu lacinia elit purus nec eros. Proin eget vulputate lectus.',
					author: null,
					rentals: null,
					domain:null
				}
			]
		}
	]
	private domainSubscription!: Subscription

	constructor(private domainsService: DomainsService, private dialog: MatDialog){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		this.domainSubscription = this.domainsService.getDomainList().subscribe(v => console.log(v))//this.domains = v)
	}
	ngOnDestroy(): void{
		if(this.domainSubscription)
			this.domainSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode delete de domain 
	deleteDomain(id: number){
		this.domainSubscription = this.domainsService.deleteDomain(id).subscribe({
			next: (data) => {  },
			error: (err) => { this.hasError = true }
		})
	}
	////////////////////////////////////////
	// Méthode search  domain  emit par le component search
	searchDomain(search: string){
		this.searchText = search
	}

	////////////////////////////////////////
	//Open confirm delete
	openDialog(domain: Domain) {
		const dialogRef = this.dialog.open(ModalConfirmDeleteComponent,{
			data:{
				title: 'un domaine',
				message: `le domaine ${domain.name}`,
			}
		});

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
		  	if (confirmed) {
				this.deleteDomain(domain.id)
				dialogRef.close();
		  	}
		});
	}
	
}
