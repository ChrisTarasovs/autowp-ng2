/*
 * Angular 2 decorators and services
 */
import {
   Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  ViewChild,
  forwardRef,
  SimpleChanges,
  Output,
  EventEmitter,
  Renderer,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `

<style>
  toolbar-wysiwyg{
    display: inline-block; width: 430px !important; z-index: 10;position: absolute ;
  }
</style>
 <toolbar-wysiwyg></toolbar-wysiwyg>
 <toolbar  (commandExecuted)="onCommandExecuted()" style="position: fixed; right: 0px; top: 0px;"></toolbar>
 <layout ></layout>
  `
})
export class AppComponent implements OnInit {
  constructor(
     public appState: AppState
  ) {}

  public ngOnInit() {
   // console.log('Initial App State', this.appState.state);
  }

}
