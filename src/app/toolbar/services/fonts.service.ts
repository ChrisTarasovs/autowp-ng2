import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject }    from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

import { Http, Headers, Response } from '@angular/http';
import { Inject, Injectable } from '@angular/core';


import { 
	FontPickerConfig, 
	Font, GoogleFonts  } from '../toolbarOptions/wysiwyg-panel/typography/typograpy-interfaces';

@Injectable()
export class fontsService {
	//https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs

	// private apiKey: string = "";

	  private apiKey: string = "AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs";
	  private baseUrl: string = 'https://www.googleapis.com/webfonts/v1/webfonts';

	  constructor( 
	  	//@Inject(FontPickerConfig) private config: FontPickerConfig, 
	  	private http: Http ) {
	   // this.apiKey = config.apiKey;
	  }
	//results:any;
	 /*
	 Return all fonts avaliable from google fonts, may have sort parameter:
	 date || alpha || style || trending || popularity
	*/
	public getAllFonts(sort: string): Observable<GoogleFonts>{
	    let requestUrl = this.baseUrl + '?key=' + this.apiKey

	    if (sort) {
	      requestUrl = requestUrl.concat('&sort=' + sort)
	    }

	    return <Observable<GoogleFonts>> this.http.get(requestUrl)
	      .map((res) => res.json()
	      	//.subscribe(data => {console.log('data is', data) }) 
	      	
		
	    // .catch(this.handleHttpError)
	      );
	  }

	   /*
	    Return observable of the requested font
	  */

	  public getRequestedFont(family: string): Observable<Font>{
	    let requestUrl = 'https://fonts.googleapis.com/css?family=' + family;

	    return <Observable<Font>> this.http.get(requestUrl)
	      .map(res => res.json())
	      .catch(this.handleHttpError);
	  }

	    /*
	    Handler for possible http request errors
	  */

	  private handleHttpError(error: any) {
	    let errMsg = (error.message) ? error.message :
	      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

	    return Observable.throw(errMsg);
	  }

}
