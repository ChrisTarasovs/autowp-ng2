import { 
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  ViewChild,
  forwardRef,
  SimpleChanges,
  Output,
  EventEmitter,
  Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AppState } from '../app.service';


import { toolbarButtonsComponent } from './toolbarButtons/toolbarButtons.component';
import {WysiwygMenu} from './toolbarButtons/wysiwyg/wysiwyg-menu';
import {componentList} from './toolbarOptions/components-list';

import {DynamicPanelComponent} from './toolbarOptions/dynamic-panels/dynamic.component';

import { Font, GoogleFonts, GoogleFontInterface  } from './toolbarOptions/wysiwyg-panel/typography/typograpy-interfaces';


//import * as _ from "lodash";


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import {SharedColorService} from './services/shared.service'
import {videoState} from './services/videoState.service'
import {widgetsService} from './services/widgets.service'

// Componets
//import { HeadingComponent } from './toolbarOptions/wysiwyg-panel/heading/heading.component';
import { ColorSelectorComponent } from './toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';


export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => toolbarComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};



@Component({
  selector: 'toolbar',

  template:  ` 
  	<toolbar-buttons      
      [(editMode)]="editMode"   

      (clickedBtn)="getMenuCommand($event)" 

      (clickedClrBtn)="colorSelector($event)" 
      (loadWidget)="loadwidgetpanel($event)"
      (colorChanged)="colorChanged"

       (saveColors)="saveColorsFunc($event)"

      ></toolbar-buttons>
     <dynamiccontent-component [componentData]="componentData" (widgetData)="getWidgetData($event)"></dynamiccontent-component>
     <div class="embed-container" *ngIf="_videoState.activeVideo?.videoId != null">
        <iframe width="560"
                height="315"
                frameborder="0"
                allowfullscreen
                [src]="_videoState.activeVideo?.videoId | youtubeSafeUrl">
        </iframe>
      </div>

  `,
      providers: [SharedColorService]
})





export class toolbarComponent {
      newWidget:any;
      constructor(public appState: AppState, private _widgetsService: widgetsService, private _videoState: videoState) {

            this._widgetsService.newWidget$.subscribe(
              data => {
                this.newWidget = data; 
                this.componentData = data;
             });

      
      }


     // Wysiwyg definitions
      editMode: boolean = false;
      subscriptions: Subscription[] = []
      content: string;
      containers: Array<any> = [];
      buttons: any = WysiwygMenu;

      headingComponent:boolean = false;
      colorSelectorComponent:boolean = false;



      /*Color Widget*/
     //@Output() arrayColors : any = {} // hex diagram
     //@Output() colors: string[] ; // PreSelect Color Pallet





     componentData = null;
     components:any = componentList;
    
     @Output() dataExtra:any

    //  @Output() colorData: EventEmitter<any> = new EventEmitter();

     getMenuCommand(button){
    //      this._widgetsService.loadWidget(button);

     //     const tags = this.getTagsRecursive(document.getSelection().focusNode);
    }

/*
      getMenuCommand(button){
          //  this.componentData = _.find( this.components,  {id:evt.componentID} );
          if(button.component){
            this.componentData =   {
                  component: button.component,
                  inputs: {
                    colordata: button, chicken: this.dataExtra
                  }
                };
           }

         

           // if(evt.enable  == "colorSelectorComponent"){
          //      this. colorSelectorComponent = true

          //  }




             
      
      }
      */
      getWidgetData(evt){
          console.log('got this from the child', evt.detail) // NOT ABLE TO RECIEVE DATA
      }

   
       setColorWidget(){
         
             //this.arrayColors['color'] = '#999999';;
             //this.arrayColors['color2'] = '#000000';
        

       }


    



/*

  //  this.buttons.forEach(x => x.active = tags.indexOf(x.tag.toUpperCase()) > - 1); 

      this.componentData = _.find(this.components,{id:evt.componentID});
          this.commandExecuted.emit() // Giving it a command to launch for changes in the text
       

      @Output() commandExecuted: EventEmitter<any> = new EventEmitter();
      dynamicData: any;
  

*/

}



