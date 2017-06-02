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

export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LayoutComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};


// All the drag component list items
import { text, textarea,ullist,singleImage, images, accordion, accordionGroup, accordionHeading, tabs, video, googlemaps,testimonials, testimonial,modalBox } from '../dnd/widgets/widgets.component';



@Component({
  selector: 'layout',
  entryComponents: [ text, textarea,ullist,singleImage, images, accordion, accordionGroup, accordionHeading, tabs, video, googlemaps,testimonials, testimonial, modalBox 

  ],  // Reference to the components must be here in order to dynamically create them
  template:  
//<pre>
	//{{ canvas | json}}
//</pre>
  ` 
<div 
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
		[ngStyle]="{'padding-top': row.rowProperties[0].location[0].top  + 'px'}" 

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
				
				[ngStyle]="{'padding-left': column.columnProperties[0].location[0].left + 'px'}"

			>

			
		<div class="AWcolumn">		



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
								          <ng-container *ngComponentOutlet="nestedwidget.widgetComponent.component">
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
				height
					{{ widget.widgetProperties[0].dimension[0] | json }}
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



 `


  ,
  styleUrls: ['./layout.component.css'],
  providers: [EDITOR_VALUE_ACCESSOR]
})


export class LayoutComponent implements OnInit, ControlValueAccessor {




configureWidget(widget){
	
	const widgetData =  { widget : widget}
	return  {
			component: widget.widgetComponent.component, 
			inputs: { widget : widgetData }

		} 
}


canvas: Array<any> ;
newCanvas: Array<any> ;
componentData = null;
childComponent:any;

// One consturtor for both uses
constructor(private renderer: Renderer, private _dndService: dndService, private _zone: NgZone, private _canvasService: canvasService){
		
		this.componentData = { 
			component: textarea ,inputs: { showNum: 222 }
		}



}

/*
test(){
	this._canvasService.newCanvas[0].column[1].widgets[0].settings.name = "ddddddddd"
}
*/

ngOnInit() {this.canvas =  this._canvasService.canvas; this.newCanvas =  this._canvasService.newCanvas;}

onDragEnter(event: any, dropOnElement: any, droppedOn: string, ) {
	console.log('event.mouseEvent', event.mouseEvent)
		console.log('Empty canvas event.mouseEvent.target.offsetTop', event.mouseEvent.target.offsetTop)
	//console.log('drag enter', event, dropOnElement, droppedOn)
}
// newWidget(event,copy, rowPosition, columnPosition){
// 	//this.canvas.push(
// 			return  new Row(
// 			          		[new Column(

// 			          			[new Widget(
// 			          					copy.dragData.settings[0]
// 			          				,

// 			          				event.dragData.widgetComponent
// 			          				,
// 			          				//Widget location
// 			          				[new Properties(
// 			          					[new Dimension( 200,100,0,0 )], [new Location( 0,0,0,0 )]

// 			          				  )]
			          				
// 			          				//[new Location(0,0,0,0)]
// 			          			)],
// 			          			// Column location
// 			          			[new Properties(
// 		          					[new Dimension( 200 ,0,200,0 )], [new Location(0,0,0, columnPosition.left)]
// 			          			)]
// 			          		)],
// 			          		// Row Location
// 			          		[new Properties(
// 		          				[new Dimension( 0 ,0,0,0 )], [new Location( rowPosition.top ,0,0,0)]
// 			          		)]
// 			          	);
			
// }

newRow(event, copy, rowDimension, rowPosition) {
	let columnDimension = { width: 0, height: 0, widthtotal: 0, heighttotal: 0};
	let columnPosition = {top: 0, right: 0, bottom: 0, left: copy.mouseEvent.offsetX};
	return new Row([this.newColumn(event, copy, columnDimension, columnPosition)], [this.newProperties(rowDimension, rowPosition)]);
}

newColumn(event,copy, columnDimension, columnPosition) {
	let widgetDimension = { width: 200, height: 100, widthtotal: 0, heighttotal: 0};
	let widgetPosition = {top: 0, right: 0, bottom: 0, left: 0};
	return new Column([this.newWidget(event, copy, widgetDimension, widgetPosition)], [this.newProperties(columnDimension, columnPosition)]);
}

newWidget(event, copy, widgetDimension, widgetPosition) {
	return new Widget(copy.dragData.settings[0], event.dragData.widgetComponent, [this.newProperties(widgetDimension, widgetPosition)]);
}

newProperties(dimension, position) {
	return new Properties([new Dimension(dimension.width, dimension.height, dimension.widthtotal, dimension.heighttotal)], [new Location( position.top, position.right, position.bottom, position.left)]);
}

// newRow(event,copy, rowPosition, columnPosition){
// 	//this.canvas.push(
// 			return  new Row( this.newColumn(event, copy, rowPosition, columnPosition) )
			          		
			          
			
// }

// newColumn(event,copy, rowPosition, columnPosition){
// 	//this.canvas.push(
		
// 			          return new [Column(

// 			          			[new Widget(
// 			          					copy.dragData.settings[0]
// 			          				,

// 			          				event.dragData.widgetComponent
// 			          				,
// 			          				//Widget location
// 			          				[new Properties(
// 			          					[new Dimension( 200,100,0,0 )], [new Location( 0,0,0,0 )]

// 			          				  )]
			          				
// 			          				//[new Location(0,0,0,0)]
// 			          			)],
// 			          			// Column location
// 			          			[new Properties(
// 		          					[new Dimension( 200 ,0,200,0 )], [new Location(0,0,0, columnPosition.left)]
// 			          			)]
// 			          		)],
// 			          		// Row Location
// 			          		[new Properties(
// 		          				[new Dimension( 0 ,0,0,0 )], [new Location( rowPosition.top ,0,0,0)]
// 			          		)]
			        
			
// }








onDropSuccess(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex) {

console.log('event', event, 'dropOnElement', dropOnElement, 'droppedOn' , droppedOn,  'dat', event.mouseEvent.clientY ,event.mouseEvent.clientX)

const  copy = Object.assign({}, event);

	if(this.canvas == [] || this.canvas == null  || this.canvas == 0 && droppedOn == 'canvas' && droppedOn != 'row' ){
		console.log('------------')
		

		let rowPosition ={top: copy.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
		// let columnPosition ={top: 0, right: 0 , bottom: 0, left:copy.mouseEvent.offsetX }
		// console.log(rowPosition, columnPosition)
		let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}

		dropOnElement.push(this.newRow(event, copy, rowDimension, rowPosition))

			// dropOnElement.push(this.newWidget(event, copy, rowPosition, columnPosition ))
			//console.log('dropOnElement',this.canvas[0].column[0].widgets[0].settings.isLoaded)
			this.canvas[0].column[0].widgets[0].settings.isLoaded = !this.canvas[0].column[0].widgets[0].settings.isLoaded
			//console.log(this.canvas[0].column[0].widgets[0].data.isLoaded)
	}
	// Add a row
	else if( this.canvas !== null   && droppedOn == 'canvas' ){
		let rowPosition ={top: copy.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
		let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
		// let columnPosition ={top: 0, right: 0 , bottom: 0, left:copy.mouseEvent.offsetX }
		// console.log(rowPosition, columnPosition)

		console.log('------------')
		console.log('copy.mouseEvent', copy.mouseEvent)
		console.log('new row copy.mouseEvent.target.offsetTop', copy.mouseEvent.target.offsetTop)

			// dropOnElement.push(this.newWidget(event, copy, rowPosition, columnPosition  ))
			dropOnElement.push(this.newRow(event, copy, rowDimension, rowPosition))
			if(this.canvas[1].column[0].widgets[0].settings.isLoaded == false
			 ){
			 	//console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )
				this.canvas[1].column[0].widgets[0].settings.isLoaded  = !this.canvas[1].column[0].widgets[0].settings.isLoaded
				// console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )	
			}
	}
	if(droppedOn != 'canvas'  && droppedOn == 'rowWrapper' && droppedOn != 'row'  ){

	console.log(parseInt(copy.mouseEvent.target.style.paddingTop))
	
		//console.log(rowPosition, columnPosition)
		console.log('data', parseInt(copy.mouseEvent.target.style.paddingTop), copy.dragData.widgetProperties.dimension[1] , copy.mouseEvent.offsetY )

		if( parseInt(copy.mouseEvent.target.style.paddingTop) > copy.dragData.widgetProperties.dimension[1]){
			// then splice
			console.log('-----enter-------')
			let rowPosition ={top: copy.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
			let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
			// let columnPosition ={top: 0, right: 0 , bottom: 0, left:copy.mouseEvent.offsetX }

			// this.canvas.splice(rowIndex, 0, this.newWidget(event, copy, rowPosition, columnPosition ));
			this.canvas.splice(rowIndex, 0, this.newRow(event, copy, rowDimension, rowPosition));

			let newHeight = parseInt(copy.mouseEvent.target.style.paddingTop) - (copy.dragData.widgetProperties.dimension[1] + copy.mouseEvent.offsetY)
			

			
			
			// if clientyY is bigger 
			if(newHeight > 0 ){
				console.log('----',newHeight)
				dropOnElement.rowProperties[0].location[0].top = newHeight; 
			}else{
				console.log('----',newHeight)
			    dropOnElement.rowProperties[0].location[0].top = 0;
			    console.log(dropOnElement.rowProperties[0].location[0].top, this.canvas)
			}


			
			

		}else{

			// exapnd and set target padding top to 0
			console.log('-----expand-------')
			let rowPosition ={top: copy.mouseEvent.offsetY, right: 0 , bottom: 0, left:0 }
			let rowDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
			// let columnPosition ={top: 0, right: 0 , bottom: 0, left:copy.mouseEvent.offsetX }
			
			console.log('dropOnElement.rowProperties', dropOnElement.rowProperties[0].location[0].top)
			dropOnElement.rowProperties[0].location[0].top = 0;
			console.log(dropOnElement.rowProperties[0].location[0].top, this.canvas)
			this.canvas.splice(rowIndex, 0, this.newRow(event, copy, rowDimension, rowPosition));

		}
	}
	// dropOnElement.column = if dropped element has column , that it is a row
	if(droppedOn != 'canvas'  && droppedOn == 'row' ){


		
			let newCreated = dropOnElement.column.length;
			//this.canvas[0].column.push (
			// dropOnElement.column.push (

			// 		new Column( 
			// 			[new Widget(
			//           				copy.dragData.settings[0]
			//           				,

			//           				event.dragData.widgetComponent
			//           				,
			//           				//Widget location
			//           				[new Properties(
			//           					[new Dimension( 200,0,0,0 )], [new Location( 0,0,0,0 )]

			//           				  )]
			//           				//[new Location(0,0,0,0)]
			//           			)],
			//           			// Column location
			//           			[new Properties(
		 //          					[new Dimension( 200 ,0, 0 + 200,0 )], [new Location(0,0,0,220 )]
			//           			)]
			// 		)]
			      
			// )

			let columnPosition ={top: 0, right: 0, bottom: 0, left: copy.mouseEvent.offsetX }
			let columnDimension = {width: 0, height: 0, widthtotal: 0, heighttotal: 0}
			dropOnElement.column.push(this.newColumn(event, copy, columnDimension, columnPosition));


			
			this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded 

		)
			// need to get the index
			if(this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded  == false
			 ){
			 	//console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )
				this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded    = !this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded 
				// console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )	
			}

			//console.log('your canvas',this.canvas)

	}
	// Dropping an element ontop of column
	if(droppedOn != 'canvas'   && droppedOn == 'column'){

		alert('dropped on column')
		console.log('dropOnElement',dropOnElement)
			if(dropOnElement.rows == undefined) {
				dropOnElement.rows = new Array()
			}
			let oldwidget = dropOnElement.widgets.splice(0,1)

			// Dropping the new element above the widget.
			// first I add the new widget in a row -> column -> widget
			dropOnElement.rows.push(
			          new Row(
			          		[new Column(

			          			[new Widget(
			          				copy.dragData.settings[0]
			          				,

			          				event.dragData.widgetComponent
			          				,
			          				//Widget location
			          				[new Properties(
			          					[new Dimension( 200,0,0,0 )], [new Location( 0,0,0,0 )]

			          				  )]
			          				//[new Location(0,0,0,0)]
			          			)],
			          			// Column location
			          			[new Properties(
		          					[new Dimension( 200 ,0, 0 + 200,0 )], [new Location(0,0,0,220 )]
			          			)]
			          		)],
			          		// Row Location
			          		[new Properties(
		          				[new Dimension( 0,0,0,0 )], [new Location(0,0,0,0)]
			          		)]
			          	)
			);
			// than I readd the old one. row -> column -> widget
			dropOnElement.rows.push (
	 			 new Row(
			          		[new Column(
			          			[new Widget(
			          				oldwidget[0].settings
			          				,
			          				oldwidget[0].widgetComponent
			          				,
			          				//Widget location
			          				[new Properties(
			          					[new Dimension( 200,0,0,0 )], [new Location( 0,0,0,0 )]
			          				  )]
			          				//[new Location(0,0,0,0)]
			          			)],
			          			// Column location
			          			[new Properties(
		          					[new Dimension( 200 ,0, 0 + 200,0 )], [new Location(20,0,0,220 )]
			          			)]
			          		)],
			          		// Row Location
			          		[new Properties(
		          				[new Dimension( 20,0,0,0 )], [new Location(100,0,0,0)]
			          		)]

			          	)
			)
			
		
	}




}
	checknested(column){

		let testColumn = column;
		if(testColumn.rows !== undefined && testColumn.rows.length > 0){	
			return true;
		}
		

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


