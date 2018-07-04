import './lib/pixi.js';
import { View } from './view.js';
import { Color } from './color.js';

export class Label extends View {
    constructor() {
        super();
        this.pixi_text = new PIXI.Text();
        this.graphics.addChild(this.pixi_text);
    }

    get text() {
        return this.pixi_text.text;
    }
    set text(newValue) {
        this.pixi_text.text = newValue;
        this.width = this.pixi_text.width;
        this.height = this.pixi_text.height;
    }

}
