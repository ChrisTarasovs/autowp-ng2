import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Media } from './media';

@Injectable()
export class MediaService {
	private _vimeoUrl = "https://vimeo.com/api/oembed.json?url=";
	private url: string = 'https://vimeo.com/145159004';

	
	constructor(private http: Http){}

	getPosts(): Observable<Media[]>{
		return this.http
		.get(this._vimeoUrl + 'url')
		.map((res: Response) => res.json())
		 .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
		;
	}

}


/*
function GetVimeoIDbyUrl(url) {
var id = false;
$.ajax({
url: 'https://vimeo.com/api/oembed.json?url='+url,
type: 'GET',
async: false,
success: function(response) {
  if(response.video_id) {
	id = response.video_id;
  }
}
});
return id;
*/