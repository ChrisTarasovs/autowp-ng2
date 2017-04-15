import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { Subject }    from 'rxjs/Subject';
import {AppState} from "./app-state.service";

import 'rxjs/add/operator/map';

@Injectable()
export class videoService {
	  constructor(private http: Http, private appState: AppState) {}

	  fetchVideos(query: string) {
	  // https://www.googleapis.com/youtube/v3/search?part=snippet&q=%27movie%27&maxResults=50&type=video&key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs
	    return this.http
	      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}`+
	          '&maxResults=5' +
	          '&type=video' +
	          '&key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs')
	      .map(response => response.json())



	  }
}