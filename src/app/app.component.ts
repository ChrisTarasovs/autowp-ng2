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






   <toolbar  (commandExecuted)="onCommandExecuted()"></toolbar>
   <layout></layout>

<!--  
  asdasdas

    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Index
      </a>
      <a [routerLink]=" ['./home'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Home
      </a>  
    </nav>


    <main>
      <router-outlet></router-outlet>
    </main>
-->




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
