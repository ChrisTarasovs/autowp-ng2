import { Component, OnInit } from '@angular/core';
import { TextWidgetComponent } from './text-widget/text-widget.component';


@Component({
  selector: 'builder-panel',
  //templateUrl: './builder-panel.component.html',
  template:  `  ddd` ,
  styleUrls: ['./builder-panel.component.css']
//  directives : [TextWidgetComponent]
})
export class BuilderPanelComponent  {
  
    widgets: Array<any> = [];

  
    
   constructor(){
     this.widgets.push(new Widget('Text a'));
     this.widgets.push(new Widget('Text b'));
     console.log(this.widgets);
   }




}


class Container {
    constructor(public id: Number, public widgets: Array<Widget>) {}
}

class Widget {
    constructor(public name: string) {}
}
