import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorComponent } from './editor.component';
import { MenuTypePipe } from '../pipes/menu-type.pipe';
import { FindByIdPipe } from '../pipes/find-by-id.pipe';

import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EditorComponent,
    FindByIdPipe,
    MenuTypePipe,
    DynamicComponent
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }