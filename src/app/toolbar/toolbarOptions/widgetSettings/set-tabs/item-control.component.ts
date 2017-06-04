import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'tabs-control',
  template:
`
<div class="form-group row" [formGroup]="item">
	<div >
	      <label [attr.for]="'title'+index">Tabname</label>
	      <input type="text" class="form-control" [attr.id]="'title'+index" formControlName="title">
	</div>
	<div >
	      <label [attr.for]="'content'+index">Tabcontent</label>
	      <input type="text" class="form-control" [attr.id]="'content'+index" formControlName="content">
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
      	title: new FormControl(item.tabname),
	content: new FormControl(item.tabcontent)
      })
    }

}