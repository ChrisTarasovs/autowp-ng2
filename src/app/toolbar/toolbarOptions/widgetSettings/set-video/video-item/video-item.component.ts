import { 
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Video } from "../video.model";
import { videoState } from '../../../../services/videoState.service';

@Component({
  selector: 'video-list-item',
  //templateUrl: './heading.component.html',
  template: `

<div class="row">
	<div class="col-sm-3">
		<button (click)="onClick()">
		    	<img src="{{video.thumbnailUrl}}" class="img-fluid" style="width: 150px;">
		 </button>
	</div>
	<div class="col-sm-9">
		<div class="row title">
			<button (click)="onClick()">{{video.title}}</button>
		</div>
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
  //{{widget[0].widget.settings.yturl | json}}
  
})

export class VideoItemComponent implements OnInit {
	@Input('widgetData') public widget;

	constructor(private _videoState: videoState) {


		 console.log('xxxx',this.widget)}

	@Input() video: Video;
	 
	 onClick(){
	   // this._videoState.activeVideo = this.video;
	    this.widget[0].widget.settings.yturl  = this.video
	 }

	ngOnInit(){

	}
}