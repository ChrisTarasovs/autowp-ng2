import { Component, OnInit , Input,  Output, ChangeDetectorRef} from '@angular/core';
import {NgForm, FormBuilder, FormGroup, FormArray,  FormControl, Validators} from '@angular/forms'; 
import { testimonialFormControlComponent}  from './item-control.component'
import {setMediaComponent} from './set-media.component'

@Component({
  selector: 'testimonial-array',
  template: `



    <fieldset>
          <testimonial-control
            *ngFor="let item of itemsFormArray.controls; let i=index"
            [index]="i" [item]="item" (removed)="itemsFormArray.removeAt($event)">
          </testimonial-control>
    </fieldset>
    <button type="button" class="btn btn-link" (click)="addItem()">Add another item</button>

  `
})
export class testimonialFormArrayComponent implements OnInit {
      @Input()  public itemsFormArray: FormArray;

        addItem() {
           this.itemsFormArray.push(testimonialFormControlComponent.buildItem(''))
        }

        ngOnInit(){

        }
            
}