let currentPoints = []; // This will store the last known 'p' values
let currentEffectIndex = 0; // Initial position in the array
let effectChanged = false;



function applyCurrentEffect(tm) {
  if (typeof S === 'undefined' || !cx || currentPoints.length === 0) return;

  // Apply the effect
  getColors[currentEffectIndex](cx, angle, tm, v, p); // Adjusted to pass the correct parameters
}
  // Optionally reset the flag here if one-time application is needed
  // effectChanged = false;




// // To call an effect from the array, assuming you have cx, p, tm, and S defined:
// colorEffects_2[0](cx, p, tm, S); // This would apply the first effect
// // You can loop or select effects based on time or other conditions

// Event listener for keydown events
document.addEventListener('keydown', function(event) {
  console.log(`Key pressed: ${event.key}`); // Check which key was pressed

  console.log(`Before update: currentEffectIndex = ${currentEffectIndex}`);
  // Use event.key directly in your conditionals
  if (event.key === "ArrowRight") {
      currentEffectIndex = (currentEffectIndex + 1) % colorEffects_2.length;
  } else if (event.key === "ArrowLeft") {
      currentEffectIndex = (currentEffectIndex - 1 + colorEffects_2.length) % colorEffects_2.length;
  }
  console.log(`After update: currentEffectIndex = ${currentEffectIndex}`);
  
  // Call applyCurrentEffect with the current time
  applyCurrentEffect(Date.now());
  console.log(`Applying effect at index: ${currentEffectIndex}, Time: ${Date.now()}`);

  event.preventDefault();
  effectChanged = true;

});
//

function createWaveEffect(cx, p, time, colorStop1, colorStop2) {
  let moveGradient = cx.createLinearGradient(p[0].x, p[0].y, p[1].x, p[1].y);

  // Calculate an oscillation factor between 0 and 1
  let oscillation = (Math.sin(time / 1000) + 1) / 2; // time should be in milliseconds or any other uniform measure

  // Apply oscillation to color stops
  moveGradient.addColorStop(oscillation * 0.5, colorStop1); // Oscillates between 0 and 0.5
  moveGradient.addColorStop(1 - oscillation * 0.5, colorStop2); // Oscillates between 0.5 and 1

  cx.fillStyle = moveGradient;
  cx.fill();
}

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
  // Updated drawObject method to sync color changes with 123 BPM
  // Updated cp.drawObject method to include the createWaveEffect function call
