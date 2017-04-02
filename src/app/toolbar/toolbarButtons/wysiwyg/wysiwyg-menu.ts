export const  WysiwygMenu = [
	    {id: 1, 
	       title: 'Edit',
	       command: 'enableEdit',
	       icon: 'fa-pencil ',
	        componentMenuSelector: false,
	       children:[3,4,5,6,7,8,9,10]
	   },
	    {id: 2,  
	        title: 'Settings',
	        icon: 'fa-sliders',
	        componentMenuSelector: false,
	        componentID : 2
	    },
	    {id: 3,  
	        title: 'Sections', 
	        icon: 'fa-sliders',

	        componentMenuSelector: false,
	        componentID : 8
	   },
	    {id: 4,  
	         title: 'Bold',
	         icon: 'fa-bold',
	         tag: 'b',

	        command: 'bold',
	        componentMenuSelector: false,
	    },
	    {id: 5,  
	        title:'Italic', 
	        icon: 'fa-italic',
	        tag: 'i',

	        command: 'italic',
	        componentMenuSelector: false,
	    },
	    {id: 6,  
	        title:'Headlines', 
	        icon: 'fa-header',
	        command: 'headlineView',

	        componentMenuSelector: false,
	        componentID : 1, 
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
	        componentID : 2
	    },
	    {id: 9,  
	        title: 'Typography', 
	        icon: 'fa-font',

	        componentMenuSelector: 'typography-menu',
	        componentID : 4
	    },
	    {id: 10,
	        title:'Media', 
	        icon: 'fa fa-picture-o',
 	        componentMenuSelector: 'media-menu',
	        componentID :  5
	    },
	    {id: 11,
	        title:'Button Type', 
	        icon: 'fa-battery-empty',
	        command: 'buttonTypeCommand',
	        componentMenuSelector: 'buttontype',
	        componentID :  10
	    }
	];
