import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//Components
import { DomainFormComponent } from '../domain-form/domain-form.component'
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
//Services
import { DomainsService } from '../../../../core/services/domain/domains.service';
import { Domain } from '../../../../shared/models/domain';

@Component({
	selector: 'app-domain-edit',
	standalone: true,
	imports: [DomainFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './domain-edit.component.html',
	styleUrl: './domain-edit.component.scss'
})
export class DomainEditComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	isDataLoaded: boolean = false
	hasError: boolean = false
	
	private domainSubscription!: Subscription
	//pour test sans API
	domain!: Domain	

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
					this.isDataLoaded = true
				},
				error: (err) => { this.router.navigateByUrl('/domains') }
			})
		}
	}
	ngOnDestroy(): void{
		if(this.domainSubscription)
			this.domainSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode edition de domain emit
	// Emit par le component enfant (domain-form) au submit
	editDomain(domain: any){
		this.domainSubscription = this.domainsService.editDomain(domain).subscribe({
			next: (data) => { this.router.navigateByUrl('/domains') },
			error: (err) => { this.hasError = true }
		})
	}
}
