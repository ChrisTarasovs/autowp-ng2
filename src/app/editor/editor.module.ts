import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EditorComponent } from './editor.component';
import { DynamicComponent } from './dynamic/dynamic.component';





@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

    EditorComponent,
    DynamicComponent
   
 

  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }