
import { Component, OnInit } from '@angular/core';

//text
@Component({
  selector: 'text',
  template: 
	`<p contenteditable='true'>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	Praesent ultricies pretium arcu eu rutrum. 
	Sed non metus gravida, rutrum ligula nec, suscipit turpis. 
	Nullam finibus eget risus hendrerit varius. 
	Ut facilisis, magna vel imperdiet tristique, urna elit malesuada ante, 
	quis ultricies dolor est non risus. Curabitur nisi orci, viverra non est
	 nec, mollis fermentum velit. In nec metus accumsan, 
	 malesuada nulla non, rhoncus eros. Suspendisse a dui facilisis, 
	 sodales ante ut, laoreet diam. Nulla vel lorem pharetra, 
	 feugiat nulla eget, laoreet nulla.

	</p>`
  
  //styleUrls: ['./text.component.css']
})
export class text  {}


// textarea
@Component({
  selector: 'html-textarea',
  template: 
	`<textarea contenteditable="true">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
		Praesent ultricies pretium arcu eu rutrum. 
		Sed non metus gravida, rutrum ligula nec, suscipit turpis. 
		Nullam finibus eget risus hendrerit varius. 
		Ut facilisis, magna vel imperdiet tristique, urna elit malesuada ante, 
		quis ultricies dolor est non risus.
	</textarea>
	`
  
  //styleUrls: ['./text.component.css']
})
export class textarea  {}


// UL list
@Component({
  selector: 'ullist',
  template: 
	`this is a list toggle loaded`
  
  //styleUrls: ['./text.component.css']
})
export class ullist  {}

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

@Component({
  selector: 'html-images',
  template: 
	`
	
	<div class="carousel">
	  <slide>
	    
	  </slide>
	 
	</div>
	
	`
  
  //styleUrls: ['./text.component.css']
})
export class images  {

	
}

@Component({
  selector: 'slide',
  template: 
	`  
	   <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150">
	    <div class="carousel-caption">
	      <h3>First slide label</h3>
	      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
	    </div>
	`
})
export class slide  {}







// FAQ
@Component({
  selector: 'accordion',
  template: 
	`
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
 	
	<accordion [closeOthers]="oneAtATime">
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
		  <accordion-group heading="Content 1">
		    <p>Content 1</p>
		  </accordion-group>
		  <accordion-group heading="Content 2">
		    <p>Content 2</p>
		  </accordion-group>
	</accordion>
	 -->

	`
  
  //styleUrls: ['./text.component.css']
})
export class accordion  {}


// Tabs
@Component({
  selector: 'tabs',
  template: 
	`
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
  
  //styleUrls: ['./text.component.css']
})
export class tabs  {}

import {videoState} from '../../toolbar/services/videoState.service'

// Video
@Component({
  selector: 'html-video',
  template: 
	`
	
	    <div class="embed-container" *ngIf="_videoState.activeVideo?.videoId != null">
	        <iframe width="560"
	                height="315"
	                frameborder="0"
	                allowfullscreen
	                [src]="_videoState.activeVideo?.videoId | youtubeSafeUrl"
	                style="border: solid 1px black"


	                >
	        </iframe>
	      </div>

	`
  
  //styleUrls: ['./text.component.css']
})
export class video  {
	 constructor( private _videoState: videoState) {}
}



// Tabs
@Component({
  selector: 'googlemaps',
  template: 
	`
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
  
  //styleUrls: ['./text.component.css']
})
export class googlemaps  {}

// Tabs
@Component({
  selector: 'testimonials',
  template: 
	`
	<!--
	<testimonials>
	  <testimonial>
	    <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150">
	    <div class="carousel-caption">
	      <h3>First slide label</h3>
	      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
	    </div>
	  </testimonial>
	  <testimonial>
	    <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150">
	    <div class="carousel-caption">
	      <h3>Second slide label</h3>
	      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	    </div>
	  </testimonial>
	  <testimonial>
	    <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350×150&w=350&h=150">
	    <div class="carousel-caption">
	      <h3>Third slide label</h3>
	      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
	    </div>
	  </testimonial>
	</testimonials>
-->
	`
  
  //styleUrls: ['./text.component.css']
})
export class testimonials  {}

// Tabs
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