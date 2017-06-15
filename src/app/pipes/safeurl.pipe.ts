import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Pipe({name: 'safelink'})
export class Safelink {
  constructor(private sanitized: DomSanitizer){}

  transform(value) {
  	console.log(this.sanitized.bypassSecurityTrustUrl(value))
    //return this.sanitized.bypassSecurityTrustHtml(value);
     return this.sanitized.bypassSecurityTrustUrl(value);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}