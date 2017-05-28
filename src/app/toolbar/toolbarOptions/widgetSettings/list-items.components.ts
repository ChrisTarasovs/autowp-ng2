import { Component, OnInit , Input,  Output} from '@angular/core';

@Component({
  selector: 'list-items',
  template: `

  	{{image.name  | json}}
  	{{image.description  | json }}
  	{{image.alt  | json }}
  	{{image.placeholder  | json}}
  	{{image.org  | json }}
	{{image.xsize  | json}}

	   <button (click)="updateCanvas()">Update image name </button>
  `
})
export class listItemsComponent implements OnInit {
	@Input('image') public image;
	  updateCanvas(){
               this.image.name = 'Chris Brown'

            }
}