import { Component, Input,  Output,  EventEmitter,Injector} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {VideoSettingsComponent} from './set-video/video.component'

@Component({
  selector: 'settings',
  outputs: ['clickedBtn', 'clickedClrBtn'],
  /*template: makeTemplate()*/
  template:  ` 
  <div style="width: 800px;">
 {{widgetSettings.widget | json}}

	{{widgetSettings[0].widget.settings.name | json}}

	<div *ngIf="widgetSettings[0].widget.settings.name  == 'images' ">
		<set-media  [widgetData]="widgetSettings"></set-media>
	</div>
	<div *ngIf="widgetSettings[0].widget.settings.name  == 'video' ">
		<set-video [widgetData]="widgetSettings"></set-video>
	</div>
</div>
`
  
})
export class widgetSettingsComponent {
	public widgetSettings;
	public rowIndex;
	
	constructor(private injector: Injector) {
	    this.widgetSettings = this.injector.get('widgetSettings');
	    //this.rowIndex = this.injector.get('rowIndex');


	}

}