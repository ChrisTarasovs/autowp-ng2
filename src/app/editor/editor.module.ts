import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorComponent } from './editor.component';
import { MenuTypePipe } from '../pipes/menu-type.pipe';
import { FindByIdPipe } from '../pipes/find-by-id.pipe';

import { HeadingMenuComponent } from './heading-menu/heading-menu.component';

import { DynamicComponent } from './dynamic/dynamic.component';
import { ButtontypeComponent } from './buttontype/buttontype.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EditorComponent,
    FindByIdPipe,
    MenuTypePipe,
    DynamicComponent,
    ButtontypeComponent,
    HeadingMenuComponent
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }