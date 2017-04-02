import { Component,ViewChild, OnInit, Input, Output, SimpleChanges, Injector } from '@angular/core';
import {ColorPickerModule, ColorPickerDirective} from 'angular2-color-picker';
import {ColorPickerService} from 'angular2-color-picker';
@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css'],
 
})

export class ColorSelectorComponent  {
  private arrayColors: any = {};
  private selectedColor: string = 'color';
  colors: string[] = [];
  showNum: number;


  constructor(private cpService: ColorPickerService, private injector: Injector) {
    // this.selectedColor = '#2883e9';
      this.arrayColors['color'] = '#e920e9';;
     this.arrayColors['color2'] = '#e920e9';
     this.colors = ['#2883e9']

     this.showNum = this.injector.get('showNum');
     console.log('number is',  this.showNum);
   
  }


  @Input()
  passDynamicData: string;
  newColor: string;

   ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['passDynamicData']) {
         // this.testingthis = this.getdataColor;
           // this.groupPosts = this.colordata;
             console.log('yes I got it', this.passDynamicData);
        }
    }


    
  confirmColor() {
      this.colors.push(this.arrayColors[this.selectedColor]);


      /*
      if(this.dialog) {
        this.colors.push(this.color);
        this.open = false;
      }
      */
  }

 }   

      //open: boolean;
  
    //selectedColor:  string;
    
    //@ViewChild(ColorPickerDirective) colorPicker: ColorPickerDirective;
    //private arrayColors: any = {};
    //saveColor() {
    //  this.colors.push(this.color);
    //  console.log(this.colors);
    //} 
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