cp.drawObject = function(obj, tm) {
  for (let f of obj.f) {
      let v = f.map((i) => obj.v[i]);
      let p = v.map((v) => ({ x: v.x, y: v.y }));
      let angle = Math.atan2(p[0].y - S / 2, p[0].x - S / 2) * 180 / Math.PI;

      // Update global currentPoints with the latest p values
      currentPoints = p;

      cx.beginPath();
      cx.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) {
          cx.lineTo(p[i].x, p[i].y);
      }
      cx.closePath();

      // let currentTimeInSeconds = Math.floor(tm / 60000);
   
       colorEffects_2[currentEffectIndex](cx, currentPoints, tm, S);
          // colorEffects [currentEffectIndex](cx, p, tm);
         // getColors [currentEffectIndex] (angle, tm, v, p)
      // console.log(`Canvas size 2nd log: (S): ${S}`);

      cx.strokeStyle = 'black';
      cx.stroke();
     

  }
  // console.log(`Executing effect #${currentEffectIndex} with time ${tm} and S ${S}`);
  // console.log(`currentPoints:`, currentPoints);
  // console.log(`Canvas size S: ${S}`);
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
  if (effectChanged) {
    applyCurrentEffect(tm);
     effectChanged = false;
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



// Correct definition of getColors
const getColors = [
  (cx, angle, tm, v, p) => {
    // Assuming you adjust the logic to use the parameters correctly
    const colorValue = Math.floor(Math.random() * 255);
    cx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    cx.fill();
  },
  // More functions as needed
];


const colorEffects = [
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 165, 0, 0.5)', 'rgba(0, 0, 0, 0.5)'), // Orange and Black
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 64, 0.5)', 'rgba(255, 255, 0, 0.5)'), // Green and Yellow
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 192, 0.5)', 'rgba(255, 0, 0, 0.5)'), // Blue and Red
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 69, 0, 0.5)', 'rgba(255, 218, 185, 0.5)'), // Orange and Light Pink (Doge)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 128, 128, 0.5)', 'rgba(255, 255, 0, 0.5)'), // Gray and Yellow (Ethereum)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 0, 128, 0.5)', 'rgba(255, 165, 0, 0.5)'), // Blue and Orange (Ripple)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 255, 0.5)', 'rgba(255, 0, 128, 0.5)'), // Light Blue and Pink (Litecoin)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 128, 0.5)', 'rgba(0, 128, 0, 0.5)'), // Purple and Green (Cardano)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 128, 0, 0.5)', 'rgba(0, 0, 128, 0.5)'), // Olive and Navy (Chainlink)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 0, 255, 0.5)', 'rgba(128, 0, 0, 0.5)'), // Magenta and Maroon (Polkadot)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'), // Green and Blue (Aave)
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 128, 0, 0.5)', 'rgba(255, 0, 128, 0.5)'), // Orange and Pink (Chainlinm
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(139, 69, 19, 0.5)', 'rgba(245, 245, 220, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 128, 0.5)', 'rgba(255, 218, 185, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 0, 255, 0.5)', 'rgba(255, 255, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 165, 0, 0.5)', 'rgba(0, 255, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 128, 0.5)', 'rgba(255, 0, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 255, 0, 0.5)', 'rgba(0, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 0, 0.5)', 'rgba(128, 0, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 128, 0, 0.5)', 'rgba(0, 128, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 0, 128, 0.5)', 'rgba(128, 128, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 64, 0.5)', 'rgba(64, 128, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 64, 128, 0.5)', 'rgba(64, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 64, 0, 0.5)', 'rgba(0, 128, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 64, 0.5)', 'rgba(64, 128, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 128, 64, 0.5)', 'rgba(128, 64, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 64, 64, 0.5)', 'rgba(128, 0, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 128, 128, 0.5)', 'rgba(0, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 64, 64, 0.5)', 'rgba(64, 64, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 128, 0.5)', 'rgba(128, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 64, 0.5)', 'rgba(64, 128, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 128, 0.5)', 'rgba(0, 64, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 69, 0, 0.5)', 'rgba(0, 128, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 128, 255, 0.5)', 'rgba(255, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 255, 128, 0.5)', 'rgba(128, 0, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 128, 0, 0.5)', 'rgba(0, 255, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 255, 64, 0.5)', 'rgba(255, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 64, 128, 0.5)', 'rgba(64, 0, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 192, 0.5)', 'rgba(192, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 128, 0, 0.5)', 'rgba(128, 192, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 64, 0.5)', 'rgba(64, 192, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 64, 192, 0.5)', 'rgba(192, 64, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 192, 0.5)', 'rgba(64, 192, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 192, 0.5)', 'rgba(192, 192, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 0, 0.5)', 'rgba(64, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 0, 0.5)', 'rgba(192, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 0, 64, 0.5)', 'rgba(64, 192, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 192, 0.5)', 'rgba(192, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 192, 0.5)', 'rgba(64, 192, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 192, 0.5)', 'rgba(192, 192, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 0, 0.5)', 'rgba(64, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 0, 0.5)', 'rgba(192, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(139, 69, 19, 0.5)', 'rgba(245, 245, 220, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 128, 0.5)', 'rgba(255, 218, 185, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 0, 255, 0.5)', 'rgba(255, 255, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 165, 0, 0.5)', 'rgba(0, 255, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 128, 0.5)', 'rgba(255, 0, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 255, 0, 0.5)', 'rgba(0, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 0, 0.5)', 'rgba(128, 0, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 128, 0, 0.5)', 'rgba(0, 128, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 0, 128, 0.5)', 'rgba(128, 128, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 64, 0.5)', 'rgba(64, 128, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 64, 128, 0.5)', 'rgba(64, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 64, 0, 0.5)', 'rgba(0, 128, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 64, 0.5)', 'rgba(64, 128, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 128, 64, 0.5)', 'rgba(128, 64, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 64, 64, 0.5)', 'rgba(128, 0, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 128, 128, 0.5)', 'rgba(0, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 64, 64, 0.5)', 'rgba(64, 64, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 128, 0.5)', 'rgba(128, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 64, 0.5)', 'rgba(64, 128, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 128, 0.5)', 'rgba(0, 64, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 69, 0, 0.5)', 'rgba(0, 128, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 128, 255, 0.5)', 'rgba(255, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 255, 128, 0.5)', 'rgba(128, 0, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 128, 0, 0.5)', 'rgba(0, 255, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 255, 64, 0.5)', 'rgba(255, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(255, 64, 128, 0.5)', 'rgba(64, 0, 255, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(0, 128, 192, 0.5)', 'rgba(192, 0, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 128, 0, 0.5)', 'rgba(128, 192, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(128, 0, 64, 0.5)', 'rgba(64, 192, 128, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 64, 192, 0.5)', 'rgba(192, 64, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 192, 0.5)', 'rgba(64, 192, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 192, 0.5)', 'rgba(192, 192, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 0, 0.5)', 'rgba(64, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 0, 0.5)', 'rgba(192, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 0, 64, 0.5)', 'rgba(64, 192, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 192, 0.5)', 'rgba(192, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 192, 0.5)', 'rgba(64, 192, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 192, 0.5)', 'rgba(192, 192, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 0, 0.5)', 'rgba(64, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 0, 0.5)', 'rgba(192, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 0, 64, 0.5)', 'rgba(64, 192, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 192, 0.5)', 'rgba(192, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 192, 0.5)', 'rgba(64, 192, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 192, 0.5)', 'rgba(192, 192, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 0, 0.5)', 'rgba(64, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 0, 0.5)', 'rgba(192, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 0, 64, 0.5)', 'rgba(64, 192, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 192, 0.5)', 'rgba(192, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 192, 0.5)', 'rgba(64, 192, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 192, 0.5)', 'rgba(192, 192, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 0, 0.5)', 'rgba(64, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 0, 0.5)', 'rgba(192, 0, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 0, 64, 0.5)', 'rgba(64, 192, 0, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 0, 192, 0.5)', 'rgba(192, 0, 64, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(192, 64, 192, 0.5)', 'rgba(64, 192, 192, 0.5)'),
  (cx, p, tm) => createWaveEffect(cx, p, tm, 'rgba(64, 192, 192, 0.5)', 'rgba(192, 192, 64, 0.5)')

];

const colorEffects_2 = [
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'saddlebrown'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'olive'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'limegreen'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'rebeccapurple'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'lightpink'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'lightblue'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'gold'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'silver'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'black'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'white'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 20000)), 'teal'); g.addColorStop(1 - Math.abs(Math.sin(tm / 20000)), 'maroon'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 5000)), 'pink'); g.addColorStop(1 - Math.abs(Math.sin(tm / 5000)), 'lime'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'purple'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'orange'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'green'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'yellow'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 10000)), 'red'); g.addColorStop(1 - Math.abs(Math.sin(tm / 10000)), 'blue'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 30000)), 'red'); g.addColorStop(1 - Math.abs(Math.sin(tm / 30000)), 'blue'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 6000000)), 'red'); g.addColorStop(1 - Math.abs(Math.sin(tm / 600000)), 'blue'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 300000)), 'red'); g.addColorStop(1 - Math.abs(Math.sin(tm / 150000)), 'blue'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 50000)), 'saddlebrown'); g.addColorStop(1 - Math.abs(Math.sin(tm / 500000)), 'olive'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 100000)), 'lightpink'); g.addColorStop(1 - Math.abs(Math.sin(tm / 100000)), 'lightblue'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 100000)), 'gold'); g.addColorStop(1 - Math.abs(Math.sin(tm / 100000)), 'silver'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 100000)), 'black'); g.addColorStop(1 - Math.abs(Math.sin(tm / 100000)), 'white'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 50000)), 'teal'); g.addColorStop(1 - Math.abs(Math.sin(tm / 50000)), 'maroon'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 50000)), 'pink'); g.addColorStop(1 - Math.abs(Math.sin(tm / 50000)), 'lime'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 30000)), 'purple'); g.addColorStop(1 - Math.abs(Math.sin(tm / 30000)), 'orange'); cx.fillStyle = g; cx.fill(); },
  (cx, currentPoints, tm, S) => { let g = cx.createLinearGradient(0, 0, S, S); g.addColorStop(Math.abs(Math.sin(tm / 30000)), 'green'); g.addColorStop(1 - Math.abs(Math.sin(tm / 30000)), 'yellow'); cx.fillStyle = g; cx.fill(); }

  // Continue converting the rest of the blocks to functions as shown
];



