import { 
  Component,
  Input
} from '@angular/core';



@Component({
  selector: 'toolbar-widgets',
  template:  ` 

  here load
	    <dynamiccontent-component [componentData]="componentData"></dynamiccontent-component>
here here 
  <!--
  	<wysiwyg-panel></wysiwyg-panel>
  	<image-panel></image-panel>
  	<builder-panel></builder-panel>
-->
  `
})

export class toolbarOptionsComponent {


}
