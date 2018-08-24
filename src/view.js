import './lib/pixi.js';
import { Anchor } from './anchor.js';

export class View {
    constructor() {
        if (!View.nextObjectId) {
            View.nextObjectId = 1
        }
        this.id = View.nextObjectId++
        this.children = []
        this.parent = null
        this.graphics = new PIXI.Graphics()

        // Default values
        this.anchors = {                    // anchors take precedence on raw dimensions
            'top': new Anchor('top'),
            'right': new Anchor('right'),
            'bottom': new Anchor('bottom'),
            'left': new Anchor('left')
        }
        this.contentMinimumSize = {
            'width': null,
            'height': null
        }
        this.backgroundAlpha = 1
        this.cornerRadius = 0
        this.width = 0
        this.height = 0

        this.setNeedsDraw();
    }

    // Getters & Setters
    get x() {
        return this.graphics.x
    }
    set x(newValue) {
        this.graphics.x = newValue
    }
    get right() {
        return this.graphics.x + this.width
    }
    set right(newValue) {
        this.graphics.x = newValue - this.width
    }
    get y() {
        return this.graphics.y
    }
    set y(newValue) {
        this.graphics.y = newValue
    }
    get bottom() {
        return this.graphics.y + this.height
    }
    set bottom(newValue) {
        this.graphics.y = newValue - this.height
    }
    get width() {
        return this._width
    }
    set width(newValue) {
        this._width = Math.max(this.contentMinimumSize.width || 0, newValue)
        this.setNeedsLayoutChildren()
        this.setNeedsDraw()
    }
    get height() {
        return this._height
    }
    set height(newValue) {
        this._height = Math.max(this.contentMinimumSize.height || 0, newValue)
        this.setNeedsLayoutChildren()
        this.setNeedsDraw();
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(newValue) {
        this._backgroundColor = newValue
        this.setNeedsDraw()
    }
    get backgroundAlpha() {
        return this._backgroundAlpha;
    }
    set backgroundAlpha(newValue) {
        this._backgroundAlpha = newValue;
        this.setNeedsDraw();
    }
    get cornerRadius() {
        return this._cornerRadius;
    }
    set cornerRadius(newValue) {
        this._cornerRadius = newValue;
        this.setNeedsDraw();
    }

    // Public methods
    addChild(view) {
        this.graphics.addChild(view.graphics)
        this.children.push(view)
        view.parent = this
        this.layoutChild(view)
    }
    onTouchDown(func) {
        this.graphics.interactive = true;
        this.graphics.on('tap', func);
        this.graphics.on('mousedown', func);
    }
    setNeedsLayoutChildren() {
        this.layoutChildren()
    }
    layoutChildren() {
        this.children.forEach(this.layoutChild.bind(this));
    }
    layoutChild(child) {
        if (!child.anchors.left.isEmpty()) {
            child.x = child.anchors.left.computeForView(child)
        }
        if (!child.anchors.right.isEmpty()) {
            let newChildRight = child.anchors.right.computeForView(child)
            child.width = this.width - newChildRight - child.x
        }
        if (!child.anchors.top.isEmpty()) { 
            child.y = child.anchors.top.computeForView(child)
        }
        if (!child.anchors.bottom.isEmpty()) {
            let newChildBottom = child.anchors.right.computeForView(child)
            child.height = this.height - newChildBottom - child.y
        }
    }
    setNeedsDraw() {
        this.draw()
    }
    draw() {
        this.graphics.clear();
        if (this.backgroundColor) {
            this.graphics.beginFill(this.backgroundColor, this.backgroundAlpha);
            this.graphics.drawRoundedRect(0, 0, this.width, this.height, this.cornerRadius);
            this.graphics.endFill();
        }
        this.setNeedsLayoutChildren()
    }
}