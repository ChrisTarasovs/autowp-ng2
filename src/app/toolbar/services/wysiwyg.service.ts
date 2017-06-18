// import {HeadingComponent} from '../toolbarOptions/wysiwyg-panel/heading/heading.component';
// import {ColorSelectorComponent} from '../toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
// import {LinksComponent} from '../toolbarOptions/wysiwyg-panel/links/links.component';
// import {TypographyComponent} from '../toolbarOptions/wysiwyg-panel/typography/typography.component';
// import {ImagePanelComponent} from '../toolbarOptions/image-panel/image-panel.component';
// import {ExamplesComponent} from '../toolbarOptions/examples/examples.component';
// import {BuilderPanelComponent} from '../toolbarOptions/builder-panel/builder-panel.component'
// import {ButtonTypeWidgetComponent} from  '../toolbarOptions/wysiwyg-panel/button-type/button-type-widget.component';


import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import {widgetsService} from './widgets.service'

@Injectable()
export class wysiwygService {
	constructor ( 
		// private _widgetsService: widgetsService
		){}
	// Disable menu views
	subMenu: boolean = false;
	colorMenu: boolean = false;
	linkMenu: boolean = false;
	createMedia: boolean = false;
	createButtons: boolean = false;

	 // Observable string sources
	private toolbarStatus = new Subject<string>();  
	 // Observable string streams
	toolbarStatus$ = this.toolbarStatus.asObservable();


	 // Observable string sources
	private toolbarPositioning = new Subject<string>();  
	 // Observable string streams
	toolbarPositioning$ = this.toolbarPositioning.asObservable();



 	updateToolbarStatus(data){
		this.toolbarStatus.next(data)
	 }
	 updateToolbarPositioning(status){
		this.toolbarPositioning.next(status)
	 }



	execCommand(button){


		this.decorateHtml();
		this.injectDecoration(button)

		

// let btnName  = button.command;
// switch(button.command) {
// 	case ('Bold'):
// 	this.decorateHtml();
// 	this.injectDecoration(button)
// 	break;
// 	case ('Italic'):
// 	this.decorateHtml();
// 	this.injectDecoration(button)
// 	break;
// 	case ('Headlines'):
// 	this.decorateHtml();
// 	this.injectDecoration(button)
// 	break;
// }

		//this.enableMenu(button, $event ); 
		
		// Decorate HTML
		
		/*
		switch(button.command) {
			case (button.command === 'wysiwygMenu'):
				break;
		    case (button.command === 'color'):
					this.colorMenu = !this.colorMenu
					this.linkMenu = false;
					this.createMedia = false;
					this.createButtons = false
		        break;
		    case (button.command === 'createlink' && this.getSelected()  === ''):
					this.linkMenu = !this.linkMenu
					this.colorMenu = false;
					this.createMedia = false;
					this.createButtons = false;
					// console.log('testin', this.linkMenu )
					// document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
		        break;
		    case (button.command === 'createButtons'):
					this.createButtons = !this.createButtons
					this.linkMenu = false;
					this.colorMenu = false;
					this.createMedia = false
		    case (button.command === 'headlineView'):
		    		
		    default:   
		}
		*/

}
	

/*
	//Enable Menu
	enableMenu(button, $event){
 		$event.stopPropagation();
		this.buttonlist.forEach(b => {
			//console.log(b);
			  b.active = false;
			//  b.children && b.children.forEach(b => b.active = false);
		});
		button.active = true; 
 	}
*/
	enableWysiwyg(){
	

	}
	decoreHtml(){

	}
	addLink(menuitem){
		
		// get selection
		let selection = this.getSelected()  
		console.log('selection', selection)
		if(selection  === ''){
			document.execCommand('insertHtml', false, '<a href="' + menuitem.url + '">' + menuitem.description + '</a>');
		}else{
			document.execCommand('insertHtml', false, '<a href="' + menuitem.url + '">' + selection + '</a>');
		}
	}
	decorateHtml(){
		// get selection
		let selection = this.getSelected()  
		const tags = this.getTagsRecursive(document.getSelection().focusNode);
		
	}
	injectDecoration(button){
		document.execCommand(button.command, false,' ');		
	}
 	getSelected(){

// if (window.getSelection) {
	// const selectedContent = window.getSelection().toString();
	// } else if (document.selection && document.selection.type != "Control") {
	//    const selectedContent = document.selection.createRange().text;
	// }

 		return document.getSelection().toString();
 	}
 	// getTagsRecursive(element, tags?: any[]) {
 	getTagsRecursive(element, tags?: any[]) {
	                tags = tags || (element && element.tagName ? [element.tagName] : []);
	             //   tags = 'b';
	           

	                if (element && element.parentNode) {
	                  element = element.parentNode;
	               
	                } else {
	              
	                  return tags;
	                }
	                const tag = element.tagName;
	                if (tag === 'DIV') {
	                  return tags;
	                }
	              
	                tags.push(tag);
	               //   console.log('return tags recurisve tags' , element, tags)
	                return this.getTagsRecursive(element, tags);
	}



}
