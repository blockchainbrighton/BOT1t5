


// importAudionalAudio.js
let audioContextInstance;
function getAudioContext() {
    if (!audioContextInstance) {
        audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
        console.log(`Audio context state: ${audioContextInstance.state}`);
    }
    return audioContextInstance;
}

// Define global audio context
const audioCtx = getAudioContext();

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
        
        const audioData = data.audioData.split(",")[1]; // Extracting base64 encoded string
        const arrayBuffer = await (await fetch(`data:audio/mpeg;base64,${audioData}`)).arrayBuffer();
        return audioCtx.decodeAudioData(arrayBuffer)
            .then((decodedData) => {
                console.log('Audio data decoded successfully');
                return decodedData;
            }).catch((error) => {
                console.error('Error decoding audio data:', error);
            });
    } catch (error) {
        console.error('Error fetching or decoding audio data:', error);
    }
}

