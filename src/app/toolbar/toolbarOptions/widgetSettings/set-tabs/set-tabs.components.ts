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

<div  style="  height: 150px; overflow: scroll;"><pre><code>{{ myForm?.value | json }}</code></pre></div>
<div style="  height: 150px; overflow: scroll;">
       <pre> {{ widget | json }}</pre>
</div>
{{tabpositing | json}}

<form [formGroup]="myForm" (ngSubmit)="submit()">
    <select  class="form-control"  formControlName="tabposition"  >
          <option *ngFor="let pos of tabpositing" [value]="pos.name">{{pos.name}}</option>
    </select>
   <label>
      
        <input type="checkbox" formControlName="isFirstOpen">
          isFirstOpen
      
   </label>
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
          public tabpositing: any  = [
                          {name: 'top', value: false},
                            {name: 'right',value: false},
                           {name: 'bottom',value: false},
                            {name: 'left',value: false}
                        ]

          constructor(public _fb: FormBuilder, public _canvasService : canvasService) {}
      

	@Input('widgetData') public widget;

	 

	  ngOnInit() {
                 this.myForm = this._fb.group({
                         tabposition: '',
                         isFirstOpen: new FormControl(this.widget[0].widget.settings.isFirstOpen), 
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