//const getColors =
//  [

//
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #75
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #74
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 16 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #73
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 32 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #72
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 64 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #76
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (3 * R) * 255)); return colorValue > 64 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (3 * R) * 255)); return colorValue > 64 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (3 * R) * 255)); return colorValue > 64 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (3 * R) * 255)); return colorValue > 64 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//
//    
//    
//    // #77
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (4 * R) * 255)); return colorValue > 32 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #78
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (5 * R) * 255)); return colorValue > 16 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//     // #72
//     (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 64 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//   
// // #73
// (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 32 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    
//  // #74
//  (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 16 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #75
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//   
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    // #79
//    (() => { const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255)); return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color'; })(),
//    
//  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',
//  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',
//  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',
//  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',


// PLAIN COLOURS
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255) % 255}, ${(Math.floor((v[0].z + R) / (2 * R) * 255) + 85) % 255}, ${(Math.floor((v[0].z + R) / (2 * R) * 255) + 170) % 255})` : 'alternative-color', //#40
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? (Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? 'blue' : 'red') : 'alternative-color',
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, 0, ${255 - Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color', // #46 Plain Pink
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgba(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, 0.5)` : 'alternative-color', // #48 Plain pastel pink
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, 100, 150)` : 'alternative-color', // #49 Crazy Circus
// () => { cx.fillStyle = `hsl(${Math.abs(Math.sin(tm / 2200)) * 300}, 100%, 50%)`; cx.fillRect(0, 0, S, S); },

// // CRAZY EYES
// Math.floor((v[0].z + R) / (2 * R) * 360) < 180 ? `hsl(${Math.floor((v[0].z + R) / (2 * R) * 360)}, 100%, 50%)` : 'alternative-color', // #47 Goggle Eyes


// DISCO BALLS
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 40}, 50%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 250}, 70%, 50%)`, // #52 blue/brown Crazy Circus
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 40) + 30}, 70%, 30%)` : `hsl(${Math.floor(Math.random() * 60) + 180}, 70%, 60%)`, // #53 Purple Orange Crazy Circus
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 40) + 30}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 30) + 270}, 80%, 50%)`,// #54 red white blue Crazy Circus
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 360)}, 60%, 80%)` : `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`, // #55 Blue Orange Crazy Circus
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 30) + 240}, 70%, 40%)` : `hsl(${Math.floor(Math.random() * 30) + 10}, 80%, 60%)`, // #56 Green Blue Crazy Circus
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 220}, 80%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 30}, 90%, 50%)`, // #57 Yellow green Crazy Circus
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 50) + 90}, 40%, 40%)` : `hsl(${Math.floor(Math.random() * 30) + 40}, 60%, 50%)`,
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 180}, 70%, 50%)` : `hsl(${Math.floor(Math.random() * 40) + 10}, 90%, 60%)`, // #59 Bright yellow circus
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 50) + 70}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 50) + 20}, 100%, 50%)`,
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60)}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 180}, 100%, 50%)`, // #61 Dark Blue Water Effect
// Math.random() < 0.5 ? '#' + Math.floor(Math.random() * 16777215).toString(16) : 'alternative-color',  // #50 Crazy Circus (slightly less crazy)
// Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 360)}, 30%, 50%)`, // #51 Purple Crazy Circus
// Math.random() * 360 < 180 ? `hsl(${Math.random() * 360}, 100%, ${Math.random() * 100}%)` : 'alternative-color',

