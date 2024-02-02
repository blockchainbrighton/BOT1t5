// importAudionalAudio.js




// Define global audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

console.log(`Audio context state: ${audioCtx.state}`);

// Function to fetch and decode audio data
async function fetchAndDecodeAudio(url) {
    console.log('Fetching audio data from:', url);
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error('Error fetching audio data:', response.statusText);
            return;
        }
        
        const data = await response.json();
        console.log('Audio data fetched successfully');
        
        const audioData = data.audioData.split(",")[1]; // Splitting to extract base64 encoded string
        const arrayBuffer = await (await fetch(`data:audio/mpeg;base64,${audioData}`)).arrayBuffer();

        return audioCtx.decodeAudioData(arrayBuffer).then((decodedData) => {
            console.log('Audio data decoded successfully');
            return decodedData;
        }).catch((error) => {
            console.error('Error decoding audio data:', error);
        });
    } catch (error) {
        console.error('Error fetching or decoding audio data:', error);
    }
}

// Function to play the audio buffer
function playAudioBuffer(buffer) {
    console.log('Playing audio buffer');
    
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
    
    console.log('Audio playback started');
}

// Function to schedule playing the audio sample at 123 BPM
function scheduleAudioPlayback(audioBuffer) {
    const beatInterval = 60 / 123; // Duration of each beat in seconds
    let nextTime = audioCtx.currentTime; // Start immediately for the first time

    const playLoop = () => {
        while (nextTime < audioCtx.currentTime + 1) { // Schedule at least 1 second ahead
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start(nextTime);
            nextTime += beatInterval; // Schedule next beat
            console.log(`Scheduling next beat at ${nextTime}`);
        }
        requestAnimationFrame(playLoop); // Use requestAnimationFrame for continuous scheduling
    };

    playLoop();
}


// Main function to initialize the process
async function initializeAudioPlayback() {
    const audioBuffer = await fetchAndDecodeAudio('https://ordinals.com/content/8fa54ad2d9e297c79b225eff67a481ebc8682dacf4fe9dbf5b692a60b237c163i0');
    console.log(`Audio buffer duration: ${audioBuffer.duration}`);

    console.log('Adding click event listener to document for audio playback');
    
    document.addEventListener('click', async function(event) {
        console.log('Document clicked, checking for IMG tag...');
        
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
            console.log('Audio context resumed');
        }

        if (event.target.tagName === 'IMG') {
            scheduleAudioPlayback(audioBuffer);
        }
    });
}

// Call the main function to set everything up
initializeAudioPlayback();