import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class webService {

	public web = [
		{
			name: 'Chris Tarasovs Developer',
			themecolors: [ '000fff', '000ddd', '807b37'],
			fontfamilly: 'Arial',
			cms: 'WordPress'
		}
	]

	loadCanvasSource = new Subject<string>();
	newCanvas$ = this.loadCanvasSource.asObservable();

}