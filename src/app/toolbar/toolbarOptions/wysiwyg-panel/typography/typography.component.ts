
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FormControl } from '@angular/forms';

import { Component, ElementRef, ViewChild ,OnInit ,Input ,
 Inject, ForwardRefFn, forwardRef
} from '@angular/core';


import {fontsService} from '../../../services/fonts.service';
import { Font, GoogleFonts, GoogleFontInterface  } from './typograpy-interfaces';


// import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-typography',
 // templateUrl: './typography.component.html',
  template: `

dasdasd
   {{presetFonts}}

      <div class="font-group">
        <div class="group-text">{{fpPresetLabel}}</div>
        <div class="group-line"></div>
      </div>
      <!--
 <div *ngFor="let fontItem of presetFonts | StatefulSlice:0:loadedFonts" class="font-item" [ngClass]="{active: fontItem.family.toLowerCase() == font.family.toLowerCase(), selected: selectedFont}" [ngStyle]="{'font-family': fontItem.family}" (click)="onSelectFont(fontItem)">
      --> 
      <div *ngFor="let fontItem of loadFonts | StatefulSlice:0:loadedFonts"  (click)="onSelectFont(fontItem)">
        <div class="font-info">
      
          <span class="font-name">{{fontItem.family}}</span>

          <div *ngIf="!fontItem.files" class="not-available">!</div>
        </div>
      </div>
 

   <div *ngIf="selectedFont && (fpStyleSelect || fpSizeSelect)">
    <div  class="font-options">
      <div *ngIf="fpStyleSelect" class="left">
        <select class="style-select" [disabled]="!font.styles" (change)="onFontStyleChange($event, font)" [(ngModel)]="font.style">
          <option *ngFor="let style of font.styles" [value]="style">{{style | FontStyles}}</option>
        </select>
      </div>

      <div *ngIf="fpSizeSelect" class="right">
        <input type="number" pattern="[0-9]*" min="1" max="100" (change)="onFontSizeChange($event, font)" [ngClass]="{'size-select': fpStyleSelect}" [ngModel]="font.size | FontSize" />
      </div>
    </div>
  </div>



  `,
  styleUrls: ['./typography.component.css']


})


export class TypographyComponent  implements OnInit{





  public top: number;
  public left: number;
  public position: string;

  //public  font: Font ;
public font: any ={}
  public initialFont: Font;

  private styles: string[] = [];
 private testWidth: number;
  private testContainer: any;

  public listLabel: string;
  public selectedFont: boolean;
  public presetVisible: boolean;

  public arrowTop: number;
  public fontAmount: number = 5;
  public loadedFonts: number = 0;

  public presetFonts: Font[] = [];
  public googleFonts: Font[] = [];
  public currentFonts: Font[] = [];
  public loadFonts: any;


  public fpPresetLabel: string;
  public fpPresetFonts: Array<any>;

    public fpSizeSelect: boolean;
  public fpStyleSelect: boolean;


testing: any;
preSet: any;

instance: any;

 private directiveInstance: any;
  private directiveElementRef: ElementRef;

public searchTerm = new FormControl('');
/*
 setDialog(
 instance: any,
  elementRef: ElementRef, 
  font: Font, fpPosition: string, fpPositionOffset: string, fpPositionRelativeToArrow: boolean, 
  fpPresetLabel, fpPresetFonts, fpUploadButton: boolean, fpUploadButtonClass: string, 
  fpUploadButtonText: string, fpStyleSelect:boolean, fpSizeSelect:boolean,  
  fpCancelButton: boolean, fpCancelButtonClass: string, fpCancelButtonText: string,
   fpHeight: string, fpWidth: string) {

 ) {
 	*/


    constructor( private el: ElementRef, private _fontsService: fontsService) {
    	
	//console.log('type of', typeof this.font)

    	//console.log('orginal', this.font)
    	this.selectedFont = false;

	this._fontsService.getAllFonts('popularity').subscribe((data) => {
	     // this.loading = false;
this.testing = data;
console.log (this.testing);

	      this.googleFonts = data.items.map((font) => this.convertGoogleFont(font));

console.log ('googleFonts',this.googleFonts);


this.preSet = this.googleFonts[0].family // Preset data in string , should be in service
 	    // Find styles for initial font
	      let searchFont = this.findFont(this.preSet, true);

this.loadedFonts = this.fontAmount;
 this.directiveInstance = this.instance;
	      this.loadFonts =   this.googleFonts; 


console.log('searchFont', searchFont)







/*
 	     if (searchFont) {
	        this.font.files = searchFont.files;
  		
	        console.log( 'font files', this.font.files)
	        this.font.styles = searchFont.styles;
	        console.log( 'font style', this.font.styles)
 
	        this.loadGoogleFonts([this.font]);


	      }

/*
	     

	     

	      // Load Open Sans if available
	      let openSans = this.googleFonts.find((font) => font.family == 'Open sans');

	      this.loadGoogleFonts([openSans]);
	      */
	    })
	   // err => console.log(err));


   	//console.log('wh',  this._fontsService.getAllFonts) 
   }

     
  ngOnInit() {
  	    this.searchTerm
	      .valueChanges
	      .debounceTime(500)
	      .distinctUntilChanged()
	      .subscribe((text) => {
	        if (!text) {
	          this.presetVisible = true;
	          this.listLabel = 'Popular fonts';
	        } else {
	          this.presetVisible = false;
	          this.listLabel = 'Search results';
	        }

	        this.searchGoogleFonts(text);
	   });
 	// Don't allow too many loading requests in a short time span.
     //   Observable.fromEvent(this.el.nativeElement, 'ps-y-reach-end')
    //    .debounceTime(150)
     //   .subscribe(() => this.loadMoreFonts());

  }
  onSelectFont(font: any) {
console.log('font is ',font)
  
    this.selectedFont = true;
this.fpStyleSelect = true;
console.log('log this',font)
console.log('log this FOnt clas', Font)

console.log('predifiened class object', this.font)

console.log('do you have font style', font.styles)



 this.font.styles = font.styles;
 this.font.family = font.family;
  this.font.style = font.styles.indexOf('regular') > -1 ? 'regular' : font.styles[0];
    this.directiveInstance.fontChanged(this.font);
 console.log( 'font style is object is', this.font)
     /*
    this.font.files = font.files;

    this.font.family = font.family;

    this.font.style = font.styles.indexOf('regular') > -1 ? 'regular' : font.styles[0];

    this.directiveInstance.fontChanged(this.font);
    */
  }



