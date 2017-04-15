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


   	buttonlist = [
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
		    

		    componentName: HeadingComponent
		}, 
		{id: 3,  
		    title:'Link', 
		    command: 'createlink',
		    icon: 'fa-link',
		    tag: 'a',
		    active: false, 
		    componentMenuSelector: 'links-menu',
		    componentName : LinksComponent
		},
		{id: 4,  
		    title:'Color',
		    icon: 'fa-slack',
		    componentMenuSelector: 'color-menu',
		    command: 'color',
		    active: false, 
		    componentName: ColorSelectorComponent,
		    colorArray: [ '#000000', '#0000ff' ],
		    arrayColors: {color: '#000000', color2: '#999999'}
		},
		{id: 5,  
		    title: 'Typography', 
		    icon: 'fa-font',
		    active: false, 
		    componentMenuSelector: 'typography-menu',
		    componentName : TypographyComponent
		},
		{id: 6,  title:'Media', icon: 'fa fa-picture-o',

		    active: false, 
		    command: 'createMedia',
		    
		    
		    componentMenuSelector: 'media-menu',
		    componentName :  ImagePanelComponent
		},
		{id: 11,
		    title:'Button Type', 
		    icon: 'fa-battery-empty',
		    active: false, 
		    command: 'createButtons',
		    componentMenuSelector: 'buttontype',
		    componentName: ButtonTypeWidgetComponent
		}
		   
	];

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


	decorateHtml(){
		// get selection
		let selection = this.getSelected()  
		console.log('selection is', selection);
		console.log('getting the selected content',document.getSelection().focusNode);
		const tags = this.getTagsRecursive(document.getSelection().focusNode);
		console.log('tags are', tags);
	}
 	getSelected(){
 		return document.getSelection().toString();
 	}
 	getTagsRecursive(element, tags?: any[]) {
 			console.log('getting elements', element)

	                tags = tags || (element && element.tagName ? [element.tagName] : []);
	                console.log('inside tags' , tags)

	                if (element && element.parentNode) {
	                  element = element.parentNode;
	                  console.log('parent node tags' , tags)
	                } else {
	                	console.log('return tags' , tags)
	                  return tags;
	                }

	                const tag = element.tagName;
	                if (tag === 'DIV') {
	                  return tags;
	                }
	                 console.log('push tags' , tags)
	                tags.push(tag);
	                  console.log('return tags recurisve tags' , element, tags)
	                return this.getTagsRecursive(element, tags);
	}



}
