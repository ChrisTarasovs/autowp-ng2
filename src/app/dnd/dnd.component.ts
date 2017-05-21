import { Component, OnInit } from '@angular/core';
import { TextComponent } from './text/text.component';
import {dndService} from '../toolbar/services/dnd.service';

import { ullist } from './widgets/widgets.component';



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
                [dropZones]="['widget-dropZone', 'canvas-dropZone', 'row-dropZone',  'column-dropZone', 'widget-dropZone' ]"
                (onDragStart)="onDragStart(widget)"

                class="list-group-item">
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
    widgets: Array<any> = [
        {
          name: 'TextComponent ',
          isLoaded:false,
          widgetype: 'textblock',
          widgetdata: `
                <div> 
                <strong> Reder this please now </strong>
                <input type="text" placehoder="dddd"/></div> 
                <p contenteditable="true"> change me </p>', 'textblock'


          `,
          widgetComponent:  {
                  component: TextComponent,
                  inputs: {
                      name: 'example'
                  }
            }

        },
          {
          name: 'same TextComponent',
          isLoaded:false,
          widgetype: 'textblock',
          widgetdata: `
                <div> 
                <strong> Reder this please now </strong>
                <input type="text" placehoder="dddd"/></div> 
                <p contenteditable="true"> change me </p>', 'textblock'


          `,
          widgetComponent:  {
                  component: TextComponent,
                  inputs: {
                      name: 'example'
                  }
            }

        },
          {
          name: 'UL list component',
          isLoaded:false,
          widgetype: 'textblock',
          widgetdata: `
                <div> 
                <strong> Reder this please now </strong>
                <input type="text" placehoder="dddd"/></div> 
                <p contenteditable="true"> change me </p>', 'textblock'

          `,
          widgetComponent:  {
                  component: ullist,
                  inputs: {
                      name: 'example'
                  }
            }

        }


    ];

//https://docs.google.com/document/d/1QejU5toLhNgFsDHoPE0_2J8eV1apWqv0oHzY7ESOpYc/edit



  //  containers: Array<any> = [];
  
    
   constructor(private _dndService: dndService){
   // this.containers.push(new Container(1, [new Widget('Lorem ipsum asdasdasdasd adasd asdas das das das dasd ')]));
   // this.containers.push(new Container(2, [new Widget('Lorem ipsum asdasdasdasd adasd asdas das das das dasd ')]));
    
     this.widgets.push(new Widget('testing', 'textblock','<div> <strong> Reder this please now </strong><input type="text" placehoder="dddd"/></div> <p contenteditable="true"> change me </p>'));
     this.widgets.push(new Widget('Text b', 'textlist', 'dddddd'));
     //console.log('new widget', new Widget('Text a'))
     // console.log('this is an arrray of widgets', this.widgets);
   }
  
  onDragStart(widget){ 
    //this._dndService.addDraggedItem(widget);
    console.log('started in dnd component', widget)
  }

}




class Container {
    constructor(public id: Number, public widgets: Array<Widget> ) {}
}

class Widget {
    constructor( 
      public name: string,  
      public widgetype: string,
      public widgetdata: any

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

