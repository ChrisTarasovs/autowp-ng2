import { Component, OnInit , Input,  Output, ChangeDetectorRef} from '@angular/core';
import {NgForm, FormBuilder, FormGroup, FormArray,  FormControl, Validators} from '@angular/forms'; 
import { tabsFormControlComponent}  from './item-control.component'
import {setMediaComponent} from './set-media.component'

@Component({
  selector: 'tabs-array',
  template: `
    <fieldset>
          <tabs-control
            *ngFor="let item of itemsFormArray.controls; let i=index"
            [index]="i" [item]="item" (removed)="itemsFormArray.removeAt($event)">
          </tabs-control>
    </fieldset>
    <button type="button" class="btn btn-link" (click)="addItem()">Add another item</button>
  `
})
export class tabsFormArrayComponent implements OnInit {
      @Input()  public itemsFormArray: FormArray;

        addItem() {
           this.itemsFormArray.push(tabsFormControlComponent.buildItem(''))
        }

        ngOnInit(){

        }
            
}