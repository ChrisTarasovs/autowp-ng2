import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {  text, textarea,ullist,singleImage, images, accordion,tabs,video, googlemaps,testimonials, modalBox} from '../../dnd/widgets/widgets.component';



@Injectable()
export class cmpService {

    widgets = [
		 {settings: 
		  	[{
		                  isLoaded:false,
		                  name: 'Text',
		                  componentName: 'text',
		                  innerhtml: {}
		              }],
	              widgetProperties: { dimension: [ 0,0,0,0 ],  location: [0,0,0,0] },
	              widgetComponent:  {component: text, inputs: { name: 'example'} }
	            },
            	{settings: 
            	   	[{
		                  isLoaded:false,
		                  name: 'Textarea',
		                  componentName: 'textarea',
		                  innerhtml: 'This is an awesome text area'
		            }],
		            widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
		            widgetComponent:  {component: textarea, inputs: {name: 'example'} }
		},
	            {settings: 
	            	[{
		                  isLoaded:false,
		                  name: 'Ullist',
		                  componentName: 'ullist',
		                  innerhtml: {}
		            }],
            		widgetProperties: {dimension: [ 0,0,0,0 ],  location: [0,0,0,0] },
            		widgetComponent:  {component: ullist, inputs: {name: 'example'}}
		},
            	{settings: 
            		[{
		                  isLoaded:false,
		                  name: 'singleImage',
		                  componentName: 'singleImage',
		                  innerhtml: {}
		             }],
            		widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0] },
            		widgetComponent:  {component: singleImage, inputs: { name: 'example'}}
		},
     		{settings: 
     			[{
		                  isLoaded:false,
		                  name: 'images',
		                  componentName: 'images',
		                  singleimage: false,
		                  gallery: true,
		                  carousel: true,
		                  slides: [{ 
		                  		   name: '',
	                                       	   description: '',
		                                       alt: 'placeholder', 
		                                       org: ' ', 
		                                       xsize: ' '
		                                     },
		                                     {
		                                       name: '',
	                                       	   description: '', 
		                                       alt: 'placeholder', 
		                                       org: ' ', 
		                                       xsize: ' '
		                                     },
		                                     { 
		                                      name: '',
	                                       	   description: '',
		                                       alt: 'placeholder', 
		                                       org: ' ', 
		                                       xsize: ' '
		                  		}]

            		}],
            		widgetProperties: { dimension: [ 0,0,0,0 ],  location: [0,0,0,0] },
		            widgetComponent:  {component: images,inputs: {name: 'example'}}
	            },
        		{settings: 
        			[{
		                  isLoaded:false,
		                  name: 'accordion',
		                  componentName: 'accordion',
		                  innerhtml: {}
		            }],
	            	widgetProperties: {dimension: [ 0,0,0,0 ],  location: [0,0,0,0]},
	            	widgetComponent:  { component: accordion,inputs: {name: 'example'} }
	            },
           		{settings: 
           			[{
		                  isLoaded:false,
		                  name: 'tabs',
		                  componentName: 'tabs',
		                  innerhtml: {}
		            }],
		            widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
		            widgetComponent:  {component: tabs,inputs: {name: 'example'}}
	            },
	            {settings: 
	            	[{
		                  isLoaded:false,
		                  name: 'video',
		                  componentName: 'video',
		                  innerhtml: {}
		             }],
	            widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
            	widgetComponent:  { component: video,inputs: {name: 'example' }}
	            },
	            {
	            settings: [{
		                  isLoaded:false,
		                  name: 'googlemaps',
		                  componentName: 'googlemaps',
		                  innerhtml: {}
		                }],
            	widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
            	widgetComponent:  {component: tabs,inputs: { name: 'example'}}
	            },
	            {settings: 
	            	[{
		                  isLoaded:false,
		                  name: 'testimonials',
		                  componentName: 'testimonials',
		                  innerhtml: {}
		            }],
           		widgetProperties: { dimension: [ 0,0,0,0 ],  location: [0,0,0,0]},
   	         	widgetComponent:  {component: tabs,inputs: {name: 'example'}}
            	},
            	{settings: 
            		[{
		                  isLoaded:false,
		                  name: 'modalBox',
		                  componentName: 'modalBox',
		                  innerhtml: {}
		            }],
	            widgetProperties: { dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
	            widgetComponent:  {component: tabs,inputs: {name: 'example' }}
	        	}
	        ]

