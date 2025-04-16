export class Chamber {
    constructor(document) {
        this.chamber = document.getElementById("chamberGroup");
        // this.ctx = chamber.getContext("2d");
        this.angle = 0;
        this.currentChamber = 0;
        this.CHAMBER_SIZE = 18;
        this.chambers = new Array(5);
    }
    drawBarrel() {
        this.createCircle(75, 75, 75, "lightgray");
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
    }
    spin() {
        this.currentChamber = 0;
        this.chambers.forEach(element => {
            element.setAttribute("fill", "white");
        });
        this.angle = 0;
        document.getElementById("chamberGroup").setAttribute("transform", `rotate(${this.angle} 75 75)`)
    }
    click() {
        this.chambers[this.currentChamber].setAttribute("fill", "rgb(255, 21, 21)");
        this.currentChamber += 1;
        this.angle += 60;
        document.getElementById("chamberGroup").setAttribute("transform", `rotate(${this.angle} 75 75)`)
    }
    drawChamber(x, y, position) {
        const circle = this.createCircle(x, y, this.CHAMBER_SIZE, "white");
        this.chambers[position] = circle;
    }
    drawCircle(x, y) {
        this.createCircle(x, y, this.CHAMBER_SIZE, "white");
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
}