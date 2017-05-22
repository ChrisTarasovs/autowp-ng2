import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'settings',
  outputs: ['clickedBtn', 'clickedClrBtn'],
  /*template: makeTemplate()*/
  template:  ` 

<set-media></set-media>
`
  
})
export class widgetSettingsComponent {}