import { View } from './view.js'
import { Color } from './color.js'


// ATM the label will draw text inside existing size
// No size computing is made
export class Label extends View {
    constructor() {
        super()
        this.textColor = Color.WHITE
        this.backgroundColor = Color.BLACK
        this.font = '15px serif'
    }
    get text() {
        return this._text
    }
    set text(newValue) {
        this._text = newValue
        this.needsDraw = true
    }
    get textColor() {
        return this._textColor
    }
    set textColor(newValue) {
        this._textColor = newValue
        this.needsDraw = true
    }
    get font() {
        return this._font
    }
    set font(newValue) {
        this._font = newValue
        this.needsDraw = true
    }
    draw() {
        super.draw()
        this.context.font = this.font
        this.context.textBaseline = 'top'
        this.context.fillStyle = Color.toContextColor(this.textColor)
        let lineHeight = parseInt(this.font.split('px')[0]) + 4

        var x = 0, y = 0
        for (var i = 0; i < (this.text || "").length; i++) {
            let char = this.text[i]
            let charWidth = this.context.measureText(char).width
            if (x + charWidth > this.width) {
                y += lineHeight
                x = 0
            }
            if (y + lineHeight > this.height) {
                break
            }
            this.context.fillText(char, x, y+2)
            x += charWidth
        }
    }
}