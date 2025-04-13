let bullet = 0;
let timesSpun = 0;
let childFriendlyMode = false;
let shoot = false;
let musicMuted = false;
let sfxMuted = false;
const header = document.getElementById("header");
const percent = document.getElementById("percent");
const app = document.getElementById("app");
const test = document.getElementById("test");
const pullTriggerButton = document.getElementById("pullTrigger");
const spinBarrelButton = document.getElementById("spinBarrel");
const revolverImage = document.getElementById("revolver");
const checkbox = document.getElementById("checkbox");
const music = new Audio("audio/mafia.mp3");

const images = {};

function preloadImages(imageList) {
  imageList.forEach(element => {
    const image = new Image();
    image.src = "images/" + `${element}.png`;
    images[element] = image;
  });
}
preloadImages(["Nerf", "NerfShoot", "Revolver", "RevolverShoot"]);

function spinBarrel() {
  playMusic();
  shoot = false;
  playSFX("spin");
  setGunImage();
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
      stopMusic();
      playSFX("shot");
      shoot = true;
      setGunImage();
      app.innerHTML = "BANG!";
      setDeathText();
      spinBarrelButton.innerHTML = "Insert Bullet & Spin the Barrel!";
      pullTriggerButton.disabled = true;

    } else if (bullet > 0) {
      playSFX("click");
      shoot = false;
      setGunImage();
      app.innerHTML = "Click!";
      calculateDeathOdds();
    }
  }
}
function calculateDeathOdds() {
  percent.innerHTML = "You have a " + (Math.round((1 / (6 - timesSpun)) * 10000) / 100) + "% chance of dying!";
}
function setChildFriendlyMode() {
  childFriendlyMode = checkbox.checked;
  setGunImage();
  setTitle();
  setDeathText();
}
function setGunImage() {
  if (childFriendlyMode && shoot) {
    revolverImage.src = images["NerfShoot"].src;
  } else if (childFriendlyMode && !shoot) {
    revolverImage.src = images["Nerf"].src;
  } else if (!childFriendlyMode && shoot) {
    revolverImage.src = images["RevolverShoot"].src;
  } else if (!childFriendlyMode && !shoot) {
    revolverImage.src = images["Revolver"].src;
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
function playSFX(name) {
  const fileName = (childFriendlyMode) ? "audio/nerf" + name + ".mp3" : "audio/" + name + ".mp3";
  const sfx = new Audio(fileName);
  if (!sfxMuted) {
    sfx.play();
  }
}
function muteMusic() {

}
function muteSFX() {
  sfxMuted = !sfxMuted;
  document.getElementById("muteSFX").innerHTML = (sfxMuted) ? "Unmute SFX" : "Mute SFX";
}
function playMusic() {
  music.play();
}
function stopMusic() {
  music.pause();
  music.currentTime = 0;
}
document.getElementById("muteMusic").addEventListener("click", () => {
    musicMuted = !musicMuted;
    document.getElementById("muteMusic").innerHTML = (musicMuted) ? "Unmute Music" : "Mute Music";
    music.volume = (musicMuted) ? 0 : 1;
    test.innerHTML = (musicMuted) ? "Music Muted" : "NOPE";
    test.innerHTML += music.volume;
})