// GLASS DOSCO BALLS
// // #65 Generating a random alpha for RGBA for semi-transparency effects - - GLASS DISCO BALLS 
// `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
// `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
// `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
// `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
// 
// // DARK EYES
// // #61 Using ES6 arrow functions and template literals for a cleaner look - dark water
// `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,
// `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,
// `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,
// `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,
// `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,

// PLAIN WHITE
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',
// Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',
// 

// THE COOL ONE
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color', //  #44 - The Crazy One
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color', //  #44 - The Crazy One
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color', //  #44 - The Crazy One
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color', //  #44 - The Crazy One
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color', //  #44 - The Crazy One
   
    




// // #67 Dynamic alternative-color based on lightness - GREY SCALE CRAZY ONE 
// ((lightness) => lightness > 128 ? `rgb(${lightness}, ${lightness}, ${lightness})` : 'dark-mode-color')(Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)),
// ((lightness) => lightness > 128 ? `rgb(${lightness}, ${lightness}, ${lightness})` : 'dark-mode-color')(Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)),
// ((lightness) => lightness > 128 ? `rgb(${lightness}, ${lightness}, ${lightness})` : 'dark-mode-color')(Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)),
// ((lightness) => lightness > 128 ? `rgb(${lightness}, ${lightness}, ${lightness})` : 'dark-mode-color')(Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)),
// 
// // #66 Using bitwise operators for a more compact approach - XRAY SPECS 
// `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,
// `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,
// `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,
// `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,
// `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,

// // FLASHING STROBES
// `hsl(${(tm % 0.125) * 180}, 100%, 50%)`,  // #36 RED ORANGE FLASHING FRAMES
// `hsl(${((tm + 1) % 0.125) * 180}, 100%, 50%)`,  // #37 CRAZY FLASH WARNING
// `hsl(${((tm + 18) % 9) * 40}, 100%, 50%)`,  // #35  RED ORANGE FLASHING FRAMES
// `hsl(${(tm % 9) * 40}, 100%, 50%)`, // #34 - CRAZY FLASHING
// 
// `hsl(${(tm % 18) * 20}, 100%, 50%)`,  // #38 CRAZY FLASH WARNING
// `hsl(${(tm * 180) % 360}, 100%, 50%)`,  // #24 SLIGHTLY DIFF FLASH
// `hsl(${(tm * 5) % 360}, 100%, 50%)`,  // #276CRAZY WHITE FLASH
// `hsl(${(tm % 0.25) * 360}, 100%, 50%)`, // #28 CRAZY ORANGE FLASH
// `hsl(${(tm % 0.5) * 720}, 100%, 50%)`,  // #32 CRAZY FLASHING
// `hsl(${((tm + 1) % 0.5) * 720}, 100%, 50%)`,  // #33 CRAZY FLASHING


