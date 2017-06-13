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
                        [class.NoNe]="imgData.imgDataUrl==undefined || imgData.imgDataUrl==null"
                        [style.top.px]="_top"    
                        [style.left.px]="_left"    
                        [ngStyle]="styleCrop">
                            <img 
                                    (mousedown)="stateType='move'; startMove($event)"
                                    (mouseup)="stateType='none'"
                                    [src]="imgData.imgDataUrl" >

                                    <span class="r_nw" 
                                        (mousedown)="stateType='resize'; stateR='nw'  ; moveImg($event, 'resize' , 'nw')    "     
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
                          [style.width.px]="imgData.imgCrop.sizeW"    
                          [style.height.px]="imgData.imgCrop.sizeH">
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


    
       `
//        <pre>
// {{imgData | json}}
// </pre>     

})
export class ResizingCroppingImagesComponent implements OnChanges {
    
    @Input() public imgData;


    // set image cropped size

     public sizeW;
     public sizeH;

    public elementRef; 
    //public _format = 'jpeg';
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
    public _top;
    public _left;
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
  return  this.imgData._format;
}

set format(value) {
   this.imgData._format = value;
}


// line 69
 ngOnChanges(changes) {
      //console.log('change started');
       this.sizeW = this.imgData.imgCrop.sizeW;
       this.sizeH = this.imgData.imgCrop.sizeW;
       this._top = this.imgData._top;
        this._left =  this.imgData._left;

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
        this.updateCanvas(event);
};

 // line 89
startMove(event) {

    // console.log('start move', event, this.contentImg, this.elementRef)
     const oTop =  event.target.parentElement.offsetTop
     const oLeft = event.target.parentElement.offsetLeft;
     //const oTop = this.elementRef.nativeElement.querySelector('._img').offsetTop;
    // const oLeft = this.elementRef.nativeElement.querySelector('._img').offsetLeft;
    // this.centerX = event.clientX - offset(this.elementRef.nativeElement.querySelector('.content-img')).left - oLeft;
    //this.centerY = event.clientY - offset(this.elementRef.nativeElement.querySelector('.content-img')).top - oTop;
     this.centerX = event.clientX - offset(this.contentImg.nativeElement).left - oLeft;
     this.centerY = event.clientY - offset(this.contentImg.nativeElement).top - oTop;
     // console.log(
     //            'offset(this.contentImg.nativeElement).left', offset(this.contentImg.nativeElement).left ,
     //             this.centerX,
     //             this.centerY

     //     )
       console.log('moveIstartMovemg')
 } 

// line 101
moveImg(event, stateType, state) {
    event.stopPropagation();
    event.preventDefault();
    switch (stateType){
            case 'move':
                this.posititionImage(event)
                break;
            case 'resize':
                this.resize(event, state);
                this.updateCanvas(event);
                break;  
    }
}
posititionImage(event){
   this.imgData._left = event.clientX - offset(this.contentImg.nativeElement).left - (this.centerX);
   this.imgData._top = - offset(this.contentImg.nativeElement).top + event.clientY - (this.centerY);
}
// line 127
resize_nw(event, contentImg, imageContainerEl, oTop, oLeft){
    this.imgData._left = -offset(contentImg).left + (event.clientX || event.pageY);
    this.imgData._top = -offset(contentImg).top + (event.clientY || event.pageX);
    let _W = Math.round(imageContainerEl.offsetWidth - (this.imgData._left - oLeft));
    let _H = Math.round(imageContainerEl.offsetHeight - (this.imgData._top - oTop));

    if (event.shiftKey) {
        this.imgData._top = (-offset(contentImg).top + (event.clientY || event.pageX)) - (( _W / this.imgData.imgWidth * this.imgData.imgHeight) - _H);
    }
}
resize_ne(event,contentImg, imageContainerEl, oTop, oLeft){
   this.imgData._left = oLeft;
   this.imgData._top = -offset(contentImg).top + (event.clientY || event.pageY);
   let _W = Math.round((-offset(contentImg).left + (event.clientX || event.pageX)) - oLeft);
   let _H = Math.round(this.imageContainer.nativeElement.offsetHeight - (this._top - oTop));
   if (event.shiftKey) {
      this._top = (-offset(contentImg).top + (event.clientY || event.pageY)) - ((_W / this.imgData.imgWidth * this.imgData.imgHeight) - _H);
    }
}
resize_se(event,contentImg, imageContainerEl, oTop, oLeft){
    this.imgData._left = oLeft;
    this.imgData._top = oTop;
    let _W = (-offset(contentImg).left + (event.clientX || event.pageX)) - oLeft;
    let _H = (-offset(contentImg).top + (event.clientY || event.pageY)) - oTop;
}
resize_sw(event,contentImg, imageContainerEl, oTop, oLeft){
    this.imgData._left = -offset(contentImg).left + (event.clientX || event.pageX);
    this.imgData._top = oTop;
    let  _W = Math.round(this.imageContainer.nativeElement.offsetWidth -  (this._left - oLeft));
    let  _H = Math.round((-offset(contentImg).top + (event.clientY || event.pageY)) - oTop);
}
resize_small(event,contentImg, imageContainerEl){
    let _W = W / 2;
    let _H = H / 2;
    this.stateType = 'none';
    this.imgData._left = (contentImg.offsetWidth / 2) - _W / 2;
    this.imgData._top = (contentImg.offsetHeight / 2) - _H / 2;
    this.crop();
}
resize_large(event,contentImg, imageContainerEl){
    let _W = W * 2;
    let _H = H * 2;
    this._left = (contentImg.offsetWidth / 2) - _W / 2;
    this._top = (contentImg.offsetHeight / 2) - _H / 2;
    this.stateType = 'none';
    this.crop();
}
resize(event, state) {
      const W = event.target.parentElement.offsetWidth;
      const H = event.target.parentElement.offsetHeight;
      const oTop = event.target.parentElement.offsetTop;
      const oLeft = event.target.parentElement.offsetLeft;

      // let _W;
      // let _H;

      const  contentImg = this.contentImg.nativeElement;
      const  imageContainerEl = this.imageContainer.nativeElement;

       switch (state){
            case 'nw':
                this.resize_nw(event, contentImg, imageContainerEl, oTop, oLeft)
                break;
            case 'ne':
                this.resize_ne(event,contentImg, imageContainerEl, oTop, oLeft)
                break; 
            case 'se':
                this.resize_se(event,contentImg, imageContainerEl, oTop, oLeft)
                break;  
            case 'sw':
                this.resize_sw(event,contentImg, imageContainerEl, oTop, oLeft)
                break;  
            case 'small':
                this.resize_small(event,contentImg, imageContainerEl)
                break;  
            case 'large':
                this.resize_large(event,contentImg, imageContainerEl)
                break;                                       
     }


 }

updateCanvas(event){
        if (event.shiftKey) {
            let _H = _W / this.imgData.imgWidth * this.imgData.imgHeight;
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
        this.imgData.imgDataUrl = cropCanvas.toDataURL(`image/${this.imgData._format}`);
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
     // console.log('what was event', event, )
  
     // image file
     this.imgData._img = event.target.files[0];
     // image path
     this.imgData.img = event.target.value.replace(/.*(\/|\\)/, '');
     
     const fileReader = new FileReader();
     let img;
     const  origSrc = new Image();
     const  minWidth = 80; // Change as required!!
     const  minHeight = 80;
     const  maxWidth = 2400; // Change as required
     const  maxHeight = 2200;
     const  cropCanvas = document.createElement('canvas');
     const  blank = "data:image/png;base64,iVBORw0KGg" + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU' + "AAarVyFEAAAAASUVORK5CYII=";
      
     //console.log('event of imgChange', event, 'fileReader', fileReader, 'cropCanvas' ,cropCanvas,  'blank', blank )
 


     fileReader.onload = ev => {   

        // alert('worked')
            

             if (event.target.files[0].type === 'image/jpeg' ||
                 event.target.files[0].type === 'image/jpg' ||
                 event.target.files[0].type === 'image/png' ||
                 event.target.files[0].type === 'image/gif') {
                    this.imgData.imgDataUrl = ev.target.result;
                    this.imgData.origImg = ev.target.result;
                    this.imgData.origSrc.src = ev.target.result;
                    this.imgData.img = ev.target.result;
                     // this.imgDataUrl = ev.target.result;
                   //  this.origImg = ev.target.result;
                     //origSrc.src = ev.target.result;
                     // img = ev.target.result;

                      console.log( 'image data set')

             }
             else {
                this.imgData.imgDataUrl = blank;
                this.imgData.origImg = blank;
                this.imgData.origSrc.src = blank;
                 // this.imgDataUrl = blank;
                 // this.origImg = blank;
                 // origSrc.src = blank;
             }
console.log( 'origSrc', origSrc)
             // Set image W & H
             this.imgData.imgWidth = origSrc.width;
             this.imgData.imgHeight = origSrc.height;

            //Set to in  the center
             this.imgData._left = (this.contentImg.nativeElement.offsetWidth / 2) -  this.imgData.imgWidth / 2;
             this.imgData._top = (this.contentImg.nativeElement.offsetHeight / 2) - this.imgData.imgHeight / 2;      
            // ctx.drawImage(origSrc, 0, 0);
     };
     fileReader.readAsDataURL(event.target.files[0]);
     // console.log(event.target.files[0]);
}

//284
     center() {
          const _this = this;
          this.imgData.imgWidth = this.imageContainer.nativeElement.offsetWidth;
          this.imgData.imgHeight = this.imageContainer.nativeElement.offsetHeight;
          this.imgData._left = (this.contentImg.nativeElement.offsetWidth / 2) - this.imgData.imgWidth / 2;
          this.imgData._top = (this.contentImg.nativeElement.offsetHeight / 2) - this.imgData.imgHeight / 2;
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

    let  cropCanvas;

     const  resize = this.resizebox.nativeElement;
  //  const  resize = this.elementRef.nativeElement.querySelector('.resize');

    const left = offset(resize).left - offset(this.imageContainer.nativeElement).left;
    const top = offset(resize).top - offset(this.imageContainer.nativeElement).top;
    const width = resize.offsetWidth;
    const height = resize.offsetHeight;
    const origSrc = new Image();

    origSrc.src = this.imgData.imgDataUrl;
    // console.log('origSrc.src ', origSrc.src )

    cropCanvas = document.createElement('canvas');
    cropCanvas.width = width;
    cropCanvas.height = height;
    cropCanvas.getContext('2d').drawImage(origSrc, left, top, width, height, 0, 0, width, height);
    // Should be injected in the object
    this.imgData.imgCrop.dataURL = cropCanvas.toDataURL(`image/${this.imgData._format}`);

   console.log('cropCanvas',  this.imgData.imgCrop.dataURL)
  }

// line 326
  static ctorParameters() { return [
      { type: ElementRef, },
  ]; }


// Line 333 - 350
function isWindow(obj) {
    return obj !== null && obj === obj.window;
}
function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}
function offset(elem) {
    var docElem,  win,  box = { top: 0, left: 0 }, 
  

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