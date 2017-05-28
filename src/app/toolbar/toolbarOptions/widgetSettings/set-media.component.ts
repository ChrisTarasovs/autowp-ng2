import { Component, OnInit , Input,  Output} from '@angular/core';

@Component({
  selector: 'set-media',
  template: `

    Singleimage: <pre>{{widget[0].settings.singleimage | json}}</pre>
    Gallery : <pre>{{widget[0].settings.gallery | json}}</pre>
    Carousel : <pre>{{widget[0].settings.carousel | json}}</pre>

    <Br /> Images list
    <pre>{{widget[0].settings.slides | json}}</pre>


 <ul class="list-group border">

     <li  *ngFor="let image of widget[0].settings.slides " >
         <list-items [image]="image"></list-items>
     </li>


 </ul>


    
   
    <file-uploader [activeColor]="'orangered'" [baseColor]="'lightgray'"></file-uploader>
  
  `
})
export class setMediaComponent implements OnInit {
          

	@Input('widgetData') public widget;
	  constructor() { }

	  ngOnInit() {
	  }
}



@Component({
    selector: 'file-uploader',
    template: `

    <label class="uploader" ondragover="return false;"
    [class.loaded]="loaded" 
    [style.outlineColor]="dragging ? activeColor : baseColor"
    (dragenter)="handleDragEnter()"
    (dragleave)="handleDragLeave()"
    (drop)="handleDrop($event)">
    
    <i class="icon icon-upload" 
        [style.color]="dragging 
            ? ((imageSrc.length > 0) ? overlayColor : activeColor)
            : ((imageSrc.length > 0) ? overlayColor : baseColor)"></i>
    
    <img 
        [src]="imageSrc" 
        (load)="handleImageLoad()" 
        [class.loaded]="imageLoaded"/>
    
    <input type="file" name="file" accept="image/*"
        (change)="handleInputChange($event)">
    </label>

    `//,
    //styleUrls: ['app/file-uploader.component.css'],
   // inputs:['activeColor','baseColor','overlayColor']
})
export class FileUploaderComponent {


    @Input('activeColor') public activeColor: string = 'green';
    @Input('baseColor') public baseColor: string = '#ccc';
    @Input('overlayColor') public overlayColor: string = 'rgba(255,255,255,0.5)';
    
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: string = '';
    iconColor: any;
   
    handleDragEnter() {
        this.dragging = true;
    }
    
    handleDragLeave() {
        this.dragging = false;
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }
    
    handleImageLoad() {
        this.imageLoaded = true;
        this.iconColor = this.overlayColor;
    }

    handleInputChange(e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    
    _handleReaderLoaded(e) {
        var reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
    }
    
    _setActive() {
        this.borderColor = this.activeColor;
        if (this.imageSrc.length === 0) {
            this.iconColor = this.activeColor;
        }
    }
    
    _setInactive() {
        this.borderColor = this.baseColor;
        if (this.imageSrc.length === 0) {
            this.iconColor = this.baseColor;
        }
    }

}


//https://embed.plnkr.co/V91mKCNkBQZB5QO2MUP4/
//http://embed.plnkr.co/mMVsbT/