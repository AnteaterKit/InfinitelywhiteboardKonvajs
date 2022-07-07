import Konva from "konva";
import { BackLayerRender } from "./backLayerRender";

export class WhiteBoard {
    public stage!: Konva.Stage;
    public backLayer!: Konva.Layer;

    private backLayerRender!: BackLayerRender;

    init(width: number, height: number, containerId: string) {
        this.stage = new Konva.Stage({
            width: width,
            height: height,
            container: containerId
        });
    }

    initBackLayer(width: number, height: number) {
        this.backLayer = new Konva.Layer();
        this.backLayer.listening(false);
        this.backLayerRender = new BackLayerRender(this.backLayer);
        this.backLayerRender.renderGrid(width, height);
        this.stage.add(this.backLayer);
    }
}