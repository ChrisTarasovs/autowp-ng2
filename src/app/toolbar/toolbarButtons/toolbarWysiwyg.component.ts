import {   Component, Input,  Output,  EventEmitter, ViewChild} from '@angular/core';

// import {wysiwygComponent} from './wysiwyg/wysiwyg.component';
import {widgetsService} from '../services/widgets.service'
import {menuService} from '../services/menu.service'
import {wysiwygService} from '../services/wysiwyg.service'
// import { toolbarStateService} from '../services/toolbarStatus.service'

@Component({
  selector: 'toolbar-wysiwyg',
  template: `
 <style>
.toolbar { 
	position:absolute ; width: 430px;

}
</style>

  <div class="toolbar" #toolbarWysiwyg>
	<div class="toolbar-buttons" >
	     <tbuttons [btnlist]="wysiwyg" (buttonClick)="wysiwygClicked($event)"  ></tbuttons>
	 </div>
 </div>
 `
 })

export class toolbarWysiwygComponent {
	@ViewChild('toolbarWysiwyg') toolbarWysiwyg;
 	public wysiwyg: any =  this._menuService.toolbarBtns[0].wysiwyg; 

	constructor(
             private _menuService: menuService,  
             private _wysiwygService: wysiwygService,
             private _widgetsService: widgetsService
             // private _toolbarStateService: toolbarStateService
             ) {

		// get location of toolbar
		  this._wysiwygService.toolbarStatus$.subscribe(
		            status => {
		                console.log('got the form:  toolbarStatus$', status);
		                // Add color  to colors from shared service
			this.updateStatus(status)
		               
		  });
		  // get location of toolbar
		  this._wysiwygService.toolbarPositioning$.subscribe(
		            positioning => {
		                console.log('got the form:  toolbarPositioning$', positioning);
		                // Add color  to colors from shared service
		               this.updatePositioning(positioning)
		  });
	}

	wysiwygClicked(button) {
		 switch(button.name) {
			case ('Headlines'):
			alert('heading btn')
			this._widgetsService.loadWidget(button.componentName, '');
			break;
			case ('convertToLink'):
			this._widgetsService.loadWidget(button.componentName, '');
			break;	
			case ('Color'):
			alert(button.componentName)
			this._widgetsService.loadWidget(button.componentName, '');
			break;
			case ('Typography'):
			this._widgetsService.loadWidget(button.componentName, '');
			break;	
			default:
       			this._wysiwygService.execCommand(button)
		}
            }

            updateStatus(status){
		  switch (status){
		            case 'enable':
		                this.toolbarWysiwyg.nativeElement.style.display = "inline-block"
		                break;
		           case 'disable':
		                this.toolbarWysiwyg.nativeElement.style.display = "none"
		                break;
		    }
		                   
	}
           updatePositioning(positioning){
           	console.log('location', positioning)
           	console.log('updataing this' , this.toolbarWysiwyg)
	console.log (this.toolbarWysiwyg.nativeElement.style.top   )

		const toolbarH = this.toolbarWysiwyg.nativeElement.offsetHeight;
		let toolbarW =  this.toolbarWysiwyg.nativeElement.offsetWidth;

		// // if toolbar H is bigger than possition, than show below
		if(positioning.top < toolbarH){
		
			// let setTop = positioning.top + toolbarH + 10;
			 let setTop =  positioning.top + toolbarH + 10;
			 console.log ('wtf', positioning.top + toolbarH + 10; )
			this.toolbarWysiwyg.nativeElement.style.top =  setTop + 'px';
		
		}else{
			
			let setTop = positioning.top - toolbarH - 10;
			 console.log ('wtf 2 ', positioning.top - toolbarH - 10  )
			this.toolbarWysiwyg.nativeElement.style.top = setTop + 'px';

			console.log (this.toolbarWysiwyg.nativeElement.style.top   )
		}
		
		// // get Width of toolbar , divide by half and remove from left , -50px as there is blank weired space
		let setLeft = positioning.left - (toolbarW / 2) ;

		this.toolbarWysiwyg.nativeElement.style.left = setLeft  + 'px';
		// console.log('toolbar', this.toolbarWysiwyg)
	}

}
