import { AfterViewInit, Component, Inject } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(@Inject(WINDOW) private windowRef: Window) {
    
  }
  ngAfterViewInit(): void {
    const canvas = this.windowRef.document.getElementById('ez-canvas');
    const rect = canvas!.getBoundingClientRect();
  }
  title = 'whiteboard';
}
