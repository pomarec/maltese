import './lib/pixi.js';
import { View } from './view.js';

export class ViewController {
    constructor() {
        this.view = new View();
        this.children = [];
    }
    addChild(viewController) {
        viewController.view.anchors.left.value = 0;
        viewController.view.anchors.top.value = 0;
        viewController.view.anchors.right.value = 0;
        viewController.view.anchors.bottom.value = 0;
        this.view.addChild(viewController.view);
        this.children.push(viewController);
    }
}