import { 
  Component,
  Input
} from '@angular/core';
import  {imageMenu} from './image-menu';


@Component({
  selector: 'image',
  template:  ` 
	        <li *ngFor="let button of buttons">   
	               <div class="btn-menu">
	               	<button type="button"  [title]="button.title" (click)="execCommand(button.command, button.options)" (click)="loadView(button)" >  
	                   		<i class="fa {{ button.icon }}" aria-hidden="true" ></i>
	              	</button>
	                </div>  
	        </li>
  `
})

export class imageComponent {
	buttons: any = imageMenu;

}
