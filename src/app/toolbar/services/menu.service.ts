import {HeadingComponent} from '../toolbarOptions/wysiwyg-panel/heading/heading.component';
import {ColorSelectorComponent} from '../toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import {LinksComponent} from '../toolbarOptions/wysiwyg-panel/links/links.component';
import {TypographyComponent} from '../toolbarOptions/wysiwyg-panel/typography/typography.component';
import {ImagePanelComponent} from '../toolbarOptions/image-panel/image-panel.component';
import {ExamplesComponent} from '../toolbarOptions/examples/examples.component';
import {BuilderPanelComponent} from '../toolbarOptions/builder-panel/builder-panel.component'
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class menuService {
	currentMenu = {id: 3,   title: 'Bold',  icon: 'fa-bold',
		    
		   
		    command: 'bold',   tag: 'b', status: 'active', 

		  
		    componentMenuSelector: false,
		};

	changeCurrentMenu(menuItem){
		console.log('do it',menuItem);
		this.currentMenu = menuItem
		  
		 console.log('update', this.currentMenu);
	}
	

   	buttonlist = [
   	/*
		{
			id: 0,  title: 'Edit',  icon: 'fa-pencil ',
			command: 'wysiwygMenu',
			status: 'active', 
			componentMenuSelector: false,
			children:[3,4,5,6,7,8,9,10]
		},
	
		{id: 1,   title: 'Settings',   icon: ',
		 
		 componentMenuSelector: false,componentID : 2
		},

		{id: 2,   title: 'Sections',   icon: 'fa-sliders',
		   
		  
		componentMenuSelector: false,componentID : 8
		},
	*/
		{id: 0,   title: 'Bold',  icon: 'fa-bold',
		    
		   
		    command: 'bold',   tag: 'b', active: false, 
		    componentMenuSelector: false,
		},
		{id: 1,   title:'Italic',    icon: 'fa-italic',
		   
		   command: 'italic',  tag: 'i',active: false, 


		    componentMenuSelector: false,
		},
		{id: 2,  
		    title:'Headlines', 
		    icon: 'fa-header',
		    command: 'headlineView',
		    active: false, 
		    componentMenuSelector: false,
		    componentID : 1, 

		    component: HeadingComponent
		}, 
		{id: 3,  
		    title:'Link', 
		    command: 'createlink',
		    icon: 'fa-link',
		    tag: 'a',
		    active: false, 
		    componentMenuSelector: 'links-menu',
		    componentID : 3
		},
		{id: 4,  
		    title:'Color',
		    icon: 'fa-slack',
		    componentMenuSelector: 'color-menu',
		    componentID : 2,
		    command: 'color',
		    active: false, 
		   // enable: 'colorSelectorComponent'
		    component: ColorSelectorComponent,
		    colorArray: [ '#000000', '#0000ff' ],
		    arrayColors: {color: '#000000', color2: '#999999'}
		},
		{id: 5,  
		    title: 'Typography', 
		    icon: 'fa-font',
		    active: false, 
		    componentMenuSelector: 'typography-menu',
		    componentID : 4
		},
		{id: 6,  title:'Media', icon: 'fa fa-picture-o',

		    active: false, 
		    command: 'createMedia',
		    
		    
		    componentMenuSelector: 'media-menu',
		    componentID :  5
		},
		{id: 11,
		    title:'Button Type', 
		    icon: 'fa-battery-empty',
		    active: false, 
		    command: 'createButtons',
		    componentMenuSelector: 'buttontype',
		    componentID :  10
		}
	];
	//Enable Menu
	enableMenu(button, $event){
 		$event.stopPropagation();
		this.buttonlist.forEach(b => {
			console.log(b);
			  b.active = false;
			//  b.children && b.children.forEach(b => b.active = false);
		});
		button.active = true; 
 	}
 	// Edit content
 	getSelected(){
 		return document.getSelection().toString();
 	}
	
		

}
