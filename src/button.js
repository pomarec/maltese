import { View } from './view.js';
import { Color } from './color.js';
import { Label } from './label.js';

export class Button extends View {
    constructor() {
        super();
        this.label = new Label()
        this.addChild(this.label)
        this.label.anchors.left.value = 5
        this.label.anchors.right.value = 5
        this.label.anchors.top.value = 5
        this.label.anchors.bottom.value = 5
    }

    get text() {
        return this.label.text;
    }
    set text(newValue) {
        this.label.text = newValue;
        this.contentMinimumSize.width = this.label.anchors.left.value + this.label.width + this.label.anchors.right.value;
        this.contentMinimumSize.height = this.label.anchors.top.value + this.label.height + this.label.anchors.bottom.value;
        this.width = this.width         // TODO : clean this dirty fix
        this.height = this.height       // TODO : clean this dirty fix
    }

    draw() {
        super.draw();
        this.graphics.lineStyle(1, Color.BLACK, 1, 0.5);
        this.graphics.drawRoundedRect(0, 0, this.width, this.height, 2);
    }
}
