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

import {colorService} from '../../../services/shared.service';


@Component({
  selector: 'app-color-selector',
  template: 
 //'./color-selector.component.html',

 `
    <ul>
        <li *ngFor="let color of colors ">           
            <div class="color-drop" [style.color]="color" [style.background]="color"
            ></div>
            {{color}}
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
  private elRef: ElementRef) {

         this._colorService.colorHex$.subscribe(
            data => {
                console.log('got the form: ' + data);
                // Add color  to colors from shared service
                this.colorHex = data;
                this.colors.push(this.colorHex);
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


 }   


