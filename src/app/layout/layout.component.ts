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
import { text, textarea,ullist,singleImage, images, accordion,tabs, video, googlemaps,testimonials, modalBox } from '../dnd/widgets/widgets.component';



@Component({
  selector: 'layout',
  entryComponents: [ text, textarea,ullist,singleImage, images, accordion,tabs, video, googlemaps,testimonials, modalBox 

  ],  // Reference to the components must be here in order to dynamically create them
  template:  ` 

<pre>
	{{ canvas | json}}
</pre>

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
					
						<div class="widget">
						
 						<ng-container *ngIf="widget.settings.isLoaded">
 							
{{widget | json}}
							

							<dynamiccontent-component [componentData]="configureWidget(widget)" ></dynamiccontent-component>

 						<!--	

 							<div  *ngIf="widget.settings.name  == 'images' ">
							        <html-images [widgetData]="widget"></html-images>
							</div>
 							 <dynamiccontent-component [componentData]="componentData" ></dynamiccontent-component>
 							 <div  *ngIf="widget.settings.name  == 'Text' || widget.settings.name == 'Textarea' ">


 							<div >
							          <ng-container *ngComponentOutlet="widget.widgetComponent.component"  >
							          </ng-container>
							</div>
						-->	
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
	return  {
			component: widget.widgetComponent.component, 
			inputs: { widget : widget}

		} 
}


testing: any = [{'ddd': 'ddddd'}]
canvas: Array<any> ;
componentData = null;
childComponent:any;

// One consturtor for both uses
constructor(private renderer: Renderer, private _dndService: dndService, private _zone: NgZone, private _canvasService: canvasService){
		
		this.componentData = { 
			component: textarea ,inputs: { showNum: 222 }
		}



}

ngOnInit() {this.canvas =  this._canvasService.canvas; }

onDragEnter(event: any, dropOnElement: any, droppedOn: string, ) {
	//console.log('drag enter', event, dropOnElement, droppedOn)
}

onDropSuccess(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex) {

	if(this.canvas == [] || this.canvas == null  || this.canvas == 0 && droppedOn == 'canvas' && droppedOn != 'row' ){
			//this.canvas.push(
			dropOnElement.push(
			          new Row(
			          		[new Column(

			          			[new Widget(
			          					event.dragData.settings[0]
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
		          				[new Dimension( 0,0,0,0 )], [new Location(100,0,0,0)]
			          		)]
			          	)
			);
			console.log('dropOnElement',this.canvas[0].column[0].widgets[0].settings.isLoaded)
			this.canvas[0].column[0].widgets[0].settings.isLoaded = !this.canvas[0].column[0].widgets[0].settings.isLoaded
			//console.log(this.canvas[0].column[0].widgets[0].data.isLoaded)
	}
	// Add a row
	else if( this.canvas !== null   && droppedOn == 'canvas' ){

			dropOnElement.push(
			          new Row(
			          		[new Column(

			          			[new Widget(
			          					event.dragData.settings[0]
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
		          					[new Dimension( 200 ,0, 0 + 200,0 )], [new Location(20,0,0,220 )]
			          			)]
			          		)],
			          		// Row Location
			          		[new Properties(
		          				[new Dimension( 20,0,0,0 )], [new Location(100,0,0,0)]
			          		)]
			          	)
			);
			// Need to get the element index right
			//this.canvas[1].column[0].widgets[0].data.isLoaded = !this.canvas[1].column[0].widgets[0].data.isLoaded
			console.log(this.canvas[1].column[0].widgets[0].settings.isLoaded )


			if(this.canvas[1].column[0].widgets[0].settings.isLoaded == false
			 ){
			 	//console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )
				this.canvas[1].column[0].widgets[0].settings.isLoaded  = !this.canvas[1].column[0].widgets[0].settings.isLoaded
				// console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )	
			}


	}
	if(droppedOn != 'canvas'  && droppedOn == 'rowWrapper' && droppedOn != 'row'  ){
			alert('dropped on rowWrapper')
		let getRowWrapperProperties = dropOnElement.rowProperties[0].location[0].top
		let getDroppedProperties = event

		//console.log(event.dragData[0].widgetProperties)
	}
	// dropOnElement.column = if dropped element has column , that it is a row
	if(droppedOn != 'canvas'  && droppedOn == 'row' ){
			alert('dropped on row')
			console.log('dropOnElement xxx',dropOnElement)
			let newCreated = dropOnElement.column.length;
			//this.canvas[0].column.push (
			dropOnElement.column.push (
					new Column( 
						[new Widget(
			          				event.dragData.settings[0]
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
					)]
			      
			)


			
			this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded 

		)
			// need to get the index
			if(this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded  == false
			 ){
			 	//console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )
				this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded    = !this.canvas[rowIndex].column[newCreated].widgets[0].settings.isLoaded 
				// console.log(this.canvas[0].column[newCreated].widgets[0].data.isLoaded )	
			}

			console.log('your canvas',this.canvas)

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
			          				event.dragData.settings[0]
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


