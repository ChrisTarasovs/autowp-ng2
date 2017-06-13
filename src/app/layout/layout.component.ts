import {  
  Component, Input,OnInit,OnChanges,ElementRef,
  forwardRef,Output,EventEmitter,Renderer,NgZone,
  ViewContainerRef,ViewChild,ReflectiveInjector,
  ComponentFactoryResolver,SimpleChanges
} from '@angular/core';
import {FormsModule} from '@angular/forms'

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

// Importing Drag Module and widgets
import { DndComponent } from '../dnd/dnd.component';


// These import are for JQ function below
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import {dndService} from '../toolbar/services/dnd.service';
import {canvasService} from '../toolbar/services/canvas.service'
import {DynamicPanelComponent} from '../toolbar/toolbarOptions/dynamic-panels/dynamic.component';

import { Safe } from '../pipes/safehtml.pipe'

import * as _ from "lodash";

// import {ResizingCroppingImagesComponent} from '../image-cropper/image-cropper.component'
import {cmpService} from '../toolbar/services/components.service'

export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LayoutComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};


// All the drag component list items
import { text, textarea,ullist,singleImage, images, accordion, accordionGroup, accordionHeading, tabs, video, googlemaps,testimonials, testimonial,modalBox } from '../dnd/widgets/widgets.component';

// import  {ContentEditableDirective} from '../contenteditable-model'

@Component({
  selector: 'layout',
  entryComponents: [ text, textarea,ullist,singleImage, images, accordion, accordionGroup, accordionHeading, tabs, video, googlemaps,testimonials, testimonial, modalBox 

  ],  // Reference to the components must be here in order to dynamically create them
  template:  



  `




<div  style="  height: 450px; overflow: scroll;">
	 <pre>
		{{ canvas | json}}
	</pre>
</div>

<div style="width: 1200px; margin: 0px auto;"
class="canvas"
dnd-droppable
[dropZones]="['canvas-dropZone']"
(onDragEnter)="onDragEnter($event, canvas,  'canvas')"
(onDropSuccess)="onDropSuccess($event,  canvas,  'canvas')" 
>

	<div   
		*ngFor="let row of canvas; let rowIndex = index" 
		dnd-droppable
		[dropZones]="['rowWrapper-dropZone']"
		(onDragEnter)="onDragEnter($event, row,  'rowWrapper', rowIndex)"
		(onDropSuccess)="onDropSuccess($event, row,  'rowWrapper', rowIndex )" 

		class="AWrowWrapper" 
		

		>

		<div class="AWrow"   
		dnd-droppable
		[dropZones]="['row-dropZone']"
		(onDragEnter)="onDragEnter($event, row,  'row', rowIndex)"
		(onDropSuccess)="onDropSuccess($event, row,  'row', rowIndex )" 
		
		>

			<div 
				*ngFor="let column of row.column; let columnIndex = index" 
				dnd-droppable
				[dropZones]="['column-dropZone']"
				(onDragEnter)="onDragEnter($event)"
				(onDropSuccess)="onDropSuccess($event, column, 'columnWrapper', rowIndex, columnIndex )" 


				class="AWcolumnWrapper"
				
				

			>

			
		<div class="AWcolumn"
				
				dnd-droppable
				[dropZones]="['column-dropZone']"
				(onDragEnter)="onDragEnter($event)"
				(onDropSuccess)="onDropSuccess($event, column, 'column', rowIndex, columnIndex )" 

		>		



<div *ngIf="checknested(column)">
	<div *ngFor="let nestedRow of column.rows"
		class="AWrowWrapper"
		dnd-droppable
		[dropZones]="['rowWrapper-dropZone']"
		(onDragEnter)="onDragEnter($event, row,  'rowWrapper', rowIndex)"
		(onDropSuccess)="onDropSuccess($event, row,  'rowWrapper', rowIndex )" 

		>
		<div class="AWrow">
			<div class="AWcolumnWrapper"
			 	*ngFor="let nestedcolumn of nestedRow.column;let columnIndex = index"
			 	style="padding: 50px; background-color:red;"
			 	dnd-droppable
			 	[dropZones]="['column-dropZone']"
			 	(onDragEnter)="onDragEnter($event)"
			 	(onDropSuccess)="onDropSuccess($event, nestedcolumn,  'columnWrapper', rowIndex, columnIndex )" >

			 	<div class="AWcolumn">
			 		<div class="widgetWrapper"
			 			*ngFor="let nestedwidget of nestedcolumn.widgets">
			 				<div class="widget">
						 		 <ng-container *ngIf="nestedwidget.settings.isLoaded">	
								          <ng-container *ngComponentOutlet="configureWidget(nestedwidget)">
								          </ng-container>
								</ng-container>	
			 				</div>
			 		</div>
			 	</div>
			 </div>
		</div>
	</div>
</div>

			
				<div  
				*ngFor="let widget of column.widgets; let widgetIndex = index" 

				dnd-droppable
				[dropZones]="['widget-dropZone']"
				(onDragEnter)="onDragEnter($event)"
				(onDropSuccess)="onDropSuccess($event,  widget, 'widget', rowIndex, columnIndex, widgetIndex )" 

				class="AWwidgetWrapper" 
				
				>
				
						<div class="widget" [ngStyle]="{'height': widget.widgetProperties[0].dimension[0] + 'px'}">
	 						<ng-container *ngIf="widget.settings.isLoaded">
								<dynamiccontent-component [componentData]="configureWidget(widget)" ></dynamiccontent-component>
							</ng-container>

						</div>		
				</div>
			</div>
		  </div>
	</div>

</div>
</div>


<br style="clear:both" />
<hr />


 `


  ,
  styleUrls: ['./layout.component.css'],
  providers: [EDITOR_VALUE_ACCESSOR]
})


