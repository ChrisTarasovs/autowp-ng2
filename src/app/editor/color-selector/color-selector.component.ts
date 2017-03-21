import { Component, OnInit } from '@angular/core';
import {ColorPickerService} from 'angular2-color-picker';
//import {ColorPickerService, Rgba} from 'angular2-color-picker/lib';


@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent  {

    private color: string = "#127bdc";
    private color2: string = "hsla(300,82%,52%)";
    private color3: string = "#fff500";
    private color4: string = "rgb(236,64,64)";
    private color5: string = "rgba(45,208,45,1)";
    private color6: string = "#1973c0";
    private color7: string = "#f200bd";
    
    private arrayColors: any = {};
    private selectedColor: string = 'color';
    
    constructor(private cpService: ColorPickerService) {
        this.arrayColors['color'] = '#2883e9';
        this.arrayColors['color2'] = '#e920e9';
        this.arrayColors['color3'] = 'rgb(255,245,0)';
        this.arrayColors['color4'] = 'rgb(236,64,64)';
        this.arrayColors['color5'] = 'rgba(45,208,45,1)';
    }

}

