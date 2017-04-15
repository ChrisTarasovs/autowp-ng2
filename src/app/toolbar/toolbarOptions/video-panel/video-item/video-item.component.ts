import { 
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Video } from "../video.model";
import { AppState } from '../../../services/app-state.service';

@Component({
  selector: 'video-list-item',
  //templateUrl: './heading.component.html',
  template: `

<div class="row">

  <div style="width: 170px;float: left;">
    <a href="#" (click)="onClick()"><img src="{{video.thumbnailUrl}}" class="img-fluid" style="width: 150px;"></a>
  </div>

  <div style="width: 450px; float: left;">
	    <div class="row title"><a href="#" (click)="onClick()">{{video.title}}</a></div>

	    <div class="row channel">
	      <a href="http://youtube.com/channel/{{video.channelId}}" target="_blank">
	        {{video.channelTitle}}
	      </a>
	    </div>

	    <div class="row date">
	      {{video.publishedAt}}
	    </div>

	    <div class="row hidden-sm-down description">
	      {{video.description}}
	    </div>

  </div>

</div>


  `
  
})

export class VideoItemComponent implements OnInit {
	constructor(private _appState: AppState) {}

	 @Input() video: Video;
	 
	 onClick(){
	    this._appState.activeVideo = this.video;
	 }

	ngOnInit(){

	}
}