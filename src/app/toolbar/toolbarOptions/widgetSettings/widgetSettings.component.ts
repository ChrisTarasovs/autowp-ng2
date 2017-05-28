import { Component, Input,  Output,  EventEmitter,Injector} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {VideoSettingsComponent} from './set-video/video.component'

@Component({
  selector: 'settings',
  outputs: ['clickedBtn', 'clickedClrBtn'],
  /*template: makeTemplate()*/
  template:  ` 
{{widgetSettings[0].settings.name | json}}

<div *ngIf="widgetSettings[0].settings.name  == 'images' ">
	<set-media  [widgetData]="widgetSettings"></set-media>
</div>
<div *ngIf="widgetSettings[0].settings.name  == 'video' ">
	<set-video ></set-video>
</div>
<set-video ></set-video>
`
  
})
export class widgetSettingsComponent {
	public widgetSettings;
	constructor(private injector: Injector) {
	    this.widgetSettings = this.injector.get('widgetSettings');
	}

}