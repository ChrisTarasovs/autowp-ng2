import {
    Directive, ElementRef, Input, Output, EventEmitter, OnChanges, HostListener} from "@angular/core";

import {NewlinePipe} from './pipes/newline.pipe'
import {toolbarStateService} from './toolbar/services/toolbarStatus.service'


@Directive({
    selector: '[contenteditableModel]'
    ,
    host: {
      '(blur)': 'onEdit()',
       // '(focus)': 'onFocus()'
        //,
       // '(keyup)': 'onEdit()'
    }
})

export class ContentEditableDirective implements OnChanges {
    @Input('contenteditableModel') model: any;
    @Output('contenteditableModelChange') update = new EventEmitter();

//@Input() contenteditableModel: any;

    constructor(
        private elementRef: ElementRef,
        private _pipe:NewlinePipe, 
        private _toolbarStateService: toolbarStateService,
       
    ) {}

    // @HostListener('focus', ['$event'])
    // onFocus(e) {
    //   console.log('focus on')
    //     this.onEdit();
    //       // run when user clicked in the editable field / is focus.
    //  }

    // @HostListener('blur', ['$event'])
    // onBlur(e) {
    //    console.log('onBlur on')
    //   this.onEdit();
    //   // run when user clicked outside the field.
    // }

    ngOnChanges(changes) {
        // console.log('ContentEditableDirective.ngOnChanges', changes);
       // console.log(changes);
       if (changes.model.isFirstChange())  this.refreshView();
    }
   
    onEdit() {
        

        // this._toolbarStateService.enable('viewWysiwyg');
        // console.log('console.log',  this.elementRef);

        var value=  this._pipe.transform( this.elementRef.nativeElement.innerHTML);
        //var value = this.elementRef.nativeElement.innerHTML
         // console.log('value',value);
        this.update.emit(value)
    }

    private refreshView() {
      this.elementRef.nativeElement.innerHTML = this.model
    }



}