import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DndModule} from 'tarasov';
import {ColorPickerModule} from 'angular2-color-picker';

import { AppComponent } from './app.component';
import { DndComponent } from './dnd/dnd.component';
import { TextComponent } from './dnd/text/text.component';
import { EditorComponent } from './editor/editor.component';
import { FindByIdPipe } from './find-by-id.pipe';
import { ColorSelectorComponent } from './editor/color-selector/color-selector.component';
import { DynamicComponent } from './editor/dynamic/dynamic.component';
import { LinksComponent } from './editor/links/links.component';

import * as _ from "lodash";
import { TypographyComponent } from './editor/typography/typography.component';
import { MediaComponent } from './editor/media/media.component';
import { MenuTypePipe } from './pipes/menu-type.pipe';
import { HeadingComponent } from './editor/heading/heading.component';
import { HeadingMenuComponent } from './editor/heading-menu/heading-menu.component';
import { SectionsComponent } from './sections/sections.component';



@NgModule({
  declarations: [
    AppComponent,
    DndComponent,
    TextComponent,
    EditorComponent,
    FindByIdPipe,
    ColorSelectorComponent,
    DynamicComponent,
    LinksComponent,
    TypographyComponent,
    MediaComponent,
    MenuTypePipe,
    HeadingComponent,
    HeadingMenuComponent,
    SectionsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ColorPickerModule,
    
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
