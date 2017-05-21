import { 
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  forwardRef,
  Output,
  EventEmitter,
  Renderer,
  NgZone,
  ViewContainerRef,
  ViewChild,
  ReflectiveInjector,
  ComponentFactoryResolver,
  SimpleChanges,

} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

// Importing Drag Module and widgets
import { DndComponent } from '../dnd/dnd.component';


// These import are for JQ function below
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import {dndService} from '../toolbar/services/dnd.service';

import {DynamicPanelComponent} from '../toolbar/toolbarOptions/dynamic-panels/dynamic.component';

import { Safe } from '../pipes/safehtml.pipe'

export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LayoutComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};


// All the drag component list items
import { TextComponent } from '../dnd/text/text.component';

import { ullist } from '../dnd/widgets/widgets.component';



@Component({
  selector: 'layout',
  entryComponents: [TextComponent, 
  ullist
  ],  // Reference to the components must be here in order to dynamically create them
  template:  ` 


<pre>
{{canvas | json}}
</pre>

<div 
class="canvas"
dnd-droppable
[dropZones]="['canvas-dropZone']"
(onDragEnter)="onDragEnter($event)"
(onDropSuccess)="onDropSuccess($event,  canvas,  'canvas')" 
>

	<div   
		*ngFor="let row of canvas; let rowIndex = index" 
		dnd-droppable
		[dropZones]="['row-dropZone']"
		(onDragEnter)="onDragEnter($event)"
		(onDropSuccess)="onDropSuccess($event, row,  'row', rowIndex )" 

		class="AWrowWrapper" 
		[ngStyle]="{'padding-top': row.rowProperties[0].location[0].top  + 'px'}" 

		>

		<div class="AWrow">

			<div 
				*ngFor="let column of row.column; let columnIndex = index" 
				dnd-droppable
				[dropZones]="['column-dropZone']"
				(onDragEnter)="onDragEnter($event)"
				(onDropSuccess)="onDropSuccess($event, column, 'column', rowIndex, columnIndex )" 


				class="AWcolumnWrapper"
				
				[ngStyle]="{'padding-left': column.columnProperties[0].location[0].left + 'px'}"

			>

			
		<div class="AWcolumn">		



<div *ngIf="checknested(column)">
	<div *ngFor="let nestedRow of column.rows"
		class="AWrowWrapper">
		<div class="AWrow">
			<div class="AwcolumnWrapper"
			 	*ngFor="let nestedcolumn of nestedRow.column;let columnIndex = index"
			 	style="padding: 50px; background-color:red;"
			 	dnd-droppable
			 	[dropZones]="['column-dropZone']"
			 	(onDragEnter)="onDragEnter($event)"
			 	(onDropSuccess)="onDropSuccess($event, nestedcolumn,  'row', rowIndex, columnIndex )" >

			 	<div class="AWcolumn">
			 		<div class="widgetWrapper"
			 			*ngFor="let nestedwidget of nestedcolumn.widgets">
			 				<div class="widget">
			 					<pre>
			 						{{nestedwidget.name | json}}
			 					</pre>
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
					(onDropSuccess)="onDropSuccess($event,  'widget', rowIndex, columnIndex, widgetIndex )" 

					class="AWwidgetWrapper" 
					[ngStyle]="{'padding-left': widget.widgetProperties[0].location[0].left + 'px'}"
					>
					ddddd
						<div class="widget">
						{{widget.data.isLoaded | json}}
						HEre should load the component  <br />
				 		 <ng-container *ngIf="widget.data.isLoaded">	
						          <ng-container *ngComponentOutlet="widget.data.widgetComponent.component">
						          </ng-container>
						</ng-container>			
						
					</div>		
				</div>
			</div>
		  </div>
	</div>

</div>



 `
/*
			
			*/ 

  ,
  styleUrls: ['./layout.component.css'],
  providers: [EDITOR_VALUE_ACCESSOR]
})


export class LayoutComponent implements OnInit, ControlValueAccessor {


