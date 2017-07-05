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

// import { Safe } from '../pipes/safehtml.pipe'

import * as _ from "lodash";

// import {ResizingCroppingImagesComponent} from '../image-cropper/image-cropper.component'
import {cmpService} from '../toolbar/services/components.service'

export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LayoutComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};

import {colorDropDirective} from '../shared/colordrop.directive'


// All the drag component list items
import { text, ullist,singleImage, images, accordion, accordionGroup, accordionHeading, tabs, video, googlemaps,testimonials, testimonial,modalBox } from '../dnd/widgets/widgets.component';

// import  {ContentEditableDirective} from '../contenteditable-model'

@Component({
  selector: 'layout',
  entryComponents: [ text, ullist,singleImage, images, accordion, accordionGroup, accordionHeading, tabs, video, googlemaps,testimonials, testimonial, modalBox 

  ],  // Reference to the components must be here in order to dynamically create them
  template:  

//  <div contenteditable 
	     
	    
// 	  ></div>

// 	{{ content }}
// 	<Br />

// 	  <div contenteditable 
	
// 	  ></div>
	


// <div  style="  height: 450px; overflow: scroll;">
// 	 <pre>
// 		{{ canvas | json}}
// 	</pre>
// </div>

  `
<div  style="  height: 450px; overflow: scroll;">
	 <pre>
		{{ canvas | json}}
	</pre>
</div>

<div 
class="canvas paint-area"

dnd-droppable
[dropZones]="['canvas-dropZone']"
(onDragEnter)="onDragEnter($event, canvas,  'canvas')"
(onDropSuccess)="onDropSuccess($event,  canvas,  'canvas')" 
[colorDropModel]="$event"
>

	<div   
		*ngFor="let row of canvas; let rowIndex = index" 
		dnd-droppable
		[dropZones]="['rowWrapper-dropZone']"
		(onDragEnter)="onDragEnter($event, row,  'rowWrapper', rowIndex)"
		(onDropSuccess)="onDropSuccess($event, row,  'rowWrapper', rowIndex )" 

		class="AWrowWrapper" 
		
		[ngStyle]="{'padding-top': row.rowProperties[0].location[0].top + 'px'}"
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
				[dropZones]="['columnWrapper-dropZone']"
				(onDragEnter)="onDragEnter($event)"
				(onDropSuccess)="onDropSuccess($event, column, 'columnWrapper', rowIndex, columnIndex )" 


				class="AWcolumnWrapper"
				
				[ngStyle]="{'padding-left': column.columnProperties[0].location[0].left + 'px'}"

			>
			{{column.columnProperties[0].location[0].left  | json}}
			
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

				
				class="AWwidgetWrapper" 
				
				>
				
				
						<div class="widget" 
						[ngStyle]="{'width': widget.widgetProperties[0].dimension[0].width + 'px'}"
						(mouseenter)="widgetDropzone('activate')"
						(mouseleave)="widgetDropzone('activate')"
						>

							<div 
							class="dropzone-box top"
							dnd-droppable
							[dropZones]="['widget-dropZone']"
							(onDragEnter)="onDragEnter($event)"
							(onDropSuccess)="onDropAddWidget($event,  widget, 'widget', rowIndex, columnIndex, widgetIndex, 'top'  )" 
							>Top</div>
							<div class="dropzone-box left"
							dnd-droppable
							[dropZones]="['widget-dropZone']"
							(onDragEnter)="onDragEnter($event)"
							(onDropSuccess)="onDropAddWidget($event,  widget, 'widget', rowIndex, columnIndex, widgetIndex, 'left'  )" 
							>Left</div>
	 						<ng-container *ngIf="widget.settings.isLoaded">
								<dynamiccontent-component [componentData]="{component: widget.widgetComponent.component, inputs: { widget : widget } }" ></dynamiccontent-component>
							</ng-container>
							<div class="dropzone-box right"
							dnd-droppable
							[dropZones]="['widget-dropZone']"
							(onDragEnter)="onDragEnter($event)"
							(onDropSuccess)="onDropAddWidget($event,  widget, 'widget', rowIndex, columnIndex, widgetIndex ,'right' )" 
							>Right</div>
							<div class="dropzone-box bottom"
							dnd-droppable
							[dropZones]="['widget-dropZone']"
							(onDragEnter)="onDragEnter($event)"
							(onDropSuccess)="onDropAddWidget($event,  widget, 'widget', rowIndex, columnIndex, widgetIndex , 'bottom' )" 
							>Bottom</div>
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

// <pre>
// 				{{widget | json}}
// 				</pre>
  ,
  
  providers: [EDITOR_VALUE_ACCESSOR]
})


export class LayoutComponent implements OnInit, ControlValueAccessor {
 // Drag and Drop definitions
dragOperation: Boolean = false;

public  imgData;
public colorme = 'yellow';
public widgetComponents = []
goFuckGreen(){
	alert('called')
	this.colorme = 'black';
}

// configureWidget(widget){
// 	return  {
// 		component: widget.widgetComponent.component, 
// 		inputs: { widget : widget }
// 	} 
// }


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
	private _cmpService: cmpService,
	private _el:ElementRef
	){
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
newRow( rowDimension, rowPosition, newWidget, newWidgetPosition) {
	let columnDimension = { width: 0, height: 0, widthtotal: 0, heighttotal: 0};
	let columnPosition = {
		top: 0, right: 0, 
		bottom: 0, 
		left: newWidget.mouseEvent.clientX - newWidget.mouseEvent.target.offsetLeft};

	return new Row([this.newColumn( columnDimension, columnPosition, newWidget , newWidgetPosition)], [this.newProperties(rowDimension, rowPosition)]);
}

newColumn( columnDimension, columnPosition, newWidget, newWidgetPosition) {
	console.log('c', newWidget.dragData.widgetProperties.dimension.width)
	let dimension = newWidget.dragData.widgetProperties.dimension;
	let widgetDimension = { 
		width: dimension.width, 
		height: dimension.height, 
		widthtotal: 0, 
		heighttotal: 0
	};
	
	return new Column([this.newWidget( widgetDimension, newWidget, newWidget, newWidgetPosition)], [this.newProperties(columnDimension, columnPosition]);
}

newWidget(widgetDimension, widgetPosition, newWidget, newWidgetPosition) {
	// console.log('copy.dragData.widgetComponent', copy.dragData.widgetComponent)

	if(newWidget.dragData){
		return new Widget(newWidget.dragData.settings[0], newWidget.dragData.widgetComponent, [this.newProperties(widgetDimension, widgetPosition)]); 
	}else{ 
		return new Widget(newWidget.settings[0], newWidget.widgetComponent, [this.newProperties(widgetDimension, widgetPosition)])
	}
	
}

newProperties(dimension, position) {
	return new Properties([new Dimension(dimension.width, dimension.height, dimension.widthtotal, dimension.heighttotal)], [new Location( position.top, position.right, position.bottom, position.left)]);
}

	onDragEnter(event: any, dropOnElement: any, droppedOn: string, ) {

		//console.log('this event', event.mouseEvent.target.setAttribute("class", "democlass"))
// add class to target element


		// console.log('event.mouseEvent', event.mouseEvent)	
		// console.log('Empty canvas event.mouseEvent.target.offsetTop', event.mouseEvent.target.offsetTop)
	}

	onDropSuccess(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex) {
		switch (event.dragData.type){
		    case 'color':
		    alert('color');
		        this.colorElement(event, dropOnElement);
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
		const newWidget = _.cloneDeep(event)

		// console.log('ddd',dropOnElement, droppedOn ,rowIndex, columnIndex, widgetIndex)
		// console.log('copy fucker', copy, event, 'ddd',  copy.dragData, event.dragData)

		// console.log('dropOnElement', dropOnElement)
		// First check the type object dropped on
		switch (droppedOn){
		    case 'canvas':
		       alert('dropped on canas')
		        this.addToCanvas(newWidget, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;
		    case 'rowWrapper':
		        alert('dropped on rowWrapper ')
		        this.addToRowWrapper(newWidget, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;  
		    case 'row':
		        alert('dropped on row ')
		        this.addToRow(newWidget, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;
		     case 'columnWrapper':
		        alert('dropped on columnWrapper ')
		        this.addToColumnWrapper(newWidget, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break; 	
		    case 'column':
		        alert('dropped on column ')
		        this.addToColumn(newWidget, dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex);
		        break;  
		    case 'widget':
		        alert('dropped on widget ')
		        break;   

		}
	}
	addToCanvas(newWidget: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		
		switch ( _.isEmpty(this.canvas)){
			case true;
		
				let rowPosition ={top: newWidget.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
				let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}

				let widgetPosition = {top: 0, right: 0, bottom: 0, left: newWidget.mouseEvent.offsetX};

				let newWidgetPosition = newWidget.dragData.widgetProperties.widgetPosition

				dropOnElement.push(this.newRow(rowDimension, rowPosition, newWidget, newWidgetPosition ))
				this.canvas[0].column[0].widgets[0].settings.isLoaded = !this.canvas[0].column[0].widgets[0].settings.isLoaded
			break;
			case false;
				let rowPositionsSum = dropOnElement.map(function(row){
					console.log('row', 
						row.rowProperties[0].location[0].top , 
						row.rowProperties[0].dimension[0].height)
					return row.rowProperties[0].location[0].top + row.rowProperties[0].dimension[0].height
				}).reduce((a, b) => a + b, 0)

				let rowPosition = {
					top: (newWidget.mouseEvent.clientY - newWidget.mouseEvent.target.offsetTop) - rowPositionsSum, 
					right: 0, bottom: 0, left: 0;   
				}

				console.log('rowPosition',newWidget.mouseEvent.clientY, newWidget.mouseEvent.target.offsetTop, rowPositionsSum)
				let rowDimension = {width: 0, height: 100, widthtotal: 0, heighttotal: 0}
				let newWidgetPosition = newWidget.dragData.widgetProperties.widgetPosition

				dropOnElement.push(this.newRow(rowDimension, rowPosition, newWidget, newWidgetPosition))
					if(this.canvas[1].column[0].widgets[0].settings.isLoaded == false
					 ){
					 	//console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )
						this.canvas[1].column[0].widgets[0].settings.isLoaded  = !this.canvas[1].column[0].widgets[0].settings.isLoaded
						// console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )	
					}
		}
		
	}
	addToRowWrapper(newWidget: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		let rowTopPadding = parseInt(newWidget.mouseEvent.target.style.paddingTop);
		if( rowTopPadding > newWidget.dragData.widgetProperties.dimension[1]){
			// then splice
			//console.log('-----enter-------')
			let rowPosition ={top: newWidget.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
			let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}

			let newWidgetPosition = newWidget.dragData.widgetProperties.widgetPosition;

			// this.canvas.splice(rowIndex, 0, this.newWidget(event, copy, rowPosition, columnPosition ));
			this.canvas.splice(rowIndex, 0, this.newRow( rowDimension, rowPosition, newWidget, newWidgetPosition));



			let newHeight = rowTopPadding - (newWidget.dragData.widgetProperties.dimension[1] + newWidget.mouseEvent.offsetY)
			
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
			let rowPosition ={top: newWidget.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
			let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
			
			let newWidgetPosition = newWidget.dragData.widgetProperties.widgetPosition;

			//console.log('dropOnElement.rowProperties', dropOnElement.rowProperties[0].location[0].top)
			dropOnElement.rowProperties[0].location[0].top = 0;
			//console.log(dropOnElement.rowProperties[0].location[0].top, this.canvas)
			this.canvas.splice(rowIndex, 0, this.newRow(rowDimension, rowPosition, newWidget, newWidgetPosition));

		}
	}
	addToRow(newWidget: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){

		let columnCount = dropOnElement.column.length;
		console.log('columnCount', columnCount)
		let columnPositionsSum = dropOnElement.column.map(function(column){
			
			return column.columnProperties[0].location[0].left + column.widgets[0].widgetProperties[0].dimension[0].width

		}).reduce((a, b) => a + b, 0)

		console.log( dropOnElement, droppedOn, rowIndex, columnIndex, widgetIndex)
		console.log('columnPositionsSum',columnPositionsSum)
		console.log(newWidget.mouseEvent.target.offsetWidth)


		switch (columnPositionsSum < newWidget.mouseEvent.target.offsetWidth ){
			case true;
				// console.log('sss', 
				// 	newWidget.mouseEvent.clientX , 
				// 	newWidget.mouseEvent.target.offsetLeft,
				// 	// this.canvas

				// 	 columnPositionsSum )

				// console.log(
				// 	this._el.nativeElement.offsetLeft, 
				// 	newWidget.mouseEvent.clientX,  newWidget.mouseEvent.target.offsetLeft , columnPositionsSum)
				let columnPosition = {
					top: 0, 
					right: 0, 
					bottom: 0, 
					left:   (newWidget.mouseEvent.clientX - this._el.nativeElement.offsetLeft) - columnPositionsSum 
					// left:  (newWidget.mouseEvent.clientX - newWidget.mouseEvent.target.offsetLeft) - columnPositionsSum 
				}
				let columnDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
				let newWidgetPosition = newWidget.dragData.widgetProperties.widgetPosition;

				dropOnElement.column.push(
					this.newColumn(columnDimension, columnPosition, newWidget, newWidgetPosition)
				);

			
					if(this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded  == false
				 ){
				 	
				 	this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded    = !this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded 
				}
			break;
			case false;
				
				let rowPosition ={top: newWidget.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
				let rowDimension = {width: 'auto', height: 'auto', widthtotal: 0, heighttotal: 0}
				let nextRow = rowIndex + 1;
				let newWidgetPosition = {
					 top: 0, 
					 right: 0, 
					 bottom: 0,
					 left: 0
				}

				this.canvas.splice( nextRow , 0, this.newRow(rowDimension, rowPosition, newWidget, newWidgetPosition))

				
				// this.canvas[rowIndex].column[columnCount].widgets[0].settings.isLoaded 
				// need to get the index
				if(this.canvas[nextRow].column[0].widgets[0].settings.isLoaded  == false
				 ){
				 	
				 	this.canvas[nextRow].column[0].widgets[0].settings.isLoaded    = !this.canvas[nextRow].column[0].widgets[0].settings.isLoaded
				}
			break;
		}
		
	
	}
	addToColumnWrapper(newWidget: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		alert('dropped on columnWrapper')

		let columnPosition ={top: 0, right: 0 , bottom: 0, left:  newWidget.mouseEvent.offsetX }
		let columnDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
		let newWidgetPosition = newWidget.dragData.widgetProperties.widgetPosition;

		this.canvas[rowIndex].column.splice(columnIndex, 0, this.newColumn(columnDimension, columnPosition, newWidget, newWidgetPosition));

		// Splice 
		if( parseInt(newWidget.mouseEvent.target.style.paddingLeft) > newWidget.dragData.widgetProperties.dimension[1]){
			dropOnElement.columnProperties[0].location[0].left = dropOnElement.columnProperties[0].location[0].left - (newWidget.mouseEvent.offsetX + newWidget.dragData.widgetProperties.dimension[1])			
		}
		// exten and set 0
		else{
			dropOnElement.columnProperties[0].location[0].left = 0;
		}

		if(this.canvas[rowIndex].column[columnIndex].widgets[0].settings.isLoaded  == false){
		 	
		 	this.canvas[rowIndex].column[columnIndex].widgets[0].settings.isLoaded    = !this.canvas[rowIndex].column[columnIndex].widgets[0].settings.isLoaded 
		}

	}
	addToColumn(newWidget: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex){
		console.log('dropOnElement',dropOnElement)
		if(dropOnElement.rows == undefined) {
			dropOnElement.rows = new Array()
		}
		let oldwidget = dropOnElement.widgets.splice(0,1)

		
		let rowPosition ={top: 0, right: 0 , bottom: 0, left:0 }
		let rowDimension = {width: 0, height: 100, widthtotal: 0, heighttotal: 0}
		let newWidgetPosition = newWidget.dragData.widgetProperties.widgetPosition;
		dropOnElement.rows.push(this.newRow(rowDimension, rowPosition, newWidget, newWidgetPosition))
		// than I readd the old one. row -> column -> widget

		// let preRowPosition ={top: 0, right: 0 , bottom: 0, left:0 }
		// let preRowDimension = {width: 0, height: 100, widthtotal: 0, heighttotal: 0}

		// dropOnElement.rows.push(this.newRow(event, oldwidget, preRowDimension, preRowPosition))
			
	}
	onDropAddWidget(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex, widgetLocation  ){

		switch (widgetLocation){
			case 'top'
				alert('top');
			break;
			case  'right'
				alert('right');
			break;
			case 'bottom'
				alert('bottom');
			break;
			case  'left'
				alert('left');
			break;
		}

	}

	checknested(column){
		let testColumn = column;
		if(testColumn.rows !== undefined && testColumn.rows.length > 0){	return true;}
	}



	colorElement(ev, dropOnElement){

		// Check if has a any HTML attribute than text


		// check if it has array than it is the grid.
		if( dropOnElement.settings == dropOnElement.settings){
			let type = 'area';

			const el = ev.mouseEvent.target
			const svgEl = this.createSvgInject( ev.mouseEvent, el , ev.dragData.colorhex);
			

			setTimeout(function(){
				
				// activating the class that scales .paint--active .svg-paint circle 
				ev.mouseEvent.target.setAttribute('class',  ev.mouseEvent.target.getAttribute('class')+ ' paint--active')
				
				// Set background color
				el.style.backgroundColor = ev.dragData.colorhex;
				// Remove the Svg
				el.removeChild(svgEl);

				alert('u done')
			}, 25);


			this.animateSvg( )
		}



	}
	animateSvg( ){

	}
	// paintArea(event.dragEvent, event.target, draggableElement.getAttribute('data-color'));
	createSvgInject(ev, el, color){

		//wcreate SVG element
		let svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgEl.setAttributeNS(null, 'version', '1.1');
		svgEl.setAttributeNS(null, 'width', '100%');
		svgEl.setAttributeNS(null, 'height', '100%');
		svgEl.setAttributeNS(null, 'class', 'svg-paint');

		const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		g.setAttributeNS(null, 'transform', 'translate(' + Number(ev.pageX - this.offset(el).left) + ', ' + Number(ev.pageY - this.offset(el).top) + ')');

		const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		circle.setAttributeNS(null, 'cx', 0);
		circle.setAttributeNS(null, 'cy', 0);
		circle.setAttributeNS(null, 'r', Math.sqrt(Math.pow(el.offsetWidth,2) + Math.pow(el.offsetHeight,2)));
		circle.setAttributeNS(null, 'fill', color);

		svgEl.appendChild(g);
		g.appendChild(circle);
		el.appendChild(svgEl);
	
		console.log('Element injected', svgEl, circle, g)

		return svgEl 
	}



	isWindow(obj) {
	    return obj !== null && obj === obj.window;
	}
	getWindow(elem) {
	    return this.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	offset(elem) {
	    var docElem,  win,  box = { top: 0, left: 0 }, 
	    doc = elem && elem.ownerDocument;
	    docElem = doc.documentElement;

	    if (typeof elem.getBoundingClientRect !== typeof undefined) {
	    	console.log('true')
	        box = elem.getBoundingClientRect();
	    }
	  win = this.getWindow(doc);
	  console.log(
	  	  'top', box.top + win.pageYOffset - docElem.clientTop,
	        'left',box.left + win.pageXOffset - docElem.clientLeft
	)
	    return {
	        top: box.top + win.pageYOffset - docElem.clientTop,
	        left: box.left + win.pageXOffset - docElem.clientLeft
	    };
	}


         onMouseDown(){
            this.dragOperation = true;
            console.log('mouse down');
         }
         
         onMouseUp(event: any){
            console.log(event);
            this.dragOperation = false;
         }

         widgetDropzone(status: string){
         	console.log(status)
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


