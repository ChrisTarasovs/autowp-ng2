import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule , FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';



/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

import '../styles/styles.scss';
import '../styles/headings.css';

import * as _ from "lodash";
import * as moment from "moment";
//import * as WebFont from 'webfontloader';

import {DndModule} from 'tarasov';

// Import AutoWp Components
import { DndComponent } from './dnd/dnd.component';

import { LayoutComponent } from './layout/layout.component';
import { ColorSelectorComponent } from './toolbar/toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import { toolbarComponent } from './toolbar/toolbar.component';
import { toolbarButtonsComponent } from './toolbar/toolbarButtons/toolbarButtons.component';
import { tButtonsComponent } from './toolbar/toolbarButtons/tbuttons.component';


//import { toolbarOptionsComponent } from './toolbar/toolbarOptions/toolbarOptions.component';
import { wysiwygComponent } from './toolbar/toolbarButtons/wysiwyg/wysiwyg.component';
//import { imageComponent } from './toolbar/toolbarButtons/image/image.component';
import { builderComponent } from './toolbar/toolbarButtons/builder/builder.component';
import { ButtonTypeComponent  } from './toolbar/toolbarButtons/wysiwyg/widgets/buttonType-menu/button-type.component';
import { LinksMenuComponent } from './toolbar/toolbarButtons/wysiwyg/widgets/links-menu/links-menu.component';
import { ColorMenuComponent } from './toolbar/toolbarButtons/wysiwyg/widgets/color-menu/color-menu.component';

import { TypographyMenuComponent } from './toolbar/toolbarButtons/wysiwyg/widgets/typography-menu/typography-menu.component';
import { HeadingComponent } from './toolbar/toolbarOptions/wysiwyg-panel/heading/heading.component';
import { ImagePanelComponent } from './toolbar/toolbarOptions/image-panel/image-panel.component';
//import { wysiwygPanelComponent } from './toolbar/toolbarOptions/wysiwyg-panel/wysiwyg-panel.component';
import { BuilderPanelComponent } from './toolbar/toolbarOptions/builder-panel/builder-panel.component';
import { DynamicPanelComponent } from './toolbar/toolbarOptions/dynamic-panels/dynamic.component' ;
import { LinksComponent } from './toolbar/toolbarOptions/wysiwyg-panel/links/links.component';
import { TypographyComponent } from './toolbar/toolbarOptions/wysiwyg-panel/typography/typography.component';
import { MediaComponent } from './toolbar/toolbarOptions/wysiwyg-panel/media/media.component';
import { ExamplesComponent } from './toolbar/toolbarOptions/examples/examples.component';
import { TextWidgetComponent } from './toolbar/toolbarOptions/builder-panel/text-widget/text-widget.component';
import { ButtonTypeWidgetComponent } from './toolbar/toolbarOptions/wysiwyg-panel/button-type/button-type-widget.component';

import { VideoSettingsComponent } from './toolbar/toolbarOptions/widgetSettings/set-video/video.component';
import { VideoItemComponent } from  './toolbar/toolbarOptions/widgetSettings/set-video/video-item/video-item.component';

import {videoSearchBoxComponent} from  './toolbar/toolbarButtons/videoSearch/videoSearch.component';
import {SectionsComponent} from './sections/sections.component';

// All Component widgets
import {  text, textarea,ullist,singleImage, images, accordion, accordionGroup, accordionHeading,tabs, video, googlemaps,testimonials, testimonial, modalBox,slide} from './dnd/widgets/widgets.component';

// All Component settings
import { widgetSettingsComponent } from './toolbar/toolbarOptions/widgetSettings/widgetSettings.component';
import { setMediaComponent } from './toolbar/toolbarOptions/widgetSettings/set-media.component';

//import { FileUploaderComponent } from './toolbar/toolbarOptions/widgetSettings/set-media.component';

import {ItemsFormArrayComponent}  from './toolbar/toolbarOptions/widgetSettings/list-items.components'
import {ItemFormControlComponent}  from './toolbar/toolbarOptions/widgetSettings/item-control.component'

