// drawObject16.2.js

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

        // Calculate the mean Y position of the first 3 points for color adjustment (if needed)
        let m = (p[0].y + p[1].y + p[2].y) / 3;

        // Calculate the angle for dynamic hue changes
        let angle = Math.atan2(p[0].y - S / 2, p[0].x - S / 2) * 180 / Math.PI;
        let hue = (angle + tm / 500) % 360;

        // The Section below is now updated to use the currentColorIndex to select the color
        cx.fillStyle = colors[currentColorIndex % colors.length];
        cx.fill();

        cx.strokeStyle = 'black';
        cx.stroke();
    }
};

// drawObject16.1.js

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

    // Pass `tm` to `cp.drawObject` for dynamic color changes
    cp.drawObject(cp.cy, tm);
    cp.drawObject(cp.sp1, tm);
    cp.drawObject(cp.sp2, tm);
    requestAnimationFrame(d);
}

requestAnimationFrame(d);
