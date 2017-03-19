import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';
import { DndComponent } from '../dnd/dnd.component';
import { TextComponent } from '../dnd/text/text.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { LinksComponent } from './links/links.component';
import { TypographyComponent } from './typography/typography.component';
import { MediaComponent } from './media/media.component';
import { MenuTypePipe } from '../pipes/menu-type.pipe';

import * as _ from "lodash";


@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  componentData = null;
  
    myComponents=[];
    editor = [];
    constructor() {
        this.editor = editor;
        this.myComponents = myComponents;
     
    }

    loadView(item){
        this.componentData = _.find(this.myComponents,{id:item.componentID});
    }
    loadsubView(item){
     this.componentData = _.find(this.myComponents,{id: this.editor[item].componentID});
    }
    ngOnInit() {
    }
 

}


const myComponents =[{
    id : 1,
    component: ColorSelectorComponent,
    inputs: { showNum: 9 }
},{
    id : 2,
    component: LinksComponent,
    inputs: { showNum: 0 }
},{
    id : 3,
    component: TypographyComponent,
    inputs: { showNum: 0 }
},{
    id : 4,
    component: MediaComponent,
    inputs: { showNum: 0 }
},{
    id : 5,
    component: DndComponent,
    inputs: { showNum: 0 }
}
];
const editor = [
    {
     id: 0, 
     name: 'Edit',
     children:[4,5,6,7,8,9,10]
    },
    {
     id: 1, 
     name: 'Settings',
     componentID : 2
    },
    {
     id: 2, 
     name: 'Examples'
    },
    {
    id: 3, name: 'Bold'
    },
    {id: 4, name:'Italic', componentID : 2},
    {id: 5, name:'Headlines'},
    {id: 6, name:'Link',componentID : 2},
    {id: 7, name:'Sizes'},
    {id: 8,name: 'Color',componentID : 1},
    {id: 9,name: 'Typography',componentID : 3},
    {id: 10,name:'Media',componentID : 4},
    {id: 11,name:'Builder',componentID : 5}
    
];