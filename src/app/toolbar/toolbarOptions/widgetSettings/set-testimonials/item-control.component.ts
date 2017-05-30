import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'testimonial-control',
  template:
`
<div class="form-group row" [formGroup]="item">
      <div formGroupName="userdetails">
            <div >
                  <label [attr.for]="'name'+index">Name</label>
                  <input type="text" class="form-control" [attr.id]="'name'+index" formControlName="name">
            </div>
            <div >
                  <label [attr.for]="'surname'+index">Lastname</label>
                  <input type="text" class="form-control" [attr.id]="'surname'+index" formControlName="surname">
            </div>
            <div >
                  <label [attr.for]="'email'+index">email</label>
                  <input type="text" class="form-control" [attr.id]="'email'+index" formControlName="email">
            </div>
      </div>
       <div>
            <label [attr.for]="'testimonial'+index">testimonial</label>
            <input type="text" class="form-control" [attr.id]="'testimonial'+index" formControlName="testimonial" />
        </div>
  </div>
  <div class="col-sm-1 py-1">
    <button type="button" class="btn" (click)="removed.emit(index)">-</button>
  </div>

`
})
export class testimonialFormControlComponent {


  @Input()
  public index: number;

  @Input()
  public item: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  static buildItem(item: any ) {
      return new FormGroup({
                     userdetails: new FormGroup({ 
                          name: new FormControl(item.userdetails.name),
                          surname: new FormControl(item.userdetails.surname),
                          email: new FormControl(item.userdetails.email),
                          image: new FormControl(item.userdetails.image),

                     }),
                     testimonial: new FormControl(item.testimonial)
      })
    }

}