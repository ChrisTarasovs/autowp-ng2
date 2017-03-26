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
import { ButtontypeComponent } from './buttontype/buttontype.component';

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
    toolbarEditor = [];
    toolbarImageAlign = [];

    constructor() {
        this.toolbarEditor = toolbarEditor;
        this.toolbarImageAlign = toolbarImageAlign;
        this.myComponents = myComponents;
    }
    
    @Input() editMode: boolean;

    @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() commandExecuted: EventEmitter<any> = new EventEmitter();

    // Custom Angular Events    
     execCommand(command: string, options: string) {
      
        if (this.editMode) {
            alert('it is false');
          return false;
        }

        if (command === 'createlink') {
          options = window.prompt('Please enter the URL', 'http://');
          if (!options) {
            return;
          }
        }

        let selection = document.getSelection().toString();

        console.warn(selection);
        if (command === 'createlink' && selection === '') {
          document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
        }
        else {
          document.execCommand(command, false, options);
        }

        this.commandExecuted.emit();
    }
    isActive(command) {
        return !!command && document.queryCommandState(command);
    }
    toggleEditMode() {
        this.editMode = !this.editMode;
        this.editModeChange.emit(this.editMode);
    }
    loadView(item){
        this.componentData = _.find(this.myComponents,{id:item.componentID});
        this.menuComponentData = _.find(this.myComponents,{id:item.menuComponentID});
    }
    loadsubView(item){
      this.componentData = _.find(this.myComponents,{id: this.toolbarEditor[item].componentID});
      this.menuComponentData = _.find(this.myComponents,{id: this.toolbarEditor[item].menuComponentID});
    }
    loadBuilder(){
      this.componentData = _.find(this.myComponents,{id: 5});
     // this.menuComponentData = _.find(this.myComponents,{id: this.toolbarEditor[item].menuComponentID});
    }
    testLoad(){
      this.componentData = _.find(this.myComponents,{id: 5});
      this.menuComponentData = _.find(this.myComponents,{id: 2});
    }
    
    

    ngOnInit() {
    }
 

}


const myComponents =[
    {id : 1, component: ColorSelectorComponent,inputs: { showNum: 9 }},
    {id : 2, component: LinksComponent,inputs: { showNum: 0 }},
    {id : 3, component: TypographyComponent,inputs: { showNum: 0 }},
    {id : 4, component: MediaComponent,inputs: { showNum: 0 }},
    {id : 5, component: DndComponent,inputs: { showNum: 0 }}, // builder
    {id : 6, component: HeadingComponent, inputs: { showNum: 0 }},
    {id : 7, component: HeadingMenuComponent,inputs: { showNum: 0 }},
    {id : 8, component: SectionsComponent,inputs: { showNum: 0 }},
    {id : 9, inputs: { showNum: 0 }},
    {id : 10, component: ButtontypeComponent, inputs: { showNum: 0 }}

];
const toolbarEditor = [
    {id: 1, 
       title: 'Edit',
       command: 'enableEdit',
       icon: 'fa-pencil ',
       children:[3,4,5,6,7,8,9,10,11]
   },
    {id: 2,  
        title: 'Settings',
        icon: 'fa-sliders',
        componentID : 2
    },
    {id: 3,  
        title: 'Sections', 
        icon: 'fa-sliders',
        componentID : 8},
    {id: 4,  
         title: 'Bold',
         icon: 'fa-bold',
         command: 'bold',
         tag: 'b'
    },
    {id: 5,  
        title:'Italic', 
        command: 'italic',
        icon: 'fa-italic',
        tag: 'i'
    },
    {id: 6,  
        title:'Headlines', 
        icon: 'fa-header',
        command: 'headlineView',
        componentID : 6, 
        menuComponentID : 7,
        menuView: 'Heading view'
    }, 
    {id: 7,  
        title:'Link', 
        command: 'createlink',
        icon: 'fa-link',
        tag: 'a',
        componentID : 2},
    {id: 8,  
        title:'Color',
        icon: 'fa-slack',
        componentID : 1},
    {id: 9,  
        title: 'Typography', 
         icon: 'fa-font',
        componentID : 3},
    {id: 10,
        name:'Media', 
        icon: 'fa fa-picture-o',
        componentID :  4},
    {id: 11,
        name:'Button Type', 
        icon: 'fa-battery-empty',
        componentID :  10
    }

];

const toolbarImageAlign = [    
    {id: 1,
        title:'Image left', 
        icon: 'fa-align-left',
        componentID : 8},
    {id: 2,
        title:'Image center', 
        icon: 'fa-align-center',
        componentID : 8},
    {id: 2,
        title:'Image justify', 
        icon: 'fa-align-justify',
        componentID : 8},
    {id: 3,
        title:'Image hero', 
        icon: 'fa-align-justify',
        componentID : 8},
    {id: 4,
        title:'Image right', 
        icon: 'fa-align-right',
        componentID : 8
    }
];
