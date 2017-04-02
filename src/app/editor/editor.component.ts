import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';
import { DndComponent } from '../dnd/dnd.component';
import { TextComponent } from '../dnd/text/text.component';
import { ColorSelectorComponent } from '../toolbar/toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';



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
  
  
    constructor() {
        this.myComponents = myComponents;
    }
    
    //@Input() editMode: boolean;

   // @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() commandExecuted: EventEmitter<any> = new EventEmitter();



    isActive(command) {
        return !!command && document.queryCommandState(command);
    }
    //toggleEditMode() {
     //   this.editMode = !this.editMode;
      //  this.editModeChange.emit(this.editMode);
    //}
    loadView(item){
        this.componentData = _.find(this.myComponents,{id:item.componentID});
        this.menuComponentData = _.find(this.myComponents,{id:item.menuComponentID});
    }

    loadBuilder(){
      this.componentData = _.find(this.myComponents,{id: 5});
  
    }
    testLoad(){
      this.componentData = _.find(this.myComponents,{id: 1});
    //  this.menuComponentData = _.find(this.myComponents,{id: 2});
    }
    
    

    ngOnInit() {
    }
 

}


const myComponents =[
    {id : 1, component: ColorSelectorComponent,inputs: { showNum: 9 }},
 
    {id : 5, component: DndComponent,inputs: { showNum: 0 }}, // builder
 
    {id : 9, inputs: { showNum: 0 }},
    {id : 10,  inputs: { showNum: 0 }}

];
