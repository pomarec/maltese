import './lib/pixi.js';
import { LayoutConstraint } from './layoutConstraint.js';

export class View {
    constructor() {
        this.children = [];
        this.constraints = [];
        this.graphics = new PIXI.Graphics();

        // Default values
        this.width = 0;
        this.height = 0;
        this.backgroundAlpha = 1;

        this._draw();
    }

    // Getters & Setters
    get x() {
        return this.graphics.x;
    }
    set x(newValue) {
        this.graphics.x = newValue;
    }
    get y() {
        return this.graphics.y;
    }
    set y(newValue) {
        this.graphics.y = newValue;
    }
    get width() {
        return this._width;
    }
    set width(newValue) {
        this.graphics.children.forEach(child => {
            if (this.width == 0) {
                child.width = newValue
            } else {
                child.width = child.width * (newValue / this.width);
            }
        });
        this._width = newValue;
        this._draw();
    }
    get height() {
        return this._height;
    }
    set height(newValue) {
        this.graphics.children.forEach(child => {
            if (this.height == 0) {
                child.height = newValue
            } else {
                child.height = child.height * (newValue / this.height);
            }
        });
        this._height = newValue;
        this._draw();
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(newValue) {
        this._backgroundColor = newValue;
        this._draw();
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

    addConstraint(constraint) {
        this.constraints.push(constraint);
        LayoutConstraint.satisfy(this.constraints);
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
}