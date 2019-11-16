const mixer = document.querySelector('#mixer');
mixer.addEventListener('click', (e) => {
    const [ start, stop, audio ] = e.target.parentNode.children;
    const id = e.target.parentNode.id;
    
    if (e.target === start) {
        console.log(`clicked track-${id}`, start);
        stop.disabled = false;
        start.disabled = true;
        
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => startRecording(stream, stop, audio));
    }
    
    else if (e.target === stop) {
        console.log(`clicked track-${id}`, stop);
        stop.disabled = true;
        start.disabled = false;
    }
});

// start.onclick = (e) => {
//     start.disabled = true;
//     stop.disabled = false;
    

// };

function startRecording(stream, stopButton, audioElement) {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    stopButton.onclick = (e) => {
        mediaRecorder.stop();
    };
    
    mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);

        }
    });
        
    mediaRecorder.addEventListener('stop', function() {
        audioElement.src = URL.createObjectURL(new Blob(recordedChunks));
        audioElement.hidden = false;
    });
        
    mediaRecorder.start();
}