// audioPlayback.js (Revised)

// Dependencies: Requires an external audio context initialization.
import { fetchAndDecodeAudio } from './audioBufferAndPlayback.js'; // Assuming fetchAndDecodeAudio is exported from this module

export async function initializeAudioPlayback(audioCtx, audioUrl, canvasId) {
    console.log('Initializing audio playback...');
    const audioBuffer = await fetchAndDecodeAudio(audioCtx, audioUrl);
    console.log(`Audio buffer duration: ${audioBuffer.duration}`);

    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    console.log('Canvas element found, adding click event listener.');
    canvas.addEventListener('click', () => handleCanvasClick(audioCtx, audioBuffer, canvas));
}

async function handleCanvasClick(audioCtx, audioBuffer, canvas) {
    console.log('Canvas clicked, starting audio playback.');
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
        console.log('Audio context resumed');
    }
    scheduleAudioPlayback(audioCtx, audioBuffer, canvas.getContext('2d'));
}
