import { Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
     selector: 'cropping-img',
       template: `

           <input (change)="imgChange($event)" type="file" >


           <div  #contentImg  class="content-img"  
            (mouseleave)="stateType='none'; crop();"
            (mouseup)="stateType='none'; crop();"
            (mouseenter)="stateType='none'; crop();"
            (mousemove)="moveImg($event);" 
            (dblclick)="center();">   
                    <div #imageContainer class="_img" 
                        [class.NoNe]="imgDataUrl==undefined || imgDataUrl==null"
                        [style.top.px]="_top"    
                        [style.left.px]="_left"    
                        [ngStyle]="styleCrop">
                            <img 
                                    (mousedown)="stateType='move'; startMove($event)"
                                    (mouseup)="stateType='none'"
                                    [src]="imgDataUrl" >

                                    <span class="r_nw" 
                                        (mousedown)="stateType='resize'; stateR='nw'"     
                                        (mouseup)="stateType='none' " >
                                    </span>
                                    <span class="r_ne" 
                                        (mousedown)="stateType='resize'; stateR='ne' "      
                                        (mouseup)="stateType='none' " 
                                        >
                                    </span>
                                    <span class="r_se" 
                                        (mousedown)="stateType='resize'; stateR='se' " 
                                        (mouseup)="stateType='none' ">
                                    </span>
                                    <span   class="r_sw" 
                                        (mousedown)="stateType='resize'; stateR='sw' " 
                                        (mouseup)="stateType='none' ">
                                    </span>
                      </div>
                      <div  #resizebox class="resize"   
                          [style.width.px]="sizeW"    
                          [style.height.px]="sizeH">
                          <!--
                          <span class="r_w"></span>
                          <span class="r_n"></span>
                          <span class="r_e"></span>
                          <span class="r_s"></span>
                          <span class="r_nw"></span>
                          <span class="r_ne"></span>
                          <span class="r_se"></span>
                          <span class="r_sw"></span>-->
                      </div>
          </div>


          <!--<code>{{ _log.logs | json }}</code>-->
       `
                      

})
export class ResizingCroppingImagesComponent implements OnChanges {
    
    @Input() public imgData;
    // set image cropped size

     public sizeW;
     public sizeH;

  // public sizeW = 220;
  //   public sizeH = 100;

    // line 11
    public elementRef; 
    public _format = 'jpeg';
    public img = null;



    public sizeWmax = 720;
    public sizeHmax = 720;
    public stateMouse = false;
    public stateType = 'none';
    public stateR = 'none';
    public centerX = 0;
    public centerY = 0;
    public percent = 100;
    public imgUrl = null;
    public _top = 0;
    public _left = 0;
    public _img = {};
    public _src = null;

    public imgDataUrl;
    public origImg;
    public imgWidth;
    public imgHeight;
    public imgCrop;

    @ViewChild('contentImg') contentImg; // class="content-img"  
    @ViewChild('resizebox') resizebox;
    @ViewChild('imageContainer') imageContainer; // _img

    constructor(){
           //  console.log( '--------------------' ,this.imgData.sizeW)
             // this.sizeW = this.imgData.sizeW;
             // this.sizeH = this.imgData.sizeH;
    }

// line 33
  get styleCrop() {
    return {
      // color: `${this.palette.accent.color}`,
      // background: `${this.palette.accent.color}`,
      color: "#00bcd4",
      background: "#00bcd4",
    };
  }

// line 48
get format() {
  return this._format;
}

set format(value) {
  this._format = value;
}


// line 69
 ngOnChanges(changes) {
      //console.log('change started');
       this.sizeW = this.imgData.sizeW;
       this.sizeH = this.imgData.sizeH;

 }


// line 76
zoom(state) {
        var  W = this.imageContainer.nativeElement.offsetWidth;
        var  H = this.imageContainer.nativeElement.offsetHeight;
        var  oTop = this.imageContainer.nativeElement.offsetTop;
        var  oLeft = this.imageContainer.nativeElement.offsetLeft;
        this.stateType = 'resize';
        this.stateR = state;
        this.resize(0, W, H, oTop, oLeft);
};

