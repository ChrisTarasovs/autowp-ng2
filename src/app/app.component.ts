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
  Renderer
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { DndComponent } from './dnd/dnd.component';
import { TextComponent } from './dnd/text/text.component';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AppComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};


/*
export interface ToolbarButton {
  title: string;
  command: string;
  tag: string;
  options?: any;
  active?: boolean;
}
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EDITOR_VALUE_ACCESSOR]
})


export class AppComponent {

        // Wysiwyg definitions
        editMode: boolean = false;
        subscriptions: Subscription[] = []


        // Drag and Drop definitions
        dragOperation: Boolean = false;
        containers: Array<any> = [];
        content: string;

        @ViewChild('editor') container: ElementRef;


        constructor(){
          this.containers.push(new Container(1, 
          [new Widget('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam orci, dignissim sit amet facilisis sed, pulvinar sed ex. Nulla posuere quis orci sed ultrices. Aliquam lobortis placerat magna in tempor. Suspendisse potenti. Cras dictum bibendum lectus vitae convallis. Nullam pretium nunc id orci viverra auctor')]));
          this.containers.push(new Container(2, [new Widget('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam orci, dignissim sit amet facilisis sed, pulvinar sed ex. Nulla posuere quis orci sed ultrices. Aliquam lobortis placerat magna in tempor. Suspendisse potenti. Cras dictum bibendum lectus vitae convallis. Nullam pretium nunc id orci viverra auctor')]));
          
        }
          

         // Wysiwyg funfctionality
        ngOnInit() {
          /*
            document.execCommand('defaultParagraphSeparator', false, 'p');
            ['mouseup', 'keydown', 'keyup'].forEach(event => {
              this.subscriptions.push(Observable
                .fromEvent(this.container.nativeElement, event)
                .debounceTime(60)
                .subscribe(e => {
                  this.refreshActiveButtons();
                }));
            });
            */
          }
         onContentChanged() {
             this.content = this.container.nativeElement.innerHTML;
             this.propagateChange(this.content);
          }
          refreshActiveButtons() {
            const tags = this.getTagsRecursive(document.getSelection().focusNode);
           // this.toolbarEditor.forEach(x => x.active = tags.indexOf(x.tag.toUpperCase()) > - 1); // DONT know how to acces the array
          }
         getTagsRecursive(element, tags?: any[]) {
                tags = tags || (element && element.tagName ? [element.tagName] : []);

                if (element && element.parentNode) {
                  element = element.parentNode;
                } else {
                  return tags;
                }

                const tag = element.tagName;
                if (tag === 'DIV') {
                  return tags;
                }

                tags.push(tag);

                return this.getTagsRecursive(element, tags);
          }

         onCommandExecuted() {
            this.onContentChanged();
            this.refreshActiveButtons()
          }

          propagateChange: any = (_: any) => { };


          registerOnChange(fn: any) {
            this.propagateChange = fn;
          }

        registerOnTouched() { }

        ngOnDestroy() {
          this.subscriptions.forEach(subscription => subscription.unsubscribe());
        }

         // Drag and Drop functionality
         drop(item){
              var target = item.mouseEvent.target,
                  index;
          
                if(target.classList.contains('row')) {
                    index = target.getAttribute('data-index');
                }
          
                if(target.classList.contains('item') && target.parentNode.classList.contains('row')) {
                    index = target.parentNode.getAttribute('data-index');
                }
                
                if(index) {
                    console.log(this.containers);
                    console.log(this.containers[index]);
                    this.containers[index].widgets.push( item.dragData);
                } else {
                    this.containers.push([ item.dragData]);
                }
         }
         onDropSuccess(widget: any, event: any) {
            this.dragOperation = false;
            console.log('onDropSuccess', widget, event);
         }
         
         onDragStart(widget: any, event: any) {
            console.log('onDragStart', widget, event);
         }
         
         onDragEnter(widget: any, event: any) {
            console.log('onDragEnter', widget, event);
         }
         
         onDragSuccess(widget: any, event: any) {
            console.log('onDragSuccess', widget, event);
         }
         
         onDragOver(widget: any, event: any) {
            console.log('onDragOver', widget, event);
         }
         
         onDragEnd(widget: any, event: any) {
            console.log('onDragOver', widget, event);
         }
         onDragLeave(widget: any, event: any) {
            console.log('onDragLeave', widget, event);
         }

         onMouseDown(){
            this.dragOperation = true;
            console.log('mouse down');
         }
         
         onMouseUp(event: any){
            console.log(event);
            this.dragOperation = false;
         }
    
}
class Container {
    constructor(public id: Number, public widgets: Array<Widget>) {}
}
class Widget {
    constructor(public name: string) {}
}