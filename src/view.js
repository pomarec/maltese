import './lib/pixi.js';
import { Color } from './color.js';

export class View {
    constructor() {
        if (!View.nextObjectId) {
            View.nextObjectId = 1
        }
        this.id = View.nextObjectId++
        this.children = []
        this.graphics = new PIXI.Graphics()

        // Default values
        this.width = 0
        this.height = 0
        this.anchors = {        // null | nb pixels | "xx%"
            'top': null,
            'right': null,
            'bottom': null,
            'left': null
        }
        this.contentMinimumSize = {
            'width': null,
            'height': null
        }
        this.backgroundAlpha = 1

        this._draw();
    }

    // Getters & Setters
    get x() {
        return this.graphics.x
    }
    get right() {
        return this.graphics.x + this.width
    }
    get y() {
        return this.graphics.y
    }
    get bottom() {
        return this.graphics.y + this.height
    }
    get width() {
        return this._width
    }
    set width(newValue) {
        this.children.forEach(child => {
            if (this.width == 0) {
                child.width = newValue
                child.graphics.x = 0
            } else {
                let newChildX = View._applyRatioToAnchor(child.x, newValue, this.width, child.anchors.left)
                let newChildRight = newValue - View._applyRatioToAnchor(this.width-child.right, newValue, this.width, child.anchors.right)
                child.graphics.x = newChildX
                child.width = Math.max(child.contentMinimumSize.width || 0, newChildRight - newChildX)
            }
        });
        this._width = Math.max(0, newValue);
        this._draw();
    }
    get height() {
        return this._height
    }
    set height(newValue) {
        this.children.forEach(child => {
            if (this.height == 0) {
                child.height = newValue
                child.graphics.y = 0
            } else {
                let newChildY = View._applyRatioToAnchor(child.y, newValue, this.height, child.anchors.top)
                let newChildBottom = newValue - View._applyRatioToAnchor(this.height-child.bottom, newValue, this.height, child.anchors.bottom)
                child.graphics.y = newChildY
                child.height =  Math.max(child.contentMinimumSize.height || 0, newChildBottom - newChildY)
            }
        });
        this._height = Math.max(0, newValue);
        this._draw();
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(newValue) {
        this._backgroundColor = newValue
        this._draw()
    }
    get backgroundAlpha() {
        return this._backgroundAlpha;
    }
    set backgroundAlpha(newValue) {
        this._backgroundAlpha = newValue;
        this._draw();
    }

    // Public methods
    addChild(view) {
        this.graphics.addChild(view.graphics);
        this.children.push(view);
    }

    onTouchDown(func) {
        this.graphics.interactive = true;
        this.graphics.on('tap', func);
        this.graphics.on('mousedown', func);
    }

    // Private methods
    _draw() {
        this.graphics.clear();
        if (this.backgroundColor) {
            this.graphics.beginFill(this.backgroundColor, this.backgroundAlpha);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
        }
    }

    static _applyRatioToAnchor(value, nextRef, previousRef, anchor) {
        if (typeof anchor == 'number') {
            return anchor
        } else if (typeof anchor == 'string' && anchor[anchor.length-1] == '%') {
            return nextRef * parseInt(anchor.substring(0, anchor.length-1))/100.0
        }
        return value * (nextRef/previousRef)
    }
}