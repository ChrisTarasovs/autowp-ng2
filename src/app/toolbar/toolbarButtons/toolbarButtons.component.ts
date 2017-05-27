import {   Component, Input,  Output,  EventEmitter} from '@angular/core';

import {wysiwygComponent} from './wysiwyg/wysiwyg.component';
import {widgetsService} from '../services/widgets.service'
import {menuService} from '../services/menu.service'
import {wysiwygService} from '../services/wysiwyg.service'
import {canvasService} from '../services/canvas.service'

@Component({
  selector: 'toolbar-buttons',
  outputs: ['clickedBtn', 'loadWidget'],
  template:  `
      <div *ngIf="viewBuilder">
        <tbuttons [btnlist]="builder" (buttonClick)="this._widgetsService.loadWidget($event.componentNameString)" ></tbuttons>
      </div>
      <div *ngIf="viewWysiwyg">
         <tbuttons [btnlist]="wysiwyg" (buttonClick)="this._wysiwygService.execCommand($event)"  ></tbuttons>
      </div>
      <div *ngIf="viewImgAlignment">
          <tbuttons [btnlist]="imgAlignment"></tbuttons>
      </div>
      <div *ngIf="viewBtnSettings">
        <tbuttons [btnlist]="btnSettings" (buttonClick)="buttonsettings()"></tbuttons>
      </div>
      <div *ngIf="viewMiscellaneous">
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
             private _wysiwygService: wysiwygService) {}
       
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

          //Top level Menu buttons
         //buttonstypes:boolean = false;
       //  videoSearchBox:boolean = false;



          // Set menu list
          wysiwyg: any = []
          imgAlignment: any = []
          builder: any = []
          btnSettings: any = []
          miscellaneous: any =[]

          viewWysiwyg: boolean = false;
          viewImgAlignment: boolean = false;
          viewBuilder: boolean = false;
          viewBtnSettings: boolean = false;
          viewMiscellaneous: boolean = false;

          ngOnInit(){
            this.viewBuilder = true;
            this.wysiwyg =  this._menuService.toolbarBtns[0].wysiwyg; 
            this.imgAlignment = this._menuService.toolbarBtns[0].imgAligmnet; 
            this.builder = this._menuService.toolbarBtns[0].Builder;
            this.btnSettings = this._menuService.toolbarBtns[0].ButtonSettings;
            this.miscellaneous = this._menuService.toolbarBtns[0].miscellaneous;
          }
  

}
