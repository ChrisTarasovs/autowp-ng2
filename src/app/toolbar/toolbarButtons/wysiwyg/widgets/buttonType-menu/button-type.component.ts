import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'buttontype',
  template:  `
  	<ul class="buttonlist filled">
  		<li class="rd"></li>
  		<li class="smooth"></li>
  		<li class="sq"></li>
  	</ul>
  	<ul class="buttonlist bordered">
  		<li class="rd"></li>
  		<li class="smooth"></li>
  		<li class="sq"></li>
  	</ul>
  	<input type="radio" (click)="swtichButtonType()">
  		
   `,
  styleUrls: ['./button-type.component.css']
})
export class ButtonTypeComponent {

  constructor() { }

  swtichButtonType(){
  	
  }

}