 // line 89
startMove(event) {
    console.log('start move', event, this.contentImg, this.elementRef)
     const oTop =  event.target.parentElement.offsetTop
     const oLeft = event.target.parentElement.offsetLeft;
     //const oTop = this.elementRef.nativeElement.querySelector('._img').offsetTop;
    // const oLeft = this.elementRef.nativeElement.querySelector('._img').offsetLeft;
    // this.centerX = event.clientX - offset(this.elementRef.nativeElement.querySelector('.content-img')).left - oLeft;
    //this.centerY = event.clientY - offset(this.elementRef.nativeElement.querySelector('.content-img')).top - oTop;
     this.centerX = event.clientX - offset(this.contentImg.nativeElement).left - oLeft;
     this.centerY = event.clientY - offset(this.contentImg.nativeElement).top - oTop;
     console.log(
                'offset(this.contentImg.nativeElement).left', offset(this.contentImg.nativeElement).left ,
                 this.centerX,
                 this.centerY

         )
 } 

// line 101
  moveImg(event) {
         // console.log('moveImg' , event)
          event.stopPropagation();
          event.preventDefault();


          const W = event.target.parentElement.offsetWidth;
          const H = event.target.parentElement.offsetHeight;
          const oTop = event.target.parentElement.offsetTop;
          const oLeft = event.target.parentElement.offsetLeft;

          // const W = this.elementRef.nativeElement.querySelector('._img').offsetWidth;
          // const H = this.elementRef.nativeElement.querySelector('._img').offsetHeight;
          // const oTop = this.elementRef.nativeElement.querySelector('._img').offsetTop;
          // const oLeft = this.elementRef.nativeElement.querySelector('._img').offsetLeft;

          if (this.stateType === 'move') {
              this._left = event.clientX -
                  offset(this.contentImg.nativeElement).left - (this.centerX);
              this._top = -offset(this.contentImg.nativeElement).top +
                  event.clientY - (this.centerY);
          }
          else if (this.stateType === 'resize') {
              this.resize(event, W, H, oTop, oLeft);
          }
      }

// line 127
resize(event, W, H, oTop, oLeft) {
        let _W;
        let _H;
        //const contentImg = this.elementRef.nativeElement.querySelector('.content-img');
        const  contentImg = this.contentImg.nativeElement;
        const  imageContainerEl = this.imageContainer.nativeElement;

        if (this.stateR === 'nw') {
            this._left = -offset(contentImg).left + (event.clientX || event.pageY);
            this._top = -offset(contentImg).top +
                (event.clientY || event.pageX);
                

            _W = Math.round(imageContainerEl.offsetWidth - (this._left - oLeft));
            _H = Math.round(imageContainerEl.offsetHeight - (this._top - oTop));

            if (event.shiftKey) {
                this._top = (-offset(contentImg).top + (event.clientY || event.pageX)) - (( _W / this.imgWidth * this.imgHeight) - _H);
            }

        }
        else if (this.stateR === 'ne') {

            this._left = oLeft;
            this._top = -offset(contentImg).top +
                (event.clientY || event.pageY);
            _W = Math.round((-offset(contentImg).left +
                (event.clientX || event.pageX)) - oLeft);
            _H = Math.round(this.elementRef.nativeElement.querySelector('._img').offsetHeight -
                (this._top - oTop));
            if (event.shiftKey) {
                this._top = (-offset(contentImg).top +
                    (event.clientY || event.pageY)) - ((_W / this.imgWidth * this.imgHeight) - _H);
            }

        }
        else if (this.stateR === 'se') {
            this._left = oLeft;
            this._top = oTop;
            _W = (-offset(contentImg).left +
                (event.clientX || event.pageX)) - oLeft;
            _H = (-offset(contentImg).top +
                (event.clientY || event.pageY)) - oTop;
        }
        else if (this.stateR === 'sw') {

            this._left = -offset(contentImg).left + (event.clientX || event.pageX);
            this._top = oTop;

            _W = Math.round(this.elementRef.nativeElement.querySelector('._img').offsetWidth -  (this._left - oLeft));
            _H = Math.round((-offset(contentImg).top + (event.clientY || event.pageY)) - oTop);
       
        }

        else if (this.stateR === '-') {
            _W = W / 2;
            _H = H / 2;
            this.stateType = 'none';
            this._left = (contentImg.offsetWidth / 2) - _W / 2;
            this._top = (contentImg.offsetHeight / 2) - _H / 2;
            this.crop();
        }
        else if (this.stateR === '+') {
            _W = W * 2;
            _H = H * 2;
            this._left = (contentImg.offsetWidth / 2) - _W / 2;
            this._top = (contentImg.offsetHeight / 2) - _H / 2;
            this.stateType = 'none';
            this.crop();
        }
        if (event.shiftKey) {
            _H = _W / this.imgWidth * this.imgHeight;
        }
        const fileReader = new FileReader();
        let img;
        const origSrc = new Image();
        const minWidth = 80; // Change as required
        const minHeight = 80;
        const maxWidth = 2400; // Change as required
        const maxHeight = 2200;
        const cropCanvas = document.createElement('canvas');
        origSrc.src = this.origImg;
        cropCanvas.width = _W;
        cropCanvas.height = _H;
        const /** @type {?} */ ctx = cropCanvas.getContext('2d');
        ctx.drawImage(origSrc, 0, 0, // Start at 10 pixels from the left and the top of the image (crop),
        _W, _H);
        this.imgDataUrl = cropCanvas.toDataURL(`image/${this._format}`);
        // console.log(cropCanvas.toDataURL("image/jpeg"));
        // console.log(origSrc.width,origSrc.height);
 }
// 212
writeValue(value) {
           // nothing
}

//213
registerOnTouched(fn) {
   this._onTouchedCallback = fn;
}
//226
registerOnChange(fn) {
    this._onChangeCallback = fn;
}

//234
 imgChange(event) {
     console.log('what was event', event, )
  
     // image file
     this._img = event.target.files[0];
     // image path
     this.img = event.target.value.replace(/.*(\/|\\)/, '');
     const fileReader = new FileReader();
     let img;

     const  origSrc = new Image();
     const  minWidth = 80; // Change as required!!
     const  minHeight = 80;
     const  maxWidth = 2400; // Change as required
     const  maxHeight = 2200;
     const  cropCanvas = document.createElement('canvas');
     const  blank = "data:image/png;base64,iVBORw0KGg" + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU' + "AAarVyFEAAAAASUVORK5CYII=";
      
     console.log('event of imgChange', event, 'fileReader', fileReader, 'cropCanvas' ,cropCanvas,  'blank', blank )
 


     fileReader.onload = ev => {   

         alert('worked')
            

             if (event.target.files[0].type === 'image/jpeg' ||
                 event.target.files[0].type === 'image/jpg' ||
                 event.target.files[0].type === 'image/png' ||
                 event.target.files[0].type === 'image/gif') {

                     this.imgDataUrl = ev.target.result;
                     this.origImg = ev.target.result;
                     origSrc.src = ev.target.result;
                     img = ev.target.result;

                      console.log( 'image data set')

             }
             else {
                 this.imgDataUrl = blank;
                 this.origImg = blank;
                 origSrc.src = blank;
             }


             // Set image W & H
            this.imgWidth = origSrc.width;
            this.imgHeight = origSrc.height;

            //Set to in  the center
            this._left = (this.contentImg.nativeElement.offsetWidth / 2) -  this.imgWidth / 2;
            this._top = (this.contentImg.nativeElement.offsetHeight / 2) - this.imgHeight / 2;      
            // ctx.drawImage(origSrc, 0, 0);
     };
     fileReader.readAsDataURL(event.target.files[0]);
     console.log(event.target.files[0]);
}

//284
     center() {
          const _this = this;
          this.imgWidth = this.imageContainer.nativeElement.offsetWidth;
          this.imgHeight = this.imageContainer.nativeElement.offsetHeight;
          this._left = (this.contentImg.nativeElement.offsetWidth / 2) - this.imgWidth / 2;
          this._top = (this.contentImg.nativeElement.offsetHeight / 2) - this.imgHeight / 2;
          this.crop();
          setTimeout(() => {
              _this.crop();
          }, 10);
          setTimeout(() => {
              _this.crop();
          }, 100);
      }

