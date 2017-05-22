import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class canvasService {

	public canvas = []

	loadCanvasSource = new Subject<string>();
	newCanvas$ = this.loadCanvasSource.asObservable();

	// this.loadCanvasSource.next();

	/* HTTP request 
	 fetchCanvas(query: string) {
	  let webUrl = 'https://www.googleapis.com'
	  return this.http
	      .get( webUrl + '/youtube/v3/search?part=snippet&q=${query}'+
	          '&maxResults=5' +
	          '&type=video' +
	          '&key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs')
	      .map(response => response.json())
	  }
	*/

	/*
	dndDraggedSource = new Subject<string>();
	newDragged$ = this.dndDraggedSource.asObservable();
	addDraggedItem(widget)  {
		this.dndDraggedSource.next(widget)
	}
	*/

}