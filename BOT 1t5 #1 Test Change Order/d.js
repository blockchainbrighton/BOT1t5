// drawObject16.2.js

// Updated drawObject method to sync color changes with 123 BPM
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
        
         // Obtain colors dynamically, modified to use beatCycle for synchronization
         let colors = getColors(angle, tm, v, p); // Adjust getColors to accept beatCycle if needed

        // Calculate the beat interval in milliseconds for 123 BPM
        let beatDurationMs = 60000 / 60; // 60,000 ms in a minute divided by 123 BPM
        let beatCycle = Math.floor(tm / beatDurationMs) % colors.length; // Cycle through colors based on the beat

       
        cx.fillStyle = colors[beatCycle];
        cx.fill();

        cx.strokeStyle = 'black';
        cx.stroke();
    }
};

// Updated d function with timing for 123 BPM
function d(tm) {
    cx.clearRect(0, 0, S, S);
    let a;
    if (t === undefined) {
        a = 0;
    } else {
        let d = tm - t;
        a = RS * d * 100;
    }
    t = tm;
    cp.rP(cp.c, a); // Adjust color patterns based on rotation

    // Pass `tm` to `cp.drawObject` for dynamic color changes synchronized with BPM
    cp.drawObject(cp.cy, tm);
    cp.drawObject(cp.sp1, tm);
    cp.drawObject(cp.sp2, tm);
    requestAnimationFrame(d);
}

requestAnimationFrame(d);

function applyGradient1(cx, p) {
    let moveGradient = cx.createLinearGradient(p[0].x, p[0].y, p[1].x, p[1].y);
    moveGradient.addColorStop(0, `rgba(139, 69, 19, 0.5)`);
    moveGradient.addColorStop(1, `rgba(245, 245, 220, 0.5)`);
    cx.fillStyle = moveGradient;
    cx.fill();
}

function applyGradient2(cx, p) {
    let moveGradient = cx.createLinearGradient(p[0].x, p[0].y, p[1].x, p[1].y);
    moveGradient.addColorStop(0, `rgba(0, 128, 128, 0.5)`);
    moveGradient.addColorStop(1, `rgba(255, 218, 185, 0.5)`);
    cx.fillStyle = moveGradient;
    cx.fill();
}