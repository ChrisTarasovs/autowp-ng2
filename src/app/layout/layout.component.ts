import { 
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  ViewChild,
  forwardRef,
  SimpleChanges,
  Output,
  EventEmitter,
  Renderer
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

// Importing Drag Module and widgets
import { DndComponent } from '../dnd/dnd.component';
import { TextComponent } from '../dnd/text/text.component';

// These import are for JQ function below
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import {dndService} from '../toolbar/services/dnd.service';

export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LayoutComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};



@Component({
  selector: 'layout',
  template:  ` 

<div 
class="canvas"
dnd-droppable
[dropZones]="['canvas-dropZone']"
(onDragEnter)="onDragEnter($event)"
(onDropSuccess)="onDropSuccess($event,  'canvas')" 
>
	<div    
		*ngFor="let row of canvas; let rowIndex = index" 
		dnd-droppable
		[dropZones]="['row-dropZone']"
		(onDragEnter)="onDragEnter($event)"
		(onDropSuccess)="onDropSuccess($event,  'row', rowIndex )" 

		class="AWrowWrapper" 
		 [ngStyle]="{'padding-top': row.properties[0].location[0].top  + 'px'}" 

		>
		<div class="AWrow">

			<div 
				*ngFor="let column of row.column; let columnIndex = index" 
				dnd-droppable
				[dropZones]="['column-dropZone']"
				(onDragEnter)="onDragEnter($event)"
				(onDropSuccess)="onDropSuccess($event,  'column', rowIndex, columnIndex )" 


				class="AWcolumnWrapper"
				[ngStyle]="{'padding-left': column.properties[0].location[0].left + 'px'}"

			>

			
				<div class="AWcolumn">
					<div  
					*ngFor="let widget of column.widgets; let widgetIndex = index" 

					dnd-droppable
					[dropZones]="['widget-dropZone']"
					(onDragEnter)="onDragEnter($event)"
					(onDropSuccess)="onDropSuccess($event,  'widget', rowIndex, columnIndex, widgetIndex )" 

					class="AWwidget" 
					[ngStyle]="{'padding-left': widget.properties[0].location[0].left + 'px'}"
					>
					

{{widget.properties[0].location[0].left | json}}
					


						
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


export class LayoutComponent  implements OnInit, ControlValueAccessor {
 canvas: Array<any> = [];
 //row: Array<any> = [];




// One consturtor for both uses
constructor(private renderer: Renderer, private _dndService: dndService){}
ngOnInit() {}



onDragEnter(event: any) {
	console.log('drag enter', event)
}
onDropSuccess(event: any, droppedOn: string, rowIndex, columnIndex, widgetIndex) {
	

	


	//console.log('drop success', event, droppedOn )
//	console.log('container count items ' ,this.canvas)
//	console.log('mouse event data', event.mouseEvent.clientY)

	// Check if canvas is empty
	if(this.canvas == [] || this.canvas == null  || this.canvas == 0 && droppedOn == 'canvas'){

		alert('we run emptu')
	
		this.canvas.push(
		          new Row(
		          		[new Column(
		          			[new Widget('Lorem ipsumrci viverra auctor', 
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
		          	)]



		);
		

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
	// Check if I am dropping ontop a row hotspot
	else if(droppedOn != 'canvas'  && droppedOn == 'row'){
		alert('started')
		console.log('aaaaa 1',this.canvas)

		// calculate new column position
		// because it is on the row hotspot, means you can get last element position to calculate
		let mouseDropOn = event.mouseEvent.clientX;
		let columndata = this.canvas[rowIndex].column
		
		//let lastRowColumnPosition = this.canvas[rowIndex].column[lastRowColumn].Location.

		let totalwidth = 0;
		console.log( this.canvas[rowIndex])
		let columnLength =   this.canvas[rowIndex].column.find(x => x === x.column)

		 //this.canvas[rowIndex].column.filter(function(obj) {return  obj == 'Column'})

		console.log('columnLength' ,columnLength)

		for (var i = 0; i < columnLength.length; i++) {
			alert('gone one')
			console.log(this.canvas[rowIndex].column)
			console.log('lenght', this.canvas[rowIndex].column.length)
			console.log('index', i)
			
			console.log('yes')
			console.log(this.canvas[rowIndex].column[i].properties)
			console.log('zzzzz',this.canvas[rowIndex].column[i].properties[0].dimension[0].widthtotal)
			totalwidth = + this.canvas[rowIndex].column[i].properties[0].dimension[0].widthtotal 
			console.log('sum is ', totalwidth)
		}
		let setPadding = mouseDropOn - totalwidth;

		console.log('aaaaa 2' ,this.canvas)


		//console.log('give me data ',mouseDropOn, lastRowColumn, columndata)

		//let highestId = this.canvas.Row[elementIndex].slice().sort((a, b) => a.id-b.id)[this.canvas.Row[elementIndex].length-1].id;
		//let highesrowId = this.canvas[elementIndex].widgets.slice().sort((a, b) => a.id-b.id)[this.canvas[elementIndex].widgets.length-1].id;
		//console.log(elementIndex, this.canvas[elementIndex].widgets.length,  highesrowId, this.canvas )

		
		this.canvas[0].column.push(
				new Column(
		          			[new Widget('Lorem ipsumrci viverra auctor', 
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

		console.log('aaaaa 3 ',this.canvas)
		/*
		this.canvas[elementIndex].column.widgets.push(
		          		new Widget( 'Lorem ipsumrci viverra auctor', 
		          			[new Location(0,0,0,event.mouseEvent.clientX)]
		          		)
		          	)	

		);
		*/
	

	}else if(droppedOn != 'canvas'  && droppedOn == 'column'){
		alert('column')

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


		console.log(rowIndex, columnIndex, widgetIndex, this.canvas)
	}else{


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
	constructor(public name: string, public properties: Array<Properties>) {}
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