export class Chamber {
    constructor(document) {
        this.chamber = document.getElementById("chamber");
        this.ctx = chamber.getContext("2d");
        this.CHAMBER_SIZE = 18;
    }
    drawShape() {
        this.ctx.beginPath();
        this.ctx.arc(75, 75, 75, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "rgb(175, 175, 175)";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillStyle = "rgb(255, 255, 255)";
        this.drawChamber(75, 30);
        this.drawChamber(35, 55);
        this.drawChamber(35, 100);
        this.drawChamber(75, 120);
        this.drawChamber(115, 55);
        this.drawChamber(115, 100);
        // Outside holes
        this.drawChamber(115, 5);
        this.drawChamber(160, 75);
        this.drawChamber(115, 147);
        this.drawChamber(35, 147);
        this.drawChamber(-8, 75);
        this.drawChamber(30, 5);
        this.drawSpinner(75, 75, 7);
        this.ctx.closePath();
    }
    drawChamber(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.CHAMBER_SIZE, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawSpinner(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();
    }
}