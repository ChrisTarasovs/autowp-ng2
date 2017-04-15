

	{{ content }}
	<Br />

	<div class="wysiwyg-editor__container">
	ddddd
	  <div class="wysiwyg-editor__src-container" *ngIf="!editMode">
	    <textarea [value]="content" class="wysiwyg-editor__src"></textarea>
	  </div>
	  adsasdasd
	  <div class="wysiwyg-editor__content" #editor contenteditable *ngIf="!editMode"
	      (keyup)="onContentChanged()"
	      (change)="onContentChanged()"
	    
	  ></div>
	  <!-- ORGIN
	  <div class="wysiwyg-editor__content" #editor contenteditable *ngIf="!editMode"
	      (keyup)="onContentChanged()"
	      (change)="onContentChanged()"
	      (blur)="onBlur()"
	  ></div> -->
	  asdas
	</div>

