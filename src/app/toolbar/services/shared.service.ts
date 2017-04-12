import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class SharedColorService {
   //private colorHex: any;

	 // Observable string sources
	private colorHex = new Subject<string>();  
	

	  // Observable string streams
	colorHex$ = this.colorHex.asObservable();
	//colors$ = this.colors.asObservable();

	 // Service message commands
	 publishData(data: string) {
	    this.colorHex.next(data);
	 }
	 colorChaged(ev){
	    this.colorHex.next(ev);
	 }

	 //Need an api that calls user pre set colors
	 colors =   ['#000fff', '#fff000', '#dedede'];
	 arrayColors = {color: '#fff000'}
	
}
