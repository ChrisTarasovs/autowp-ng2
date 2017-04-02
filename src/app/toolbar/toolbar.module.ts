import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { toolbarComponent } from './toolbar.component';
import { toolbarButtonsComponent } from './toolbarButtons/toolbarButtons.component';
import { toolbarOptionsComponent } from './toolbarOptions/toolbarOptions.component';

import { wysiwygComponent } from './toolbarButtons/wysiwyg/wysiwyg.component';
import { imageComponent } from './toolbarButtons/image/image.component';
import { builderComponent } from './toolbarButtons/builder/builder.component';


import { ButtonTypeComponent  } from './toolbarButtons/wysiwyg/widgets/buttonType-menu/button-type.component';
import { LinksMenuComponent } from './toolbarButtons/wysiwyg/widgets/links-menu/links-menu.component';
import { ColorMenuComponent } from './toolbarButtons/wysiwyg/widgets/color-menu/color-menu.component';

import { MediaMenuComponent } from './toolbarButtons/wysiwyg/widgets/media-menu/media-menu.component';
import { TypographyMenuComponent } from './toolbarButtons/wysiwyg/widgets/typography-menu/typography-menu.component';
import { MenuTypePipe } from '../pipes/menu-type.pipe';

import { HeadingComponent } from './toolbarOptions/wysiwyg-panel/heading/heading.component';
import { ImagePanelComponent } from './toolbarOptions/image-panel/image-panel.component';
import { wysiwygPanelComponent } from './toolbarOptions/wysiwyg-panel/wysiwyg-panel.component';
import { BuilderPanelComponent } from './toolbarOptions/builder-panel/builder-panel.component';
import { DynamicPanelComponent } from './toolbarOptions/dynamic-panels/dynamic.component' ;

import { LinksComponent } from './toolbarOptions/wysiwyg-panel/links/links.component';
import { TypographyComponent } from './toolbarOptions/wysiwyg-panel/typography/typography.component';
import { MediaComponent } from './toolbarOptions/wysiwyg-panel/media/media.component';
import { ExamplesComponent } from './toolbarOptions/examples/examples.component';
import { TextWidgetComponent } from './toolbarOptions/builder-panel/text-widget/text-widget.component';


@NgModule({
  imports: [
	CommonModule
    
  ],
   declarations: [
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
      TextWidgetComponent
   ],
  exports: [
    	toolbarComponent
  ]
})
export class ToolbarModule { }
