import { Injectable } from "@angular/core";
import { Video } from "../toolbarOptions/widgetSettings/set-video/video.model";


@Injectable()
export class videoState {

  videoList: Video[] = [];
  activeVideo: Video;

  constructor() {
  }

}