// // #71 Experimenting with a ternary operator inside the template literal for an alternative approach SPINNING RED BLACK EYES
// `rgb(${Math.random() * 255 > 128 ? Math.floor((v[0].z + R) / (2 * R) * 255) : 100}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)})`,
// 
// 
// // #68 Conditional spread for RGB values, spreading more red under certain conditions - RED BLACK DISCO BALLS 
// `rgb(${Math.random() < 0.5 ? Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) : 255}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})`,
// // #69 Incorporating CSS variables for dynamic theming -  NOTHING HERE 
// `var(--dynamic-color, rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}))`,
// // #70 Utilizing Math.sin for a cyclic color variation -  LOVE THIS ONE - CRAZY FROG EYES II 
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,






//`hsl(${(angle + 60 * Math.sin(tm / 1000)) % 360}, 100%, 50%)`,
//
//// RED CENTRE
//((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 2000)) % 666 === 0) ? 'red' : 'black',
//((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 2000)) % 666 === 0) ? 'red' : 'black',
//((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 2000)) % 666 === 0) ? 'red' : 'black',
//((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 2000)) % 666 === 0) ? 'red' : 'black',
//((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 2000)) % 666 === 0) ? 'red' : 'black',
//
//    ((Math.floor(v[0].x / 0.0001) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'grey' : 'black',
//    ((Math.floor(v[0].x / 0.0001) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'grey' : 'black',
//    ((Math.floor(v[0].x / 0.0001) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'grey' : 'black',
//    ((Math.floor(v[0].x / 0.0001) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'grey' : 'black',
//
//    ((Math.floor(v[0].x / 0.01) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'green' : 'black',
//    ((Math.floor(v[0].x / 0.01) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'green' : 'black',
//    ((Math.floor(v[0].x / 0.01) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'green' : 'black',
//
//    ((Math.floor(v[0].x / 0.1) + Math.floor(v[0].y / 1000)) % 111 === 0) ? 'orange' : 'black',
//    ((Math.floor(v[0].x / 0.1) + Math.floor(v[0].y / 1000)) % 111 === 0) ? 'orange' : 'black',
//
//    ((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 1000)) % 111 === 0) ? 'pink' : 'black',
// 
//
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black',
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? '#00001E' : 'black',
//    ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 9999)) % 9999 === 0) ? 'grey' : 'black',
//    ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 5555)) % 9999 === 0) ? 'red' : 'black',
//    ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 3333)) % 9999 === 0) ? 'white' : 'black',
//    ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 3333)) % 9999 === 0) ? 'yellow' : 'black',
//    ((Math.floor(v[0].x / 0.55555) + Math.floor(v[0].y / 333)) % 666 === 0) ? 'yellow' : 'black',
//    ((Math.floor(v[0].x / 0.55555) + Math.floor(v[0].y / 30000)) % 666 === 0) ? 'red' : 'black',
//    
//    ((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 111)) % 11 === 0) ? 'purple' : 'black',
//    ((Math.floor(v[0].x / 11) + Math.floor(v[0].y / 111)) % 11 === 0) ? 'purple' : 'black',
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 11 === 0) ? 'purple' : 'black',
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 7 === 0) ? 'blue' : 'black',
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 5 === 0) ? 'purple' : 'grey',
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 3 === 0) ? 'green' : 'black',
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 2 === 0) ? 'yellow' : 'black',
//    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 2 === 0) ? 'red' : 'blue',
//    ((Math.floor(v[0].x / 333) + Math.floor(v[0].y / 666)) % 2 === 0) ? 'red' : 'blue',
//    ((Math.floor(v[0].x / 15) + Math.floor(v[0].y / 9000)) % 2 === 0) ? 'red' : 'blue',
//    ((Math.floor(v[0].x / 15) + Math.floor(v[0].y / 9000)) % 2 === 0) ? 'purple' : 'pink',
// 
//
//    
//    `hsl(${tm % 1}, 100%, 50%)`,
//    `hsl(${(tm + 1) % 1}, 100%, 50%)`,
//    `hsl(${tm % 72}, 100%, 50%)`,
//    `hsl(${(tm + 18) % 72}, 100%, 50%)`,
//
//

