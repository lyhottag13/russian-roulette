import { SoundPlayer } from "./SoundPlayer.js";

let bullet = 0;
let timesSpun = 0;
let childFriendlyMode = false;
let currentlyShooting = false;
let musicMuted = false;
let sfxMuted = false;

const player = new SoundPlayer();
const header = document.getElementById("header");
const percent = document.getElementById("percent");
const app = document.getElementById("app");
const pullTriggerButton = document.getElementById("pullTrigger");
const spinBarrelButton = document.getElementById("spinBarrel");
const revolverImage = document.getElementById("revolver");
const checkbox = document.getElementById("checkbox");

const images = {};
const preloads = ["click", "nerfclick", "nerfshot", "nerfspin", "shot", "spin", "mafia"];

preloads.forEach(element => {
  player.load(element, "audio/" + element + ".mp3");
});

function preloadImages(imageList) {
  imageList.forEach(element => {
    const image = new Image();
    image.src = "images/" + `${element}.png`;
    images[element] = image;
  });
}
preloadImages(["Nerf", "NerfShoot", "Revolver", "RevolverShoot"]);

window.onload = () => {
  checkbox.checked = false;
};
document.getElementById("spinBarrel").addEventListener("pointerdown", () => {
  playMusic();
  currentlyShooting = false;
  playSFX("spin");
  setGunImage();
  bullet = Math.ceil(Math.random() * 6);
  timesSpun = 0;
  app.textContent = "Spin!";
  spinBarrelButton.textContent = "Spin the Barrel!";
  pullTriggerButton.disabled = false;
  calculateDeathOdds();
});
document.getElementById("pullTrigger").addEventListener("pointerdown", () => {
  bullet--;
  timesSpun++;
  if (bullet === 0) {
    player.stopBackgroundMusic();
    currentlyShooting = true;
    playSFX("shot");
    setGunImage();
    app.textContent = "BANG!";
    setDeathText();
    spinBarrelButton.textContent = "Insert Bullet & Spin the Barrel!";
    pullTriggerButton.disabled = true;
  } else if (bullet > 0) {
    playSFX("click");
    currentlyShooting = false;
    setGunImage();
    app.textContent = "Click!";
    calculateDeathOdds();
  }
});
function calculateDeathOdds() {
  percent.textContent = "You have a " + (Math.round((1 / (6 - timesSpun)) * 10000) / 100) + "% chance of dying!";
}
checkbox.addEventListener("change", () => {
  childFriendlyMode = checkbox.checked;
  setGunImage();
  setTitle();
  setDeathText();
  setGameText();
});
function setGameText() {
  const text = percent.textContent;
  if (text.endsWith("dying!")) {
    percent.textContent = text.replace("dying!", "nerfing!");
  } else if (text.endsWith("nerfing!")) {
    percent.textContent = text.replace("nerfing!", "dying!")
  }
}
function setGunImage() {
  const childFriendly = (childFriendlyMode) ? "Nerf" : "Revolver";
  const state = (currentlyShooting) ? "Shoot" : "";
  revolverImage.src = images[childFriendly + state].src;
}
function setTitle() {
  header.querySelector("h1").textContent = (childFriendlyMode) ? "Nerf Roulette Simulator!" : "Russian Roulette Simulator!"
}
function setDeathText() {
  if (currentlyShooting) {
    percent.textContent = (childFriendlyMode) ? "You nerf or nothinged!" : "You died!";
  }
}
document.getElementById("muteMusic").addEventListener("pointerdown", () => {
  musicMuted = !musicMuted;
  if (musicMuted) {
    player.muteBackgroundMusic();
  } else {
    player.unmuteBackgroundMusic();
  }
  document.getElementById("muteMusic").textContent = (musicMuted) ? "Unmute Music" : "Mute Music";
});
document.getElementById("muteSFX").addEventListener("pointerdown", () => {
  sfxMuted = !sfxMuted;
  document.getElementById("muteSFX").textContent = (sfxMuted) ? "Unmute SFX" : "Mute SFX";
});
function playSFX(name) {
  if (!sfxMuted) {
    player.play((childFriendlyMode) ? `nerf${name}` : name);
  }
}
function playMusic() {
  if (!musicMuted) {
    player.playBackgroundMusic("audio/mafia.mp3");
  }
}