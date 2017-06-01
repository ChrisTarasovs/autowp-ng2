import { Component, OnInit } from '@angular/core';
import {cmpService} from '../toolbar/services/components.service'
import {dndService} from '../toolbar/services/dnd.service';
//import {  text, textarea,ullist,singleImage, images, accordion,tabs,video, googlemaps,testimonials, modalBox} from './widgets/widgets.component';



@Component({
  selector: 'builder',
  //templateUrl: './dnd.component.html',
  template: `

  <div class="panel-body" >
  

           <div 
           *ngFor="let widget of widgets"  
          
       
                dnd-draggable
                [dragEnabled]="true"
                [dragData]="widget"
                [dropZones]="['widget-dropZone', 'canvas-dropZone', 'rowWrapper-dropZone', 'row-dropZone',  'column-dropZone', 'widget-dropZone' ]"
                (onDragStart)="onDragStart(widget)"

                class="list-group-item">
                        {{widget.settings[0].name}}
              </div>
  </div>


  `,
  //template: ` zzz`,
  styleUrls: ['./dnd.component.css']
  //directives : [TextComponent]
})
export class DndComponent  {
    constructor( private _cmpService: cmpService, private _dndService: dndService){}
    widgets: any = []

    ngOnInit(){
      this.widgets = this._cmpService.widgets
    }

   // dragOperation: Boolean = false;
    //widgets: Array<any> = [];


//https://docs.google.com/document/d/1QejU5toLhNgFsDHoPE0_2J8eV1apWqv0oHzY7ESOpYc/edit


onDragStart(widget){ 
    //this._dndService.addDraggedItem(widget);
    console.log('started in dnd component', widget)
  }

}

class Container {
    constructor(public id: Number, public widgets: Array<Widget> ) {}
}

class Widget {
    constructor( ) {}
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

