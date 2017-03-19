import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DndModule} from 'tarasov';

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
    MenuTypePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
