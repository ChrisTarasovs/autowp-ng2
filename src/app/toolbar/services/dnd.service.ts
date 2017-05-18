import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class dndService {
	dndDraggedSource = new Subject<string>();
	newDragged$ = this.dndDraggedSource.asObservable();
	addDraggedItem(widget)  {
		this.dndDraggedSource.next(widget)
	}


}