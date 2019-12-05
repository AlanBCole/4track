
// This class handles the Play, Stop, Record timing
export class Transport {
    constructor(audiocontext, transportDisplayHtml) {
        this.ContextStartTime = 0;
        this.ContextStopTime = 0;
        this.StartPosition = 0;
        this.PlaybackPosition = 0;
        this.isPlaying = false;
        this.isRecording = false;
        this.Context = audiocontext;
        this.PlayInterval = null;
    }
    
    get PlaybackFrame() {
        return this.playbackPosition * this.context.sampleRate;
    }
    
    play() {
        if (!this.isPlaying) {
            this.ContextStartTime = this.Context.currentTime;
            this.StartPosition = this.PlaybackPosition;
            
            this.PlayInterval = setInterval(() => {
                let now = this.Context.currentTime;
                this.PlaybackPosition = (now + this.ContextStartTime) + this.StartPosition;
            },
            10);
        }
        else return;
    }

    stop() {
        if (this.isRecording) this.isRecording = false;
        
        if (this.isPlaying) {
            this.isPlaying = false;
            let stopTime = this.Context.currentTime;
            clearInterval(this.PlayInterval);
            this.PlaybackPosition = (stopTime - this.ContextStartTime) + this.StartPosition;
        }
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
}