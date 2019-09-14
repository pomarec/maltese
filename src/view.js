import { Anchor } from './anchor.js'
import { Color } from './color.js'

export class View {
    constructor() {
        if (!View.nextObjectId) {
            View.nextObjectId = 1
        }
        this.id = View.nextObjectId++
        this.children = []
        this.parent = null

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
        this.cornerRadius = 0

        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
        this.backgroundColor = Color.BLACK

        this.needsDraw = true
        this.setNeedsLayoutChildren()
    }

    // Getters & Setters
    get x() {
        return this._x;
    }
    set x(newValue) {
        this._x = newValue
        this.needsDraw = true
    }
    get y() {
        return this._y;
    }
    set y(newValue) {
        this._y = newValue
        this.needsDraw = true
    }
    get right() {
        return this.x + this.width
    }
    set right(newValue) {
        this.x = newValue - this.width
    }
    get bottom() {
        return this.y + this.height
    }
    set bottom(newValue) {
        this.y = newValue - this.height
    }
    get width() {
        return this._width
    }
    set width(newValue) {
        this._width = Math.max(this.contentMinimumSize.width || 0, newValue)
        this.setNeedsLayoutChildren()
        this.needsDraw = true
    }
    get height() {
        return this._height
    }
    set height(newValue) {
        this._height = Math.max(this.contentMinimumSize.height || 0, newValue)
        this.setNeedsLayoutChildren()
        this.needsDraw = true
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(newValue) {
        this._backgroundColor = newValue
        this.needsDraw = true
    }
    get cornerRadius() {
        return this._cornerRadius
    }
    set cornerRadius(newValue) {
        this._cornerRadius = newValue
        this.needsDraw = true
    }
    get context() {
        return this._context
    }
    set context(newValue) {
        this._context = newValue
        this.children.forEach(child => child.context = newValue)
    }
    get needsDraw() {
        return this._needsDraw || this.children.some(child => child.needsDraw)
    }
    set needsDraw(newValue) {
        this._needsDraw = newValue
    }

    // Public methods
    addChild(view) {
        this.children.push(view)
        view.parent = this
        view.context = this.context
        this.layoutChild(view)
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
    draw() {
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        if (this.context) {
            this.context.clearRect(0, 0, this.width, this.height)
            this.context.fillStyle = Color.toContextColor(this.backgroundColor)
            this.context.beginPath()
            this.context.rect(0, 0, this.width, this.height)
            this.context.fill()
            //this.context.clip()
            //console.log("draw", this.id, this.x, this.width)
            this.drawChildren()
            this.needsDraw = false
        }
    }
    drawChildren() {
        this.children.forEach(function(child) {
            child.context.transform(1, 0, 0, 1, child.x, child.y)
            child.draw()
            child.context.transform(1, 0, 0, 1, -child.x, -child.y)
        })
    }
    hit(x, y) {
        // Returns "childest" view at this coordinates
        let eligibleChildren = this.children.filter(child =>
            (child.x <= x && child.width + child.x >= x) &&
            (child.y <= y && child.height + child.y >= y)
        )
        if (eligibleChildren.length > 0) {
            let electedChild = eligibleChildren[eligibleChildren.length - 1]
            return electedChild.hit(x - electedChild.x, y - electedChild.y)
        } else {
            return this
        }
    }
    onPanStarted() {
    }
    onPanMoved(translation) {
    }
    onPanEnded() {
    }

    printDebug(recursive = true, indent = 0) {
        console.log(Array(indent).join(" "), this.id, this.constructor.name, this.x, this.y, this.width, this.height)
        if (recursive) {
            this.children.forEach(child => child.printDebug(true, indent + 2))
        }
    }
}