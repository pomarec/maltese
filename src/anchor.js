import { View } from './view.js';

export class Anchor {
    constructor(type, value = null, relativeTo = null) {
        this.type = type
        this.value = value                  // can be null | nb pixels | "xx%"
        this.relativeTo = relativeTo        // can be [view, anchor]
    }
    isEmpty() {
        return this.value == null
    }
    computeForView(view) {
        var value = view[{
            top: 'y',
            left: 'x',
            right: 'width',
            bottom: 'height'
        }[this.type]]
        if (typeof this.value == 'number') {
            value = this.value
        } else if (typeof this.value == 'string' && this.value[this.value.length-1] == '%') {
            value = this.baseMeasureForView(view) * parseInt(this.value.substring(0, this.value.length-1))/100.0
        }
        if (this.relativeTo instanceof Array && this.relativeTo.length == 2
            && this.relativeTo[0] instanceof View && this.relativeTo[1] instanceof Anchor) {
            let relativeToView = this.relativeTo[0]
            let relativeToAnchor = this.relativeTo[1]   
            value += relativeToAnchor.computeForView(relativeToView)
        }
        return value
    }
    baseMeasureForView(view) {
        let dimension = {
            top: 'height',
            left: 'width',
            right: 'width',
            bottom: 'height'
        }[this.type]
        if (view.parent != null) {
            return view.parent[dimension]
        } else {
            return 0
        }
    }
}