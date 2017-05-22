import { Component, OnInit } from '@angular/core';

import {dndService} from '../toolbar/services/dnd.service';
import {  text, textarea,ullist,singleImage, images, accordion,tabs,video, googlemaps,testimonials, modalBox} from './widgets/widgets.component';



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
                [dropZones]="['widget-dropZone', 'canvas-dropZone', 'rowWrapper', 'row-dropZone',  'column-dropZone', 'widget-dropZone' ]"
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



   // dragOperation: Boolean = false;
    widgets: Array<any> = [
          {
            settings: [
                {
                  isLoaded:false,
                  name: 'Text ',
                  componentName: 'text',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: text,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'Textarea',
                  componentName: 'textarea',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: textarea,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'Ullist',
                  componentName: 'ullist',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: ullist,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'singleImage',
                  componentName: 'singleImage',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: singleImage,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'images',
                  componentName: 'images',
                  singleimage: false,
                  gallery: true,
                  carousel: true;
                  imageUrl: [
                                     { 
                                       alt: 'placeholder', 
                                       org: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150', 
                                       xsize: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150'
                                     },
                                     { 
                                       alt: 'placeholder', 
                                       org: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150', 
                                       xsize: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150'
                                     },
                                     { 
                                       alt: 'placeholder', 
                                       org: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150', 
                                       xsize: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150'
                                     }
                  ]
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: images,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'accordion',
                  componentName: 'accordion',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: accordion,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'tabs',
                  componentName: 'tabs',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: tabs,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'video',
                  componentName: 'video',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: video,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'googlemaps',
                  componentName: 'googlemaps',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: tabs,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'testimonials',
                  componentName: 'testimonials',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: tabs,
                    inputs: {
                        name: 'example'
                    }
            },
            {
            settings: [
                {
                  isLoaded:false,
                  name: 'modalBox',
                  componentName: 'modalBox',
                  innerhtml: {}
                }

            ],
            widgetProperties: {
                  dimension: [ 0,0,0,0 ], 
                  location: [0,0,0,0]
            },
            widgetComponent:  {
                    component: tabs,
                    inputs: {
                        name: 'example'
                    }
            }

    ];


//https://docs.google.com/document/d/1QejU5toLhNgFsDHoPE0_2J8eV1apWqv0oHzY7ESOpYc/edit

constructor(private _dndService: dndService){ }
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

