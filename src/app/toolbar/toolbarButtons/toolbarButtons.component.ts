import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {wysiwygComponent} from './wysiwyg/wysiwyg.component';



@Component({
  selector: 'toolbar-buttons',
  outputs: ['clickedBtn', 'clickedClrBtn', 'loadWidget'],
  template:  ` 
  	<ul  class="toolbarButtons">
  		<wysiwyg  (clickedBtn)="getCommand($event)" (clickedClrBtn)="getColor($event)"></wysiwyg>
            <li>
                <button (click)="toggleEditMode()">HTML</button>
            </li>
            <li class="tempSettings">
                <button type="button"  (click)="loadwidgetpanel('2222')">Settings</button>
            </li>
            <li>
                <button type="button"  (click)="loadwidgetpanel(6)">Examples</button>
            </li>
            <li>
                <button type="button"  (click)="loadButtonTypes()">Button types</button>
                <div class="btn-view">
                      <buttontype></buttontype>
                </div>
            </li>
  		<image></image>
            <li>
                <button type="button"  (click)="loadwidgetpanel(8)">Builder</button>
            </li>
  	</ul>
  `
})

export class toolbarButtonsComponent {

          clickedBtn: EventEmitter<any> = new EventEmitter();
          clickedClrBtn: EventEmitter<any> = new EventEmitter();
          clickedSetBtn: EventEmitter<any> = new EventEmitter();
          loadWidget: EventEmitter<any> = new EventEmitter();

           @Input() editMode: boolean;
           @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();
         
          getCommand(evt){
              console.log('toolbar buttons events registered', evt.command, evt.options);
              this.clickedBtn.emit(evt);
          }
          getColor(color){
            console.log('color in toolbar buttons is',color)
            this.clickedClrBtn.emit(color);
          }
          toggleEditMode(){
             this.editMode = !this.editMode;
             this.editModeChange.emit(this.editMode);
             console.log('event is toggle mode');
          }
          loadButtonTypes(){

          }

          loadwidgetpanel(widgetID){
                console.log('in toolbarButtons ID', widgetID);
               this.loadWidget.emit(widgetID);
          }

          loadExamples(){

          }
}
