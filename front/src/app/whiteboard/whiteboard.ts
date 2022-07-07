import Konva from "konva";
import { BackLayerRender } from "./backLayerRender";

export class WhiteBoard {
    stage!: Konva.Stage;
    mainLayer!: Konva.Layer;
    backLayer!: Konva.Layer;

    private backLayerRender!: BackLayerRender;

    width = 0;
    height = 0;

    initStage(width: number, height: number, containerId: string) {
        this.width = width;
        this.height = height;

        this.stage = new Konva.Stage({
            width: width,
            height: height,
            container: containerId
        });

        this.stage.draggable(true);

        this.stage.on('dragend', (e) => {
            console.log('dragend');
            const position = e.currentTarget.position();
            
            this.backLayerRender.updateGrid(this.width, this.height, position.x, position.y, 1);
        });
    }

    initMainLayer() {
        this.mainLayer = new Konva.Layer();
        this.stage.add(this.mainLayer);
        this.mainLayer.draw();
        this.drawSimpleShapes();
      }

    initBackLayer(width: number, height: number) {
        this.backLayer = new Konva.Layer();
        this.backLayer.listening(false);
        this.backLayerRender = new BackLayerRender(this.backLayer);
        this.backLayerRender.renderGrid(width, height);
        this.stage.add(this.backLayer);
    }

    drawSimpleShapes() {

        var circle = new Konva.Circle({
          x: this.stage.width() / 2,
          y: this.stage.height() / 2,
          radius: 70,
          fill: '#F9E6E0',
          stroke: '#1486F5',
          strokeWidth: 4,
        });

        var rect3 = new Konva.Rect({
            x: 50,
            y: 120,
            width: 100,
            height: 100,
            fill: '#1486F5',
            cornerRadius: [0, 10, 20, 30],
          });
        
  
        this.mainLayer.add(rect3);
        this.mainLayer.add(circle);
        this.mainLayer.draw();
    }
}