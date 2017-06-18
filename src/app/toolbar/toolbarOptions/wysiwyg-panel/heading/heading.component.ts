import { Component, OnInit , EventEmitter, Input,  Output, Injector, ViewChild} from '@angular/core';


import {menuService} from '../../../services/menu.service';
// import {widgetsService} from '../../../services/widgets.service';
import {wysiwygService} from '../../../services/wysiwyg.service';

@Component({
  selector: 'heading',
  //templateUrl: './heading.component.html',

  template: `
   <ul *ngFor="let button of buttons">
  <button 
    type="button" 
    [title]="button.title"  
    (click)="execCommand(button, $event)"
    >
    H<sub> {{button.title}} </sub>
    
  </button>
</ul>

  `,
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {
  public buttons:any;

  constructor ( 
    private _menuService: menuService,
    private _wysiwygService: wysiwygService 
    ){

          this.buttons =  [{
                                  name: '1',
                                  command: 'formatBlock',
                                  options: '<h1>',
                                  tag: 'h1'
                                  
                                  },
                                  {
                                  name: '2',
                                  command: 'formatBlock',
                                  options: '<h2>',
                                  tag: 'h2'
                                  },
                                  {
                                  name: '3',
                                  command: 'formatBlock',
                                  options: '<h3>',
                                  tag: 'h3'
                                  },
                                  {
                                  name: '4',
                                  command: 'formatBlock',
                                  options: '<h4>',
                                  tag: 'h4'
                                  },
                                  {
                                  name: '5',
                                  command: 'formatBlock',
                                  options: '<h5>',
                                  tag: 'h5'
                                  }]
  }





execCommand(button: any,  $event ){


	let selection = document.getSelection().toString();
	const tags = this._wysiwygService.getTagsRecursive(document.getSelection().focusNode);
  	// Decorate HTML
	this._wysiwygService.decorateHtml();
	document.execCommand(button.command, false, button.options);

  }


 //  ngOnInit(){
	// //this.buttons =  this._menuService.headinglist; 
 //   }

}
