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

        // Mouse & touch events
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this))
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this))

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
    onMouseDown(event) {
        this.draggingView = this.view.hit(event.clientX, event.clientY)
        this.draggingStartPoint = {'x': event.clientX, 'y': event.clientY}
        if (this.draggingView) {
            this.draggingView.printDebug(false)
            this.draggingView.onPanStarted()
        }
    }
    onMouseMove(event) {
        if (this.draggingView) {
            this.moves.push(Date.now())
            let translation = {
                'x': event.clientX - this.draggingStartPoint.x,
                'y': event.clientY - this.draggingStartPoint.y
            }
            this.draggingView.onPanMoved(translation)
        }
    }
    onMouseUp(event) {
        if (this.draggingView) {
            this.draggingView.onPanEnded()
        }
        this.draggingView = null
    }
}