// PLAIN COLOURS
    // Math.abs(Math.sin(tm / 600000)) < 0.5 ? 'red' : 'blue',
    // Math.abs(Math.sin(tm / 60000)) < 0.5 ? 'indigo' : 'orange',
    // Math.abs(Math.sin(tm / 30000)) < 0.5 ? 'red' : 'blue',
    // Math.abs(Math.sin(tm / 15000)) < 0.5 ? 'green' : 'magenta',
    // Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'saddlebrown' : 'olive',
    // Math.abs(Math.sin(tm / 50000)) < 0.5 ? 'violet' : 'skyblue',
    // Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'neongreen' : 'neonpurple',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'coral' : 'navy',
    // Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'lightpink' : 'lightblue',
    // Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'tan' : 'aquamarine',
    // Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'gold' : 'silver',
    // Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'peach' : 'forestgreen',
    // Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'black' : 'white',
    // Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'beige' : 'slategray',
    // Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'teal' : 'maroon',
    // Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'goldenrod' : 'plum',
    // Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'pink' : 'lime',
    // Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'khaki' : 'lavender',
    // Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'purple' : 'orange',
    // Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'turquoise' : 'crimson',
    // Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'green' : 'yellow',
    // Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'azure' : 'chocolate',
    // Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'red' : 'blue',
    // Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'midnightblue' : 'wheat',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'saddlebrown' : 'olive',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'palevioletred' : 'darkseagreen',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'neongreen' : 'neonpurple',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'royalblue' : 'palegoldenrod',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'lightpink' : 'lightblue',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'sienna' : 'palegreen',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'gold' : 'silver',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'aliceblue' : 'darkorchid',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'black' : 'white',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'darkslateblue' : 'lemonchiffon',
    // Math.abs(Math.sin(tm / 2000)) < 0.5 ? 'teal' : 'maroon',
    // Math.abs(Math.sin(tm / 2000)) < 0.5 ? 'springgreen' : 'hotpink',
    // Math.abs(Math.sin(tm / 500)) < 0.5 ? 'pink' : 'lime',
    // Math.abs(Math.sin(tm / 500)) < 0.5 ? 'darkturquoise' : 'rosybrown',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'purple' : 'orange',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'cadetblue' : 'darkgoldenrod',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'green' : 'yellow',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'deepskyblue' : 'tomato',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'red' : 'blue',
    // Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'seagreen' : 'salmon',  
    
    // BLACK AND WHITE 
    // (v[0].y + tm) % 200 < 100 ? `hsl(0, 0%, ${(v[0].y + tm) % 100}%)` : 'alternative-color',
    // (v[0].y + tm) % 200 < 100 ? `hsl(0, 0%, ${(v[0].y + tm) % 100}%)` : 'alternative-color',
    // (v[0].y + tm) % 200 < 100 ? `hsl(0, 0%, ${(v[0].y + tm) % 100}%)` : 'alternative-color',
    // (v[0].y + tm) % 200 < 100 ? `hsl(0, 0%, ${(v[0].y + tm) % 100}%)` : 'alternative-color',
    // ((Math.floor(v[0].x / 50) + Math.floor(v[0].y / 50)) % 2 === 0) ? 'black' : 'white',
    // ((Math.floor(v[0].x / 50) + Math.floor(v[0].y / 50)) % 2 === 0) ? 'black' : 'white',

    // RAINBOWS
    // (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, ${(tm % 100)}%, ${(tm % 100)}%)` : 'alternative-color',
    // (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, 100%, 75%)` : 'alternative-color',
    // (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, 60%, 80%)` : 'alternative-color',
    // (v[0].y * 2 + tm) % 720 < 360 ? `hsl(${(v[0].y * 2 + tm) % 360}, 100%, 50%)` : 'alternative-color',
    // 360 - ((v[0].y + tm) % 360) > 180 ? `hsl(${360 - ((v[0].y + tm) % 360)}, 100%, 50%)` : 'alternative-color',
    // (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, 100%, ${(tm % 100)}%)` : 'alternative-color',
    // (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, ${(tm % 100)}%, ${(tm % 100)}%)` : 'alternative-color',


