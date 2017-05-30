import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class canvasService {

	public canvas = []

	loadCanvasSource = new Subject<string>();
	newCanvas$ = this.loadCanvasSource.asObservable();


	public newCanvas =
		[
  {
    "column": [
      {
        "widgets": [
          {
            "settings": {
              "isLoaded": true,
              "name": "images",
              "componentName": "images",
              "singleimage": false,
              "gallery": true,
              "carousel": true,
              "slides": [
                {
                  "name": "",
                  "description": "",
                  "alt": "placeholder",
                  "org": " ",
                  "xsize": " "
                },
                {
                  "name": "",
                  "description": "",
                  "alt": "placeholder",
                  "org": " ",
                  "xsize": " "
                },
                {
                  "name": "",
                  "description": "",
                  "alt": "placeholder",
                  "org": " ",
                  "xsize": " "
                }
              ]
            },
            "widgetComponent": {
              "inputs": {
                "name": "example"
              }
            },
            "widgetProperties": [
              {
                "dimension": [
                  {
                    "width": 200,
                    "height": 0,
                    "widthtotal": 0,
                    "heighttotal": 0
                  }
                ],
                "location": [
                  {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  }
                ]
              }
            ]
          }
        ],
        "columnProperties": [
          {
            "dimension": [
              {
                "width": 200,
                "height": 0,
                "widthtotal": 200,
                "heighttotal": 0
              }
            ],
            "location": [
              {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 220
              }
            ]
          }
        ]
      },
      {
        "widgets": [
          {
            "settings": {
              "isLoaded": true,
              "name": "images",
              "componentName": "images",
              "singleimage": false,
              "gallery": true,
              "carousel": true,
              "slides": [
                {
                  "name": "",
                  "description": "",
                  "alt": "placeholder",
                  "org": " ",
                  "xsize": " "
                },
                {
                  "name": "",
                  "description": "",
                  "alt": "placeholder",
                  "org": " ",
                  "xsize": " "
                },
                {
                  "name": "",
                  "description": "",
                  "alt": "placeholder",
                  "org": " ",
                  "xsize": " "
                }
              ]
            },
            "widgetComponent": {
              "inputs": {
                "name": "example"
              }
            },
            "widgetProperties": [
              {
                "dimension": [
                  {
                    "width": 200,
                    "height": 0,
                    "widthtotal": 0,
                    "heighttotal": 0
                  }
                ],
                "location": [
                  {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  }
                ]
              }
            ]
          }
        ],
        "columnProperties": [
          {
            "dimension": [
              {
                "width": 200,
                "height": 0,
                "widthtotal": 200,
                "heighttotal": 0
              }
            ],
            "location": [
              {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 220
              }
            ]
          }
        ]
      }
    ],
    "rowProperties": [
      {
        "dimension": [
          {
            "width": 0,
            "height": 0,
            "widthtotal": 0,
            "heighttotal": 0
          }
        ],
        "location": [
          {
            "top": 100,
            "right": 0,
            "bottom": 0,
            "left": 0
          }
        ]
      }
    ]
  }
]
	// this.loadCanvasSource.next();

	/* HTTP request 
	 fetchCanvas(query: string) {
	  let webUrl = 'https://www.googleapis.com'
	  return this.http
	      .get( webUrl + '/youtube/v3/search?part=snippet&q=${query}'+
	          '&maxResults=5' +
	          '&type=video' +
	          '&key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs')
	      .map(response => response.json())
	  }
	*/

	/*
	dndDraggedSource = new Subject<string>();
	newDragged$ = this.dndDraggedSource.asObservable();
	addDraggedItem(widget)  {
		this.dndDraggedSource.next(widget)
	}
	*/

}