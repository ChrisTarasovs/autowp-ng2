import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {VideoSettingsComponent} from './set-video/video.component'

@Component({
  selector: 'settings',
  outputs: ['clickedBtn', 'clickedClrBtn'],
  /*template: makeTemplate()*/
  template:  ` 

<set-media></set-media>
<set-video></set-video>
`
  
})
export class widgetSettingsComponent {}