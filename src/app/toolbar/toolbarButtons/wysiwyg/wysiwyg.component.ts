import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonTypeComponent  } from './widgets/buttonType-menu/button-type.component';
import { LinksMenuComponent } from './widgets/links-menu/links-menu.component';
import { ColorMenuComponent } from './widgets/color-menu/color-menu.component';
import { MediaMenuComponent } from './widgets/media-menu/media-menu.component';
import { TypographyMenuComponent } from './widgets/typography-menu/typography-menu.component';
import {menuService} from '../../services/menu.service';
import {widgetsService} from '../../services/widgets.service';


   /*

var makeTemplate = function() {
  var template = []
  //var manifest = ['button-type']
 var buttons = WysiwygMenu;
  buttons.forEach((button) => {

if( false != button.componentMenuSelector){
	console.log('this one hasxxx', button, 'yes', button.componentMenuSelector);
	template.push(' <li>'   
	               + ' <div class="btn-menu"> '
	               + '	<button type="button"  [title]="button.title" (click)="execCommand( button )"  >  '
	               + ' 		<i class="fa '+ button.icon + ' " aria-hidden="true" ></i> '
	               + '	</button>'    
	               + '  </div>  '
	               + '  <div class="btn-view">'
	               + '   <'+button.componentMenuSelector+'>'+'</'+button.componentMenuSelector+'>'
		   + '  </div>'
		   + ' </li>')



}
   //template.push('<'+item+'>'+'</'+item+'>')


  })

  return template.join("/n")

}*/



@Component({
  selector: 'wysiwyg',
  outputs: ['clickedBtn', 'clickedClrBtn'],
  /*template: makeTemplate()*/
  template:  ` 

	                <ul class="submenu" >
	                    <li *ngFor="let button of buttons "  [ngClass]="(button.active == true ) ? 'activeBtn' : 'disabledBtn' " style="width: 160px;">
	              
	                        <div>
     				<button 
     					type="button" 
		                        	[title]="button.title"  
		                        	(click)="execCommand(button,  $event)"
		                        	>
		                              <i class="fa  {{button.icon}}" aria-hidden="true" ></i>
		                   	</button>
	                        </div>  

			  <div class="btn-view"  *ngIf=" 'links-menu' ==  button.componentMenuSelector " >
	                          	<links-menu [hidden]="!linkMenu"></links-menu>
	                          </div>
			  <div class="btn-view"  *ngIf=" 'color-menu' ==  button.componentMenuSelector " >
	                          	<color-menu  (saveColors)="saveColorsFunc($event)" *ngIf="colorMenu"></color-menu>
	                          </div>
			  <div class="btn-view"  *ngIf=" 'media-menu' ==  button.componentMenuSelector " >
	                          	<media-menu *ngIf='createMedia'></media-menu>
	                          </div>
	                          <div class="btn-view"  *ngIf=" 'buttontype' ==  button.componentMenuSelector " >
	                          	<buttontype *ngIf='createButtons'></buttontype>
	                          </div>
	                          <!--
			  <div class="btn-view"  *ngIf=" 'typography-menu' ==  button.componentMenuSelector " >
	                          	<typography-menu></typography-menu>
	                          </div>
	                          -->
	                    </li>
	                   
	                </ul>
	  
	   
  `
  
})

export class wysiwygComponent {
	constructor ( private _menuService: menuService,private _widgetsService: widgetsService){}

	command:any
	option: any

	clickedBtn: EventEmitter<any> = new EventEmitter();
	clickedClrBtn: EventEmitter<any> = new EventEmitter();
 	
 	//@Output() commandExecuted: EventEmitter<any> = new EventEmitter();


 	@Output () saveColors: EventEmitter<any> = new EventEmitter();
 	
 	
 	// Disable menu views
	subMenu: boolean = false;
	colorMenu: boolean = false;
	linkMenu: boolean = false;
	createMedia: boolean = false;
	createButtons: boolean = false;
	execCommand(button: any, $event ){
		//console.log('button data', button)
		// enable the menu item
		this._menuService.enableMenu(button, $event ); 
		
		// Decorate HTML
		this._menuService.decorateHtml();

		if (button.command === 'wysiwygMenu') {
		
		} else if(button.command === 'color' ){
			this.colorMenu = !this.colorMenu

			this.linkMenu = false;
			this.createMedia = false;
			this.createButtons = false

		}else if( button.command === 'createlink' && this._menuService.getSelected()  === ''){

			this.linkMenu = !this.linkMenu

			this.colorMenu = false;
			this.createMedia = false;
			this.createButtons = false;

			//console.log('testin', this.linkMenu )
			// document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
		}else if(button.command === 'createMedia' ){
			this.createMedia = !this.createMedia

			this.linkMenu = false;
			this.colorMenu = false;
			this.createButtons = false

		}else if(button.command === 'createButtons'){
			this.createButtons = !this.createButtons

			this.linkMenu = false;
			this.colorMenu = false;
			this.createMedia = false

		}else {
		 	 document.execCommand(button.command, false, button.options);
		}

		this._widgetsService.loadWidget(button);

		


		//console.log('hello', button)
		// const tabs = this.button.children.toArray();




		
/*
		if (command === 'createlink') {
		  options = window.prompt('Please enter the URL', 'http://');
		  if (!options) {
		    return;
		  }
		}
*/
		
		
		
		//this.clickedBtn.emit(button)
	}
	

	saveColorsFunc(colorArray){
		//console.log('wysiwyg component logs color selectedColor ', colorArray)
		this.saveColors.emit(colorArray)
	}

	onBlur() {} 
	
	

	// Set menu list
	buttons: any = []
	ngOnInit(){
		this.buttons =  this._menuService.buttonlist; 
	}

}
