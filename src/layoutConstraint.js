export class LayoutConstraint {
    constructor(view1, attribute1, view2, attribute2, multiplier, constant) {
        this.view1 = view1;
        this.attribute1 = attribute1;
        this.view2 = view2;
        this.attribute2 = attribute2;
        this.multiplier = multiplier;
        this.constant = constant;
    }
    isSatisfied() {
        return this.valueForAttributeOfView(this.attribute1, this.view1) == this.valueForAttributeOfView(this.attribute2, this.view2) * this.multiplier + this.constant;
    }
    satisfy() {
        let value = this.valueForAttributeOfView(this.attribute2, this.view2) * this.multiplier + this.constant;
        this.setValueForAttributeOfView(value, this.attribute1, this.view1);
    }
    static satisfy(constraints) {
        console.trace();
        constraints.forEach(constraint => {
            constraint.satisfy();
        });
    }
    
    valueForAttributeOfView(attribute, view) {
        switch(attribute) {
            case "left": {
                return view.x;
            }
            case "top": {
                return view.y;
            }
            case "right": {
                return view.x + view.width;
            }
            case "bottom": {
                return view.y + view.height;
            }
            case "width": {
                return view.width;
            }
            case "height": {
                return view.height;
            }
            case "centerX": {
                return view.x + view.width/2;
            }
            case "centerY": {
                return view.y + view.height/2;
            }
        }
    }
    
    setValueForAttributeOfView(value, attribute, view) {
        switch(attribute) {
            case "left": {
                view.x = value;
                break;
            }
            case "top": {
                view.y = value;
                break;
            }
            case "right": {
                view.x = value - view.width;
                break;
            }
            case "bottom": {
                view.y = value - view.height;
                break;
            }
            case "width": {
                view.width = value;
                break;
            }
            case "height": {
                view.height = value;
                break;
            }
            case "centerX": {
                view.x = value - view.width/2;
                break;
            }
            case "centerY": {
                view.y = value - view.height/2;
                break;
            }
        }
    }
}