 setDisplayedFontSource() {
    if (this.fpPresetFonts && this.fpPresetFonts.length) {
      this.setCurentFonts(this.getPresetFonts());
    } else {
      this.setCurentFonts(this.googleFonts);
    }
  }

getPresetFonts(
	) {




    let presetFonts = [];

console.log(
this.googleFonts, this.fpPresetFonts, this.fpPresetFonts.length
	)

    if (this.googleFonts && this.fpPresetFonts && this.fpPresetFonts.length) {
      this.fpPresetFonts.forEach((font) => {
        let fontClass = this.findFont(font, true);

        if (!fontClass) {
          fontClass = new Font( {
            family: font,
            size: null,
            style: null,
            styles: ['regular', 'italic']
          });
        }

        presetFonts.push(fontClass);
      });

      this.presetFonts = presetFonts;

      return presetFonts;
    }
  }

 setCurentFonts(target: Font[]) {
    if (target != this.currentFonts) {
      this.currentFonts = target;
      this.loadedFonts = this.fontAmount;

      let initialFonts = this.currentFonts.slice(0, this.fontAmount);

      this.loadGoogleFonts(initialFonts);

      setTimeout(() => {
       // this.scrollbar.scrollTo(0);
      }, 0);
    }
  }

  findFont(searchVal, exactMatch:boolean = false): Font {
    return this.findFonts(searchVal, exactMatch)[0];
  }

  findFonts(searchVal, exactMatch:boolean = false) : Font[] {
    searchVal = searchVal.toLowerCase();

    let fullmatchFonts: Font[] = [];
    let candidateFonts: Font[] = [];

    this.googleFonts.forEach((font) => {
      if (searchVal === font.family.toLowerCase()) {
        fullmatchFonts.push(font);

        return;
      }

      if (exactMatch == false && font.family.toLowerCase().indexOf(searchVal) > -1) {
        candidateFonts.push(font);
      }
    });

    let resultFonts: Font[] = fullmatchFonts.concat(candidateFonts);

    return resultFonts;
  }

  convertGoogleFont(font: GoogleFontInterface): Font {
	    let convertedFont = new Font({
	      family: font.family,
	      styles: font.variants,
	      files: font.files,
	      style: null,
	      size: null
	    });

	    return convertedFont;
  }

  searchGoogleFonts(value: string) {
    if (!value) {
      this.onSearchReset();

      return;
    }

    value = value.toLowerCase();

    let searchResult: Font[] = Array();

    if (this.googleFonts) {
      this.loadedFonts = this.fontAmount;
      searchResult = this.findFonts(value, false);

      this.setCurentFonts(searchResult);
    }
  }

  onSearchReset(event?: any) {
    this.searchTerm.setValue('');

    this.setCurentFonts(this.googleFonts);
  }
  


 loadGoogleFonts(fonts: Font[]) {
    fonts.slice(0, this.fontAmount).forEach((font: any) => {
      if (font && font.files && !this.isFontAvailable(font)) {
        let style = font.styles.indexOf('regular') > -1 ? '' : ':'  + font.styles.find((x: any) => !isNaN(x));

/*
        try {
          WebFont.load({
            google: {
              families: [font.family + ':' + style]
            }
          });
        } catch (e) {
          console.warn('Problem with loading font:', font);
        }
  */     
      }

    });

  }

 isFontAvailable(font: Font) {
    if (!this.testWidth) {
      this.testContainer.style.fontFamily = 'monospace';

      document.body.appendChild(this.testContainer);

      this.testWidth = this.testContainer.clientWidth;

      document.body.removeChild(this.testContainer);
    }

    this.testContainer.style.fontFamily = font.family + ', monospace';

    document.body.appendChild(this.testContainer);

    let width = this.testContainer.clientWidth;

    document.body.removeChild(this.testContainer);

    return width != this.testWidth;
  }

/*
  loadMoreFonts() {
    if (this.open && !this.loading && this.loadedFonts < this.currentFonts.length) {
      let moreFonts = this.currentFonts.slice(this.loadedFonts, this.loadedFonts + this.fontAmount);

      this.loadGoogleFonts(moreFonts);

      this.loadedFonts += moreFonts.length;

      setTimeout(() => { this.scrollbar.update(); }, 0);
    }
  }
  */


    onFontStyleChange(event: any, font: Font) {
    let str = this.font.family + ':' +  event.target.value;

/*
    if (font.files) {
      WebFont.load({
        google: {
          families: [str]
        }
      });
    }
*/
    this.directiveInstance.fontChanged(this.font);
  }

}




