export class AudioContext {
    constructor() {
        this.sampleRate = 48000;
        this._currentTime = 0;
        this._timer = null;
        // this timer is not as accurate as a real context's currentTime
        // but might work well enough for testing purposes...
        this._startTimer();
    }
    
    get currentTime() {
        return this._currentTime;
    }
    
    _startTimer () {
        this.timer = setInterval(() => {
            // this check is just to ensure that the timer does not crash everything! not sure if it is needed.
            if (this._currentTime < this.sampleRate) {
                this._currentTime += 0.005;
            }
            else {
                clearInterval(this._timer);
            }
        }, 5);
    }
    
    
}