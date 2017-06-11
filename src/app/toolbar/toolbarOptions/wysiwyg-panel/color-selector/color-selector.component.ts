import { Component,
  ViewChild, 
  OnInit, Input, 
  Output, 
  SimpleChanges, 
  Injector, 
  OnChanges,
  EventEmitter,
  ElementRef

} from '@angular/core';


import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ColorPickerModule, ColorPickerDirective} from 'angular2-color-picker';
import {ColorPickerService} from 'angular2-color-picker';
import {colorService} from '../../../services/color.service';
import {dndService} from '../../../services/dnd.service';

@Component({
  selector: 'app-color-selector',
  template: 
 `
    <ul>
        <li *ngFor="let colordrop of colors ">           
            <div class="color-drop" 
                    [style.color]="colordrop.colorhex" 
                    [style.background]="colordrop.colorhex" 
                    alt="colordrop"
                    dnd-draggable
                    [dragEnabled]="true"
                    [dragData]="colordrop"
                    [dropZones]="['widget-dropZone', 
                                            'canvas-dropZone', 
                                            'rowWrapper-dropZone', 
                                            'row-dropZone',  
                                            'column-dropZone', 
                                            'widget-dropZone' ]"
                    (onDragStart)="onDragStart(colordrop)"


                    ></div>
                      {{colordrop.colorhex}}
        </li>
    </ul>

    <div>
        <span [(colorPicker)]="arrayColors[selectedColor]"     
          [cpDialogDisplay]="'inline'"
       
          [cpToggle]="true"
          (colorPickerChange)="colorChanged($event)"

          >
      </span>

    </div>
  `,


  styleUrls: ['./color-selector.component.css'],
 
})

export class ColorSelectorComponent  {
  
@Input() colors 
@Input() arrayColors
colorHex: any = '';

private selectedColor: string = 'color';

constructor(
  private fb: FormBuilder, 
  private _colorService: colorService, 
  private cpService: ColorPickerService, 
  private injector: Injector , 
  private elRef: ElementRef,
  private _dndService: dndService
   ) {

         this._colorService.colorHex$.subscribe(
            data => {
                console.log('got the form: ', data);
                // Add color  to colors from shared service
                this.colors.push(data);
            });


          // Gets preset colors array from a menu module.
          this.colors = this._colorService.colors
          this.arrayColors = this._colorService.arrayColors;
        
  }
  
   colorChanged(event){
      this._colorService.colorChaged(event)
   }
    

  @Output()  widgetData: EventEmitter<any> = new EventEmitter();
   saveColor(val){
       this.elRef.nativeElement.dispatchEvent(
        new CustomEvent('widgetData', { bubbles: true, detail: val }));
   }

   onDragStart(colordrop){ 
      console.log('started in color selector component', colordrop)
    }


 }   


