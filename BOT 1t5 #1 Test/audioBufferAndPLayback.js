// audioBufferAndPlayback.js

document.addEventListener('DOMContentLoaded', function() {
    initializeAudioPlayback();
});

async function initializeAudioPlayback() {
    console.log('Initializing audio playback...');
    const audioBuffer = await fetchAndDecodeAudio('https://ordinals.com/content/8fa54ad2d9e297c79b225eff67a481ebc8682dacf4fe9dbf5b692a60b237c163i0');
    console.log(`Audio buffer duration: ${audioBuffer.duration}`);

    const canvas = document.getElementById('cv');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    console.log('Canvas element found, adding click event listener.');

    canvas.addEventListener('click', async function() {
        console.log('Canvas clicked, starting audio playback.');
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
            console.log('Audio context resumed');
        }
        scheduleAudioPlayback(audioBuffer, canvas.getContext('2d'));
    });
}

// Define beat interval outside of the function to ensure it's only calculated once
const beatInterval = 60 / 123; // Duration of each beat in seconds

function scheduleAudioPlayback(audioBuffer, cx) {
    let visualUpdateRate = 1; // Can be adjusted: 1x, 2x, 4x, etc.
    let nextVisualUpdateTime = audioCtx.currentTime;
    
    function playLoop(startTime) {
        // Setup audio playback
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.start(startTime);
        
        // Visual update scheduling
        while (nextVisualUpdateTime < startTime + audioBuffer.duration) {
            setTimeout(() => {
                draw(); // Update visuals at each scheduled time
            }, (nextVisualUpdateTime - audioCtx.currentTime) * 1000);
            
            nextVisualUpdateTime += beatInterval / visualUpdateRate;
        }

        // Schedule the next audio loop
        const nextStartTime = startTime + beatInterval;
        setTimeout(() => playLoop(nextStartTime), (nextStartTime - audioCtx.currentTime) * 1000);
    }

    playLoop(audioCtx.currentTime);
}

cp.drawObject = function(obj, tm) {
    for (let f of obj.f) {
        let v = f.map((i) => obj.v[i]);
        let p = v.map((v) => ({ x: v.x, y: v.y }));
        cx.beginPath();
        cx.moveTo(p[0].x, p[0].y);
        for (let i = 1; i < p.length; i++) {
            cx.lineTo(p[i].x, p[i].y);
        }
        cx.closePath();

        // Assuming angle, tm, and v are calculated correctly here
        let angle = Math.atan2(p[0].y - S / 2, p[0].x - S / 2) * 180 / Math.PI;
        
        // Now, obtain colors dynamically
        let colors = getColors(angle, tm, v); // Make sure to define tm and v appropriately
        function getColors(angle, tm, v) {
            // Corrected beat calculation based on BPM and current time
            const beatsPassed = tm / beatInterval;
            const dynamicModulo = Math.floor(beatsPassed % 8);
        
            // Dynamic color calculation based on beatsPassed and geometry
            return [
        
                ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111) + dynamicModulo) % 8 === 0) ? 'magenta' : 'black', // #10 pastel blue sliders

            ];
        }
        cx.fillStyle = colors[cci % colors.length];
        cx.fill();

        cx.strokeStyle = 'black';
        cx.stroke();
    }
};

let lastAudioTime = audioCtx.currentTime; // Moved outside to maintain state across calls


// Function to draw/update visuals
function draw() {

    let tm = audioCtx.currentTime; // Correctly capture the current time
    cx.clearRect(0, 0, S, S);
    let a = (tm - lastAudioTime) * RS * 100; // Assume RS is defined and represents rotation speed
    lastAudioTime = tm; // Update for the next frame

    // Pass `tm` to `cp.drawObject` for dynamic color changes
    cp.drawObject(cp.cy, tm);
    cp.drawObject(cp.sp1, tm);
    cp.drawObject(cp.sp2, tm);
    requestAnimationFrame(draw); // Request the next animation frame
}


requestAnimationFrame(draw); // Start the animation loop

 