 // Crop on mouse down move
// 303
crop() {
   // alert('cropped started')
    console.log('contentImg and event', this.contentImg, event , this.resizebox)
    console.log('imageContainer nativeElement left', offset(this.imageContainer.nativeElement).left)
    let  cropCanvas;

     const  resize = this.resizebox.nativeElement;
  //  const  resize = this.elementRef.nativeElement.querySelector('.resize');

    const left = offset(resize).left - offset(this.imageContainer.nativeElement).left;
    const top = offset(resize).top - offset(this.imageContainer.nativeElement).top;
    const width = resize.offsetWidth;
    const height = resize.offsetHeight;
    const origSrc = new Image();

    origSrc.src = this.imgDataUrl;

    cropCanvas = document.createElement('canvas');
    cropCanvas.width = width;
    cropCanvas.height = height;
    cropCanvas.getContext('2d').drawImage(origSrc, left, top, width, height, 0, 0, width, height);
    // Should be injected in the object
    this.imgCrop = cropCanvas.toDataURL(`image/${this._format}`);

    console.log('cropCanvas', cropCanvas , 'this.imgCrop', this.imgCrop)
  }

// line 326
  static ctorParameters() { return [
      { type: ElementRef, },
  ]; }


// line 329

// ResizingCroppingImagesComponent.propDecorators = {
//     'format': [{ type: Input, args: ['format',] },],
// };

// Line 333 - 350
function isWindow(obj) {
    return obj !== null && obj === obj.window;
}
function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}
function offset(elem) {
    var 

    /** @type {?} */ 
    docElem, 
    /** @type {?} */
    win, 
    /** @type {?} */ 
    box = { top: 0, left: 0 }, 
    /** @type {?} */ 

    doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;
    if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}



}