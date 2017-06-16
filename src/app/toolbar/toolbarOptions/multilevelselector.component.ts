import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'multilevel-selector',
  	// <!--
		 //      <option *ngFor="let item of selectlist">
		     	
		 //     	 <div *ngIf="item.subpage">
		 //     	 	<option *ngFor="let subitem of selectlist.subpage">
		 //     	 		{{subitem.description}}
		 //     	 	</option>
		 //     	 </div>
		 //      </option>
		 //      -->
  template: `
		<select #sel (change)="select.emit(sel.value)">
			<option *ngFor="let item of selectlist">
				{{item.description}}
			</option>
		</select>
	`
})
export class multilevelselector {
	@Output() select = new EventEmitter();
	@Input('selectlist') public selectlist;
	ngOnInit(){
		this.select.emit(this.selectlist[0]);
	}
}