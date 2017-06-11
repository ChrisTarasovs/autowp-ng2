import {Component,ViewChild,  EventEmitter, Output , Directive,ElementRef, Input,  OnChanges } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ColorPickerModule, ColorPickerDirective} from 'angular2-color-picker';
import {ColorPickerService} from 'angular2-color-picker';
import {ColorSelectorComponent } from '../../../../../toolbar/toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import {colorService} from '../../../../services/color.service'


@Component({
  selector: 'color-menu',
  template: `
      <input type="text" [ngModel]="selectedColor" (ngModelChange)="valuechange($event)" [value]='selectedColor' #colorValue/>
      <button (click)="addColor(colorValue.value)" class="btn btn-default">Add Color</button>

  `
})
export class ColorMenuComponent  implements OnChanges{
 
   public selectedColor;
   // public colorsForm: FormGroup;
   // public colorHex: any = '';
   // public currentColor: string;

   constructor(
      private _colorService: colorService) {
           this.selectedColor = '#000fff'
           this._colorService.colorHex$.subscribe(data => {
                    console.log('Getting an update from color service', data);
                    this.selectedColor = data.colorhex;
            });
         

      this._colorService.lastSelectColor$.subscribe( data => {
           this.selectedColor = data;
        });

   }

   addColor(colorHex){
         let creatColor = { type: 'color',colorhex : colorHex}
         this._colorService.publishData(creatColor);
   }

   ngOnChanges() { }
   
}
