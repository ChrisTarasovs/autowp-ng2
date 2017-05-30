import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'tabs-control',
  template:
`
<div class="form-group row" [formGroup]="item">
	<div >
	      <label [attr.for]="'tabname'+index">Tabname</label>
	      <input type="text" class="form-control" [attr.id]="'tabname'+index" formControlName="tabname">
	</div>
	<div >
	      <label [attr.for]="'tabcontent'+index">Tabcontent</label>
	      <input type="text" class="form-control" [attr.id]="'tabcontent'+index" formControlName="tabcontent">
	</div>

	<div class="col-sm-1 py-1">
		<button type="button" class="btn" (click)="removed.emit(index)">-</button>
	</div>
</div>
`
})
export class tabsFormControlComponent {


  @Input()
  public index: number;

  @Input()
  public item: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();


 

  static buildItem(item: any ) {
      return new FormGroup({
      	tabname: new FormControl(item.tabname),
	tabcontent: new FormControl(item.tabcontent)
      })
    }

}