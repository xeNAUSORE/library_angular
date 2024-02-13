import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routing
import { DomainsRoutingModule } from './domains-routing.module';
//Component
import { DomainListComponent } from './components/domain-list/domain-list.component';
import { DomainViewComponent } from './components/domain-view/domain-view.component';
import { DomainAddComponent } from './components/domain-add/domain-add.component';

@NgModule({
	declarations: [],
	imports: [
		CommonModule, 
		DomainsRoutingModule,
		DomainListComponent,
		DomainViewComponent,
		DomainAddComponent
	],
})
export class DomainsModule { }
