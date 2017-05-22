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
<button (click)="clickme()">click me</button>
    <div> loading data here</div> 
<div #parent></div>
<div> should load above </div>



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
		 [ngStyle]="{'padding-top': row.properties[0].location[0].top  + 'px'}" 

		>
		<div class="AWrow">

			<div 
				*ngFor="let column of row.column; let columnIndex = index" 
				dnd-droppable
				[dropZones]="['column-dropZone']"
				(onDragEnter)="onDragEnter($event)"
				(onDropSuccess)="onDropSuccess($event, column, 'column', rowIndex, columnIndex )" 


				class="AWcolumnWrapper"
				
				[ngStyle]="{'padding-left': column.properties[0].location[0].left + 'px'}"

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
					[ngStyle]="{'padding-left': widget.properties[0].location[0].left + 'px'}"
					>
					
						<div class="widget">
						
ddddd
						  <span *ngIf="widget.data.toggle">
						          <ng-container *ngComponentOutlet="widget.data.widgetComponent.component">
						          </ng-container>
					            </span>
							
						
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
	//private resolver: ComponentFactoryResolver // dyamic component service
	private _componentFactoryResolver: ComponentFactoryResolver
	){




//this.parent.insert(component.hostView);

  //console.log('constructed component',childComponent)
//console.log('what the fuck ',this.parent)
//this.parent.insert(this.childComponent);
 //this.parent.createComponent(anotherChildComponent);




}
ngOnInit() {}


clickme(){



let childComponent = this._componentFactoryResolver.resolveComponentFactory(TextComponent); 
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
	console.log('drag enter', event)
}