import { setTestimonialsComponent } from './toolbar/toolbarOptions/widgetSettings/set-testimonials/set-testimonials.components';
import {testimonialFormArrayComponent}  from './toolbar/toolbarOptions/widgetSettings/set-testimonials/list-items.components'
import {testimonialFormControlComponent} from './toolbar/toolbarOptions/widgetSettings/set-testimonials/item-control.component'

import { setTabsComponent } from './toolbar/toolbarOptions/widgetSettings/set-tabs/set-tabs.components';
import {tabsFormArrayComponent}  from './toolbar/toolbarOptions/widgetSettings/set-tabs/list-items.components'
import {tabsFormControlComponent} from './toolbar/toolbarOptions/widgetSettings/set-tabs/item-control.component'



//Import Autowp Servicer
import {menuService} from './toolbar/services/menu.service';
import {widgetsService} from './toolbar/services/widgets.service';
import {dndService} from './toolbar/services/dnd.service';
import {videoService} from './toolbar/services/video.service';
import {fontsService} from './toolbar/services/fonts.service';
import {canvasService} from './toolbar/services/canvas.service';
import {wysiwygService} from './toolbar/services/wysiwyg.service';
import {cmpService} from './toolbar/services/components.service';
import  {toolbarStateService} from './toolbar/services/toolbarStatus.service';
import {webService } from './toolbar/services/web.services'

//Import AutoWp Pipes
import { MenuTypePipe } from './pipes/menu-type.pipe';
import { FontSizePipe, FontStylesPipe, StatefulSlicePipe } from './pipes/typography.pipe';
import {videoState} from './toolbar/services/videoState.service';
import { YoutubeSafeUrlPipe } from './pipes/youtube-safe-url.pipe';
import { Safe} from './pipes/safehtml.pipe'
import {NewlinePipe} from './pipes/newline.pipe'

// Import AutoWp modules
import { ColorPickerModule} from 'angular2-color-picker';
import { EditorModule } from './editor/editor.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import {NgxPaginationModule} from 'ngx-pagination'; 

//Import Autowp Interfaces
import { Font } from './toolbar/toolbarOptions/wysiwyg-panel/typography/typograpy-interfaces';


import {ContentEditableDirective} from './contenteditable-model'

import {ResizingCroppingImagesComponent} from './image-cropper/image-cropper.component'


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

export const pipe_providers = [
  {provide: NewlinePipe, useClass: NewlinePipe}
];



/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    DndComponent,
    LayoutComponent,
    ColorSelectorComponent,
    ColorSelectorComponent,
    toolbarComponent,
    toolbarButtonsComponent ,
    tButtonsComponent,
    //toolbarOptionsComponent ,
    wysiwygComponent ,
   // imageComponent,
    builderComponent ,
    ButtonTypeComponent ,
    LinksMenuComponent ,
    ColorMenuComponent,
    
    TypographyMenuComponent ,
    HeadingComponent,
    ImagePanelComponent ,
   // wysiwygPanelComponent ,
    BuilderPanelComponent,
     DynamicPanelComponent ,
    LinksComponent,
    TypographyComponent ,
    MediaComponent ,
    ExamplesComponent ,
    TextWidgetComponent ,
    ButtonTypeWidgetComponent ,
    
    VideoItemComponent,
    videoSearchBoxComponent,
    SectionsComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
    YoutubeSafeUrlPipe,
    FontSizePipe, FontStylesPipe, StatefulSlicePipe, Safe,NewlinePipe,
     text, textarea, ullist,singleImage, images, accordion,accordionGroup, accordionHeading, tabs, video, googlemaps,testimonials, testimonial, modalBox,slide,

    // FileUploaderComponent,
   ItemsFormArrayComponent, 
   ItemFormControlComponent,

   setTestimonialsComponent,
   testimonialFormArrayComponent,
   testimonialFormControlComponent,

    setTabsComponent,
    tabsFormArrayComponent,
    tabsFormControlComponent,

     // Component settings
     widgetSettingsComponent,
     setMediaComponent,
     VideoSettingsComponent,

     //Directives
     ContentEditableDirective,


     ResizingCroppingImagesComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    ColorPickerModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  //  WebFont,
   DndModule.forRoot()
  //  RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    menuService,widgetsService, videoService, 
    videoState, fontsService,dndService, canvasService,wysiwygService, toolbarStateService,webService,
    cmpService,pipe_providers
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
