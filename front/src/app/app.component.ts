import { AfterViewInit, Component, Inject } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { WhiteBoard } from './whiteboard/whiteboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  whiteBoard!: WhiteBoard;
  constructor(@Inject(WINDOW) private windowRef: Window) {
    
  }
  ngAfterViewInit(): void {
    const canvas = this.windowRef.document.getElementById('canvas');
    const rect = canvas!.getBoundingClientRect();

    const width = this.windowRef.innerWidth;
    const height = this.windowRef.innerHeight;
    this.whiteBoard = new WhiteBoard();

    this.whiteBoard.initStage(width, height, 'canvas');
    this.whiteBoard.initBackLayer(width, height);
    this.whiteBoard.initMainLayer();
   
  }
}
