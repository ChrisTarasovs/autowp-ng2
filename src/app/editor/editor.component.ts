import { Component, OnInit } from '@angular/core';
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
   // title = 'app works!';
   
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
},{
    id : 6,
    component: HeadingComponent,
    inputs: { showNum: 0 }
},{
    id : 7,
    component: HeadingMenuComponent,
    inputs: { showNum: 0 }
},{
    id : 8,
    component: SectionsComponent,
    inputs: { showNum: 0 }
},{
    id : 9,
   // component: SectionsComponent,
    inputs: { showNum: 0 }
}
];
const editor = [
    {id: 1, name: 'Edit',children:[4,5,6,7,8,9,10]},
    {id: 2,name: 'Settings',componentID : 2},
    {id: 3, name: 'Sections', componentID : 8},
    {id: 4, name: 'Bold'},
    {id: 5, name:'Italic', componentID : 2},
    {id: 6, name:'Headlines', componentID : 6, menuComponentID : 7},
    {id: 7, name:'Link', componentID : 2},
    {id: 8, name:'Color', componentID : 1},
    {id: 9,name: 'Typography', componentID : 3},
    {id: 10,name:'Media', componentID :  4},
    {id: 11,name:'Builder', componentID :  5},
    
    {id: 12,name:'Image left', componentID : 8},
    {id: 13,name:'Image center', componentID : 8},
    {id: 14,name:'Image justify', componentID : 8},
    {id: 15,name:'Image hero', componentID : 8},
    {id: 16,name:'Image right', componentID : 8},
 
    
];