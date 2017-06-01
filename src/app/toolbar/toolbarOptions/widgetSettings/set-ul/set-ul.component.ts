import { Component, OnInit , Input,  Output} from '@angular/core';
import {
    NgForm, FormBuilder, FormGroup, 
    AbstractControl, FormArray,  FormControl, 
    Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import  { ulListFormArrayComponent } from './list-items.components'
import  { testimonialFormControlComponent}  from './item-control.component'
import  { canvasService} from '../../../services/canvas.service'

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'set-testimonials',
  template: `
         <div  style="  height: 150px; overflow: scroll;">
           <pre><code>{{ myForm?.value | json }}</code></pre>
         </div>
         <div style="  height: 150px; overflow: scroll;">
                 <pre> {{ widget | json }}</pre>
          </div>

          <form [formGroup]="myForm" (ngSubmit)="submit()">

            <list-array
              formArrayName="items"
              [itemsFormArray]="myForm.get('items')">
            </list-array>

            <div class="form-group">
              <input type="submit" class="form-control" value="Submit" [disabled]="myForm?.invalid">
            </div>

          </form>          
  `
})
export class setULComponent implements OnInit {
          public myForm: FormGroup;
          constructor(public _fb: FormBuilder, public _canvasService : canvasService) { }

	    @Input('widgetData') public widget;

	 

	  ngOnInit() {
             
                 this.myForm = this._fb.group({
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

