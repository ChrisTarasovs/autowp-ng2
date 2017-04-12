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
  Renderer
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { toolbarButtonsComponent } from './toolbarButtons/toolbarButtons.component';
import {WysiwygMenu} from './toolbarButtons/wysiwyg/wysiwyg-menu';
import {componentList} from './toolbarOptions/components-list';

import {DynamicPanelComponent} from './toolbarOptions/dynamic-panels/dynamic.component';



//import * as _ from "lodash";


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import {SharedColorService} from './services/shared.service'

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
  	<toolbar-buttons  [radomData]="radomData"        
      [(editMode)]="editMode"   

      (clickedBtn)="getMenuCommand($event)" 

      (clickedClrBtn)="colorSelector($event)" 
      (loadWidget)="loadwidgetpanel($event)"
      (colorChanged)="colorChanged"

       (saveColors)="saveColorsFunc($event)"

      ></toolbar-buttons>
  	<!--<toolbar-widgets></toolbar-widgets>-->
<!--
      <heading *ngIf="headingComponent"></heading>
       <app-color-selector *ngIf="colorSelectorComponent"    [arrayColors]="arrayColors"  (colorChange)="colorChange($event)"></app-color-selector>
-->

<button (changedata)="changedata()">changeit </button>
  	<dynamiccontent-component [componentData]="componentData" (widgetData)="getWidgetData($event)"></dynamiccontent-component>
  `,
      providers: [SharedColorService]
})





export class toolbarComponent {



     // Wysiwyg definitions
      editMode: boolean = false;
      subscriptions: Subscription[] = []
      content: string;
      containers: Array<any> = [];
      buttons: any = WysiwygMenu;

      headingComponent:boolean = false;
      colorSelectorComponent:boolean = false;



      /*Color Widget*/
     @Output() arrayColors : any = {} // hex diagram
     //@Output() colors: string[] ; // PreSelect Color Pallet

       constructor(){
             this.setColorWidget()


       }

      colorSelector(evt){
            this.colors.push(evt);
      }
     @Output() colorChanged:string;
      colorChange(evt){  
          this.colorChanged = evt;
          console.log('got the color', evt )
      }



     componentData = null;
     components:any = componentList;
    
     @Output() dataExtra:any

    //  @Output() colorData: EventEmitter<any> = new EventEmitter();
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




             const tags = this.getTagsRecursive(document.getSelection().focusNode);
      
      }
      getWidgetData(evt){
          console.log('got this from the child', evt.detail) // NOT ABLE TO RECIEVE DATA
      }

      getTagsRecursive(element, tags?: any[]) {
                tags = tags || (element && element.tagName ? [element.tagName] : []);

                if (element && element.parentNode) {
                  element = element.parentNode;
                } else {
                  return tags;
                }

                const tag = element.tagName;
                if (tag === 'DIV') {
                  return tags;
                }

                tags.push(tag);

                return this.getTagsRecursive(element, tags);
       }
       setColorWidget(){
         
             //this.arrayColors['color'] = '#999999';;
             //this.arrayColors['color2'] = '#000000';
        

       }
      @Output() colors: string[] = ['#ZZZ'];
       // Save new color
       saveColorsFunc(newColorArray){
         console.log('toolbar component', newColorArray );

        //  @Output() colors = ['#fff'];
         this.arrayColors = newColorArray;
         this.dataExtra = 'pica'
         /*
              this.componentData =   {
                component: ColorSelectorComponent,
                inputs: {
                  colordata: newColorArray
                }
              };
              */
       }

/*

  //  this.buttons.forEach(x => x.active = tags.indexOf(x.tag.toUpperCase()) > - 1); 


          //this.clickedBtn.emit(evt);
    //  componentData = null;
    //  menuComponentData = null;
    
    //  components:any = componentList;


          console.log('button list is' , this.buttons);
          console.log('toolbar  events registered', evt.command, evt.options);
          console.log('this component is', this.components);
          console.log('this event component ID', evt.componentID);
          this.componentData = _.find(this.components,{id:evt.componentID});
          this.commandExecuted.emit() // Giving it a command to launch for changes in the text
       
      

     
      newColor: string;

      @Output() commandExecuted: EventEmitter<any> = new EventEmitter();
      dynamicData: any;
      radomData:any;

      getColor(selectedColor){
        this.radomData = selectedColor;
            this.newColor = selectedColor;
            this.dynamicData = selectedColor;
      	//console.log('color event in toolbar main is ', color)
            console.log('toolbar selectedColor', this.newColor);
      }

      loadwidgetpanel(widgetID){
         // console.log('widget id', widgetID);
           //console.log('this components', this.components);
           this.componentData = _.find(this.components,{id: widgetID} );
      }
*/

}



