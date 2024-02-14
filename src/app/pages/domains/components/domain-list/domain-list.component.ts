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
import { EmptyResultCardComponent } from '../../../../shared/components/empty-result-card/empty-result-card.component';
//Services
import { DomainsService } from '../../../../core/services/domain/domains.service';
//Pipes
import { SearchPipe } from '../../../../shared/pipes/search.pipe';

@Component({
	selector: 'app-domain-list',
	standalone: true,
	providers:[SearchPipe],
	imports: [TitlePageComponent, SearchComponent, EmptyResultCardComponent, SearchPipe, ErrorCardComponent, MatCardModule, MatListModule, RouterLink, NgFor,NgIf, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './domain-list.component.html',
	styleUrl: './domain-list.component.scss'
})
export class DomainListComponent implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	isDataLoaded: boolean = false
	hasError: boolean = false
	searchText: string = ''
	domains: Domain[] = [] 
	private domainSubscription!: Subscription

	constructor(private domainsService: DomainsService, private dialog: MatDialog){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		this.domainSubscription = this.domainsService.getDomainList().subscribe({
			next: (data) => { 
				this.domains = data
				this.isDataLoaded = true
			},
			error: (err) => { this.hasError = true }
		})
	}
	ngOnDestroy(): void{
		if(this.domainSubscription)
			this.domainSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode delete de domain 
	deleteDomain(id: number){
		this.domainSubscription = this.domainsService.deleteDomain(id).subscribe({
			next: (data) => { this.domains = this.domains.filter(d => d.id != id) },
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
