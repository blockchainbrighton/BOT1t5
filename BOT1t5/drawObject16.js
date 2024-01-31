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
            cp.rP(cp.c, a);

            function drawObject(obj) {
                for (let f of obj.f) {
                    let v = f.map((i) => obj.v[i]);
                    let p = v.map((v) => ({ x: v.x, y: v.y }));
                    cx.beginPath();
                    cx.moveTo(p[0].x, p[0].y);
                    cx.lineTo(p[1].x, p[1].y);
                    cx.lineTo(p[2].x, p[2].y);
                    cx.closePath();
                    let m = (p[0].y + p[1].y + p[2].y) / 100;
                    
                    cx.fillStyle = ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 11)) % 11 === 0) ? 'grey' : 'black';
                    cx.fill();
                    cx.strokeStyle = 'black';
                    cx.stroke();
                }
            }

            drawObject(cp.cy);
            drawObject(cp.sp1);
            drawObject(cp.sp2);
            requestAnimationFrame(d);
        }

        requestAnimationFrame(d);