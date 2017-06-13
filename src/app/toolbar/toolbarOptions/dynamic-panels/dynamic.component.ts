import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, SimpleChanges} from '@angular/core';
import {TypographyComponent} from '../wysiwyg-panel/typography/typography.component';
import {LinksComponent} from '../wysiwyg-panel/links/links.component';
import { ImagePanelComponent } from '../image-panel/image-panel.component';
//import { MediaComponent } from '../wysiwyg-panel/media/media.component';
import { ExamplesComponent } from '../examples/examples.component';
import {BuilderPanelComponent} from '../builder-panel/builder-panel.component';
import { ColorSelectorComponent } from '../wysiwyg-panel/color-selector/color-selector.component';
import { HeadingComponent } from '../wysiwyg-panel/heading/heading.component';
import { TextWidgetComponent } from '../builder-panel/text-widget/text-widget.component';
import {  ButtonTypeWidgetComponent} from '../wysiwyg-panel/button-type/button-type-widget.component'
import { DndComponent } from '../../../dnd/dnd.component';
import { VideoSettingsComponent} from '../widgetSettings/set-video/video.component';

import {SectionsComponent} from '../../../sections/sections.component';
import {widgetSettingsComponent} from '../widgetSettings/widgetSettings.component'

@Component({
  selector: 'dynamiccontent-component',
  entryComponents: [
    HeadingComponent,
     ColorSelectorComponent,
     TypographyComponent,
     widgetSettingsComponent,
     LinksComponent,
     ImagePanelComponent,
     ExamplesComponent,
     BuilderPanelComponent,
     DndComponent,
     TextWidgetComponent,
     ButtonTypeWidgetComponent,
     VideoSettingsComponent,
     SectionsComponent

  ], // Reference to the components must be here in order to dynamically create them
  template: `
    <div #dynamicComponentContainer  ></div>
    
  `
})
//{{dynamicData}}
export class DynamicPanelComponent {
   constructor(private _ComponentFactoryResolver: ComponentFactoryResolver) { }
   currentComponent = null;

  @Input()  dynamicData;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
  @Input() set componentData(data: {component: any, inputs: any}) {

    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
     let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
   //  let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
    // We create a factory out of the component we want to create
    //To get the components we use the ComponentFactoryResolver, inject it into the constructor and declare to let factory variable  which will receive our components:
    // let factory will now get the component.
    let factory = this._ComponentFactoryResolver.resolveComponentFactory(data.component);
    // We create the component using the factory and the injector
    let component = factory.create(injector);
    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);
    // We can destroy the old component is we like by calling destroy
    
    if (this.currentComponent) { this.currentComponent.destroy();}
    this.currentComponent = component;
    
  }
}
