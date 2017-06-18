import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {canvasService} from './canvas.service'

@Injectable()
export class toolbarStateService {
	constructor(private _canvasService :canvasService ){
		if(this._canvasService.canvas == []]){
			this.viewBuilder = true;
		}
	}

          viewWysiwyg: boolean = true;
          viewImgAlignment: boolean = true;
          viewBuilder: boolean = true;
          viewBtnSettings: boolean = true;
          viewMiscellaneous: boolean = true;


          enable(menutype: string){
          	 if(menutype == 'viewWysiwyg')  this.viewWysiwyg = true;

          }

	dndDraggedSource = new Subject<string>();
	newDragged$ = this.dndDraggedSource.asObservable();
	addDraggedItem(widget)  {
		this.dndDraggedSource.next(widget)
	}

}