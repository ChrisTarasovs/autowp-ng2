import {HeadingComponent} from './wysiwyg-panel/heading/heading.component';
import {ColorSelectorComponent} from './wysiwyg-panel/color-selector/color-selector.component';
import {LinksComponent} from './wysiwyg-panel/links/links.component';
import {TypographyComponent} from './wysiwyg-panel/typography/typography.component';
import {ImagePanelComponent} from './image-panel/image-panel.component';
import {ExamplesComponent} from './examples/examples.component';
import {BuilderPanelComponent} from './builder-panel/builder-panel.component';
import {DndComponent} from '../../dnd/dnd.component';
export const  componentList = [
    {id : 1, component: HeadingComponent, inputs: {showNum: 9 }}, 
    {id : 2, component: ColorSelectorComponent, inputs: {showNum : 'colordata' }},
    {id : 3, component: LinksComponent, inputs: {showNum: 0 }}, 
    {id : 4, component: TypographyComponent,inputs: { showNum: 0 }}, 
    {id : 5, component: ImagePanelComponent,inputs: { showNum: 0 }}, 
    {id : 6, component: ExamplesComponent, inputs: { showNum: 0 }},
    {id : 7, component: BuilderPanelComponent,inputs: { showNum: 0 }}, 
    {id : 8, component: DndComponent,inputs: { showNum: 0 }}, 
    {id : 9, inputs: { showNum: 0 }},
    {id : 10,  inputs: { showNum: 0 }}]