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

import {SharedColorService} from '../../../services/shared.service';


@Component({
  selector: 'app-color-selector',
  template: 
 //'./color-selector.component.html',

 `
{{colorHex}}

extra :  {{dataExtra}}
    <ul>
        <li *ngFor="let color of colors ">           
            <div class="color-drop" [style.color]="color" [style.background]="color"
            ></div>
            {{color}}
        </li>
    </ul>


    <div class="color-picker-wrapper">
         <input type="text" [value]="arrayColors[selectedColor]" #colorInput />
         <button (click)="saveColor(colorInput.value)" class="confirm">Confirm</button>
    </div>

    {{selectedColor}}
    color is


      

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
colorHex: any = '';

constructor(
  private fb: FormBuilder, 
  private _sharedService: SharedColorService, 
  private cpService: ColorPickerService, 
  private injector: Injector , 
  private elRef: ElementRef) {

         this._sharedService.colorHex$.subscribe(
            data => {
                console.log('got the form: ' + data);
                // Add color  to colors from shared service
                this.colorHex = data;
                this.colors.push(this.colorHex);
               /* this.searchCaseNumber = data;
               this.sibling2Form.patchValue({
                    caseNumber: data
                });
                */
            });


          // Gets preset colors array from a menu module.
          this.colordata = this.injector.get('colordata');
          //this.arrayColors = this.colordata.arrayColors;

        //  this.colors = this.colordata.colorArray;
          this.colors = this._sharedService.colors
          this.arrayColors = this._sharedService.arrayColors;
         

  
     //   this.colors = ['#ffffff', '#000000'];
    //    console.log('colors are', typeof this.colors);
      //   console.log('colors are', this.colors);


  }
  
  @Output()  widgetData: EventEmitter<any> = new EventEmitter();
   saveColor(val){
       this.elRef.nativeElement.dispatchEvent(
        new CustomEvent('widgetData', { bubbles: true, detail: val }));
   }



/*
   constructor(private cpService: ColorPickerService, private injector: Injector , private elRef: ElementRef) {
      // Get set of color from menu 
     


       console.log('color data is', this.colordata);
       console.log('array collors',  this.colors);

       console.log('array collors',  this.colors);
    


     // this.selectedColor = '#dddddd'


     // this.colors.push(this.arrayColors[this.selectedColor]);
    }

*/







 // colors: string[] = [];
  // showNum: string;
 // colordata: string;

 // @Input() passDynamicData: string;
 // colorData: string;







@Input() colorPicker;
@Output() colorChange: EventEmitter<string> = new EventEmitter<string>();


//@Input() colordata; 
colordata:any

@Input() arrayColors
private selectedColor: string = 'color';

@Input() dataExtra;

 colorChanged(event){
    this._sharedService.colorChaged(event)
   console.log('color changed', event)
    //this.colorChange.emit(event);
 }
    
  confirmColor() {
        

        /*
        if(this.dialog) {
          this.colors.push(this.color);
          this.open = false;
        }
        */
  }

   // colordata =  0;
/*
   
*/

 

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



