import './lib/pixi.js';
import { View } from './view.js';

export class ViewController {
    constructor() {
        this.view = new View();
        this.children = [];
    }
    addChild(viewController) {
        viewController.view.anchors.left = 0;
        viewController.view.anchors.top = 0;
        viewController.view.anchors.right = 0;
        viewController.view.anchors.bottom = 0;
        this.view.addChild(viewController.view);
        this.children.push(viewController);
    }
}