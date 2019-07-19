import { View } from './view.js';

export class ScrollView extends View {
    constructor() {
        super()

        //  https://developer.mozilla.org/en-US/docs/Web/API/Touch_events#Example
    }
    onPanStarted() {
        this.lastTranslation = {'x': 0, 'y': 0}
    }
    onPanMoved(translation) {
        if (this.lastTranslation) {
            let stepTranslation = {
                'x': translation.x - this.lastTranslation.x,
                'y': translation.y - this.lastTranslation.y,
            }
            this.children.forEach(function(child) {
                child.x += stepTranslation.x
                child.y += stepTranslation.y
            })
            this.lastTranslation = translation
        }
    }
    onPanEnded() {
        this.lastTranslation = null
    }
    hit(x, y) {
        return this
    }
}
