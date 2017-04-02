import {HeadingComponent} from './wysiwyg-panel/heading/heading.component';
import {ColorSelectorComponent} from './wysiwyg-panel/color-selector/color-selector.component';
import {LinksComponent} from './wysiwyg-panel/links/links.component';
import {TypographyComponent} from './wysiwyg-panel/typography/typography.component';
import {ImagePanelComponent} from './image-panel/image-panel.component';
import {ExamplesComponent} from './examples/examples.component';
import {BuilderPanelComponent} from './builder-panel/builder-panel.component'

import { DndComponent } from '../../dnd/dnd.component';


export const  componentList = [
    {id : 1, component: HeadingComponent,inputs: { showNum: 9 }}, // H1
    {id : 2, component: ColorSelectorComponent,
        inputs: {
         showNum: 9
       } //[colordata]="newColor"
     }, // Color
    {id : 3, component: LinksComponent,inputs: { showNum: 0 }}, // links
    {id : 4, component: TypographyComponent,inputs: { showNum: 0 }}, //TypographyComponent
    {id : 5, component: ImagePanelComponent,inputs: { showNum: 0 }}, // Media
    {id : 6, component: ExamplesComponent, inputs: { showNum: 0 }}, //ExamplesComponent
    {id : 7, component: BuilderPanelComponent,inputs: { showNum: 0 }}, // Builder
    {id : 8, component: DndComponent,inputs: { showNum: 0 }}, // DD
    {id : 9, inputs: { showNum: 0 }},
    {id : 10,  inputs: { showNum: 0 }}
];


