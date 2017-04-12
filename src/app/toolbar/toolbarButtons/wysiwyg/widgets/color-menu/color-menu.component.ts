import {Component,ViewChild,  EventEmitter, Output , Directive,ElementRef, Input,  OnChanges } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ColorPickerModule, ColorPickerDirective} from 'angular2-color-picker';
import {ColorPickerService} from 'angular2-color-picker';
import {ColorSelectorComponent } from '../../../../../toolbar/toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import {SharedColorService} from '../../../../services/shared.service'


@Component({
  selector: 'color-menu',
  templateUrl: './color-menu.component.html',
  styleUrls: ['./color-menu.component.css']
})
export class ColorMenuComponent  implements OnChanges{

   colorsForm: FormGroup;
   colorHex: any = '';


   constructor(private fb: FormBuilder, private _sharedService: SharedColorService) {
       this.createForm();
           this._sharedService.colorHex$.subscribe(
                data => {
                    console.log('Sibling2Component-received from sibling1: ' + data);
                    this.colorsForm.patchValue({
                        colorHex: data
                    });
            });

   }
   createForm() {
        this.colorsForm = this.fb.group({
            colorHex: ''
        });
    }

   ngOnChanges() {

   }
   onSubmit(): void {
        // console.log('Sibling1Component-received from sibling2: ' + this._sharedService.subscribeData());
        console.log('Form submitted-sibling1Form');
        let colorHex = this.colorsForm.get('colorHex').value;
        this._sharedService.publishData(colorHex);
    }


  // Set default value
  colorValue:string = '#dddeee'; 
  // Color array
  colors: string[] = [];
 
 // Events
@Output()  saveColors: EventEmitter<any> = new EventEmitter();

  // Color changed
  colorValueChange(inputValue){


  }

  // Save color
   saveColor(inputValue) {
       // Push the color to array
       this.colors.push(inputValue);
       console.log('color string', this.colors)
       this.saveColors.emit(this.colors)
      
       
     
   }



  @Input() colorChange:string = ' xxx '; 

  private arrayColors: any = {};


selectedColor: string = '#dddeee';


/*
 
  constructor(private cpService: ColorPickerService) {
     // this.addSelectedColor.value
     this.colorChange = this.colorChange;
    	this.arrayColors['color'] = this.selectedColor;
    //  alert(this.arrayColors['color']);


    	this.colors = ['#2883e9','#e920e9']

   }
   */



}
