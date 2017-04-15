import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule , FormBuilder, FormGroup} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DndModule} from 'tarasov';


import { AppComponent } from './app.component';
import { DndComponent } from './dnd/dnd.component';
import { TextComponent } from './dnd/text/text.component';


import * as _ from "lodash";
import * as moment from "moment";

import { EditorModule } from './editor/editor.module';

import { ToolbarModule } from './toolbar/toolbar.module';
import { LayoutComponent } from './layout/layout.component';

import {ColorPickerModule} from 'angular2-color-picker';
import { ColorSelectorComponent } from './toolbar/toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';

import { CommonModule } from '@angular/common';

import { toolbarComponent } from './toolbar/toolbar.component';
import { toolbarButtonsComponent } from './toolbar/toolbarButtons/toolbarButtons.component';
import { toolbarOptionsComponent } from './toolbar/toolbarOptions/toolbarOptions.component';

import { wysiwygComponent } from './toolbar/toolbarButtons/wysiwyg/wysiwyg.component';
import { imageComponent } from './toolbar/toolbarButtons/image/image.component';
import { builderComponent } from './toolbar/toolbarButtons/builder/builder.component';


import { ButtonTypeComponent  } from './toolbar/toolbarButtons/wysiwyg/widgets/buttonType-menu/button-type.component';
import { LinksMenuComponent } from './toolbar/toolbarButtons/wysiwyg/widgets/links-menu/links-menu.component';
import { ColorMenuComponent } from './toolbar/toolbarButtons/wysiwyg/widgets/color-menu/color-menu.component';

import { MediaMenuComponent } from './toolbar/toolbarButtons/wysiwyg/widgets/media-menu/media-menu.component';
import { TypographyMenuComponent } from './toolbar/toolbarButtons/wysiwyg/widgets/typography-menu/typography-menu.component';
import { MenuTypePipe } from './pipes/menu-type.pipe';

import { HeadingComponent } from './toolbar/toolbarOptions/wysiwyg-panel/heading/heading.component';
import { ImagePanelComponent } from './toolbar/toolbarOptions/image-panel/image-panel.component';
import { wysiwygPanelComponent } from './toolbar/toolbarOptions/wysiwyg-panel/wysiwyg-panel.component';
import { BuilderPanelComponent } from './toolbar/toolbarOptions/builder-panel/builder-panel.component';
import { DynamicPanelComponent } from './toolbar/toolbarOptions/dynamic-panels/dynamic.component' ;

import { LinksComponent } from './toolbar/toolbarOptions/wysiwyg-panel/links/links.component';
import { TypographyComponent } from './toolbar/toolbarOptions/wysiwyg-panel/typography/typography.component';
import { MediaComponent } from './toolbar/toolbarOptions/wysiwyg-panel/media/media.component';
import { ExamplesComponent } from './toolbar/toolbarOptions/examples/examples.component';
import { TextWidgetComponent } from './toolbar/toolbarOptions/builder-panel/text-widget/text-widget.component';
import { ButtonTypeWidgetComponent } from './toolbar/toolbarOptions/wysiwyg-panel/button-type/button-type-widget.component';
import { VideoComponent } from './toolbar/toolbarOptions/video-panel/video.component';
import {VideoItemComponent} from  './toolbar/toolbarOptions/video-panel/video-item/video-item.component';
import {videoSearchBoxComponent} from  './toolbar/toolbarButtons/videoSearch/videoSearch.component';

import {SectionsComponent} from './sections/sections.component';

import {menuService} from './toolbar/services/menu.service';
import {widgetsService} from './toolbar/services/widgets.service';
import {videoService} from './toolbar/services/video.service';
import {AppState} from './toolbar/services/app-state.service';
import { YoutubeSafeUrlPipe } from './pipes/youtube-safe-url.pipe';


//import {Ng2PaginationModule} from 'ng2-pagination';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    AppComponent,
    DndComponent,
    TextComponent,
    ColorSelectorComponent,
    LayoutComponent,

     toolbarComponent,
     toolbarButtonsComponent,
     toolbarOptionsComponent,
     wysiwygComponent,
     imageComponent,
     builderComponent,
      ButtonTypeComponent,
      LinksMenuComponent,
      ColorMenuComponent,
 
      MediaMenuComponent,
      TypographyMenuComponent,
      MenuTypePipe,

      HeadingComponent,
      ImagePanelComponent,
      wysiwygPanelComponent,
      BuilderPanelComponent,
      DynamicPanelComponent,
    
      LinksComponent,
      TypographyComponent,
      MediaComponent,
      ExamplesComponent,
      TextWidgetComponent,
      ButtonTypeWidgetComponent,
      videoSearchBoxComponent,
      VideoComponent,VideoItemComponent,
       
      SectionsComponent,
      YoutubeSafeUrlPipe

  ],
  imports: [
   EditorModule,  /* Load Editor module and all dependecies are defined there. */
   // ToolbarModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ColorPickerModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DndModule.forRoot()
  ],
  providers: [menuService,widgetsService, videoService, AppState],
  bootstrap: [AppComponent]
})
export class AppModule { }
