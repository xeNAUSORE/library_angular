import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search',
	standalone: true
})
export class SearchPipe implements PipeTransform {
	transform(items: any[], searchText: string): any[] {
		if (!items) return [];
		if (!searchText) return items;
		if (searchText == "") return items;

		searchText = searchText.toLowerCase();

		const result = items.filter(o => Object.keys(o).some(k => {
				if(typeof(o[k]) === 'string') 
					return o[k].toLowerCase().includes(searchText)
			}))
		
		return result.length > 0 ? result : [{ noresult: 'Aucun résultat'}] 
	}
}


