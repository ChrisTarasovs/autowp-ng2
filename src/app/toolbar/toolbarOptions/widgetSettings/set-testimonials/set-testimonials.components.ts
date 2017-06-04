import { Component, OnInit , Input,  Output} from '@angular/core';
import {
    NgForm, FormBuilder, FormGroup, 
    AbstractControl, FormArray,  FormControl, 
    Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import  {testimonialFormArrayComponent} from './list-items.components'
import { testimonialFormControlComponent}  from './item-control.component'
import {canvasService} from '../../../services/canvas.service'

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'set-testimonials',
  template: `
        <div  style="  height: 150px; overflow: scroll;"><pre><code>{{ myForm?.value | json }}</code></pre></div>
         <div style="  height: 150px; overflow: scroll;">
                 <pre> {{ widget | json }}</pre>
          </div>

          <form [formGroup]="myForm" (ngSubmit)="submit()">
            <select  class="form-control"  formControlName="imagePosition"  >
                  <option *ngFor="let pos of tabpositing" [value]="pos.name">{{pos.name}}</option>
            </select>
            <input type="text" class="form-control" placeholder="grid" formControlName="grid">
            <input type="text" class="form-control" placeholder="carousel" formControlName="carousel">
            <testimonial-array
              formArrayName="items"
              [itemsFormArray]="myForm.get('items')">
            </testimonial-array>
            <div class="form-group">
              <input type="submit" class="form-control" value="Submit" [disabled]="myForm?.invalid">
            </div>
          </form>

        

            
  `
})
export class setTestimonialsComponent implements OnInit {
          public myForm: FormGroup;
          public tabpositing: any  = [
                          {name: 'top', value: false},
                            {name: 'right',value: false},
                           {name: 'bottom',value: false},
                            {name: 'left',value: false}
                        ]
          constructor(public _fb: FormBuilder, public _canvasService : canvasService) { }


	@Input('widgetData') public widget;

	 

	  ngOnInit() {
             
                 this.myForm = this._fb.group({
                            imagePosition: '',
                            grid: new FormControl(this.widget[0].widget.settings.grid), 
                            carousel:  new FormControl(this.widget[0].widget.settings.carousel), 
                            items: this.buildItems(this.widget[0].widget.settings.items)
                });

                this.myForm.valueChanges.subscribe(data => {
                     Object.assign(this.widget[0].widget.settings, data); 
                })

	  }


       buildItems(listobj) {
                const tempArray =  new FormArray([])
                console.log('itemssss', this.widget[0].widget.settings.items)

                listobj.forEach(function(item) {
                      const buildslide =  testimonialFormControlComponent.buildItem(item)
                      tempArray.push(buildslide);
                })

               return tempArray;
              }




}

