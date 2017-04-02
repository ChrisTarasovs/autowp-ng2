import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MenuTypePipe } from '../../../pipes/menu-type.pipe';
import  {WysiwygMenu} from './wysiwyg-menu';
import { ButtonTypeComponent  } from './widgets/buttonType-menu/button-type.component';
import { LinksMenuComponent } from './widgets/links-menu/links-menu.component';
import { ColorMenuComponent } from './widgets/color-menu/color-menu.component';

import { MediaMenuComponent } from './widgets/media-menu/media-menu.component';
import { TypographyMenuComponent } from './widgets/typography-menu/typography-menu.component';


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
	 
	        <li *ngFor="let button of buttons  | menuType:MainMenu">   

	               
	                 <button type="button"  [title]="button.title" (click)="execCommand(button)"  >  
	                   		<i class="fa {{ button.icon }}" aria-hidden="true" ></i>
	                </button>
	                <div class="btn-view" *ngIf=" 'buttontype' ==  button.componentMenuSelector ">
	               	 YESSSS
	                	{{button.componentMenuSelector}}
 			 <!--<button.componentMenuSelector></button.componentMenuSelector>-->
	                
	                </div>
	                <ul class="submenu">
	                    <li *ngFor="let subitem of button.children ">
	                        <div >
     				
     				<button 
     					type="button" 
		                        	[title]="buttons[subitem].title"  
		                        	(click)="execCommand(buttons[subitem])">
		                              <i class="fa  {{buttons[subitem].icon}}" aria-hidden="true" ></i>
		                   	</button>
	                        </div>  

	                          <div class="btn-view"  *ngIf=" 'buttontype' ==  buttons[subitem].componentMenuSelector " >
	                          	<buttontype></buttontype>
	                          </div>
			  <div class="btn-view"  *ngIf=" 'links-menu' ==  buttons[subitem].componentMenuSelector " >
	                          	<links-menu></links-menu>
	                          </div>
			  <div class="btn-view"  *ngIf=" 'color-menu' ==  buttons[subitem].componentMenuSelector " >
	                          	<color-menu (clickedColor)="getColor($event)"></color-menu>
	                          </div>

			
			  <div class="btn-view"  *ngIf=" 'media-menu' ==  buttons[subitem].componentMenuSelector " >
	                          	<media-menu></media-menu>
	                          </div>
	                          <!--
			  <div class="btn-view"  *ngIf=" 'typography-menu' ==  buttons[subitem].componentMenuSelector " >
	                          	<typography-menu></typography-menu>
	                          </div>
	                          -->
	                    </li>
	                   
	                </ul>
	        </li>
	   
  `
  
})

export class wysiwygComponent {
	buttons:  any  = WysiwygMenu;
	editMode: boolean = false;

	command:any
	option: any

	clickedBtn: EventEmitter<any> = new EventEmitter();
	clickedClrBtn: EventEmitter<any> = new EventEmitter();
 	
 	@Output() commandExecuted: EventEmitter<any> = new EventEmitter();

	execCommand(button){
		//console.log('hello', button)
		

		if (this.editMode) {
		    alert('it is false');
		  return false;
		}
/*
		if (command === 'createlink') {
		  options = window.prompt('Please enter the URL', 'http://');
		  if (!options) {
		    return;
		  }
		}
*/
		let selection = document.getSelection().toString();

		console.warn(selection);
		
		if (button.command === 'createlink' && selection === '') {
//		  document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
		}
		else {
		  document.execCommand(button.command, false, button.options);
		}
		
		this.clickedBtn.emit(button)
		//this.commandExecuted.emit();
	}	
	getColor(color){
	//	console.log('color event in wysiwyg is ', color)
		this.clickedClrBtn.emit(color)
	}

	onBlur() { // This function needs to be called out of layouts
		this.buttons.forEach(x => x.active = false);
	} 

	constructor (){

		//console.log('buttons lits' ,this.buttons);
	}
	

}
