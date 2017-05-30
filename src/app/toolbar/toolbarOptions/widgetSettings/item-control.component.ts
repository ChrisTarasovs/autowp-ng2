import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'item-control',
  template:
`
<div class="form-group row" [formGroup]="item">
    <div class="col-sm-3">

    </div>
    <div class="col-sm-9">
         <div >
          <label [attr.for]="'name'+index">Name</label>
          <input type="text" class="form-control" [attr.id]="'name'+index" formControlName="name">
        </div>
        <div >
          <label [attr.for]="'description'+index">Description</label>
          <input type="text" class="form-control" [attr.id]="'description'+index" formControlName="description">
        </div>
        <div >
          <label [attr.for]="'alt'+index">alt</label>
          <input type="text" class="form-control" [attr.id]="'alt'+index" formControlName="alt">
        </div>
        <div >
          <label [attr.for]="'org'+index">org</label>
          <input type="text" class="form-control" [attr.id]="'org'+index" formControlName="org">
        </div>
        <div >
          <label [attr.for]="'xsize'+index">xsize</label>
          <input type="text" class="form-control" [attr.id]="'xsize'+index" formControlName="xsize">
        </div>
    </div>

 

  <div class="col-sm-1 py-1">
    <button type="button" class="btn" (click)="removed.emit(index)">-</button>
  </div>
</div>
`
})
export class ItemFormControlComponent {

  @Input()
  public index: number;

  @Input()
  public item: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  static buildItem(image: any ) {
      return new FormGroup({
        name: new FormControl(image.name),
        description: new FormControl(image.description),
        alt: new FormControl(image.alt),
        org: new FormControl(image.org),
        xsize: new FormControl(image.xsize)

       // quantity: new FormControl(100)
      })
    }
 
}