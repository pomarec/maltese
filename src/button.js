import { View } from './view.js';
import { Color } from './color.js';
import { Label } from './label.js';

export class Button extends View {
    constructor() {
        super();
        this.label = new Label();
        this.addChild(this.label);
        this._draw();
    }

    get text() {
        return this.label.text;
    }
    set text(newValue) {
        this.label.text = newValue;
        this.width = this.label.width + 10;
        this.height = this.label.height + 10;
    }

    _draw() {
        super._draw();
        this.graphics.lineStyle(1, Color.BLACK, 1, 0.5);
        this.graphics.drawRoundedRect(0, 0, this.width, this.height, 2);
    }
}
