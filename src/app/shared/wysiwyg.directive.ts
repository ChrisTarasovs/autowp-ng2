import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges, HostListener, ViewChild, ViewChildren} from "@angular/core";
// import {NewlinePipe} from './pipes/newline.pipe'
// import {toolbarStateService} from './toolbar/services/toolbarStatus.service'
import {wysiwygService} from '../toolbar/services/wysiwyg.service'

@Directive({
    selector: '[wysiwygModel]',
    // ,
   // host: {
   //  	'mouseup' : 'enableWysiwyg()'
   //  //   // '(blur)': 'onEdit()',
   //  //    // '(focus)': 'onFocus()'
   //  //     //,
   //  //    // '(keyup)': 'onEdit()'
   //  }
})

export class wysiwygDirective  {

constructor(
	private _wysiwygService: wysiwygService,
   	private _elementRef: ElementRef

	){

}

//When wrapping a property in brackets [] you're trying to bind to it. So you have to declare it as an @Input.
@Input() wysiwygModel: string; 
@Output('wysiwygChange') wysiwygUpdate = new EventEmitter();
@Output('wysiwygStatus') wysiwygStatus = new EventEmitter();

// @ViewChildren('toolbarWysiwyg') toolbarWysiwyg;

@HostListener('mouseup') onMouseEnter() {
	let location = this.getClickedLocation();
	// console.log('yepp',this.toolbarWysiwyg) 
	// this.wysiwygModel.nativeElement.style
	
	// console.log('wysiwygModel', this.wysiwygModel)
	// console.log( 'location', location ,'elementRef', this.elementRef)

	 this.wysiwygUpdate.emit(location)
	 this.wysiwygStatus.emit('enable')
}

 @HostListener('focusout')
  onFocusOut(){
 	this.wysiwygStatus.emit('disable')
 }


getClickedLocation(){
	let sel = window.getSelection();  
	let range;

	if (sel.getRangeAt) {
	    range = sel.getRangeAt(0).cloneRange();
	} else {
	    // Older WebKit doesn't have getRangeAt
	    range = document.createRange();
	    range.setStart(sel.anchorNode, sel.anchorOffset);
	    range.setEnd(sel.focusNode, sel.focusOffset);

	    // Handle the case when the selection was selected backwards (from the end to the start in the
	    // document)
	    if (range.collapsed !== sel.isCollapsed) {
	        range.setStart(sel.focusNode, sel.focusOffset);
	        range.setEnd(sel.anchorNode, sel.anchorOffset);
	    }
	}
	range.collapse(false);
  	// Create the marker element containing a single invisible character using DOM methods and insert it
            const markerEl = document.createElement("span");
            markerEl.id = 'markerId';
            markerEl.appendChild( document.createTextNode( '\ufeff' );
            range.insertNode(markerEl);
            console.log('markerEl', markerEl)



// Works well but the Toolbar is hidden in the object .
//  	if(  this._elementRef.nativeElement.offsetLeft > markerEl.offsetLeft){
//            	let left =  this._elementRef.nativeElement.offsetLeft - markerEl.offsetLeft;
// }
// let left = markerEl.offsetLeft

//            if(  this._elementRef.nativeElement.offsetTop > markerEl.offsetTop){
//            	let top =  this._elementRef.nativeElement.offsetTop - markerEl.offsetTop;
// }
// let top = markerEl.offsetTop

console.log(this._elementRef)
console.log('markerEl.offsetParent',markerEl.offsetParent)



            // Find markerEl position 
            // const obj = markerEl;
            let left = 0;
            let top = 0;
            do {
                left += markerEl.offsetLeft;
                top += markerEl.offsetTop;
            } while (markerEl = markerEl.offsetParent);

// Shity way of removing 
// console.log('this._elementRef', this._elementRef)
// this._elementRef.nativeElement.removeChild(markerEl);
document.getElementById("markerId").remove();


 	// markerEl.parentNode.removeChild(markerEl);

            return { left ,  top}
}
   
}


//http://jsfiddle.net/UuDpL/2/