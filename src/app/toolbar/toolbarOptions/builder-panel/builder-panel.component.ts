import { Component, OnInit } from '@angular/core';
import { TextWidgetComponent } from './text-widget/text-widget.component';


@Component({
  selector: 'builder',
//  templateUrl: './dnd.component.html',
 // templateUrl: './builder-panel.component.html',
  template: `adsasd ` ,
  styleUrls: ['./builder-panel.component.css']
  //directives : [TextComponent]
})
export class BuilderPanelComponent  {
   // dragOperation: Boolean = false;
    widgets: Array<any> = [];
  //  containers: Array<any> = [];
  
    
   constructor(){
   // this.containers.push(new Container(1, [new Widget('Lorem ipsum asdasdasdasd adasd asdas das das das dasd ')]));
   // this.containers.push(new Container(2, [new Widget('Lorem ipsum asdasdasdasd adasd asdas das das das dasd ')]));
    
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


//Callbacks:
//dnd-dragstart
//dnd-moved  
//dnd-copied
//dnd-linked 
//dnd-canceled   
//dnd-dragend 
//dnd-selected  
//dnd-callback

// dragenter
// dragover
// dnd-inserted 
// dragend

// element.on('drop', function(event)
// dndState.dropEffect 
// element.on('dragleave', function(event) 
// function getMimeType(types) 
// function getItemType(mimeType) 
// function isDropAllowed(itemType) 
// function getDropEffect(event, ignoreDataTransfer)
// function stopDragover()
// function invokeCallback(expression, event, dropEffect, itemType, index, item)

// function getPlaceholderIndex()
// function getPlaceholderElement()
// dndLists.directive('dndNodrag', function()
// element.on('dragend', function(event)
// dndLists.directive('dndHandle', function()

