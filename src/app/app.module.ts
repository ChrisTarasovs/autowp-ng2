import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule , FormBuilder, FormGroup } from '@angular/forms';
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

import { CommonModule } from '@angular/common';

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
import { TextComponent } from './dnd/text/text.component';
import { LayoutComponent } from './layout/layout.component';
import { ColorSelectorComponent } from './toolbar/toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
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

//Import Autowp Servicer
import {menuService} from './toolbar/services/menu.service';
import {widgetsService} from './toolbar/services/widgets.service';
import {dndService} from './toolbar/services/dnd.service';
import {videoService} from './toolbar/services/video.service';
import {fontsService} from './toolbar/services/fonts.service';

//Import AutoWp Pipes
import { MenuTypePipe } from './pipes/menu-type.pipe';
import { FontSizePipe, FontStylesPipe, StatefulSlicePipe } from './pipes/typography.pipe';
import {videoState} from './toolbar/services/videoState.service';
import { YoutubeSafeUrlPipe } from './pipes/youtube-safe-url.pipe';

// Import AutoWp modules
import { ColorPickerModule} from 'angular2-color-picker';
import { EditorModule } from './editor/editor.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import {NgxPaginationModule} from 'ngx-pagination'; 

//Import Autowp Interfaces
import { Font } from './toolbar/toolbarOptions/wysiwyg-panel/typography/typograpy-interfaces';

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

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    DndComponent,
    TextComponent,
    LayoutComponent,
    ColorSelectorComponent,
    ColorSelectorComponent,
    toolbarComponent,
    toolbarButtonsComponent ,
    toolbarOptionsComponent ,
    wysiwygComponent ,
    imageComponent,
    builderComponent ,
    ButtonTypeComponent ,
    LinksMenuComponent ,
    ColorMenuComponent,
    MediaMenuComponent ,
    TypographyMenuComponent ,
    HeadingComponent,
    ImagePanelComponent ,
    wysiwygPanelComponent ,
    BuilderPanelComponent,
     DynamicPanelComponent ,
    LinksComponent,
    TypographyComponent ,
    MediaComponent ,
    ExamplesComponent ,
    TextWidgetComponent ,
    ButtonTypeWidgetComponent ,
    VideoComponent ,
    VideoItemComponent,
    videoSearchBoxComponent,
    SectionsComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
    YoutubeSafeUrlPipe,
    FontSizePipe, FontStylesPipe, StatefulSlicePipe 
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
    menuService,widgetsService, videoService, videoState, fontsService,dndService
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
