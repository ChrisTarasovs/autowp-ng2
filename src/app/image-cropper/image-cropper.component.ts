import { Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
     selector: 'cropping-img',
       template:
           // (mouseleave)="stateType='none'; crop();"
           //  (mouseup)="stateType='none'; crop();"
           //  (mouseenter)="stateType='none'; crop();"
           //  (mousemove)="moveImg($event);" 

        `

           <input (change)="imgChange($event)" type="file" >
          <button (click)="this.zoom('large')">+</button>
          <button (click)="this.zoom('small')">-</button>

           <div  #contentImg  class="content-img"  
 
            (dblclick)="center();">   
                    <div #imageContainer class="_img" 
                        [class.NoNe]="imgData.imgDataUrl==undefined || imgData.imgDataUrl==null"
                        [style.top.px]="this.imgData._top"    
                        [style.left.px]="this.imgData._left"    
                        [ngStyle]="styleCrop">
                            <img 
                                    (mousemove)="moveImg($event, 'move' );" 
                                    (mousedown)="startMove($event)"
                                    (mouseup)="stateType='none'"
                                    [src]="imgData.imgDataUrl" >

                                    <span class="r_nw" 
                                        (mousedown)="moveImg($event, 'resize' , 'nw')    "     
                                        (mouseup)="stateType='none' " >
                                    </span>
                                    <span class="r_ne" 
                                        (mousedown)="moveImg($event, 'resize' , 'ne')  "      
                                        (mouseup)="stateType='none' " 
                                        >
                                    </span>
                                    <span class="r_se" 
                                        (mousedown)="moveImg($event, 'resize' , 'se')   " 
                                        (mouseup)="stateType='none' ">
                                    </span>
                                    <span   class="r_sw" 
                                        (mousedown)="moveImg($event, 'resize' , 'sw')   " 
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
{{this.imgData.imgDataUrl}}

    
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
  console.log('enable zoom', state)
        var  W = this.imageContainer.nativeElement.offsetWidth;
        var  H = this.imageContainer.nativeElement.offsetHeight;
        var  oTop = this.imageContainer.nativeElement.offsetTop;
        var  oLeft = this.imageContainer.nativeElement.offsetLeft;
        console.log(W, H, oTop, oLeft)
       // this.stateType = 'resize';
       // this.stateR = state;
        this.resize(' ' ,  state, W, H, oTop, oLeft);
     
};

 // line 89
startMove(event) {
  console.log('started')
     const oTop =  event.target.parentElement.offsetTop
     const oLeft = event.target.parentElement.offsetLeft;
     this.centerX = event.clientX - offset(this.contentImg.nativeElement).left - oLeft;
     this.centerY = event.clientY - offset(this.contentImg.nativeElement).top - oTop;
     
 } 

// line 101
moveImg(event, stateType, state) {
    console.log('moveimg started')
  // console.log('mousemove on container and image move image enabled')
    event.stopPropagation();
    event.preventDefault();
    const W = event.target.parentElement.offsetWidth;
    const H = event.target.parentElement.offsetHeight;
    const oTop = event.target.parentElement.offsetTop;
    const oLeft = event.target.parentElement.offsetLeft;

    switch (stateType){
            case 'move':
                this.posititionImage(event)
                break;
            case 'resize':
                this.resize(event, state, W, H, oTop, oLeft);
                this.updateCanvas(event, ' ' , ' ');
                break;  
    }
}
posititionImage(event){
  console.log('position started')
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
resize_small(event,contentImg, imageContainerEl,W ,H){


    let _W = W / 2;
    let _H = H / 2;
   
    // this.stateType = 'none';
   
    this.imgData._left = (contentImg.offsetWidth / 2) - _W / 2;
    this.imgData._top = (contentImg.offsetHeight / 2) - _H / 2;

    this.crop();
    this.updateCanvas(event, _W , _H);
}
resize_large(event,contentImg, imageContainerEl, W ,H){
    let _W = W * 2;
    let _H = H * 2;
    this.imgData._left = (contentImg.offsetWidth / 2) - _W / 2;
    this.imgData._top = (contentImg.offsetHeight / 2) - _H / 2;
    //this.stateType = 'none';
    // console.log(' this.imgData', this.imgData)
    this.crop();
    this.updateCanvas(event, _W , _H);
}
resize(event,  state, W, H, oTop, oLeft) {


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
                alert('gone small')
                this.resize_small(event,contentImg, imageContainerEl,W ,H)
                break;  
            case 'large':
                this.resize_large(event,contentImg, imageContainerEl, W ,H)
                break;                                       
     }
     alert('fck no')

 }

updateCanvas(event, _W , _H){
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
        origSrc.src =  this.imgData.origImg;
        cropCanvas.width = _W;
        cropCanvas.height = _H;
        const  ctx = cropCanvas.getContext('2d');
        ctx.drawImage(origSrc, 0, 0, // Start at 10 pixels from the left and the top of the image (crop),
        _W, _H);
        this.imgData.imgDataUrl = cropCanvas.toDataURL(`image/${this._format}`);

        // console.log(cropCanvas.toDataURL("image/jpeg"));
        // console.log(this.imgData.imgDataUrl);
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

     fileReader.onload = ev => {   
             if (event.target.files[0].type === 'image/jpeg' ||
                 event.target.files[0].type === 'image/jpg' ||
                 event.target.files[0].type === 'image/png' ||
                 event.target.files[0].type === 'image/gif') {
                    this.imgData.imgDataUrl = ev.target.result;
                    this.imgData.origImg = ev.target.result;
                    this.imgData.origSrc.src = ev.target.result;
                    this.imgData.img = ev.target.result;
                      console.log( 'image data set')

             }
             else {
                this.imgData.imgDataUrl = blank;
                this.imgData.origImg = blank;
                this.imgData.origSrc.src = blank;
             }

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
    const left = offset(resize).left - offset(this.imageContainer.nativeElement).left;
    const top = offset(resize).top - offset(this.imageContainer.nativeElement).top;
    const width = resize.offsetWidth;
    const height = resize.offsetHeight;
    const origSrc = new Image();


    origSrc.src = this.imgData.imgDataUrl;
    cropCanvas = document.createElement('canvas');
    cropCanvas.width = width;
    cropCanvas.height = height;
    cropCanvas.getContext('2d').drawImage(origSrc, left, top, width, height, 0, 0, width, height);

    // Should be injected in the object
    this.imgData.imgCrop.dataURL = cropCanvas.toDataURL(`image/${this.imgData._format}`);
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