 canvas: Array<any> = [];
componentData = null;
customvar:any = TextComponent;

@ViewChild('parent', { read: ViewContainerRef })
 parent: ViewContainerRef;

data :any = {
	      component: TextComponent,
	      inputs: {
		        name: 'example'
		    }
	}


childComponent:any;

// One consturtor for both uses
constructor(
	private renderer: Renderer, private _dndService: dndService, private _zone: NgZone,
	private _componentFactoryResolver: ComponentFactoryResolver
	){

	

	}
ngOnInit() {}


clickme(){



//let childComponent = this._componentFactoryResolver.resolveComponentFactory(TextComponent); 
 //let anotherChildComponent = this._componentFactoryResolver.resolveComponentFactory(ullist)
//this.parent.createComponent(childComponent);
//this.parent.createComponent(anotherChildComponent);

/*
 let inputProviders = Object.keys(this.data.inputs).map((inputName) => {return {provide: inputName, useValue: this.data.inputs[inputName]};});
 let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
 let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.parent.parentInjector);



console.log('get data', inputProviders, resolvedInputs, injector)
*/
}




onDragEnter(event: any) {
	//console.log('drag enter', event)
}

onDropSuccess(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex) {






		this.canvas.push(
		          new Row(
		          		[new Column(

		          			[new Widget(
		          					event.dragData
		          				,
		          				
		          				//Widget location
		          				[new Properties(
		          					[new Dimension( 200,0,0,0 )], [new Location( 0,0,0,0 )]

		          				  )]
		          				//[new Location(0,0,0,0)]
		          			)],
		          			// Column location
		          			[new Properties(
	          					[new Dimension( 200 ,0, 0 + 200,0 )], [new Location(0,0,0,0 )]
		          			)]
		          		)],
		          		// Row Location
		          		[new Properties(
	          				[new Dimension( 0,0,0,0 )], [new Location(0,0,0,0)]
		          		)]
		          	)
		);

		this.canvas[0].column[0].widgets[0].data.isLoaded = !this.canvas[0].column[0].widgets[0].data.isLoaded
		console.log(this.canvas[0].column[0].widgets[0].data.isLoaded)

		this.canvas[0].column.push (

				[new Column( {ddd : 'ddd'})]
		      
		)
		
		
		console.log(this.canvas[0])
		console.log(this.canvas[0].column.length)
		console.log(this.canvas[0].column[0])
		console.log(this.canvas[0].column[1])








//console.log('event is ', event , 'drop on element is', dropOnElement )

//console.log('drag data', event.dragData.toggle)




/*
	// Check if canvas is empty
	if(this.canvas == [] || this.canvas == null  || this.canvas == 0 && droppedOn == 'canvas' && droppedOn != 'row' ){

		

// first time you drop an element i run this code
// here i push the object
		dropOnElement.push(
		          new Row(
		          		[new Column(

		          			[new Widget(
		          				event.dragData,
		          				
		          				//Widget location
		          				[new Properties(
		          					[new Dimension( 200,0,0,0 )], [new Location( 0,0,0,0 )]

		          				  )]
		          				//[new Location(0,0,0,0)]
		          			)],
		          			// Column location
		          			[new Properties(
	          					[new Dimension( 200 ,0, event.mouseEvent.clientX + 200,0 )], [new Location(0,0,0,event.mouseEvent.clientX )]
		          			)]
		          		)],
		          		// Row Location
		          		[new Properties(
	          				[new Dimension( 0,0,0,0 )], [new Location(event.mouseEvent.clientY,0,0,0)]
		          		)]
		          	)
		);
canvas.toggle = !canvas.toggle
// do it after element is pushed into array while pushing change the refernce 
		
		console.log('ona  fresh canvas', dropOnElement[0])
		console.log('this canavas', this.canvas)

		console.log('row', dropOnElement[0].column[0].widgets[0].data.toggle)
		// First time I drop the element I set the toggle to true 

//Here is change the toggle open the text pad pls
// Canvas -> row -> column - widget 
		dropOnElement[0].column[0].widgets[0].data.toggle = !dropOnElement[0].column[0].widgets[0].data.toggle
		//event.dragData.toggle = !event.dragData.toggle


	}

// second  time you drop an element i run this code	

	// Check if I am dropping ontop a row hotspot
	else if(droppedOn != 'canvas'  && droppedOn == 'row'){
 

		//alert('row dropped on')
		//open a text pad please , a new sheeet? just to chat


// this is to calculate position
		let mouseDropOn = event.mouseEvent.clientX;
		let totalwidth = 0;
		for (var i = 0; i < dropOnElement.column.length; i++) {
			totalwidth = + dropOnElement.column[i].properties[0].dimension[0].widthtotal;
		}
		let setPadding = mouseDropOn - totalwidth;

		dropOnElement.column.push(
				new Column(
		          			[new Widget(

		          				// 'Lorem ipsumrci viverra auctor', 
		          				event.dragData
		          				,
		          				//Widget location
		          				[new Properties(
		          					[new Dimension( 200,0,0,0 )], [new Location(0,0,0,0 )]

		          				)]
		          			)],
		          			// Column location
		          			[new Properties(
		          					[new Dimension(  200, 0, setPadding + 200,0 )], [new Location(0,0,0, setPadding )]

		          			)]
		          		),
		          		// Row Location
		          		[new Properties(
	          					[new Dimension( event.mouseEvent.clientY,0,0,0 )], [new Location(0,0,0,event.mouseEvent.clientX )]

	          			)]
		          	)	

		)

	console.log('current canvas', this.canvas); 	
	alert('top stop')
	console.log('started the drop on row', dropOnElement.column[1])
	console.log('started the drop on row', dropOnElement.column[1].widgets[0].data.toggle)
	dropOnElement.column[1].widgets[0].data.toggle = !dropOnElement.column[1].widgets[0].data.toggle
	console.log('started the drop on row', dropOnElement.column[1].widgets[0].data.toggle)

	console.log('current canvas', this.canvas); 	

	

	}

	// Check if canvas is  not empty && I am dragging ontop of canvas
	else if(droppedOn == 'canvas' ){

	}


	else if(droppedOn != 'canvas'  && droppedOn == 'column'){



		this.canvas[rowIndex].column[columnIndex].widgets.push(
				new Widget('Lorem ipsumrci viverra auctor', 
		          				//Widget location
		          				[new Location(0,0,0,0)]
		          			),
		          			// Column location
		          			[new Location(0,0,0,event.mouseEvent.clientX)]
		          		)
		          	)	

		);


		
	}else{


	}
*/

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
	constructor(public data: Array<any>, public widgetProperties: Array<Properties>) {}
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


