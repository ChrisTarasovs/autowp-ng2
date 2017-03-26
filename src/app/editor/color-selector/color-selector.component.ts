import { Component,ViewChild,  OnInit } from '@angular/core';
import {ColorPickerModule, ColorPickerDirective} from 'angular2-color-picker';

import {ColorPickerService} from 'angular2-color-picker';
//import {ColorPickerService} from 'ng2-color-ctarasovs';
//import {ColorPickerService, Rgba} from 'angular2-color-picker/lib';

 
@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent  {

    private arrayColors: any = {};
    private selectedColor: string = 'color';
    
    //open: boolean;
    colors: string[] = [];
    //selectedColor:  string;
    
    //@ViewChild(ColorPickerDirective) colorPicker: ColorPickerDirective;
    //private arrayColors: any = {};
    
    
   
    
    constructor(private cpService: ColorPickerService) {
       this.arrayColors['color'] = '#2883e9';
       //this.arrayColors['color2'] = '#e920e9';
       this.colors = ['#2883e9','#e920e9']
    }
    
    //saveColor() {
    //  this.colors.push(this.color);
    //  console.log(this.colors);
    //} 
    
    confirm() {
        this.colors.push(this.arrayColors[this.selectedColor]);
        /*
        if(this.dialog) {
          this.colors.push(this.color);
          this.open = false;
        }
        */
    }
    
   /*  
    onChangeColor(color: string) {
        this.selectedColor = color;
        console.log(color);
    }
    dialog: any;
    
    toggle(value) {
        if(value) {
         this.dialog = (this.colorPicker as any).dialog;
         document.removeEventListener('mousedown', this.dialog.listenerMouseDown);
        } else {
          this.dialog = null;
        }
      }
      
 
    toggle(value) {
      if(value && !this.dialog) {
        this.dialog = (this.colorPicker as any).dialog;
        const originOkClick = this.dialog.oKColor;
        const that = this; // it's required in this case
        this.dialog.oKColor = function() { // monkey patching okColor methos
          that.saveColor();
          return originOkClick.apply(this, arguments);
        }
      }
    }
  
  
    ngOnDestroy() {
      if(this.dialog) {
        this.dialog = null;
      }
    }
    */  

}

