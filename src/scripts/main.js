const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const player = document.querySelector('audio');

start.onclick = (e) => {
    start.disabled = true;
    stop.disabled = false;
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(startRecording);

};

function startRecording(stream) {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    stop.onclick = (e) => {
        start.disabled = false;
        stop.disabled = true;
        mediaRecorder.stop();
    };
    
    mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);

        }
    });
        
    mediaRecorder.addEventListener('stop', function() {
        player.src = URL.createObjectURL(new Blob(recordedChunks));
        player.hidden = false;
    });
        
    mediaRecorder.start();
}