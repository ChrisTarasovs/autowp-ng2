import {HeadingComponent} from '../../toolbarOptions/wysiwyg-panel/heading/heading.component';
import {ColorSelectorComponent} from '../../toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import {LinksComponent} from '../../toolbarOptions/wysiwyg-panel/links/links.component';
import {TypographyComponent} from '../../toolbarOptions/wysiwyg-panel/typography/typography.component';
import {ImagePanelComponent} from '../../toolbarOptions/image-panel/image-panel.component';
import {ExamplesComponent} from '../../toolbarOptions/examples/examples.component';
import {BuilderPanelComponent} from '../../toolbarOptions/builder-panel/builder-panel.component'

export const  WysiwygMenu = [
	
	    {id: 1,  title: 'Edit',  icon: 'fa-pencil ',

	       command: 'wysiwygMenu', //enableEdit
	       componentMenuSelector: false,
	       children:[3,4,5,6,7,8,9,10]
	   },
	    {id: 2,   title: 'Settings',   icon: 'fa-sliders',
	     
	        componentMenuSelector: false,
	        componentID : 2
	    },
	    {id: 3,   title: 'Sections',   icon: 'fa-sliders',
	       
	      
	        componentMenuSelector: false,
	        componentID : 8
	   },
	    {id: 4,   title: 'Bold',  icon: 'fa-bold',
	        
	       
	        command: 'bold',   tag: 'b',

	      
	        componentMenuSelector: false,
	    },
	    {id: 5,   title:'Italic',    icon: 'fa-italic',
	       
	       command: 'italic',  tag: 'i',

	    
	        componentMenuSelector: false,
	    },
	    {id: 6,  
	        title:'Headlines', 
	        icon: 'fa-header',
	        command: 'headlineView',

	        componentMenuSelector: false,
	        componentID : 1, 

	        component: HeadingComponent
	    }, 
	    {id: 7,  
	        title:'Link', 
	        command: 'createlink',
	        icon: 'fa-link',
	        tag: 'a',
	        componentMenuSelector: 'links-menu',
	        componentID : 3
	    },
	    {id: 8,  
	        title:'Color',
	        icon: 'fa-slack',
	        componentMenuSelector: 'color-menu',
	        componentID : 2,
	        command: 'color',
	       // enable: 'colorSelectorComponent'
	        component: ColorSelectorComponent,
	        colorArray: [ '#000000', '#0000ff' ],
	        arrayColors: {color: '#000000', color2: '#999999'}
	    },
	    {id: 9,  
	        title: 'Typography', 
	        icon: 'fa-font',

	        componentMenuSelector: 'typography-menu',
	        componentID : 4
	    },
	    /*
	    {id: 10,  title:'Media', icon: 'fa fa-picture-o',
	       
	        command: 'createMedia',
	        
 	        componentMenuSelector: 'media-menu',
	        componentID :  5
	    },
	    */
	    {id: 11,
	        title:'Button Type', 
	        icon: 'fa-battery-empty',
	        command: 'buttonTypeCommand',
	        componentMenuSelector: 'buttontype',
	        componentID :  10
	    }
	];
