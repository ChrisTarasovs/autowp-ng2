import { Component, OnInit , Input,  Output} from '@angular/core';
import {
    NgForm, FormBuilder, FormGroup, 
    AbstractControl, FormArray,  FormControl, 
    Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import  {tabsFormArrayComponent} from './list-items.components'
import { tabsFormControlComponent}  from './item-control.component'
import {canvasService} from '../../../services/canvas.service'

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'set-tabs',
  template: `

tabs

<div  style="  height: 150px; overflow: scroll;"><pre><code>{{ myForm?.value | json }}</code></pre></div>
<div style="  height: 150px; overflow: scroll;">
       <pre> {{ widget | json }}</pre>
</div>

<hr />
{{widget[0].widget.settings.tabposition | json}}
<div *ngFor="let pos of widget[0].widget.settings.tabposition">
{{pos.value | json}}
</div>

 <form [formGroup]="myForm" (ngSubmit)="submit()">
      <label>Tab position</label>   

      <select 
      name="tabposition" 
      class="form-control" 
      formGroupName="tabposition">
        <option *ngFor="let pos of widget[0].widget.settings.tabposition" [formControlName]="pos.value">{{pos.value}}</option>
      </select>
      <tabs-array
              formArrayName="items"
              [itemsFormArray]="myForm.get('items')">
      </tabs-array>
      <div class="form-group">
        <input type="submit" class="form-control" value="Submit" [disabled]="myForm?.invalid">
      </div>

   </form>


            
  `
})
export class setTabsComponent implements OnInit {
          public myForm: FormGroup;
          constructor(public _fb: FormBuilder, public _canvasService : canvasService) { }


	@Input('widgetData') public widget;

	 

	  ngOnInit() {
             
                 this.myForm = this._fb.group({
                            
                            tabposition:  new FormGroup({ 
                                            top: new FormControl(this.widget[0].widget.settings.tabposition[0].value),
                                            right: new FormControl(this.widget[0].widget.settings.tabposition[1].value),
                                            bottom: new FormControl(this.widget[0].widget.settings.tabposition[2].value),
                                            left: new FormControl(this.widget[0].widget.settings.tabposition[3].value),

                             }),


                            items: this.buildItems(this.widget[0].widget.settings.items)
                });

                this.myForm.valueChanges.subscribe(data => {
                     Object.assign(this.widget[0].widget.settings, data); 
                })

	  }


       buildItems(listobj) {
                const tempArray =  new FormArray([])
                listobj.forEach(function(item) {
                      const buildslide =  tabsFormControlComponent.buildItem(item)
                      tempArray.push(buildslide);
                })

               return tempArray;
       }
  


}

