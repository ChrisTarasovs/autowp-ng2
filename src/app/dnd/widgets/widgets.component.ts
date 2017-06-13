
import { Component, OnInit , EventEmitter, Input,  Output, Injector} from '@angular/core';
import {FormsModule} from '@angular/forms'
import  {ContentEditableDirective} from '../../../app/contenteditable-model'
import { toolbarStateService} from '../../toolbar/services/toolbarStatus.service'
import {ResizingCroppingImagesComponent} from '../../image-cropper/image-cropper.component'
import {canvasService} from '../../toolbar/services/canvas.service'

//text
@Component({
  selector: 'text',
  template: 
//   <div  class="line-breaker"
// 	contenteditable='true'

// (contenteditableModelChange)="updatedinnerHtml($event)"
// [contenteditableModel]="paragraphText"

	// (contenteditableModelChange)="updatedinnerHtml($event)"
	//  [contenteditableModel]="paragraphText"

	//  [contenteditableModel]="paragraphText"
// [innerHtml]="paragraphText"
// 	></div>
`
<div  class="line-breaker"
	contenteditable='true'
	(contenteditableModelChange)="updatedinnerHtml($event)"
	 [contenteditableModel]="paragraphText"


	></div>
<button (click)="updatedinnerHtml('ooooo')">click</button>
	`
})
export class text  {
	
	public widget;
	public widgetCopy;
	public data;
	public paragraphText;

	constructor(
		private _widgetsService:widgetsService, 
		private injector: Injector,   
		private _toolbarStateService: toolbarStateService,
		private _canvasService: canvasService
		){

		this.widgetCopy = Object.assign(this.injector.get('widget'), {});

		this.paragraphText  = this.widgetCopy.settings.innerhtml;
	}


	updatedinnerHtml(ev){
		console.log('=======UPDDATE WIDGET==========' , this._canvasService.canvas)
this.widgetCopy.settings.innerhtml = 'pppppppp'
	//	console.log(this._canvasService.canvas[0].column[0].widgets[0].settings.innerhtml)
	//	this._canvasService.canvas[0].column[0].widgets[0].settings.innerhtml = ev;
		//this.widget.widget.settings.innerhtml = ev;
	}
	
	updated(){
		// Object.assign(this.widget.widget.settings  , this.data); 
	}
	otherupdated(){
		// Object.assign(this.widget.widget.settings  , this.data); 
	}
	
	

}


// textarea
@Component({
  selector: 'html-textarea',
  template: 
  //{{widget | json}}
  //{{widget.innerhtml | json}}
  //{{showNum | json}}
	`
	<button (click)="this._widgetsService.loadWidget('widgetSettingsComponent', widget)">settings</button>
	<textarea contenteditable="true" [innerHTML]="widget.widget.settings.innerhtml">
	</textarea>

	`
  
  //styleUrls: ['./text.component.css']
})
export class textarea  {
	public showNum;
	public widget;
	constructor(private _widgetsService:widgetsService, private injector: Injector) {
	     this.widget = this.injector.get('widget');
	}
}


// UL list
@Component({
  selector: 'ullist',
  template: 
	`
	<button (click)="this._widgetsService.loadWidget('widgetSettingsComponent', widget)">settings</button>
	<ul>
		<li *ngFor="let item of widget.widget.settings.items">
			<p contenteditable="true" [innerHTML]="item.content"></p>
		</li>
	</ul>
	`
})
export class ullist  {
	public widget;
	constructor(private _widgetsService:widgetsService, private injector: Injector){
		this.widget = this.injector.get('widget');
	}
}

// Single image
@Component({
  selector: 'single-image',
  template: 
	`<img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150">`
  
  //styleUrls: ['./text.component.css']
})
export class singleImage  {}




// Gallery image & Carousel Slider
// Single image, multiple image and carousel is all 1 
import {widgetsService} from '../../toolbar/services/widgets.service'

@Component({
  selector: 'html-images',
  template: 
  //{{widget.widget.settings.slides | json}}
	`
	
	<button (click)="this._widgetsService.loadWidget('widgetSettingsComponent', widget)">settings</button>
	<ul class="carousel">
	  <slide [slidedata]="slides"> </slide> 
	</ul>
	`
  
  //styleUrls: ['./text.component.css']
})

export class images  {
	public widget;
	//@Input('widgetData') public widget;
	slides: Array<any>;


	constructor(private _widgetsService:widgetsService, private injector: Injector){   
		this.widget = this.injector.get('widget');
		this.slides = this.widget.widget.settings.slides
			
	}
}

@Component({
  selector: 'slide',
  template: 
	`  
	SLIDES DATA
	{{ slides | json }}

	
		<li *ngFor="let slide of slides">
			 <img [src]="slide.org" [alt]="slide.title">
			<h3>{{slide.name}}</h3>
			<div [innerHTML]="slide.content"></div>
		</li>
	  
	`
})
export class slide  {
	@Input('slidedata') public slides;

}




