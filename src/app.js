import './lib/pixi.js';
import { ViewController } from './viewController.js';

export class App {
    constructor() {
        App.setMarginPaddingToZero()

        this.pixi_app = this._createPixiApp()
        document.body.appendChild(this.pixi_app.view)

        this.viewController = new ViewController()
        this.pixi_app.stage.addChild(this.viewController.view.graphics)
        
        window.addEventListener("resize", this._setSizeToWindow.bind(this))
        this._setSizeToWindow()
        setTimeout(this._setSizeToWindow.bind(this), 1)     // TODO: clean this dirty bugfix
        setTimeout(this._setSizeToWindow.bind(this), 2)     // TODO: clean this dirty bugfix
    }
    
    static setMarginPaddingToZero() {
        var newStyle = document.createElement("style")
        var style = "* {padding: 0; margin: 0}"
        newStyle.appendChild(document.createTextNode(style))
        document.head.appendChild(newStyle)
    }

    _createPixiApp() {
        let app = new PIXI.Application({
            antialias: true
        });
        app.renderer.view.style.position = "absolute"
        app.renderer.view.style.display = "block"
        app.renderer.autoResize = true
        return app
    }

    _setSizeToWindow() {
        this.pixi_app.renderer.resize(window.innerWidth, window.innerHeight)
        this.viewController.view.width = window.innerWidth
        this.viewController.view.height = window.innerHeight
    }
}