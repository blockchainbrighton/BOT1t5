let scaleFactor = 3,
    S = window.innerWidth,
    R = 100 * scaleFactor,
    H = 2 * R,
    RS = (2 * Math.PI) / 2000 / 1000,
    SR = 100 * scaleFactor,
    OR = 100 * scaleFactor,
    cv = document.getElementById('cv'),
    cx = cv.getContext('2d'),
    currentColorIndex = 4; // Hardcoded array value

cv.width = S;
cv.height = S;

class Cy {
    constructor(c, r, h, s) {
        this.c = c;
        this.r = r;
        this.h = h;
        this.s = s;
        this.gV();
        this.gF();
    }

    gV() {
        this.v = [];
        for (let i = 0; i <= this.s; i++) {
            let y = this.c.y - this.h / 2 + (i / this.s) * this.h;
            for (let j = 0; j <= this.s; j++) {
                let a = (j / this.s) * 2 * Math.PI,
                    x = this.c.x + this.r * Math.cos(a),
                    z = this.c.z + this.r * Math.sin(a);
                this.v.push({ x, y, z });
            }
        }
    }

    gF() {
        this.f = [];
        for (let i = 0; i < this.s; i++) {
            for (let j = 0; j < this.s; j++) {
                let i1 = i * (this.s + 1) + j,
                    i2 = i1 + 1,
                    i3 = i1 + this.s + 1,
                    i4 = i3 + 1;
                this.f.push([i1, i2, i3]);
                this.f.push([i2, i4, i3]);
            }
        }
    }
}