// RAINBOW EYES
  //   `hsl(${(v[0].y + tm) % 360}, 100%, 50%)`,
  //   `hsl(${(v[0].y + tm) % 360}, 100%, 50%)`,
  //   `hsl(${(v[0].y + tm) % 360}, 100%, 50%)`,
  //   `hsl(${(v[0].y + tm) % 360}, 100%, 50%)`,


   //  `hsl(${tm % 360}, 100%, ${50 + 25 * Math.sin(tm / 1000)}%)`,
   //  `hsl(${(v[0].x + v[0].y) % 360}, 100%, 50%)`,
   //  `rgba(255, 0, 0, ${Math.sqrt(Math.pow(v[0].x - v[1].x, 2) + Math.pow(v[0].y - v[1].y, 2)) / 50})`,
   //  `rgba(255, 0, 0, ${Math.abs((v[0].x * (v[1].y - v[2].y) + v[1].x * (v[2].y - v[0].y) + v[2].x * (v[0].y - v[1].y)) / 5000)})`,
   //  `rgba(255, 165, 0, 0.5)`, // Placeholder for moveGradient
   //  tm % 200 < 100 ? `hsl(240, ${(tm % 100)}%, 50%)` : 'alternative-color',
   //  tm % 720 < 360 ? `hsl(${tm % 360}, 100%, 30%)` : 'alternative-color',

   //  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255) % 255}, ${(Math.floor((v[0].z + R) / (2 * R) * 255) + 85) % 255}, ${(Math.floor((v[0].z + R) / (2 * R) * 255) + 170) % 255})` : 'alternative-color',
   //  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? (Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? 'blue' : 'red') : 'alternative-color',
   //  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, 0, ${255 - Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
   //  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgba(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, 0.5)` : 'alternative-color',
   //  Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, 100, 150)` : 'alternative-color',
   

    // // DISCO BALLS
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 40}, 50%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 250}, 70%, 50%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 40) + 30}, 70%, 30%)` : `hsl(${Math.floor(Math.random() * 60) + 180}, 70%, 60%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 40) + 30}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 30) + 270}, 80%, 50%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 360)}, 60%, 80%)` : `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 30) + 240}, 70%, 40%)` : `hsl(${Math.floor(Math.random() * 30) + 10}, 80%, 60%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 220}, 80%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 30}, 90%, 50%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 50) + 90}, 40%, 40%)` : `hsl(${Math.floor(Math.random() * 30) + 40}, 60%, 50%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 180}, 70%, 50%)` : `hsl(${Math.floor(Math.random() * 40) + 10}, 90%, 60%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 50) + 70}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 50) + 20}, 100%, 50%)`,
    // Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60)}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 180}, 100%, 50%)`,
    // 
    

   //  Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
   //  Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
   //  Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
   //  Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',

    // `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
    // Math.random() < 0.5 ? `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})` : 'alternative-color',
    // `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
    // '#' + (Math.floor((Math.random() + 1) * 8388607) | 0x808080).toString(16),
    // '#' + (Math.floor(Math.random() * 16777215) & 0x7F7F7F).toString(16),
    // '#' + (Math.floor(Math.random() * 16777215) | 0x808080).toString(16),
    // '#' + Math.floor(Math.random() * 16777215).toString(16),

    // `hsl(${(v[0].y + tm) % 360}, 100%, 50%)`,
    // `hsl(${tm % 360}, 100%, ${50 + 25 * Math.sin(tm / 1000)}%)`,

    // // BLACK AND WHITE
    // ((Math.floor(v[0].x / 50) + Math.floor(v[0].y / 50)) % 2 === 0) ? 'black' : 'white',
    // ((Math.floor(v[0].x / 50) + Math.floor(v[0].y / 50)) % 2 === 0) ? 'black' : 'white',
    // ((Math.floor(v[0].x / 50) + Math.floor(v[0].y / 50)) % 2 === 0) ? 'black' : 'white',
    // ((Math.floor(v[0].x / 50) + Math.floor(v[0].y / 50)) % 2 === 0) ? 'black' : 'white',


   
// // #63 Adding a function to compute the color or return 'alternative-color' 
// (() => {const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255));return colorValue > 128 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';})(),
// (() => {const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255));return colorValue > 128 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';})(),
// (() => {const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255));return colorValue > 128 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';})(),
// 
// 
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 64)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 12 + 32)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 1 + 16)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// 
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',



// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 8)}, ${Math.floor(Math.sin(Date.now() / 100) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 4)}, ${Math.floor(Math.sin(Date.now() / 10) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 1) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 10) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 100) * 127 + 64)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 32)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 100000) * 127 + 16)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 1000000) * 127 + 8)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 10000000) * 1 + 1)}, ${Math.floor(Math.sin(Date.now() / 20000) * 127 + 128)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 111 + 200000)}, ${Math.floor(Math.sin(Date.now() / 1) * 127 + 12)}, ${Math.floor(Math.sin(Date.now() / 100) * 127 + 4)})`,

