import { Component } from '@angular/core';
import { DndComponent } from './dnd/dnd.component';
import { TextComponent } from './dnd/text/text.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // title = 'app works!';
  dragOperation: Boolean = false;
  containers: Array<any> = [];
  
  constructor(){
    this.containers.push(new Container(1, [new Widget('1')]));
    this.containers.push(new Container(2, [new Widget('2')]));
    
  }
    
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