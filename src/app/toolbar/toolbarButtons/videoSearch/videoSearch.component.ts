import { Component } from '@angular/core';
import { videoService} from '../../services/video.service';
import { videoState } from '../../services/videoState.service';
import { Video } from "../../toolbarOptions/widgetSettings/set-video/video.model";
import * as moment from "moment";


@Component({
  selector: 'video-search-box',
 // templateUrl: 'search-box.component.html'
  template: `
  	
	  <form role="search">
	    
		        <div class="input-group">
			<span class="input-group-addon ">
			      <span class="fa fa-search"></span>
			</span>
		          <input type="text"
		                 class="form-control"
		                 placeholder="Search..."
		                 autofocus
		                 (keyup)="search(textBox.value)"
		                 #textBox>
		        </div>
	
	  </form>
	
  `

  //,
  // styleUrls: ['search-box.component.css']
})
export class videoSearchBoxComponent{

  constructor(private _videoService: videoService, private _videoState: videoState) {}

  search(query: string) {
    this._videoService.fetchVideos(query)
      .subscribe(data => {
        this._videoState.videoList = data.items.map(item => {
          return new Video(
            item.id.videoId,
            item.snippet.title,
            item.snippet.thumbnails.high.url,
            item.snippet.channelTitle,
            item.snippet.channelId,
            //moment(item.snippet.publishedAt).fromNow(),
            item.snippet.description)
        });
      });
  }

}