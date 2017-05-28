import {HeadingComponent} from '../toolbarOptions/wysiwyg-panel/heading/heading.component';
import {ColorSelectorComponent} from '../toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import {LinksComponent} from '../toolbarOptions/wysiwyg-panel/links/links.component';
import {TypographyComponent} from '../toolbarOptions/wysiwyg-panel/typography/typography.component';
import {ImagePanelComponent} from '../toolbarOptions/image-panel/image-panel.component';
import {ExamplesComponent} from '../toolbarOptions/examples/examples.component';
import {BuilderPanelComponent} from '../toolbarOptions/builder-panel/builder-panel.component'
//import {VideoComponent} from '../toolbarOptions/video-panel/video.component';

import {widgetSettingsComponent} from '../toolbarOptions/widgetSettings/widgetSettings.component';

import { DndComponent } from '../../dnd/dnd.component';
import{ButtonTypeWidgetComponent} from  '../toolbarOptions/wysiwyg-panel/button-type/button-type-widget.component';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class widgetsService {
	

	loadWidgetSource = new Subject<string>();
	newWidget$ = this.loadWidgetSource.asObservable();
	constructComponent:any;

	loadWidget(button, widget)  {

		if(!button.componentName){

				if(typeof(button) === 'string'){
					if(button === 'DndComponent'){
						this.constructComponent = { 
							component: DndComponent ,inputs: { showNum: 0 }
						}
					}else if(button=== 'ButtonTypeWidgetComponent'){
						this.constructComponent = { 
							component: ButtonTypeWidgetComponent ,inputs: { showNum: 0 }
						}
					}else if(button === 'ExamplesComponent'){
						this.constructComponent = { 
							component: ExamplesComponent ,inputs: { showNum: 0 }
						}
					}
					/*
					else if(button === 'VideoComponent'){
						this.constructComponent = { 
							component: VideoComponent ,inputs: { showNum: 0 }
						}
						
					}
					*/
					else if(button === 'widgetSettingsComponent'){
						this.constructComponent ={
							component: widgetSettingsComponent, inputs:{widgetSettings: [
								widget

							]}
						}
					}	
				}else{}

					
		 }else{
			this.constructComponent = { 
				component: button.componentName ,inputs: { showNum: 0 }
			}

		 }
		this.loadWidgetSource.next(this.constructComponent)

	}



}