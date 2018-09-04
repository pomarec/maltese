export class Color {
    static get BLUE() {
        return 0x0000FF;
    }
    static get GREEN() {
        return 0x00FF00;
    }
    static get WHITE() {
        return 0xFFFFFF;
    }
    static get BLACK() {
        return 0x000000;
    }
    static get RED() {
        return 0xFF0000;
    }
    
    static toContextColor(color) {
        if (typeof color == 'string') {
            return color
        }
        return (color == 0 ? '#000000' : '#' + color.toString(16))
    }
}
