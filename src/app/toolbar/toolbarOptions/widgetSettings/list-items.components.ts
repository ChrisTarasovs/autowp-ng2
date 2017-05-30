import { Component, OnInit , Input,  Output, ChangeDetectorRef} from '@angular/core';
import {NgForm, FormBuilder, FormGroup, FormArray,  FormControl, Validators} from '@angular/forms'; 
import { ItemFormControlComponent}  from './item-control.component'
import {setMediaComponent} from './set-media.component'

@Component({
  selector: 'items-array',
  template: `
    <fieldset>
      <item-control
        *ngFor="let item of itemsFormArray.controls; let i=index"
        [index]="i" [item]="item" (removed)="itemsFormArray.removeAt($event)">
      </item-control>
    </fieldset>
    <button type="button" class="btn btn-link" (click)="addItem()">Add another item</button>
  `
})
export class ItemsFormArrayComponent implements OnInit {
       @Input()  public itemsFormArray: FormArray;

        addItem() {
              this.itemsFormArray.push(ItemFormControlComponent.buildItem(''))
        }

        ngOnInit(){

        }
            
}