// SOLID PINK
// `rgb(${Math.floor(Math.sin(Date.now()) * 506 + 750)}, ${Math.floor(Math.sin(Date.now() / -17) / -750 * 127)}, ${Math.floor(Math.sin(Date.now() / 2000) * 2000 + 10002)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 506 + 750)}, ${Math.floor(Math.sin(Date.now() / -17) / -750 * 127)}, ${Math.floor(Math.sin(Date.now() / 2000) * 2000 + 10002)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 506 + 750)}, ${Math.floor(Math.sin(Date.now() / -17) / -750 * 127)}, ${Math.floor(Math.sin(Date.now() / 2000) * 2000 + 10002)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 506 + 750)}, ${Math.floor(Math.sin(Date.now() / -17) / -750 * 127)}, ${Math.floor(Math.sin(Date.now() / 2000) * 2000 + 10002)})`,
// 
// 
// 
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 512)}, ${Math.floor(Math.sin(Date.now() / 1) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 8)})`,
// `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 4)}, ${Math.floor(Math.sin(Date.now() / 10) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 5000) * 127 + 32)})`,






// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',
// Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',





  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black', // #1 Red Scorpion
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black', // #1 Red Scorpion
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black', // #1 Red Scorpion
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black', // #1 Red Scorpion
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black', // #1 Red Scorpion
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black', // #1 Red Scorpion




  // ((Math.floor(v[0].x / 120) + Math.floor(v[0].y / 15)) % 73 === 0) ? '#43111E' : 'black', // #2 Bright Red Runner
  // ((Math.floor(v[0].x / 120) + Math.floor(v[0].y / 15)) % 73 === 0) ? '#43111E' : 'black', // #2 Bright Red Runner
  // ((Math.floor(v[0].x / 120) + Math.floor(v[0].y / 15)) % 73 === 0) ? '#43111E' : 'black', // #2 Bright Red Runner
  // ((Math.floor(v[0].x / 120) + Math.floor(v[0].y / 15)) % 73 === 0) ? '#43111E' : 'black', // #2 Bright Red Runner
  // ((Math.floor(v[0].x / 120) + Math.floor(v[0].y / 15)) % 73 === 0) ? '#43111E' : 'black', // #2 Bright Red Runner
  // ((Math.floor(v[0].x / 120) + Math.floor(v[0].y / 15)) % 73 === 0) ? '#43111E' : 'black', // #2 Bright Red Runner



  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 98)) % 7 === 0) ? 'red' : 'black',        // #3 Blue Scorpion
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 95)) % 16 === 0) ? 'blue' : 'black', // #4 Green Sliders
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'green' : 'black', // #5 Yellow slider
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'yellow' : 'black', // #6 Orange slider
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'purple' : 'black', // #7 Light Pink SLiders
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'orange' : 'black', // #8 Light Blue Slider
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'pink' : 'black', // #9 Pink SLiders
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'cyan' : 'black', // #10 Green Slider
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'magenta' : 'black', // #11 pastel blue sliders
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'lime' : 'black', // #12 Deep red slider
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'teal' : 'black', // #13 dark pink slider
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'maroon' : 'black', // #14
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'navy' : 'black', // #15 yellow slider
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'olive' : 'black', // #16 white sliders
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'silver' : 'black', // #17
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'gold' : 'black', // #18
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? 'indigo' : 'black', // #19
  // ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? 'turquoise' : 'black', // #20 - CRAZY FROG (Flash warning)
  
  // // XRAY
  // `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,
  // `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,
  // `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,
  // `rgb(${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255}, ${((v[0].z + R) / (2 * R) * 255) & 255})`,


  //     // #61 Using ES6 arrow functions and template literals for a cleaner look - dark water
  // `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,
  // `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,
  // `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,
  // `rgb(${Array.from({length: 3}, () => Math.random() * ((v[0].z + R) / (2 * R) * 255)).join(',')})`,

  // // #65 Generating a random alpha for RGBA for semi-transparency effects - - GLASS DISCO BALLS 
  // `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
  // `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
  // `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
  // `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
  // `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,
  // `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255))).join(', ')}, ${Math.random().toFixed(2)})`,


  // #66 Using bitwise operators for a more compact approach - XRAY SPECS 
  // #67 Dynamic alternative-color based on lightness - GREY SCALE CRAZY ONE 
  // ((lightness) => lightness > 128 ? `rgb(${lightness}, ${lightness}, ${lightness})` : 'dark-mode-color')(Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)),
 
  // // #72
  // (() => {
  //   const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255));
  //   return colorValue > 64 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';
  // })(),
  
  // // #73
  // (() => {
  //   const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255));
  //   return colorValue > 32 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';
  // })(),
  
  // // #74
  // (() => {
  //   const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255));
  //   return colorValue > 16 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';
  // })(),
  
  // // #75
  // (() => {
  //   const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (2 * R) * 255));
  //   return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';
  // })(),
  
  // // #79
  // (() => {const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255));return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';})(),
  // (() => {const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255));return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';})(),
  // (() => {const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255));return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';})(),
  // (() => {const colorValue = Math.floor(Math.random() * ((v[0].z + R) / (6 * R) * 255));return colorValue > 8 ? `rgb(${colorValue}, ${colorValue}, ${colorValue})` : 'alternative-color';})(),

  // // #80
  // `rgb(${Math.floor(Math.sin(Date.now()) * 12 + 32)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
  // // #81
  // `rgb(${Math.floor(Math.sin(Date.now()) * 1 + 16)}, ${Math.floor(Math.sin(Date.now() / 1000) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
  // // #82
  // `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 8)}, ${Math.floor(Math.sin(Date.now() / 100) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
  // // #83
  // `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 4)}, ${Math.floor(Math.sin(Date.now() / 10) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
  // // #84
  // `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 1) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,
  // // #85
   // `rgb(${Math.floor(Math.sin(Date.now()) * 127 + 2)}, ${Math.floor(Math.sin(Date.now() / 10) * 127 + 128)}, ${Math.floor(Math.sin(Date.now() / 2000) * 127 + 128)})`,






