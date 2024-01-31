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

// The Section below is the section that needs to be modified to use the colourComboArray to use different settings for drawing each object.

        cx.fillStyle = ((Math.floor(v[0].x / 0.55555) + Math.floor(v[0].y / 333)) % 666 === 0) ? 'yellow' : 'black';
        cx.fill();

// The Section above is the section that needs to be modified to use the colourComboArray to use different settings for drawing each object.


        cx.strokeStyle = 'black';
        cx.stroke();
    }
};

