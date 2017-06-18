import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'multilevel-selector',
  template: `
		<select #sel (change)="select.emit(selectlist[sel.value])">
			<option  [value]='i' *ngFor="let item of selectlist; let i = index;">
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
		console.log('log', this.selectlist[0])
	}
}