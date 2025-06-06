export class Chamber {
    constructor() {
        this.chamber = document.getElementById("chamberGroup");
        // this.ctx = chamber.getContext("2d");
        this.angle = 0;
        this.currentChamber = 0;
        this.CHAMBER_SIZE = 18;
        this.RED = "rgb(255, 101, 101)";
        this.BLUE = "rgb(50, 159, 209)"
        this.GREEN = "rgb(74, 165, 86)"
        this.chambers = new Array(5);
        this.mainCircle = null;
        this.childFriendlyMode = false;
    }
    drawBarrel() {
        this.mainCircle = this.createCircle(75, 75, 75, "lightgray");
        this.drawChamber(75, 30, 0);
        this.drawChamber(35, 55, 1);
        this.drawChamber(35, 100, 2);
        this.drawChamber(75, 120, 3);
        this.drawChamber(115, 100, 4);
        this.drawChamber(115, 55, 5);
        // Outside holes
        this.drawCircle(115, 5);
        this.drawCircle(160, 75);
        this.drawCircle(115, 147);
        this.drawCircle(35, 147);
        this.drawCircle(-8, 75);
        this.drawCircle(30, 5);
        // Spinner hole
        this.drawSpinner(75, 75, 7);
    }
    spin() {
        this.currentChamber = 0;
        this.chambers.forEach(element => {
            element.setAttribute("fill", "white");
        });
        this.angle = this.angle + (360 - this.angle % 360) + 360;
        this.chamber.style.transform = `rotate(${this.angle}deg)`;
    }
    click(shoot) {
        if (shoot) {
            this.chambers[this.currentChamber].setAttribute("fill", this.RED);
        } else {
            this.chambers[this.currentChamber].setAttribute("fill", (this.childFriendlyMode) ? this.BLUE : this.GREEN);
            this.currentChamber += 1;
            this.angle += 60;
            this.chamber.style.transform = `rotate(${this.angle}deg)`;
        }
    }
    drawChamber(x, y, position) {
        const circle = this.createCircle(x, y, this.CHAMBER_SIZE, "white");
        this.chambers[position] = circle;
    }
    drawCircle(x, y) {
        this.createCircle(x, y, this.CHAMBER_SIZE, "white");
    }
    drawSpinner(x, y, radius) {
        this.createCircle(x, y, radius, "white");
    }
    createCircle(x, y, radius, color) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", color);
        this.chamber.appendChild(circle);
        return circle;
    }
    setCircle() {
        this.mainCircle.setAttribute("fill", (this.childFriendlyMode) ? "rgb(226, 224, 89)" : "lightgray");
        this.chambers.forEach(element => {
            if (element.getAttribute("fill") === this.GREEN) {
                element.setAttribute("fill", this.BLUE);
            } else if (element.getAttribute("fill") === this.BLUE) {
                element.setAttribute("fill", this.GREEN);
            }
        })
    }
}