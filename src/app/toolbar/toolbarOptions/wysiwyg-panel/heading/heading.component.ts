import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {

  constructor() { }

  click: EventEmitter<any> = new EventEmitter();
  getheading(tag){
  	console.log('tag is ', tag);
  }

}
