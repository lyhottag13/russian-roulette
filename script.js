let bullet = 0;
let timesSpun = 0;
let percent = document.getElementById("percent");
let app = document.getElementById("app");
let pullTriggerButton = document.getElementById("pullTrigger");
let spinBarrelButton = document.getElementById("spinBarrel");
let revolverImage = document.getElementById("revolver");
function spinBarrel() {
    bullet = Math.ceil(Math.random() * 6);
    timesSpun = 0;
    app.innerHTML = "Spin!";
    spinBarrelButton.innerHTML = "Spin the Barrel!";
    calculateDeathOdds();
    
}
function pullTrigger() {
    if (bullet > 0) {
        bullet--;
        timesSpun++;
        if (bullet === 0) {
            revolverImage.setAttribute("src", "images/RevolverShoot.png");
            app.innerHTML = "BANG!";
            percent.innerHTML = "You died!";
            spinBarrelButton.innerHTML = "Insert Bullet & Spin the Barrel!";
        } else if (bullet > 0) {
            revolverImage.setAttribute("src", "images/Revolver.png");
            app.innerHTML = "Click!";
            calculateDeathOdds();
        }
    } else {
        revolverImage.setAttribute("src", "images/Revolver.png");
        app.innerHTML = "Click!";
        percent.innerHTML = "You have a 0% chance of dying!";
    }
}
function calculateDeathOdds() {
    percent.innerHTML = "You have a " + (Math.round((1 / (6 - timesSpun)) * 10000) / 100) + "% chance of dying!";
}