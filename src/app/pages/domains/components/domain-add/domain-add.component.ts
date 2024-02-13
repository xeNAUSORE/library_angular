import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
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

@Component({
	selector: 'app-domain-add',
	standalone: true,
	imports: [DomainFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './domain-add.component.html',
	styleUrl: './domain-add.component.scss'
})
export class DomainAddComponent implements OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private domainSubscription!: Subscription

	constructor(private domainsService: DomainsService, private router: Router){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnDestroy(): void{
		if(this.domainSubscription)
			this.domainSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode création de domain emit
	// Emit par le component enfant (domain-form) au submit
	addDomain(domain: any){
		this.domainSubscription = this.domainsService.createDomain(domain).subscribe({
			next: (data) => { this.router.navigateByUrl('/domains') },
			error: (err) => { this.hasError = true }
		})
	}
}
