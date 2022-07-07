import Konva from "konva";

declare const Konva: any;

/*
* BackLayer render of infinitely whiteboard
*/
export class BackLayerRender {
  /*
  * Start X
  */
  currentX = -120;
  /*
  * Start Y
  */
  currentY = -120;
  width = 0;
  height = 0;
  /*
  * Step size
  */
  step = 60;
  /*
  * Reference to back layer
  */
  layer: Konva.Layer;
  /*
  * Cache of rendered points
  */
  points = new Map<string, string>();

  constructor(layer: any) {
    this.layer = layer;
  }

  /*
  * Draw new points
  */
  updateGrid(width: number, height: number, x: number, y: number, scaleOffset: number) {
    width = width / scaleOffset;
    height = height / scaleOffset;
    x = x / scaleOffset;
    y = y / scaleOffset;

    const position  = this.getLayerPoint(x, y);

    if (position.x < 0) {
      width = width + (-position.x);
    }
    if (position.y < 0) {
      height = height + (-position.y);
    }
    
    const newx = -position.x;
    const newy = - position.y;
    const newShapes = [];
    for(let y = newy; y < height; y = y + this.step) {
      for(let x = newx; x < width; x = x + this.step) {
        if (!this.points.has(x.toString() +  y.toString())) {
          const rect = this.createRect(x, y);
          rect.listening(false);
          rect.perfectDrawEnabled(false);
          rect.shadowForStrokeEnabled(false);
          rect.hitStrokeWidth(0);
          newShapes.push(rect);
          this.points.set(x.toString() +  y.toString(), rect);
       }
      }
    }
    if (newShapes.length > 0) {
      this.layer.add(...newShapes);
    }
  }

  /*
  * Render start points
  */
  renderGrid(width: number, height: number) {
    const position  = this.getLayerPoint(this.currentX, this.currentY);
    for(let y = position.y; y < height; y = y + this.step) {
      for(let x = position.x; x < width + 200; x = x + this.step) {
        const rect = this.createRect(x, y);
        rect.listening(false);
        rect.perfectDrawEnabled(false);
        rect.shadowForStrokeEnabled(false);
        rect.hitStrokeWidth(0);
        this.points.set(x.toString() +  y.toString(), rect);
        this.layer.add(rect)
      }
    }
    this.layer.draw();
  }

  createRect(x: number, y: number) {
    var rect = new Konva.Rect({
      x: x,
      y: y,
      width: this.step,
      height: this.step,
      stroke: '#e2e2ea',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
    });
    return rect;
  }

  createLine(x: number, y: number, x1: number, y1: number) {
    var rect = new Konva.Line({
      points: [x, y, x1, y1],
      stroke: '#e2e2ea',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
    });
    return rect;
  }

  /*
  * Smooth math for point, 
  */
  getLayerPoint(x: number, y: number) {
    let nextx = x;
    let nexty = y;

    while(Math.round(nextx) % this.step !== 0) {
      nextx++;
    }
    while(Math.round(nexty) % this.step !== 0) {
      nexty++;
    }

    return {x: Math.round(nextx), y: Math.round(nexty) };
  }
}

