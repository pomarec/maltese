import { View } from './view.js';
import { Color } from './color.js';
import { Label } from './label.js';

export class Button extends View {
    constructor() {
        super()
        this.label = new Label()
        this.addChild(this.label)
        this.label.anchors.left.value = 5
        this.label.anchors.right.value = 5
        this.label.anchors.top.value = 5
        this.label.anchors.bottom.value = 5
    }

    get text() {
        return this.label.text
    }
    set text(newValue) {
        this.label.text = newValue
    }
}
