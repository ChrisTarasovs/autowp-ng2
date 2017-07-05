import { Component, OnInit } from '@angular/core';
import {cmpService} from '../toolbar/services/components.service'
import {dndService} from '../toolbar/services/dnd.service';
//import {  text, textarea,ullist,singleImage, images, accordion,tabs,video, googlemaps,testimonials, modalBox} from './widgets/widgets.component';

import {canvasService} from '../toolbar/services/canvas.service';

@Component({
  selector: 'builder',
  //templateUrl: './dnd.component.html',
  template: `

  <div class="panel-body" >
  <!--<div class="arrow-up"></div>-->

           <div 
           *ngFor="let Newwidget of widgets"  
          
       
                dnd-draggable
                [dragEnabled]="true"
                [dragData]="Newwidget"
                [dropZones]="[
                
                 'canvas-dropZone', 
                 'rowWrapper-dropZone', 
                 'row-dropZone', 
                 'columnWrapper-dropZone', 
                 'column-dropZone', 
                 'widget-dropZone' 


                 ]"
                (onDragStart)="onDragStart(Newwidget)"

                class="list-items">
                <i class="fa fa-4x" [ngClass]="Newwidget.settings[0].icon"></i>
                <p>{{Newwidget.settings[0].name}}</p>
                        
              </div>
  </div>

  `,
  //   <pre style="width: 400px;">
  //     {{orginalList | json}}
  // </pre>
  // <pre style="width: 400px;">
  //     {{widgets | json}}
  // </pre>
  //template: ` zzz`,
  styleUrls: ['./dnd.component.css']
})
export class DndComponent  {
  public orginalList;
    constructor( private _cmpService: cmpService, 
      private _dndService: dndService,
      private _canvasService :canvasService
      ){}
    widgets: any = []

    ngOnInit(){
      this.orginalList = this._cmpService.widgets;
      const  copyWidgetlist = Object.assign(this._cmpService.widgets, {});
      this.widgets = copyWidgetlist
    }




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
