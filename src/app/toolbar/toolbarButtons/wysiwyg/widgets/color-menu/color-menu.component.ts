import { 
  Component,ViewChild,  EventEmitter, Output , Directive,ElementRef


} from '@angular/core';
import {ColorPickerModule, ColorPickerDirective} from 'angular2-color-picker';
import {ColorPickerService} from 'angular2-color-picker';
import { ColorSelectorComponent } from '../../../../../toolbar/toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';


@Component({
  selector: 'color-menu',
  templateUrl: './color-menu.component.html',
  outputs: ['clickedColor'],
  styleUrls: ['./color-menu.component.css']
})
export class ColorMenuComponent  {
  private arrayColors: any = {};
  private selectedColor: string = 'color';
  colors: string[] = [];

  clickedColor: EventEmitter<any> = new EventEmitter();
  constructor(private cpService: ColorPickerService) {
    	this.arrayColors['color'] = '#2883e9'
    	this.colors = ['#2883e9','#e920e9']

   }
 confirmColor(selectedColor) {
     //   console.log('selectedColor', selectedColor)
        this.colors.push(this.arrayColors[this.selectedColor]);
        this.clickedColor.emit(selectedColor)
 }



}
