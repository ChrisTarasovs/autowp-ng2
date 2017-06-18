import { Component, OnInit } from '@angular/core';
import { wysiwygService} from '../../../services/wysiwyg.service'
@Component({
  selector: 'links',
  template: `

<div *ngFor="let radiobtn of buttontype; let idx = index">
	<label>
		<input type="radio" name="certificategroup" (change)="onSelectionBtntypeChange(radiobtn)" [checked]="(idx === 0)" [value]="radiobtn.value">
		{{ radiobtn.description }}
	</label>
	
	<div *ngIf="this.selectedbuttontype.value == '1' && radiobtn.value == '1' ">
		<div>
		    <span>Select a page</span>
		    <multilevel-selector (select)="pageSelect($event)" [selectlist]="this.pagelist"></multilevel-selector>
		</div>
	</div>
	<div *ngIf="this.selectedbuttontype.value == '2' && radiobtn.value == '2' ">
		<div>
		    <input type="text" [ngModel]="selectedColor" (ngModelChange)="valuechange($event)" [value]='selectedlink' #colorValue/>
      		<button (click)="addColor(colorValue.value)" class="btn btn-default">Add Color</button>
		</div>
	</div>	
</div>

	<div>
		    <span>Show in new tab</span>
		    <div *ngFor="let radiobtn of newtab; let idx = index">
				<label>
					<input type="radio" name="certificategroup" (change)="onSelectionNewTabChange(radiobtn)" [checked]="(idx === 0)" [value]="radiobtn.value">
					{{ radiobtn.description }}
				</label>
			</div>
	</div>
	
	<button (click)="this._wysiwygService.addLink(this.selectedPg)"> Add link </button>
	<button class="a-btn-lg a-btn-def">Convert to button</button>

	<pre>
	{{ this.selectedbuttontype | json }}
	</pre>
	<pre>
	{{ this.selectednewtab | json }}
	</pre>

  `
})
export class LinksComponent {
  public buttontype = [];
  public  selectedbuttontype: { [key: string]: any } = {
    value: null,
    description: null
  };
  public newtab = [];
  public selectednewtab: { [key: string]: any } = {
    value: null,
    description: null
  };
  public selectedPg;
  public  pagelist:Array<Object> = [
      {
      	value: 0, 
      	description: 'Home',
            url: 'http://www.color.com'
      },
      {
      	value: 1, 
      	description: 'Tours',
      	subpage: [{
      				value: 0, 
			      	description: 'Italy'
			     },
			     {
      				value: 0, 
			      	description: 'France'
			     },
			     {
      				value: 0, 
			      	description: 'London'
			     }]
      },
      {
      	value: 1, 
      	description: 'About us',
            url: 'http://www.color.com'
      },
            {
      	value: 1, 
      	description: 'Contact us',
            url: 'http://www.color.com'
      }

  ];




  constructor(private _wysiwygService: wysiwygService) { }
  ngOnInit() {
  	 this.buttontype = [
      {
        description: 'Pre defiened',
        value: 1
      },
      {
        description: 'Custom link',
        value: 2
      }
    ];
  	this.newtab = [
      {
        description: 'Yes',
        value: 1
      },
      {
        description: 'No',
        value: 2
      }
    ];

    // select the first one
	if(this.buttontype) {
	  this.onSelectionBtntypeChange(this.buttontype[1]);  
	}
    // select the first one
	if(this.buttontype) {
	  this.onSelectionNewTabChange(this.buttontype[1]);  
	}

	
  }
	
	onSelectionBtntypeChange(entry) {
    // clone the object for immutability
    this.selectedbuttontype = Object.assign({}, this.selectedbuttontype, entry);
   }
  	onSelectionNewTabChange(entry) {
    // clone the object for immutability
    this.selectednewtab = Object.assign({}, this.selectednewtab, entry);
   }

   pageSelect(event){
       this.selectedPg = event;
       console.log('here',this.selectedPg)
   }

}
