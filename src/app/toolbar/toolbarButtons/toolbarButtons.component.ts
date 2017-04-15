import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {wysiwygComponent} from './wysiwyg/wysiwyg.component';
import {widgetsService} from '../services/widgets.service'
import {menuService} from '../services/menu.service'


@Component({
  selector: 'toolbar-buttons',
  outputs: ['clickedBtn', 'loadWidget'],
  template:  `
  	<ul  class="toolbarButtons">
            <li>
                <button (click)="enableEditMode()"><i class="fa fa-pencil"></i></button>
                <wysiwyg  (saveColors)="saveColorsFunc($event)" [ngClass]="(enableEdit == true ) ? 'activeSubMenu' : 'disabledSubMenu' "></wysiwyg>
            </li>
               <li style="width: 200px !important;">
                <button type="button"  (click)="loadwidgetpanel('VideoComponent')">Video</button>
                <div class="btn-view" *ngIf='videoSearchBox'>
                      <video-search-box></video-search-box>
                </div>
            </li>
            <li style="width: 200px !important;">
                <button (click)="toggleEditMode()">HTML</button>
            </li>
            <li style="width: 200px !important;">
                <button type="button"  (click)="loadwidgetpanel('SectionsComponent')">
                Settings</button>
            </li>
             <li style="width: 200px !important;">
                <button type="button"  (click)="loadwidgetpanel('ExamplesComponent')">Examples</button>
            </li>
             <li style="width: 200px !important;">
                <button type="button"  (click)="loadwidgetpanel('ButtonTypeWidgetComponent')">Button types</button>
                <div class="btn-view" *ngIf='buttonstypes'>
                      <buttontype></buttontype>
                </div>
            </li>
          
  		<image></image>
            <li>
                <button type="button"  (click)="loadwidgetpanel('DndComponent')">Builder</button>
            </li>
  	</ul>
  `
})

export class toolbarButtonsComponent {
           constructor(private _widgetsService: widgetsService, private _menuService: menuService) {}
       
         



          clickedBtn: EventEmitter<any> = new EventEmitter();
          clickedSetBtn: EventEmitter<any> = new EventEmitter();
          loadWidget: EventEmitter<any> = new EventEmitter();

           @Input() editMode: boolean;
           @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();
         
           @Input() radomData;





          toggleEditMode(){
             this.editMode = !this.editMode;
             this.editModeChange.emit(this.editMode);
             console.log('event is toggle mode');
          }


           //Enable edit mode
          enableEdit: boolean = false;
         
          enableEditMode(){
            this.videoSearchBox = false;
             this.enableEdit = !this.enableEdit;
             if (this.editMode) {
                  alert('it is false');
                  return false;
              }
         }


          //Top level Menu buttons
         buttonstypes:boolean = false;
         videoSearchBox:boolean = false;
         
         loadwidgetpanel(widgetID){
          
                if(widgetID == 'ButtonTypeWidgetComponent'){
                     this.buttonstypes = !this.buttonstypes;
                }else if(widgetID == 'VideoComponent'){
                    this.videoSearchBox = !this.videoSearchBox;
                }else if (widgetID == 'ExamplesComponent'){

                }


                this._widgetsService.loadWidget(widgetID);
                console.log('in toolbarButtons ID', widgetID);

          }




}
