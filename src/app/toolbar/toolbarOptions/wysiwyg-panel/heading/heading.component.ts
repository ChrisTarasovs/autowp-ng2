import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {menuService} from '../../../services/menu.service';
import {widgetsService} from '../../../services/widgets.service';

@Component({
  selector: 'heading',
  //templateUrl: './heading.component.html',
  template: `
 <ul *ngFor="let button of buttons">
	<button 
		type="button" 
		[title]="button.title"  
		(click)="execCommand(button,  $event)"
		>
		H<sub> {{button.title}} </sub>
		
	</button>
</ul>

  `,
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {

  constructor ( private _menuService: menuService,private _widgetsService: widgetsService){}


buttons:any;


execCommand(button: any,  $event ){
	let selection = document.getSelection().toString();
	const tags = this._menuService.getTagsRecursive(document.getSelection().focusNode);
  	// Decorate HTML
	//this._menuService.decorateHtml();
	document.execCommand(button.command, false, button.options);
  }


  ngOnInit(){
	this.buttons =  this._menuService.headinglist; 
   }

}
