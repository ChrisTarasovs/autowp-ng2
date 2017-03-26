import { Component, OnInit } from '@angular/core';
import {Media} from './media';
import {MediaService} from './media.service'
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  providers: [MediaService]
})
export class MediaComponent implements OnInit {
/*
 medias: Media[];
  constructor( private mediaService: MediaService, private router: Router) { }

  getPosts(){
  	this.mediaService.getPosts()
  	.subscribe(res => {
  		this.medias = res;
  	});

  }

  ngOnInit() {
  	this.getPosts();
  }
*/
  ngOnInit() {
  	
  }
}
