import {HeadingComponent} from '../toolbarOptions/wysiwyg-panel/heading/heading.component';
import {ColorSelectorComponent} from '../toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import {LinksComponent} from '../toolbarOptions/wysiwyg-panel/links/links.component';
import {TypographyComponent} from '../toolbarOptions/wysiwyg-panel/typography/typography.component';
import {ImagePanelComponent} from '../toolbarOptions/image-panel/image-panel.component';
import {ExamplesComponent} from '../toolbarOptions/examples/examples.component';
import {BuilderPanelComponent} from '../toolbarOptions/builder-panel/builder-panel.component'
import {ButtonTypeWidgetComponent} from  '../toolbarOptions/wysiwyg-panel/button-type/button-type-widget.component';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class menuService {

	toolbarBtns = [{
		'wysiwyg':  [ 
				{id: 0,   
				    name: 'Bold',  
				    icon: 'fa-bold',
				    command: 'bold',   
				    tag: 'b', 
				 },
				 {id: 1,
				   name:'Italic',
				   icon: 'fa-italic',
				   command: 'italic',  
				   tag: 'i',
				},
				{id: 2,  
				    name:'Headlines', 
				    icon: 'fa-header',
				    command: 'headlineView',
				    componentName: 'HeadingComponent'
				}, 
				{id: 3,  
				    name:'convertToLink', 
				   // command: 'createlink',
				    icon: 'fa-link',
				    tag: 'a',
				  
				    componentMenuSelector: 'links-menu',
				    componentName : 'LinksComponent'
				},
				{id: 4,
				        name:'Text left', 
				        icon: 'fa-align-left',
				        command: 'justifyLeft',
				},
				{id: 5,
				        name:'Text center', 
				        icon: 'fa-align-center',
				        command: 'justifyCenter',
				},
				{id: 6,
				        name:'Text justify', 
				        icon: 'fa-align-justify',
				         command: 'justifyFull'
				 },
				{id: 7,
				        name:'Text right', 
				        icon: 'fa-align-right',
				        command: 'justifyRight'
				}
				{id: 8,
				    name:'convert to Button', 
				    icon: 'fa-battery-empty',
				
				    command: 'createButtons',
				    componentMenuSelector: 'buttontype',
				    componentName: 'ButtonTypeWidgetComponent'
				},
				{id: 9,  
				    name:'Color',
				    icon: 'fa-slack',
				    componentMenuSelector: 'color-menu',
				    command: 'color',
			
				    componentName: 'ColorSelectorComponent',
				    colorArray: [ '#000000', '#0000dd' ],
				    arrayColors: {color: '#000000', color2: '#999999'}
				},
				{id: 10,  
				    name: 'Typography', 
				    icon: 'fa-font',
				  
				    componentMenuSelector: 'typography-menu',
				    componentName : 'TypographyComponent'
				},
				{id: 11, 
				    name:'HTML', 
				    icon: 'fa-battery-empty'
				}	

			    
			],
		'imgAligmnet': [
				{id: 1,
				        name:'Image left', 
				        icon: 'fa-align-left',
				        componentID : 8},
				{id: 2,
				        name:'Image center', 
				        icon: 'fa-align-center',
				        componentID : 8},
				{id: 3,
				        name:'Image justify', 
				        icon: 'fa-align-justify',
				        componentID : 8},
				{id: 4,
				        name:'Image hero', 
				        icon: 'fa-align-justify',
				        componentID : 8},
				{id: 5,
				        name:'Image right', 
				        icon: 'fa-align-right',
				        componentID : 8
				}
			],
	 	 'ButtonSettings':[
	 	 		{id: 0,
				        name:'Swith button type', 
				        icon: 'fa fa-square-o'
				},
		 		{id: 1,
				        name:'Filled Round button', 
				        icon: 'fa fa-square-o'
				},
				{id: 2,
				        name:'Filled Smooth button', 
				        icon: 'fa fa-square-o'
				},
				{id: 3,
				        name:'Filled Square button', 
				        icon: 'fa fa-square-o'
				},
				{id: 4,
				        name:'Bordered Round button', 
				        icon: 'fa fa-square-o'
				},
				{id: 5,
				        name:'Bordered Smooth button', 
				        icon: 'fa fa-square-o'
				},
				{id: 6,
				        name:'Bordered Square button', 
				        icon: 'fa fa-square-o'
				}
			 ],
		 'Builder':[
		 		{id: 1,
				        name:'Components', 
				        icon: 'fa fa-plus',
				        componentNameString: 'DndComponent';
				        componentID : 8
				},
				{id: 2,
				        name:'Components settings', 
				        icon: 'fa fa-sliders',
				        componentNameString: 'widgetSettingsComponent';
				        componentID : 8
				 },
				 {id: 3,  
				    name:'Color',
				    icon: 'fa-slack',
				    componentMenuSelector: 'color-menu',
				    command: 'color',
			
				    componentNameString: 'ColorSelectorComponent',
				    colorArray: [ '#000000', '#0000dd' ],
				    arrayColors: {color: '#000000', color2: '#999999'}
				},
		 	],
		 'miscellaneous':[
				{id: 1,
				        name:'Examples', 
				        icon: 'fa fa-slideshare',
				         componentNameString: 'ExamplesComponent';
				      
				}
		 	]

		}
	]


	headinglist = [{
		title: '1',
		command: 'formatBlock',
		options: '<h1>',
		tag: 'h1'
		
	},
	{
		title: '2',
		command: 'formatBlock',
		options: '<h2>',
		tag: 'h2'
	},
	{
		title: '3',
		command: 'formatBlock',
		options: '<h3>',
		tag: 'h3'
	},
	{
		title: '4',
		command: 'formatBlock',
		options: '<h4>',
		tag: 'h4'
	},
	{
		title: '5',
		command: 'formatBlock',
		options: '<h5>',
		tag: 'h5'
	}
	]
}
