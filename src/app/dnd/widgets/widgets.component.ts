
import { Component, OnInit , EventEmitter, Input,  Output, Injector} from '@angular/core';
import {FormsModule} from '@angular/forms'
import  {ContentEditableDirective} from '../../../app/contenteditable-model';
import { toolbarStateService} from '../../toolbar/services/toolbarStatus.service';
// import {ResizingCroppingImagesComponent} from '../../image-cropper/image-cropper.component'
// import {canvasService} from '../../toolbar/services/canvas.service'
 import {wysiwygService} from '../../toolbar/services/wysiwyg.service'

//text
@Component({
  selector: 'text',
  template: 
// <div  class="line-breaker"
// 	contenteditable='true'
// 	(contenteditableModelChange)="updatedinnerHtml($event)"
// 	 [contenteditableModel]="paragraphText"
// ></div>
`

  <div contenteditable ></div>

<button (click)="trys()">bold</button>


	`
})
export class text  {
	public button: any = {id: 0,   
				    name: 'Bold',  
				    icon: 'fa-bold',
				    command: 'bold',   
				    tag: 'b', 
				    active: false, 
				    componentMenuSelector: false,
				 },
	trys(){
		    event.stopPropagation();
    event.preventDefault();
		     this._wysiwygService.execCommand(this.button)
	}
	public widget;
	public widgetCopy;
	public data;
	public paragraphText;

	constructor(
		private _widgetsService:widgetsService, 
		private injector: Injector,   
		private _toolbarStateService: toolbarStateService,
		private _wysiwygService : wysiwygService
		
		){
alert('start')
		// this.widgetCopy = Object.assign(this.injector.get('widget'), {});
		// this.paragraphText  = this.widgetCopy.settings.innerhtml;
	}

	updatedinnerHtml(ev){
		// this.widgetCopy.settings.innerhtml = ev;
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
	<div *ngFor="let item of widget.settings.items">
		<testimonial [item]="item" [layout]="widget.settings.imagePosition"></testimonial>
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



//  <button (click)="Img.zoom('+')">+</button>
//  <button (click)="Img.zoom('-')">-</button>
//  <button (click)="Img.center()">center</button>

//  <br />
//  <input [(ngModel)]="Img.sizeW" placeholder="Img size Width">
//  <input [(ngModel)]="Img.sizeH" placeholder="Img size Height">
//  <input [(ngModel)]="Img.img" placeholder="Img">


// {{item.userdetails[0].image | json}}

  `
  

<div *ngIf="item.userdetails[0].image.imgCrop.dataURL">
	<img [src]="item.userdetails[0].image.imgCrop.dataURL" 
	[style.width.px]="item.userdetails[0].image.imgCrop.sizeW"    
	[style.height.px]="item.userdetails[0].image.imgCrop.sizeH"
	class="testimonial-avatar" >
</div>
<cropping-img 
 format="png" 
 style="background-color: blue; display: block; width: 100%; height: 100%;"
 [imgData]="item.userdetails[0].image"
  ></cropping-img>






	`

 // <button (click)="Img.zoom('+')">+</button>
 // <button (click)="Img.zoom('-')">-</button>
 // <button (click)="Img.center()">center</button>
// 	 <br />
//  <input [(ngModel)]="item.userdetails[0].image.imgCrop.sizeW" placeholder="Img size Width">
//   <!--
//  <input [(ngModel)]="item.userdetails[0].image.imgCrop.sizeH" placeholder="Img size Height">
// <input [(ngModel)]="Img.img" placeholder="Img"> -->

})
export class testimonial  {
	@Input('item') public item;
	@Input('layout') public layout;
	//public imageInfo:any  = this.item;
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