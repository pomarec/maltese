import { ViewController } from './viewController.js';

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

        this.run()
    }
    resizeToWindow() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.view.width = this.canvas.width
        this.view.height = this.canvas.height
    }
    run() {
        if (this.view.needsDraw) {
            this.view.draw()
        }
        setTimeout(this.run.bind(this), 1000/30.0)
    }
}