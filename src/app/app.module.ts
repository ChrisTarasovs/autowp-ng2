import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DndModule} from 'tarasov';

//import {ColorPickerModule} from 'ng2-color-ctarasovs';
import {ColorPickerModule} from 'angular2-color-picker';

import { AppComponent } from './app.component';
import { DndComponent } from './dnd/dnd.component';
import { TextComponent } from './dnd/text/text.component';

import { ColorSelectorComponent } from './editor/color-selector/color-selector.component';
import { LinksComponent } from './editor/links/links.component';

import * as _ from "lodash";
import { TypographyComponent } from './editor/typography/typography.component';
import { MediaComponent } from './editor/media/media.component';

import { HeadingComponent } from './editor/heading/heading.component';
import { HeadingMenuComponent } from './editor/heading-menu/heading-menu.component';
import { SectionsComponent } from './sections/sections.component';
import { KeysPipe } from './pipes/keys.pipe';



import { EditorModule } from './editor/editor.module';


@NgModule({
  declarations: [
    AppComponent,
    DndComponent,
    TextComponent,
    
    ColorSelectorComponent,
  
    LinksComponent,
    TypographyComponent,
    MediaComponent,
    HeadingComponent,
    HeadingMenuComponent,
    SectionsComponent,
    KeysPipe
    
  ],
  imports: [
    EditorModule,  /* Load Editor module and all dependecies are defined there. */
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
