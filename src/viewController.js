import './lib/pixi.js';
import { View } from './view.js';

export class ViewController {
    constructor() {
        this.view = new View();
        this.children = [];
    }
    addChild(viewController) {
        viewController.view.x = 0;
        viewController.view.y = 0;
        viewController.view.width = this.view.width;
        viewController.view.height = this.view.height;
        this.view.addChild(viewController.view);
        this.children.push(viewController);
    }
}