// ACCORDION
@Component({
  selector: 'accordion',
  template: 
	`
	<button (click)="this._widgetsService.loadWidget('widgetSettingsComponent', widget)">settings</button>








	<!-- setting to enable or disable first panel to be open

		<button type="button" class="btn btn-primary btn-sm" 
		(click)="status.isFirstDisabled = ! status.isFirstDisabled">
		    Enable / Disable first panel
		  </button>

		Open only one at a time
		  <div class="checkbox">
		  <label>
		    <input type="checkbox" [(ngModel)]="oneAtATime">
		    Open only one at a time
		  </label>
		</div>
 	
	<div [closeOthers]="oneAtATime">
		  <accordion-group heading="Static Header, initially expanded"
			       heading="Static Header, initially expanded"
		                   [isOpen]="status.isFirstOpen"
		                   [isDisabled]="status.isFirstDisabled"

		  	>
		    	This content is straight in the template.
		  </accordion-group>
		 
	</div>
	 -->

	`
  
  //styleUrls: ['./text.component.css']
})
export class accordion  {
	public widget;
	public closeOthers;
	public isFirstOpen;
	constructor(private _widgetsService:widgetsService, private injector: Injector){   
		this.widget = this.injector.get('widget');
		this.closeOthers = this.widget.widget.setting.oneAtATime
		this.isFirstOpen = this.widget.widget.setting.isFirstOpen
	}
}

// accordion-group
@Component({
  selector: 'accordion-group',
  template: 
	`
	<!-- 
	
		  <accordion-group heading="Static Header, initially expanded"
			       heading="Static Header, initially expanded"
		                   [isOpen]="status.isFirstOpen"
		                   [isDisabled]="status.isFirstDisabled"

		  	>
		    	This content is straight in the template.
		  </accordion-group>

		  <accordion-group #group>

		    <div accordion-heading>
		      I can have markup, too!
		      <i class="pull-right float-xs-right glyphicon"
		         [ngClass]="{'glyphicon-chevron-down': group?.isOpen, 'glyphicon-chevron-right': !group?.isOpen}"></i>
		    </div>

		    This is just some content to illustrate fancy headings.
		  </accordion-group>
		
	</accordion>
	 -->

	`
  
  //styleUrls: ['./text.component.css']
})
export class accordionGroup  {}


// accordion-headin
@Component({
  selector: 'accordion-heading',
  template: 
  `
	Heading content

	`
  
  //styleUrls: ['./text.component.css']
})
export class accordionHeading  {}



// Tabs
@Component({
  selector: 'tabs',
  template: 
 //  <div *ngFor="let item of widget.widget.settings.items">
	// 	 <item-content [content]="item.content"></item-content>
	// </div>
	`
	 <button (click)="this._widgetsService.loadWidget('widgetSettingsComponent', widget)">settings</button>
	 

	<div 
	*ngIf="widget.widget.settings.tabposition == 'left' || widget.widget.settings.tabposition == 'top' " 
	[ngClass]="{'tabs-left': widget.widget.settings.tabposition == 'left', 'tabs-top': widget.widget.settings.tabposition == 'top'}"
	>

		<div *ngFor="let item of widget.widget.settings.items">
			{{item.title}}
		</div>


	</div>

	<!--
	<div 
	*ngIf="widget.widget.settings.tabposition == 'left' || widget.widget.settings.tabposition == 'top' " 


	>
		
	</div>
	-->


	<!-- setting to enable or disable first panel to be open

		<button type="button" class="btn btn-primary btn-sm" (click)="status.isFirstDisabled = ! status.isFirstDisabled">
		    Enable / Disable first panel
		  </button>

		Open only one at a time
		  <div class="checkbox">
		  <label>
		    <input type="checkbox" [(ngModel)]="oneAtATime">
		    Open only one at a time
		  </label>
		</div>
 	
	  <tabset #staticTabs>
	    <tab heading="Static title">Static content</tab>
	    <tab heading="Static Title 1">Static content 1</tab>
	    <tab heading="Static Title 2">Static content 2</tab>
	    <tab heading="Static Title 3" removable="true">Static content 3</tab>

	    <tab (select)="alertMe()">
	      <template tabHeading>
	        <i class="glyphicon glyphicon-bell"></i> Alert!
	      </template>
	      I've got an HTML heading, and a select callback. Pretty cool!
	    </tab>
	 
	  </tabset>
	   -->
	`
})
export class tabs  {
	public widget;
	 constructor(private _widgetsService:widgetsService, private injector: Injector) {  
		this.widget = this.injector.get('widget');			
	}
}


// // item-content
// @Component({
//   selector: 'item-content',
//   template: 
// 	`
// 	{{content | json}}
// 	`
// })
// export class itemContent {
// 	@Input('content') public content;

