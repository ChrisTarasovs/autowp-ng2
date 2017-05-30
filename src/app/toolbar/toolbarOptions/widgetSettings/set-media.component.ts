import { Component, OnInit , Input,  Output} from '@angular/core';
import {
    NgForm, FormBuilder, FormGroup, 
    AbstractControl, FormArray,  FormControl, 
    Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import  {ItemsFormArrayComponent} from './list-items.components'
import { ItemFormControlComponent}  from './item-control.component'
import {canvasService} from '../../services/canvas.service'

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'set-media',
  template: `

<form [formGroup]="myForm" (ngSubmit)="submit()">
  <h4>Form</h4>
 <input type="text" class="form-control" placeholder="Reference no" formControlName="singleimage">
 <input type="text" class="form-control" placeholder="Reference no" formControlName="gallery">
 <input type="text" class="form-control" placeholder="Reference no" formControlName="carousel">
  <hr>
  <items-array
    formArrayName="slides"
    [itemsFormArray]="myForm.get('slides')">
  </items-array>
  <hr>
  <div class="form-group">
    <input type="submit" class="form-control" value="Submit" [disabled]="myForm?.invalid">
  </div>
</form>



<div><pre><code>{{ myForm?.value | json }}</code></pre></div>
  
  `
})
export class setMediaComponent implements OnInit {
          public myForm: FormGroup;
          constructor(public _fb: FormBuilder, public _canvasService : canvasService) { }


	@Input('widgetData') public widget;

	 

	  ngOnInit() {


                 this.myForm = this._fb.group({
                             singleimage :   this.widget[0].widget.settings.singleimage ,
                             gallery:  this.widget[0].widget.settings.singleimage,
                             carousel:  this.widget[0].widget.settings.singleimage ,
                  
                            slides: this.buildItems()

                });

               this.myForm.valueChanges.subscribe(data => {
                         console.log('Form changes', data , this.widget[0])
                         console.log('canvas', this._canvasService.canvas)
                         
                       
                         Object.assign(

                           this.widget[0].widget.settings 
                           , data); 
                           
                })
                console.log('my form', this.myForm)

	  }


            buildItems() {
                const tempArray =  new FormArray([])

               // return new FormArray([])

                 this.widget[0].widget.settings.slides.forEach(function(slide) {
                       //this.buildItem(slide)

                         const buildslide =  ItemFormControlComponent.buildItem(slide)
                       /*
                       const buildslide =  new FormGroup({
                                                                  name: new FormControl(slide.name),
                                                                  quantity: new FormControl(100)
                                                    })
                      */
                      tempArray.push(buildslide);
                })

               return tempArray;
              }


      




}

