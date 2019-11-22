class Transport {
    constructor(audiocontext, transportDisplayHtml) {
        this.startTime = 0;
        this.headFrame = 0;
        this.startFrame = 0;
        this.stopFrame = 0;
        // this.length = 0;
        this.isPlaying = false;
        this.isRecording = false;
        this.context = audiocontext;
        this.playInterval = null;
        // this.transportDisplay = transportDisplayHtmlElement
    }

    play(htmlTransportDisplayElement) {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.startTime = this.context.currentTime;
            this.startFrame = this.headFrame;
            console.log(`starting playback at ${this.startFrame / this.context.sampleRate}.`);
            this.start(htmlTransportDisplayElement);
        }
        else return;
    }

    stop() {
        if (this.isRecording) this.isRecording = false;
        
        if (this.isPlaying) {
            clearInterval(this.playInterval);
            this.isPlaying = false;
            let stopTime = this.context.currentTime;
            this.stopFrame = parseInt(((stopTime - this.startTime) * this.context.sampleRate)) + this.startFrame;
            this.headFrame = this.stopFrame;
    
            console.log(`played for ${stopTime - this.startTime} seconds.`);
            console.log(`ended at ${this.headFrame / this.context.sampleRate}`);
            
        }
        else console.log('Please press play first!');
    }
    
    start(htmlElement) {
        if (this.isPlaying) {
            this.playInterval = setInterval(() => {
                let now = this.context.currentTime;
                this.headFrame = parseInt(((now - this.startTime) * this.context.sampleRate)) + this.startFrame;
                this.emitHeadPosition(htmlElement);
            },
            10);
        }
    }
    
    // where is the best place to pass in the htmlElement when invoking this command
    emitHeadPosition(htmlElement) {
        let event = new CustomEvent('headMove', { bubbles: true, detail: { time: this.headFrame / this.context.sampleRate }});
        htmlElement.dispatchEvent(event);
    }
    
    set headPosition(time) {
        this.headPosition = parseInt(time * this.context.sampleRate);
    }
}

module.exports = Transport;