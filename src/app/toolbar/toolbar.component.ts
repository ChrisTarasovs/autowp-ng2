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
// import {WysiwygMenu} from './toolbarButtons/wysiwyg/wysiwyg-menu';
import {componentList} from './toolbarOptions/components-list';
import {DynamicPanelComponent} from './toolbarOptions/dynamic-panels/dynamic.component';
import { Font, GoogleFonts, GoogleFontInterface  } from './toolbarOptions/wysiwyg-panel/typography/typograpy-interfaces';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import {colorService} from './services/color.service'
import {videoState} from './services/videoState.service'
import {widgetsService} from './services/widgets.service'

// Componets
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
  	<toolbar-buttons></toolbar-buttons>
     <dynamiccontent-component [componentData]="componentData"></dynamiccontent-component>


  `,
      providers: [colorService]
})

export class toolbarComponent {
      @Output() dataExtra:any

      private newWidget:any;
      private componentData = null;
      components:any = componentList;

      constructor(
        public appState: AppState, 
        private _widgetsService: widgetsService, 
        private _videoState: videoState) {
            this._widgetsService.newWidget$.subscribe(
              data => {
                this.newWidget = data; 
                this.componentData = data;
             });
      }  
}



