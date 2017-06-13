

    
<p [contenteditableModel]="colorme">Highlight me!</p>
<button (click)="goFuckGreen() ">pass green </button>
<div class="wysiwyg-editor__content" #editor contenteditable *ngIf="!editMode"></div>
	  

  <div class="main-gallery">
  <div class="gallery-cell">
    <div class="testimonial">


    	<!-- 
    	Here we pull the image from OBJ 
    	We have option to delete image, by removing form obj
    	If object empty, show input and cropper
    	we have cropper func to enable cropping.
    	-->
    	<img [src]="Img.imgCrop" 
	    	  [style.width.px]="this.imgData.sizeW"    
                          [style.height.px]="this.imgData.sizeH"
		  class="testimonial-avatar" >


    	<div class="img-container">
	    		
    			<cropping-img 
			     #Img 
			     format="png" 
			     style="background-color: blue; display: block;"
			     [imgData]="imgData"
			      ></cropping-img>
	</div>	      



      <q class="testimonial-quote">
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mauris ex, gravida ut leo eu, rhoncus porta orci. Fusce vitae rutrum nulla."
      </q>

      <span class="testimonial-author">Joe Smith, CEO of Cubix</span>

    </div>
  </div>

</div>



 <button (click)="Img.zoom('+')">+</button>
 <button (click)="Img.zoom('-')">-</button>
 <button (click)="Img.center()">center</button>

 <br />
 <input [(ngModel)]="Img.sizeW" placeholder="Img size Width">
 <input [(ngModel)]="Img.sizeH" placeholder="Img size Height">
 <input [(ngModel)]="Img.img" placeholder="Img">
