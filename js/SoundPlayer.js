export class SoundPlayer {

    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.buffers = {};
        this.backgroundMusicSource = null;
        this.backgroundMusicBuffer = null;
        this.isBackgroundMusicPlaying = false;
        this.gainNode = null;
    }

    async load(name, url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.buffers[name] = audioBuffer;
    }
    async playBackgroundMusic() {
        if (this.isBackgroundMusicPlaying) {
            return;
        }
        if (!this.backgroundMusicBuffer) {
            this.backgroundMusicBuffer = this.buffers['backgroundMusic'];
        }

        // Create a new source for playing the background music
        this.backgroundMusicSource = this.audioContext.createBufferSource();
        this.backgroundMusicSource.buffer = this.backgroundMusicBuffer;
        this.backgroundMusicSource.loop = true; // Loop the background music
        this.backgroundMusicSource.connect(this.audioContext.destination);
        this.gainNode = this.audioContext.createGain();
        this.backgroundMusicSource.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.backgroundMusicSource.start();
        this.isBackgroundMusicPlaying = true; // Track that music is playing
    }
    stopBackgroundMusic() {
        if (this.backgroundMusicSource && this.isBackgroundMusicPlaying) {
            this.backgroundMusicSource.stop();
            this.backgroundMusicSource = null; // Reset the source
            this.isBackgroundMusicPlaying = false; // Track that music is no longer playing
        }
    }
    muteBackgroundMusic() {
        if (this.gainNode) {
            this.gainNode.gain.setValueAtTime(-1, this.audioContext.currentTime);
        }
    }
    unmuteBackgroundMusic() {
        if (this.gainNode) {
            this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
        }    
    }
    play(name) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffers[name];
        source.connect(this.audioContext.destination);
        source.start(0);
    }
}
