import { 
  Component,
  Input,
  OnInit,
  OnChanges,
 ElementRef,
  ViewChild,
  forwardRef,
 SimpleChanges,
  Output,
  EventEmitter,
  Renderer
} from '@angular/core';

import { toolbarComponent } from './toolbar/toolbar.component';
import { LayoutComponent } from './layout/layout.component';


/*
export interface ToolbarButton {
  title: string;
  command: string;
  tag: string;
  options?: any;
  active?: boolean;
}
*/

@Component({
  selector: 'app-root',
  template:
 ` 
 <toolbar  (commandExecuted)="onCommandExecuted()"></toolbar>
 
  <layout></layout>
  

 `
  ,
  styleUrls: ['./app.component.css']
 
})

export class AppComponent {
    onCommandExecuted(){
    }
 
}