// }


import {videoState} from '../../toolbar/services/videoState.service'

// Video
@Component({
  selector: 'html-video',
  template: 
// {{widget | json}}

	`
	    <button (click)="this._widgetsService.loadWidget('widgetSettingsComponent', widget)">settings</button>
	    <div class="embed-container" *ngIf="widget.widget.settings.yturl.videoId != null">
	        <iframe width="560"
	                height="315"
	                frameborder="0"
	                allowfullscreen
	                [src]="widget.widget.settings.yturl.videoId | youtubeSafeUrl"
	                style="border: solid 1px black" >
	        </iframe>
	      </div>

	`
  
  //styleUrls: ['./text.component.css']
})
export class video  {
	public widget;
	constructor( private _videoState: videoState, private _widgetsService:widgetsService, private injector: Injector) {  
		this.widget = this.injector.get('widget');			
	}
}



// Tabs
@Component({
  selector: 'googlemaps',
  template: 
	`
	maps
	`
  
  //styleUrls: ['./text.component.css']
})
export class googlemaps  {}

// Tabs
@Component({
  selector: 'testimonials',
  template: 
	`
	
	<button (click)="this._widgetsService.loadWidget('widgetSettingsComponent', widget)">settings</button>
	<div *ngFor="let item of widget.widget.settings.items">
		<testimonial [item]="item" [layout]="widget.widget.settings.imagePosition"></testimonial>
	</div>
	
	`
})
export class testimonials  {
	public widget;
	//@Input('widgetData') public widget;
	items: Array<any>;


	constructor(private _widgetsService:widgetsService, private injector: Injector){   
		this.widget = this.injector.get('widget');
	}

}


@Component({
  selector: 'testimonial',
  template: 
//   <div class="main-gallery">
//   <div class="gallery-cell">
//     <div class="testimonial">


//     	<!-- 
//     	Here we pull the image from OBJ 
//     	We have option to delete image, by removing form obj
//     	If object empty, show input and cropper
//     	we have cropper func to enable cropping.
//     	-->
//     	<img [src]="Img.imgCrop" 
// 	    	  [style.width.px]="this.imgData.sizeW"    
//                           [style.height.px]="this.imgData.sizeH"
// 		  class="testimonial-avatar" >


//     	<div class="img-container">
	    		
//     			<cropping-img 
// 			     #Img 
// 			     format="png" 
// 			     style="background-color: blue; display: block;"
// 			     [imgData]="imgData"
// 			      ></cropping-img>
// 	</div>	      



//       <q class="testimonial-quote">
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mauris ex, gravida ut leo eu, rhoncus porta orci. Fusce vitae rutrum nulla."
//       </q>

//       <span class="testimonial-author">Joe Smith, CEO of Cubix</span>

//     </div>
//   </div>

// </div>



//  <button (click)="Img.zoom('+')">+</button>
//  <button (click)="Img.zoom('-')">-</button>
//  <button (click)="Img.center()">center</button>

//  <br />
//  <input [(ngModel)]="Img.sizeW" placeholder="Img size Width">
//  <input [(ngModel)]="Img.sizeH" placeholder="Img size Height">
//  <input [(ngModel)]="Img.img" placeholder="Img">



	`









	<div *ngIf="layout == 'top'  || layout == 'left' " 
	[ngClass]="{'image-left': layout == 'left', 'image-top': layout == 'top'}">
	    <img [src]="item.userdetails.name">
	</div>

	<div class="testimonial-caption">
	      <h3>
		      <span contenteditable="true" [innerHTML]="item.userdetails.name"></span>
		      <span contenteditable="true" [innerHTML]="item.userdetails.surname"></span>
	      </h3>
	      <p contenteditable="true">{{item.testimonial}}</p>
	</div>

	<div *ngIf="layout == 'right'  || layout == 'bottom' " 
	[ngClass]="{'image-right': layout == 'right', 'image-top': layout == 'bottom'}">
	    <img [src]="item.userdetails.name">
	</div>


	`
})
export class testimonial  {
	@Input('item') public item;
	@Input('layout') public layout;
	// public  imgData

	// constructor(){

	// 				this.imgData  = {
	// 				sizeW: 230;
	// 			  	sizeH: 230;}
	// }
}


// ModalBox
@Component({
  selector: 'modalBox',
  template: 
	`
		modalBox

	`
  
  //styleUrls: ['./text.component.css']
})
export class modalBox  {}


//text
//textarea
//ullist
//singleImage
//galleryImage & Carousel Slider
//accordion
//tabs
// video
//googlemaps
// testimonials
//modalBox

// Tour - what is TOur for?
/*
Text Block
Icon
 FAQ
Single Image
Image Gallery
Image Carousel
Tabs
Accordion

Video Player
Google Maps
Raw HTML
Raw JS
Carousel Slider
Modal Box
*/