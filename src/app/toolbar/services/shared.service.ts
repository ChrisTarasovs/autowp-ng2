import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class SharedColorService {
   //private colorHex: any;
   	

	 // Observable string sources
	private colorHex = new Subject<string>();  

	
	 //Need an api that calls user pre set colors
	 colors =   ['#000fff', '#fff000', '#dedede'];
	 arrayColors = {color: '#fff000'}

	  // Observable string streams
	colorHex$ = this.colorHex.asObservable();

	lastSelectColorSource = new Subject<string>();
	lastSelectColor$ = this.lastSelectColorSource.asObservable();



	 // Service message commands
	 publishData(data: string) {
		this.colorHex.next(data);
	 }
	 colorChaged(data: string){
		this.lastSelectColorSource.next(data)
	 }

	
}
