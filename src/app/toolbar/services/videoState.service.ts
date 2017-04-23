import { Injectable } from "@angular/core";
import { Video } from "../toolbarOptions/video-panel/video.model";


@Injectable()
export class videoState {

  videoList: Video[] = [];
  activeVideo: Video;

  constructor() {
  }

}