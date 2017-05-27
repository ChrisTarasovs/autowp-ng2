import { 
  Component,
  Input,
  OnInit
} from '@angular/core';
import {videoService} from '../../../services/video.service';
import { videoState } from '../../../services/videoState.service';
import { Video } from "./video.model";
import * as moment from "moment";
import {VideoItemComponent} from './video-item/video-item.component';


@Component({
  selector: 'set-video',
  template: `



 <ul class="list-group border">

 	<li 
 	 *ngFor="let video of _videoState.videoList  | paginate: { itemsPerPage: 2, currentPage: p }"
 	 class="list-group-item" [class.playing] = "video === _videoState.activeVideo" >
	 	<video-list-item [video]="video"></video-list-item>
	 </li>


 </ul>


 <pagination-controls (pageChange)="p = $event"></pagination-controls>



<!--
<div *ngIf="_appState.videoList.length > 0" class="pagination-centered">
	  <pagination-controls #api (pageChange)="p = $event">

	  </pagination-controls>
</div>

<div *ngIf="_appState.videoList.length > 0" class="pagination-centered">
  <pagination-controls #api (pageChange)="p = $event">
    <nav>
      <ul class="pagination">
        <li class="page-item" [class.disabled]="api.isFirstPage()">
          <a class="page-link" href="#" aria-label="Previous" (click)="api.previous()">
            <span aria-hidden="true" class="fa fa-arrow-left"></span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" *ngFor="let page of api.pages" [class.active]="api.getCurrent() === page.value">
          <a class="page-link" href="#" (click)="api.setCurrent(page.value)" >
            <span>{{ page.label }}</span>
          </a>
        </li>
        <li class="page-item" [class.disabled]="api.isLastPage()">
          <a class="page-link" href="#" aria-label="Next" (click)="!api.isLastPage() && api.next()">
            <span aria-hidden="true" class="fa fa-arrow-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </pagination-controls>
</div>
  <pre>
{{results | json}}
</pre>
-->

  `
  
})

export class VideoSettingsComponent implements OnInit {

  videoList:Video[] = [];

  constructor(private _videoService : videoService, private _videoState: videoState) {}
	
	results:any;

	  ngOnInit() {
		    this._videoService.fetchVideos('typescript') .subscribe(data => {
		 	this.results = data;
		 	 this._videoState.videoList = data.items.map(item => {
		 	 	  return new Video(
		 	 	  	item.id.videoId,
				            item.snippet.title,
				            item.snippet.thumbnails.high.url,
				            item.snippet.channelTitle,
				            item.snippet.channelId,
					// moment(item.snippet.publishedAt).fromNow(),
				            item.snippet.description

		 	 	  )


		 	 });
		    })


	/*
	      .subscribe(data => {
	        this._appState.videoList = data.items.map(item => {

	     
	          return new Video(
	            item.id.videoId,
	            item.snippet.title,
	            item.snippet.thumbnails.high.url,
	            item.snippet.channelTitle,
	            item.snippet.channelId,
	         //   moment(item.snippet.publishedAt).fromNow(),
	            item.snippet.description)
	           

	        });

	        this._appState.activeVideo = this._appState.videoList[0];


	      });
	        */
	  }


}