export class LayoutComponent implements OnInit, ControlValueAccessor {

public  imgData;
public colorme = 'yellow';
public widgetComponents = []
goFuckGreen(){
	alert('called')
	this.colorme = 'black';
}

configureWidget(widget){
	return  {
		component: widget.widgetComponent.component, 
		inputs: { widget : widget }
	} 
}


canvas: Array<any> ;
newCanvas: Array<any> ;
componentData = null;
childComponent:any;

// One consturtor for both uses
constructor(
	private renderer: Renderer,
 	private _dndService: dndService, 
 	// private _zone: NgZone, 
 	private _canvasService: canvasService,
	private _cmpService: cmpService){
		// temp set data for image cropper
		this.imgData  = {sizeW: 230;sizeH: 230;}
		this.canvas =  this._canvasService.canvas; 
}


ngOnInit() {
	//this.newCanvas =  this._canvasService.newCanvas;
}

UpdateContent(){
	this._canvasService.canvas[0].column[0].widgets[0].settings.innerhtml = "test"
}

// Generate new grid
newRow(copy, rowDimension, rowPosition) {
	let columnDimension = { width: 0, height: 0, widthtotal: 0, heighttotal: 0};
	let columnPosition = {top: 0, right: 0, bottom: 0, left: copy.mouseEvent.offsetX};
	return new Row([this.newColumn( copy, columnDimension, columnPosition)], [this.newProperties(rowDimension, rowPosition)]);
}

newColumn(copy, columnDimension, columnPosition) {
	let widgetDimension = { width: 400, height: 100, widthtotal: 0, heighttotal: 0};
	let widgetPosition = {top: 0, right: 0, bottom: 0, left: 0};
	return new Column([this.newWidget( copy, widgetDimension, widgetPosition)], [this.newProperties(columnDimension, columnPosition]);
}

newWidget(copy, widgetDimension, widgetPosition) {
	if(copy.dragData){
		return new Widget(copy.dragData.settings[0], copy.dragData.widgetComponent, [this.newProperties(widgetDimension, widgetPosition)]); 
	}else{ 
		return new Widget(copy.settings[0], copy.widgetComponent, [this.newProperties(widgetDimension, widgetPosition)])
	}
	
}

newProperties(dimension, position) {
	return new Properties([new Dimension(dimension.width, dimension.height, dimension.widthtotal, dimension.heighttotal)], [new Location( position.top, position.right, position.bottom, position.left)]);
}

	onDragEnter(event: any, dropOnElement: any, droppedOn: string, ) {
		// console.log('event.mouseEvent', event.mouseEvent)	
		// console.log('Empty canvas event.mouseEvent.target.offsetTop', event.mouseEvent.target.offsetTop)
	}

	onDropSuccess(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex) {
		switch (event.dragData.type){
		    case 'color':
		        alert('color dropped')
		        break;
		    case 'widget':
		        this.addComponent(event, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex)
		        break;
		}
	}
	addComponent(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		// console.log('event', event, 'dropOnElement', dropOnElement, 'droppedOn' , droppedOn,  'dat', event.mouseEvent.clientY ,event.mouseEvent.clientX)
		// Create a copy of the dropped El
		//const  copy = Object.assign(event, {});
		// const copy = JSON.parse(JSON.stringify(event))
		const copy = _.cloneDeep(event)
		// console.log('copy fucker', copy, event, 'ddd',  copy.dragData, event.dragData)

		// First check the type object dropped on
		switch (droppedOn){
		    case 'canvas':
		       alert('dropped on canas b*')
		        this.addToCanvas(copy, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;
		    case 'rowWrapper':
		        alert('dropped on rowWrapper b*')
		        this.addToRowWrapper(copy, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;  
		    case 'row':
		        alert('dropped on row b*')
		        this.addToRow(copy, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;
		     case 'columnWrapper':
		        alert('dropped on columnWrapper b*')
		        this.addToColumnWrapper(copy, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break; 	
		    case 'column':
		        alert('dropped on column b*')
		        this.addToColumn(copy, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;  
		    case 'widget':
		        alert('dropped on widget b*')
		        break;   

		}
	}
	addToCanvas(copy: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		if( _.isEmpty(this.canvas)){
			let rowPosition ={top: copy.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
			let rowDimension = {width: 0, height: 100, widthtotal: 0, heighttotal: 0}

			dropOnElement.push(this.newRow(copy, rowDimension, rowPosition))
			this.canvas[0].column[0].widgets[0].settings.isLoaded = !this.canvas[0].column[0].widgets[0].settings.isLoaded
		}else{
			let rowPositionsSum = dropOnElement.map(function(row){
				return row.rowProperties[0].location[0].top + row.rowProperties[0].dimension[0].height
			}).reduce((a, b) => a + b, 0)

			let rowPosition ={top: (copy.mouseEvent.clientY - copy.mouseEvent.target.offsetTop) - rowPositionsSum, right: 0, bottom: 0, left: 0;   }
			let rowDimension = {width: 0, height: 100, widthtotal: 0, heighttotal: 0}

			dropOnElement.push(this.newRow(copy, rowDimension, rowPosition))
				if(this.canvas[1].column[0].widgets[0].settings.isLoaded == false
				 ){
				 	//console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )
					this.canvas[1].column[0].widgets[0].settings.isLoaded  = !this.canvas[1].column[0].widgets[0].settings.isLoaded
					// console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )	
				}
		}
		
	}
	addToRowWrapper(copy: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		let rowTopPadding = parseInt(copy.mouseEvent.target.style.paddingTop);
		if( rowTopPadding > copy.dragData.widgetProperties.dimension[1]){
			// then splice
			//console.log('-----enter-------')
			let rowPosition ={top: copy.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
			let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
			// let columnPosition ={top: 0, right: 0 , bottom: 0, left:copy.mouseEvent.offsetX }

			// this.canvas.splice(rowIndex, 0, this.newWidget(event, copy, rowPosition, columnPosition ));
			this.canvas.splice(rowIndex, 0, this.newRow(copy, rowDimension, rowPosition));

			let newHeight = rowTopPadding - (copy.dragData.widgetProperties.dimension[1] + copy.mouseEvent.offsetY)
			
			// if clientyY is bigger 
			if(newHeight > 0 ){
			//	console.log('----',newHeight)
				dropOnElement.rowProperties[0].location[0].top = newHeight; 
			}else{
			//	console.log('----',newHeight)
			    dropOnElement.rowProperties[0].location[0].top = 0;
			 //   console.log(dropOnElement.rowProperties[0].location[0].top, this.canvas)
			}
	

		}else{

			// exapnd and set target padding top to 0
			//console.log('-----expand-------')
			let rowPosition ={top: copy.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
			let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
			// let columnPosition ={top: 0, right: 0 , bottom: 0, left:copy.mouseEvent.offsetX }
			
			//console.log('dropOnElement.rowProperties', dropOnElement.rowProperties[0].location[0].top)
			dropOnElement.rowProperties[0].location[0].top = 0;
			//console.log(dropOnElement.rowProperties[0].location[0].top, this.canvas)
			this.canvas.splice(rowIndex, 0, this.newRow(copy, rowDimension, rowPosition));

		}
	}
	addToRow(copy: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		let columnCount = dropOnElement.column.length;
		let columnPositionsSum = dropOnElement.column.map(function(column){
			return column.columnProperties[0].location[0].left + column.widgets[0].widgetProperties[0].dimension[0].width
		}).reduce((a, b) => a + b, 0)


	
		if (columnPositionsSum < copy.mouseEvent.target.offsetWidth ){
			let columnPosition ={top: 0, right: 0, bottom: 0, left:  (copy.mouseEvent.clientX - copy.mouseEvent.target.offsetLeft) - columnPositionsSum }
			let columnDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}

			dropOnElement.column.push(
				this.newColumn(copy, columnDimension, columnPosition)
			);
		}
		
	
		this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded 
		// need to get the index
		if(this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded  == false
		 ){
		 	this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded    = !this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded 
		}
	}
	addToColumnWrapper(copy: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		alert('dropped on columnWrapper')

		let columnPosition ={top: 0, right: 0 , bottom: 0, left:  copy.mouseEvent.offsetX }
		let columnDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
		this.canvas[rowIndex].column.splice(columnIndex, 0, this.newColumn(copy, columnDimension, columnPosition));

		// Splice 
		if( parseInt(copy.mouseEvent.target.style.paddingLeft) > copy.dragData.widgetProperties.dimension[1]){
			dropOnElement.columnProperties[0].location[0].left = dropOnElement.columnProperties[0].location[0].left - (copy.mouseEvent.offsetX + copy.dragData.widgetProperties.dimension[1])			
		}
		// exten and set 0
		else{
			dropOnElement.columnProperties[0].location[0].left = 0;
		}
	}
	addToColumn(copy: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		console.log('dropOnElement',dropOnElement)
		if(dropOnElement.rows == undefined) {
			dropOnElement.rows = new Array()
		}
		let oldwidget = dropOnElement.widgets.splice(0,1)

		
		let rowPosition ={top: 0, right: 0 , bottom: 0, left:0 }
		let rowDimension = {width: 0, height: 100, widthtotal: 0, heighttotal: 0}

		dropOnElement.rows.push(this.newRow(copy, rowDimension, rowPosition))
		// than I readd the old one. row -> column -> widget

		// let preRowPosition ={top: 0, right: 0 , bottom: 0, left:0 }
		// let preRowDimension = {width: 0, height: 100, widthtotal: 0, heighttotal: 0}

		// dropOnElement.rows.push(this.newRow(event, oldwidget, preRowDimension, preRowPosition))
			
	}

	checknested(column){
		let testColumn = column;
		if(testColumn.rows !== undefined && testColumn.rows.length > 0){	return true;}
	}
	
}

class Row {
	constructor( public column: Array<Column>, public rowProperties: Array<Properties>) {}
}
class Column{
	constructor( public widgets: Array<Widget>, public columnProperties: Array<Properties>) {}
}
class Widget {
	constructor(public settings: Array<any>, public widgetComponent: Array<any>, public widgetProperties: Array<Properties>) {}
}
class Properties{
	constructor(public dimension: Array<Dimension>, public location: Array<Location>){}
}
class Dimension{
	constructor(public width: number,public height: number, public widthtotal: number, public heighttotal: number ){}
}
class Location{
	constructor(public top: number,public right: number, public bottom: number , public left : number){}
}
class Nested{
	constructor(public booleanvalue: boolean){}
}


