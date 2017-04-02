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
import { ColorSelectorComponent } from './toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';


import * as _ from "lodash";


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => toolbarComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};



@Component({
  selector: 'toolbar',

  template:  ` 
  	<toolbar-buttons [(editMode)]="editMode"   (clickedBtn)="getMenuCommand($event)" (clickedClrBtn)="getColor($event)" (loadWidget)="loadwidgetpanel($event)"></toolbar-buttons>
  	<!--<toolbar-widgets></toolbar-widgets>-->
  	<dynamiccontent-component [componentData]="componentData" [dynamicData]="newColor" ></dynamiccontent-component>
  `
})

export class toolbarComponent {
      componentData = null;
      menuComponentData = null;
      buttons: any = WysiwygMenu;
      components:any = componentList;


      // Wysiwyg definitions
      editMode: boolean = false;
      subscriptions: Subscription[] = []
      content: string;
      containers: Array<any> = [];
      newColor: string;

      @Output() commandExecuted: EventEmitter<any> = new EventEmitter();


      getMenuCommand(evt){
          console.log('button list is' , this.buttons);
          console.log('toolbar  events registered', evt.command, evt.options);
          console.log('this component is', this.components);
          console.log('this event component ID', evt.componentID);
          this.componentData = _.find(this.components,{id:evt.componentID});
          this.commandExecuted.emit() // Giving it a command to launch for changes in the text
          
          //
          const tags = this.getTagsRecursive(document.getSelection().focusNode);
        //  this.buttons.forEach(x => x.active = tags.indexOf(x.tag.toUpperCase()) > - 1); 


          //this.clickedBtn.emit(evt);
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

    

      getColor(color){
            this.newColor = color;
      	//console.log('color event in toolbar main is ', color)
           console.log('got the color from buttons > colors ', this.newColor);
      }
      loadwidgetpanel(widgetID){
         // console.log('widget id', widgetID);
           //console.log('this components', this.components);
           this.componentData = _.find(this.components,{id: widgetID} );
      }

     




    
}



