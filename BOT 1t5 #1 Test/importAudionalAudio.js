// importAudionalAudio.js

// Define global audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to fetch and decode audio data
async function fetchAndDecodeAudio(url) {
  const response = await fetch(url);
  const data = await response.json(); // Assuming the audio data is stored in JSON format
  const audioData = data.audioData.split(",")[1]; // Splitting to extract base64 encoded string
  const arrayBuffer = await (await fetch(`data:audio/mpeg;base64,${audioData}`)).arrayBuffer();
  return audioCtx.decodeAudioData(arrayBuffer);
}

// Function to play the audio buffer
function playAudioBuffer(buffer) {
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
}

// Function to schedule playing the audio sample at 123 BPM
function scheduleAudioPlayback(audioBuffer) {
  const beatInterval = 60 / 123; // Duration of each beat in seconds
  
  let lastBeatTime = audioCtx.currentTime;
  const playBeat = () => {
    playAudioBuffer(audioBuffer);
    lastBeatTime += beatInterval;
    setTimeout(playBeat, (lastBeatTime - audioCtx.currentTime) * 1000);
  };

  playBeat(); // Start playing
}

// Main function to initialize the process
async function initializeAudioPlayback() {
  const audioBuffer = await fetchAndDecodeAudio('https://ordinals.com/content/8fa54ad2d9e297c79b225eff67a481ebc8682dacf4fe9dbf5b692a60b237c163i0');
  
  document.addEventListener('click', function(event) {
    // Check if the target is the specific image, use a more specific selector as needed
    if (event.target.tagName === 'IMG') {
      scheduleAudioPlayback(audioBuffer);
    }
  });
}

// Call the main function to set everything up
initializeAudioPlayback();