onDropSuccess(event: any, dropOnElement: any, droppedOn: string, rowIndex, columnIndex, widgetIndex) {



console.log('drag data', event.dragData.toggle)

 this.componentData = {
	      component: event.dragData.widgetComponent.component,
	      inputs: {
		        name: 'example'
		    }
	}





	//Object dropped

console.log('widget data',event.dragData.widgetComponent)
	


	//console.log('drop success', event, droppedOn )
//	console.log('container count items ' ,this.canvas)
//	console.log('mouse event data', event.mouseEvent.clientY)

	// Check if canvas is empty
	if(this.canvas == [] || this.canvas == null  || this.canvas == 0 && droppedOn == 'canvas' && droppedOn != 'row' ){

		


		dropOnElement.push(
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
	          					[new Dimension( 200 ,0, event.mouseEvent.clientX + 200,0 )], [new Location(0,0,0,event.mouseEvent.clientX )]
		          			)]
		          		)],
		          		// Row Location
		          		[new Properties(
	          				[new Dimension( 0,0,0,0 )], [new Location(event.mouseEvent.clientY,0,0,0)]
		          		)]
		          	)
		);

		
		console.log('ona  fresh canvas', dropOnElement[0])
		console.log('this canavas', this.canvas)

		console.log('row', dropOnElement[0].column[0].widgets[0].data.toggle)
		dropOnElement[0].column[0].widgets[0].data.toggle = !dropOnElement[0].column[0].widgets[0].data.toggle
		//event.dragData.toggle = !event.dragData.toggle
	}
	

	// Check if I am dropping ontop a row hotspot
	else if(droppedOn != 'canvas'  && droppedOn == 'row'){
 

		//alert('row dropped on')



		// calculate new column position
	

//console.log('column is', dropOnElement.column)

		let mouseDropOn = event.mouseEvent.clientX;
		let totalwidth = 0;
		for (var i = 0; i < dropOnElement.column.length; i++) {
			totalwidth = + dropOnElement.column[i].properties[0].dimension[0].widthtotal;
		}
		let setPadding = mouseDropOn - totalwidth;

		//console.log('setPadding' ,setPadding)
		//console.log('canvas outdate', dropOnElement)	
		// let setPadding = 0;
		//console.log('give me data ',mouseDropOn, lastRowColumn, columndata)
		//let highestId = this.canvas.Row[elementIndex].slice().sort((a, b) => a.id-b.id)[this.canvas.Row[elementIndex].length-1].id;
		//let highesrowId = this.canvas[elementIndex].widgets.slice().sort((a, b) => a.id-b.id)[this.canvas[elementIndex].widgets.length-1].id;
		//console.log(elementIndex, this.canvas[elementIndex].widgets.length,  highesrowId, this.canvas )

		//this.canvas[0].column
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
		//let highestId = this.canvas.slice().sort((a, b) => a.id-b.id)[this.canvas.length-1].id;
		//let lastRowId = 

		

		// calculate position top 

/*
		this.canvas.push(
		          new Row(
		          		[new Column(
		          			[new Widget('Lorem ipsumrci viverra auctor', 
		          				//Widget location
		          				[new Properties(
		          					[new Dimension( 0,0,0,0 )], [new Location( 0,0,0,0 )]

		          				  )]
		          			)],
		          			// Column location
		          			[new Properties(
		          					[new Dimension( 0,0,0,0 )], [new Location(0,0,0,event.mouseEvent.clientX )]

		          			)]
		          		)],
		          		// Row Location
		          		[new Properties(
          					[new Dimension( 0,0,0,0 )], [new Location(0,0,0,event.mouseEvent.clientX )]
	          			)]
		          	)
*/

	}


	else if(droppedOn != 'canvas'  && droppedOn == 'column'){

		alert('column')
		/*
		let mouseDropOn = event.mouseEvent.clientX;
		let columndata = dropOnElement.column
		let totalwidth = 0;
		let columnLength =   dropOnElement.find(x => x === x.column)

		for (var i = 0; i < columnLength.length; i++) {
			alert('gone one')
			totalwidth = + this.canvas[rowIndex].column[i].properties[0].dimension[0].widthtotal;
		}
		let setPadding = mouseDropOn - totalwidth;
		*/
		let setPadding = 0;

		dropOnElement.children = { nested: true}
		

		if(dropOnElement.rows == undefined) {
			dropOnElement.rows = new Array()
		}
		console.log('droponElement', dropOnElement)
		dropOnElement.rows.push(
			new Row(
				[new Column(
			          			[new Widget('Lorem ipsumrci viverra auctor', 
			          				//Widget location
			          				[new Properties(
			          					[new Dimension( 200,0,0,0 )], 
			          					[new Location(0,0,0,0 )]

			          				)]
				          		)],
			          			// Column location
			          			[new Properties(
		          					[new Dimension(  200, 0, setPadding + 200,0 )], 
		          					[new Location(0,0,0, setPadding )]
			          			)]
			          	)],
			          	// Row Location
		          		[new Properties(
	          					[new Dimension( event.mouseEvent.clientY,0,0,0 )], 
	          					[new Location(0,0,0,event.mouseEvent.clientX )]

		          		)]
			)
		)
		console.log('droponElement', dropOnElement)
		if(dropOnElement.widgets.length > 0){
			
			let oldwidget = dropOnElement.widgets.splice(0,1)
			dropOnElement.rows.push(
				new Row(
					[new Column(
				          			[new Widget('Lorem ipsumrci viverra auctor', 
				          				//Widget location
				          				[new Properties(
				          					[new Dimension( 200,0,0,0 )], 
				          					[new Location(0,0,0,0 )]

				          				)]
					          		)],
				          			// Column location
				          			[new Properties(
			          					[new Dimension(  200, 0, 0,0 )], 
			          					[new Location(0,0,0, 0 )]
				          			)]
				          	)],
				          	// Row Location
			          		[new Properties(
		          					[new Dimension( event.mouseEvent.clientY,0,0,0 )], 
		          					[new Location(0,0,0,event.mouseEvent.clientX )]

			          		)]
				)
			)
			console.log('droponElement after splice', dropOnElement)
			
		}
		console.log('droponElement', dropOnElement)
		console.log('testing nowddd')
		this._zone.run(function(){})
		console.log('testing now')
		this.checknested(dropOnElement)

/*
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
*/

		
	}else{


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
	constructor( public column: Array<Column>, public properties: Array<Properties>) {}
}
class Column{
	constructor( public widgets: Array<Widget>, public properties: Array<Properties>) {}
}
class Widget {
	constructor(public data: Array<any>, public properties: Array<Properties>) {}
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


