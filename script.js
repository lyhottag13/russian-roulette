let bullet = 0;
let timesSpun = 0;
let childFriendlyMode = false;
let shoot = false;
const header = document.getElementById("header");
const percent = document.getElementById("percent");
const app = document.getElementById("app");
const pullTriggerButton = document.getElementById("pullTrigger");
const spinBarrelButton = document.getElementById("spinBarrel");
const revolverImage = document.getElementById("revolver");
const checkbox = document.getElementById("checkbox");
const music = new Audio("audio/mafia.mp3");
function spinBarrel() {
  playMusic();
  shoot = false;
  playSpin();
  setGun();
  bullet = Math.ceil(Math.random() * 6);
  timesSpun = 0;
  app.innerHTML = "Spin!";
  spinBarrelButton.innerHTML = "Spin the Barrel!";
  pullTriggerButton.disabled = false;
  calculateDeathOdds();

}
function pullTrigger() {
  if (bullet > 0) {
    bullet--;
    timesSpun++;
    if (bullet === 0) {
      pauseMusic();
      playGunshot();
      shoot = true;
      setGun();
      app.innerHTML = "BANG!";
      setDeathText();
      spinBarrelButton.innerHTML = "Insert Bullet & Spin the Barrel!";
      pullTriggerButton.disabled = true;

    } else if (bullet > 0) {
      playClick();
      shoot = false;
      setGun();
      app.innerHTML = "Click!";
      calculateDeathOdds();
    }
  }
}
function calculateDeathOdds() {
  percent.innerHTML = "You have a " + (Math.round((1 / (6 - timesSpun)) * 10000) / 100) + "% chance of dying!";
}
function setChildFriendlyMode() {
  childFriendlyMode = (checkbox.checked) ? true : false;
  setGun();
  setTitle();
  setDeathText();
}
function setGun() {
  if (childFriendlyMode && shoot) {
    revolverImage.setAttribute("src", "images/NerfShoot.png");
  } else if (childFriendlyMode && !shoot) {
    revolverImage.setAttribute("src", "images/Nerf.png");
  } else if (!childFriendlyMode && shoot) {
    revolverImage.setAttribute("src", "images/RevolverShoot.png");
  } else if (!childFriendlyMode && !shoot) {
    revolverImage.setAttribute("src", "images/Revolver.png");
  }
}
function setTitle() {
  header.innerHTML = (childFriendlyMode) ? "Nerf Roulette Simulator!" : "Russian Roulette Simulator!"
}
function setDeathText() {
  if (shoot) {
    percent.innerHTML = (childFriendlyMode) ? "You nerf or nothinged!" : "You died!";
  }
}
function playGunshot() {
  const gunshot = (childFriendlyMode) ? new Audio("audio/nerfshot.mp3") : new Audio("audio/gunshot.mp3");
  gunshot.play();
}
function playClick() {
  const click = (childFriendlyMode) ? new Audio("audio/nerfclick.mp3") : new Audio("audio/click.mp3");
  click.play();
}
function playSpin() {
  const spin = (childFriendlyMode) ? new Audio("audio/nerfspin.mp3") : new Audio("audio/spin.mp3");
  spin.play();
}
function playMusic() {
  music.play();
}
function pauseMusic() {
  music.pause();
  music.currentTime = 0;
}