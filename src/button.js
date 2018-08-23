import { View } from './view.js';
import { Color } from './color.js';
import { Label } from './label.js';

export class Button extends View {
    constructor() {
        super();
        this.label = new Label()
        this.addChild(this.label)
        this.label.anchors.left = 5
        this.label.anchors.right = 5
        this.label.anchors.top = 5
        this.label.anchors.bottom = 5
        this._draw()
    }

    get text() {
        return this.label.text;
    }
    set text(newValue) {
        this.label.text = newValue;
        this.contentMinimumSize.width = this.label.anchors.left + this.label.width + this.label.anchors.right;
        this.contentMinimumSize.height = this.label.anchors.top + this.label.height + this.label.anchors.bottom;
    }

    _draw() {
        super._draw();
        this.graphics.lineStyle(1, Color.BLACK, 1, 0.5);
        this.graphics.drawRoundedRect(0, 0, this.width, this.height, 2);
    }
}
