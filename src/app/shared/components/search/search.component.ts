import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
//Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [FormsModule,MatFormFieldModule,MatInputModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent {
	////////////////////////////////////////
	// Properties
	@Output() newSearchEvent =  new EventEmitter()
	searchText: string = ''

	OnChange(){
		this.newSearchEvent.emit(this.searchText)
	}
}
