import { ViewController } from './viewController.js';

let RUN_INTERVAL = 1000/80.0

export class App extends ViewController {
    constructor() {
        super()

        // Create html canvas
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        let canvasStyle = document.createElement("style")
        canvasStyle.appendChild(document.createTextNode(`canvas {
            padding: 0px; 
            margin: 0px;
            position: absolute; 
            display: block;
            width: 100vw;
            height: 100vh;
        }`))
        canvasStyle.appendChild(document.createTextNode(`body {
            border: 0px;
            margin: 0px;
        }`))
        document.head.appendChild(canvasStyle)
        
        // Fetch 2d context
        this.view.context = this.canvas.getContext('2d')
        
        // Stick to window's size
        window.addEventListener("resize", this.resizeToWindow.bind(this))
        window.addEventListener("load", this.resizeToWindow.bind(this))

        window.addEventListener("resize", this._setSizeToWindow.bind(this))
        this._setSizeToWindow()
        setTimeout(this._setSizeToWindow.bind(this), 1)     // TODO: clean this dirty bugfix
        setTimeout(this._setSizeToWindow.bind(this), 2)     // TODO: clean this dirty bugfix
        this.run()
        setInterval(this.run.bind(this), RUN_INTERVAL)
    }
    resizeToWindow() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.view.width = this.canvas.width
        this.view.height = this.canvas.height
    }
    run() {
        //let startDate = Date.now()
        if (this.view.needsDraw) {
            this.view.draw()
        }
        /*let drawDuration = Date.now() - startDate
        if (drawDuration > RUN_INTERVAL) {
            console.log("Slow draw", drawDuration)
        }*/
        if (this.moves && this.moves.length > 1) {
            console.log("difftime", Date.now() - this.moves[0])
        }
        this.moves = []
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
        this.view.width = window.innerWidth
        this.view.height = window.innerHeight
    }
}