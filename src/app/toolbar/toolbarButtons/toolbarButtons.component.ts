import {   Component, Input,  Output,  EventEmitter} from '@angular/core';

import {wysiwygComponent} from './wysiwyg/wysiwyg.component';
import {widgetsService} from '../services/widgets.service'
import {menuService} from '../services/menu.service'
import {wysiwygService} from '../services/wysiwyg.service'
import {canvasService} from '../services/canvas.service'
import { toolbarStateService} from '../services/toolbarStatus.service'

@Component({
  selector: 'toolbar-buttons',
  outputs: ['clickedBtn', 'loadWidget'],
  template:  `
      <div *ngIf="this._toolbarStateService.viewBuilder">
        <tbuttons [btnlist]="builder" (buttonClick)="this._widgetsService.loadWidget($event.componentNameString)" ></tbuttons>
      </div>
      <div *ngIf="this._toolbarStateService.viewWysiwyg">
         <tbuttons [btnlist]="wysiwyg" (buttonClick)="wysiwygClicked($event)"  ></tbuttons>
      </div>
      <div *ngIf="this._toolbarStateService.viewImgAlignment;">
          <tbuttons [btnlist]="imgAlignment"></tbuttons>
      </div>
      <div *ngIf="this._toolbarStateService.viewBtnSettings">
        <tbuttons [btnlist]="btnSettings" (buttonClick)="buttonsettings()"></tbuttons>
      </div>
      <div *ngIf="this._toolbarStateService.viewMiscellaneous">
        <tbuttons [btnlist]="miscellaneous" (buttonClick)="this._widgetsService.loadWidget($event.componentNameString)"></tbuttons>
      </div>

<!--
  	<ul  class="toolbarButtons">
            <li>
                <button (click)="enableEditMode()"><i class="fa fa-pencil"></i></button>
                <wysiwyg  (saveColors)="saveColorsFunc($event)" [ngClass]="(enableEdit == true ) ? 'activeSubMenu' : 'disabledSubMenu' "></wysiwyg>
            </li>
            
            <li style="width: 200px !important;">
                <button (click)="toggleEditMode()">HTML</button>
            </li>

  	</ul>
    -->
  `
})

export class toolbarButtonsComponent {
           constructor(
             private _canvas: canvasService, 
             private _widgetsService: widgetsService, 
             private _menuService: menuService,  
             private _wysiwygService: wysiwygService,
             private _toolbarStateService: toolbarStateService
             ) {}
       
          clickedBtn: EventEmitter<any> = new EventEmitter();
          clickedSetBtn: EventEmitter<any> = new EventEmitter();
          loadWidget: EventEmitter<any> = new EventEmitter();

           @Input() editMode: boolean;
           @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();
         
      

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

        buttonsettings(){alert('something')}


          // Set menu list
          wysiwyg: any =  this._menuService.toolbarBtns[0].wysiwyg; 
          imgAlignment: any = this._menuService.toolbarBtns[0].imgAligmnet; 
          builder: any = this._menuService.toolbarBtns[0].Builder;
          btnSettings: any = this._menuService.toolbarBtns[0].ButtonSettings;
          miscellaneous: any = this._menuService.toolbarBtns[0].miscellaneous;


         wysiwygClicked(button) {

                this._wysiwygService.execCommand(button)
          }


          ngOnInit(){
          }
  

}
