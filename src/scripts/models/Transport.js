class Transport {
    constructor(audiocontext) {
        this.startTime = 0;
        this.headFrame = 0;
        this.startFrame = 0;
        this.stopFrame = 0;
        this.length = 0;
        this.isStarted = false;
        this.isRecording = false;
        this.context = audiocontext;
    }

    start() {
        if (!this.isStarted) {
            this.isStarted = true;
            this.startTime = this.context.currentTime;
            this.startFrame = this.headFrame;
            console.log(`starting playback at ${this.startFrame / this.context.sampleRate}.`);
        }
        else return;
    }

    stop() {
        if (this.isRecording) this.isRecording = false;
        
        if (this.isStarted) {
            this.isStarted = false;
            let stopTime = this.context.currentTime;
            this.stopFrame = parseInt(((stopTime - this.startTime) * this.context.sampleRate)) + this.startFrame;
            this.headFrame = this.stopFrame;
    
            console.log(`played for ${stopTime - this.startTime} seconds.`);
            console.log(`ended at ${this.headFrame / this.context.sampleRate}`);
            
        }
        else console.log('Please press play first!');
    }
}

module.exports = Transport;