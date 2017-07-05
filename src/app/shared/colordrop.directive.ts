import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges, HostListener, ViewChild, ViewChildren} from "@angular/core";

@Directive({
    selector: '[colorDropModel]',
    // ,
   host: {
  	'(onDropSuccess)' : 'bingo()'
   //  //   // '(blur)': 'onEdit()',
   //  //    // '(focus)': 'onFocus()'
   //  //     //,
   //  //    // '(keyup)': 'onEdit()'
    }
})

export class colorDropDirective  {
@Input() colorDropModel: string; 
// @Output('wysiwygChange') wysiwygUpdate = new EventEmitter();
// @Output('wysiwygStatus') wysiwygStatus = new EventEmitter();

  constructor(
     	private _elementRef: ElementRef
  	){

  }

  addColor(colorDropModel) {
    console.log('colorDropModel', colorDropModel)
    if(colorDropModel.dragData.type)
   
      alert('done')
  
  }


}
