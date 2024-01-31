function getColors(angle, tm, v) {
  return [
  `hsl(${(angle + 60 * Math.sin(tm / 1000)) % 360}, 100%, 50%)`,
  `hsl(${Math.random() * 360}, 100%, ${50 + 25 * Math.cos(tm / 1000)}%)`,
  ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 8 === 0) ? '#00001E' : 'black',
  ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 16 === 0) ? '#00001E' : 'black',
  ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 9999)) % 9999 === 0) ? 'grey' : 'black',
  ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 5555)) % 9999 === 0) ? 'red' : 'black',
  ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 3333)) % 9999 === 0) ? 'white' : 'black',
  ((Math.floor(v[0].x / 0.0111) + Math.floor(v[0].y / 3333)) % 9999 === 0) ? 'yellow' : 'black',
  ((Math.floor(v[0].x / 0.55555) + Math.floor(v[0].y / 333)) % 666 === 0) ? 'yellow' : 'black',
  ((Math.floor(v[0].x / 0.55555) + Math.floor(v[0].y / 30000)) % 666 === 0) ? 'red' : 'black',
  ((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 2000)) % 666 === 0) ? 'red' : 'black',
  ((Math.floor(v[0].x / 0.0001) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'grey' : 'black',
  ((Math.floor(v[0].x / 0.01) + Math.floor(v[0].y / 1000)) % 666 === 0) ? 'green' : 'black',
  ((Math.floor(v[0].x / 0.1) + Math.floor(v[0].y / 1000)) % 111 === 0) ? 'orange' : 'black',
  ((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 1000)) % 111 === 0) ? 'pink' : 'black',
  ((Math.floor(v[0].x / 1) + Math.floor(v[0].y / 111)) % 11 === 0) ? 'purple' : 'black',
  ((Math.floor(v[0].x / 11) + Math.floor(v[0].y / 111)) % 11 === 0) ? 'purple' : 'black',
  ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 11 === 0) ? 'purple' : 'black'
];

}
