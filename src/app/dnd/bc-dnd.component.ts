import { Component, OnInit } from '@angular/core';
import { TextComponent } from './text/text.component';
import {dndService} from '../toolbar/services/dnd.service';

@Component({
  selector: 'builder',
  //templateUrl: './dnd.component.html',
  template: `

  <div class="panel-body" 
       dnd-sortable-container 
      
       [dropZones]="['widget-dropZone', 'canvas-dropZone']"
       [sortableData]="widgets">
       
          <!--  <div *ngFor="let widget of widgets; let i = index"  class="list-group-item"  dnd-sortable [sortableIndex]="i"  >-->

          
           <div 
           *ngFor="let widget of widgets; let i = index"  
            dnd-sortable [sortableIndex]="i"  
            (onDragStart)="onDragStart(widget)"
            
            class="list-group-item" >
                        {{widget.name}}  
              </div>
  </div>


  `,
  //template: ` zzz`,
  styleUrls: ['./dnd.component.css']
  //directives : [TextComponent]
})
export class DndComponent  {



   // dragOperation: Boolean = false;
    widgets: Array<any> = [];
  //  containers: Array<any> = [];
  
    
   constructor(private _dndService: dndService){
   // this.containers.push(new Container(1, [new Widget('Lorem ipsum asdasdasdasd adasd asdas das das das dasd ')]));
   // this.containers.push(new Container(2, [new Widget('Lorem ipsum asdasdasdasd adasd asdas das das das dasd ')]));
    
    this.widgets.push(new Widget('Text a', 'textblock'));
     this.widgets.push(new Widget('Text b', 'textlist'));
     //console.log('new widget', new Widget('Text a'))
     // console.log('this is an arrray of widgets', this.widgets);
   }
  
  onDragStart(widget){ 
    this._dndService.addDraggedItem(widget);
    console.log('started', widget)
  }

}




class Container {
    constructor(public id: Number, public widgets: Array<Widget>) {}
}

class Widget {
    constructor(
      public name: string,
      public widgetype: string,

      ) {}
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

