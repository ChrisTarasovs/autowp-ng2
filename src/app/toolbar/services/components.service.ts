import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {  text, textarea,ullist,singleImage, images, accordion,tabs,video, googlemaps,testimonials, modalBox} from '../../dnd/widgets/widgets.component';
//import {Video} from '../toolbarOptions/widgetSettings/set-video/video.model';


@Injectable()
export class cmpService {

    widgets = [
		 {type: 'widget',
		 settings: [{
		                  isLoaded:false,
		                  name: 'Text',
						  icon:'fa-pencil-square-o',
		                  componentName: 'text',
		                  innerhtml: '<p>dasdas</p>'
		              }],
	              widgetProperties: { dimension: [ 0,100,0,0 ],  location: [0,0,0,0] },
	              widgetComponent:  {component: text, inputs: { name: 'example'} }
	            },
            	{type: 'widget',
        		settings: 
            	   	[{
		                  isLoaded:false,
		                  name: 'Textarea',
						  icon:'fa-pencil-square-o',
		                  componentName: 'textarea',
		                  innerhtml: 'This is an awesome text area'
		            }],
	            widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
	            widgetComponent:  {component: textarea, inputs: {name: 'example'} }
		},
     		 {type: 'widget',
     		 settings: 
     			[{
		                  isLoaded:false,
		                  name: 'images',
						  icon:'fa-pencil-square-o',
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
        		 {type: 'widget',
        		 settings: 
        			[{
		                  isLoaded:false,
		                  name: 'accordion',
						  icon:'fa-pencil-square-o',
		                  componentName: 'accordion',
		                  isFirstOpen: false,
		                  oneAtATime: false,
		                  items: [{ 
	                  			title:'',
	                  		   	content: ''
	                              }]
		            }],
            	widgetProperties: {dimension: [ 0,0,0,0 ],  location: [0,0,0,0]},
            	widgetComponent:  { component: accordion,inputs: {name: 'example'} }
	            },
	             {type: 'widget',
	             settings: 
            		[{
		                  isLoaded:false,
		                  name: 'tabs',
						  icon:'fa-pencil-square-o',
		                  componentName: 'tabs',
		                  tabposition: 'left',
		                  isFirstOpen: false,
		                  items: [{
		                  		title:'',
	                  		   	content: ''
		                  }]
		            }],
	            widgetProperties: { dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
	            widgetComponent:  {component: tabs, inputs: {name: 'example' }}
	        	},
	             {type: 'widget',
	             settings: 
	            	[{
		                  isLoaded:false,
		                  name: 'video',
						  icon:'fa-pencil-square-o',
		                  componentName: 'video',
		                  yturl: '',
		             }],
	            widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
            	widgetComponent:  { component: video,inputs: {name: 'example' }}
	            },
	             {type: 'widget',
	            settings: [{
		                  isLoaded:false,
		                  name: 'googlemaps',
						  icon:'fa-pencil-square-o',
		                  componentName: 'googlemaps',
		                  innerhtml: {}
		                }],
            	widgetProperties: {dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
            	widgetComponent:  {component: tabs,inputs: { name: 'example'}}
	            },
	             {type: 'widget',
	             settings: [{
		                  isLoaded:false,
		                  name: 'testimonials',
						  icon:'fa-pencil-square-o',
		                  componentName: 'testimonials',
		                  grid: true,
		                  carousel: true,
		                  imagePosition: 'left',
		                  items: [{ 
		                  		userdetails:[{
			                  			 name: '',
			                  		   	 surname: '',
			                  		   	 email: '',
			                  		   	 image: {
			                  		   	 	alt: '',
			                  		   	 	_img: '',
			                  		   	 	img: '',
			                  		   	 	origImg: '',
			                  		   	 	origSrc:{
			                  		   	 		src: '',
			                  		   	 		dataUrl: ''
			                  		   	 	},
			                  		   	 	imgCrop: {
			                  		   	 		dataURL:'',
			                  		   	 		sizeW: 200,
			                  		   	 		sizeH: 200

			                  		   	 	},
			                  		   	 	cropped:{
			                  		   	 		test: ''
			                  		   	 	},
			                  		   	 	placeholder:{
			                  		   	 		sizeW: 200,
			                  		   	 		sizeH: 200			                  		   	 		
			                  		   	 	},
			                  		   	 	cropping: {
			                  		   	 		move: false,
			                  		   	 		positionTop: '',
			                  		   	 		positionLeft: '',
			                  		   	 		container: '',
			                  		   	 		dataUrl: '',
			                  		   	 		centerY: '',
			                  		   	 		centerX: '',
			                  		   	 	},
			                  		   	 	// height: 200,
			                  		   	 	// width: 200,
			                  		   	 	imgWidth:'',
			                  		   	 	imgHeight: '',
			                  		   	 	imgDataUrl: '',


			                  		   	 	_left: 0,
			                  		   	 	_top: 0,
			                  		   	 	_format: 'jpeg'
			                  		   	 }
		                  			}],
		                  		   testimonial: ''
		                                     }]
		            }],
           		widgetProperties: { dimension: [ 0,0,0,0 ],  location: [0,0,0,0]},
   	         	widgetComponent:  {component: testimonials ,inputs: {name: 'example'}}
            	},
            	 {type: 'widget',
            	 settings: 
            		[{
		                  isLoaded:false,
		                  name: 'modalBox',
						  icon:'fa-pencil-square-o',
		                  componentName: 'modalBox',
		                  modalposition: [
		                  		        { value: 'top', display: 'top'},
				                    { value: 'right', display: 'right'},
				                    { value: 'bottom', display: 'bottom'},
				                    { value: 'left', display: 'left'}
		                  ],
		                  items: [{
		                  		modalname: '',
		                  		modalcontent: ''
		                  }]
		            }],
	            widgetProperties: { dimension: [ 0,0,0,0 ], location: [0,0,0,0]},
	            widgetComponent:  {component: tabs,inputs: {name: 'example' }}
	        	}
	        ]

