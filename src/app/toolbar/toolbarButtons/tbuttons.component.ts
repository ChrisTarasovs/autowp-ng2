import { Component,Input,  Output,  OnInit, EventEmitter} from '@angular/core';
import {videoSearchBoxComponent}  from './videoSearch/videoSearch.component'
import { ButtonTypeComponent  } from './widgets/buttonType-menu/button-type.component';
import { LinksMenuComponent } from './widgets/links-menu/links-menu.component';
import { ColorMenuComponent } from './widgets/color-menu/color-menu.component';

@Component({
  selector: 'tbuttons',
  template:  `
  <div *ngIf="btnlist[0].name == 'Components' " >
	<button (click)="enableVideo('videoSettingsSearch')">videoSettingsSearch</button>  	
	<button (click)="enableVideo('linkMenu')">linkMenu</button>  	
	<button (click)="enableVideo('colorMenu')">colorMenu</button>  	
	<button (click)="enableVideo('buttontype')">buttontype</button>  	
</div>

  	<ul>
	  	<li *ngFor="let button of btnlist">
	  		<button (click)="buttonClickfunc(button)">{{button.name}}</button>
	  			
	  		 <div  *ngIf='button.componentNameString == "widgetSettingsComponent"'>
	  		  	<div  *ngIf='videoSettingsSearch'>
		                      		<video-search-box></video-search-box>
		                      	</div>
		                      	<div *ngIf="linkMenu" >
		                          	<links-menu [hidden]="!linkMenu"></links-menu>
		                        </div>
				<div *ngIf="colorMenu" >
		                          	<color-menu  (saveColors)="saveColorsFunc($event)" ></color-menu>
		                       </div>
		             </div>
	  	</li>
  	</ul>
  `
})

export class tButtonsComponent implements OnInit{
	videoSettingsSearch: boolean = false;
	linkMenu: boolean = false;
	colorMenu: boolean = false;
	buttontype: boolean = false;

	enableVideo(enab){
		if(enab == 'videoSettingsSearch'){
			this.videoSettingsSearch = !this.videoSettingsSearch
		}else if(enab == 'linkMenu'){
			this.linkMenu = !this.linkMenu
		}else if(enab == 'colorMenu'){
			this.colorMenu = !this.colorMenu
		}else{
			this.buttontype = !this.buttontype
		}
	}

	 @Input('btnlist') public btnlist;
	 constructor() {}

	 @Output () buttonClick: EventEmitter<any> = new EventEmitter();

	 buttonClickfunc(button){
		this.buttonClick.emit(button)
	 }

	 ngOnInit(){}
}