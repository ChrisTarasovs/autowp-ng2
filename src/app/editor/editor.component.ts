import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';
import { DndComponent } from '../dnd/dnd.component';
import { TextComponent } from '../dnd/text/text.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { LinksComponent } from './links/links.component';
import { TypographyComponent } from './typography/typography.component';
import { MediaComponent } from './media/media.component';
import { HeadingComponent } from './heading/heading.component';
import { HeadingMenuComponent } from './heading-menu/heading-menu.component';
import { MenuTypePipe } from '../pipes/menu-type.pipe';
import { SectionsComponent } from '../sections/sections.component';
import * as _ from "lodash";


@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
    
    componentData = null;
    menuComponentData = null;
    myComponents=[];
    editor = [];
    constructor() {
        this.editor = editor;
        this.myComponents = myComponents;
    }

    loadView(item){
        this.componentData = _.find(this.myComponents,{id:item.componentID});
        this.menuComponentData = _.find(this.myComponents,{id:item.menuComponentID});
    }
    loadsubView(item){
      this.componentData = _.find(this.myComponents,{id: this.editor[item].componentID});
      this.menuComponentData = _.find(this.myComponents,{id: this.editor[item].menuComponentID});
    }
    ngOnInit() {
    }
 

}


const myComponents =[
    {id : 1, component: ColorSelectorComponent,inputs: { showNum: 9 }},
    {id : 2, component: LinksComponent,inputs: { showNum: 0 }},
    {id : 3, component: TypographyComponent,inputs: { showNum: 0 }},
    {id : 4, component: MediaComponent,inputs: { showNum: 0 }},
    {id : 5, component: DndComponent,inputs: { showNum: 0 }},
    {id : 6, component: HeadingComponent, inputs: { showNum: 0 }},
    {id : 7, component: HeadingMenuComponent,inputs: { showNum: 0 }},
    {id : 8, component: SectionsComponent,inputs: { showNum: 0 }},
    {id : 9, inputs: { showNum: 0 }}
];
const editor = [
    {id: 1, 
       title: 'Edit',
       command: 'enableEdit',
      
       children:[4,5,6,7,8,9,10]},
    {id: 2,  
        title: 'Settings',
        command: 'settings',
       
        componentID : 2},
    {id: 3,  
        title: 'Sections', 
        componentID : 8},
    {id: 4,  
         title: 'Bold',
         command: 'bold',
         tag: 'b'
    },
    {id: 5,  
        title:'Italic', 
        command: 'italic',
        tag: 'i',
        componentID : 2},
    {id: 6,  
        title:'Headlines', 
        componentID : 6, 
        menuComponentID : 7
    },
    {id: 7,  
         title:'H1', 
         command: 'formatBlock',
         options: '<h1>',
         tag: 'h1',
        componentID : 6, 
        menuComponentID : 7
    },
    {id: 8,  
         title:'H2', 
         command: 'formatBlock',
         options: '<h2>',
         tag: 'h2',
        componentID : 6, 
        menuComponentID : 7
    },
    {id: 9,  
         title:'H3', 
         command: 'formatBlock',
         options: '<h3>',
         tag: 'h3',
        componentID : 6, 
        menuComponentID : 7
    },
    {id: 10,  
         title:'H4', 
         command: 'formatBlock',
         options: '<h4>',
         tag: 'h4',
        componentID : 6, 
        menuComponentID : 7
    },
    {id: 11,  
         title:'H5', 
         command: 'formatBlock',
         options: '<h5>',
         tag: 'h5',
        componentID : 6, 
        menuComponentID : 7
    },
    {id: 12,  
        title:'Link', 
        command: 'createlink',
        tag: 'a',
        componentID : 2},
    {id: 13,  
        title:'Color', 
        componentID : 1},
    {id: 14,  
        title: 'Typography', 
        componentID : 3},
    {id: 14,
        name:'Media', 
        componentID :  4},
    {id: 15,
        title:'Builder', 
        componentID :  5},    
    {id: 16,
        title:'Image left', 
        componentID : 8},
    {id: 17,
        title:'Image center', 
        componentID : 8},
    {id: 18,
        title:'Image justify', 
        componentID : 8},
    {id: 19,
        title:'Image hero', 
        componentID : 8},
    {id: 20,
        title:'Image right', 
        componentID : 8},
 
    
];