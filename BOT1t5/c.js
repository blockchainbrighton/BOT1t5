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
    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 11 === 0) ? 'purple' : 'black',
    // New settings variation snippets
    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 7 === 0) ? 'blue' : 'black',
    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 5 === 0) ? 'purple' : 'grey',
    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 3 === 0) ? 'green' : 'black',
    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 2 === 0) ? 'yellow' : 'black',
    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 999)) % 2 === 0) ? 'red' : 'blue',
    ((Math.floor(v[0].x / 333) + Math.floor(v[0].y / 666)) % 2 === 0) ? 'red' : 'blue',
    ((Math.floor(v[0].x / 15) + Math.floor(v[0].y / 9000)) % 2 === 0) ? 'red' : 'blue',
    ((Math.floor(v[0].x / 15) + Math.floor(v[0].y / 9000)) % 2 === 0) ? 'purple' : 'pink',
    ((Math.floor(v[0].x / 111) + Math.floor(v[0].y / 111)) % 2 === 0) ? '#F7031C' : '#F7931A',
    ((Math.floor(v[0].x / 333) + Math.floor(v[0].y / 333)) % 2 === 0) ? '#F7031C' : '#F7931A',
    ((Math.floor(v[0].x / 1000) + Math.floor(v[0].y / 1000)) % 2 === 0) ? 'purple' : 'orange',
    ((Math.floor(v[0].x / 666) + Math.floor(v[0].y / 666)) % 2 === 0) ? 'pink' : 'yellow',
    ((Math.floor(v[0].x / 500) + Math.floor(v[0].y / 500)) % 2 === 0) ? 'orange' : 'purple',
    `hsl(${tm % 1}, 100%, 50%)`,
    `hsl(${(tm + 1) % 1}, 100%, 50%)`,
    `hsl(${tm % 72}, 100%, 50%)`,
    `hsl(${(tm + 18) % 72}, 100%, 50%)`,
    Math.abs(Math.sin(tm / 600000)) < 0.5 ? 'red' : 'blue',
    1 - Math.abs(Math.sin(tm / 60000)) < 0.5 ? 'red' : 'blue',
    Math.abs(Math.sin(tm / 30000)) < 0.5 ? 'red' : 'blue',
    1 - Math.abs(Math.sin(tm / 15000)) < 0.5 ? 'red' : 'blue',
    Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'saddlebrown' : 'olive',
    1 - Math.abs(Math.sin(tm / 50000)) < 0.5 ? 'saddlebrown' : 'olive',
    Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'neongreen' : 'neonpurple',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'neongreen' : 'neonpurple',
    Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'lightpink' : 'lightblue',
    1 - Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'lightpink' : 'lightblue',
    Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'gold' : 'silver',
    1 - Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'gold' : 'silver',
    Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'black' : 'white',
    1 - Math.abs(Math.sin(tm / 10000)) < 0.5 ? 'black' : 'white',
    Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'teal' : 'maroon',
    1 - Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'teal' : 'maroon',
    Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'pink' : 'lime',
    1 - Math.abs(Math.sin(tm / 5000)) < 0.5 ? 'pink' : 'lime',
    Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'purple' : 'orange',
    1 - Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'purple' : 'orange',
    Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'green' : 'yellow',
    1 - Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'green' : 'yellow',
    Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'red' : 'blue',
    1 - Math.abs(Math.sin(tm / 3000)) < 0.5 ? 'red' : 'blue',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'saddlebrown' : 'olive',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'saddlebrown' : 'olive',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'neongreen' : 'neonpurple',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'neongreen' : 'neonpurple',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'lightpink' : 'lightblue',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'lightpink' : 'lightblue',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'gold' : 'silver',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'gold' : 'silver',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'black' : 'white',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'black' : 'white',
    Math.abs(Math.sin(tm / 2000)) < 0.5 ? 'teal' : 'maroon',
    1 - Math.abs(Math.sin(tm / 2000)) < 0.5 ? 'teal' : 'maroon',
    Math.abs(Math.sin(tm / 500)) < 0.5 ? 'pink' : 'lime',
    1 - Math.abs(Math.sin(tm / 500)) < 0.5 ? 'pink' : 'lime',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'purple' : 'orange',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'purple' : 'orange',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'green' : 'yellow',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'green' : 'yellow',
    Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'red' : 'blue',
    1 - Math.abs(Math.sin(tm / 1000)) < 0.5 ? 'red' : 'blue',
    Math.random() * 360 < 180 ? `hsl(${Math.random() * 360}, 100%, ${Math.random() * 100}%)` : 'alternative-color',

    (v[0].y + tm) % 200 < 100 ? `hsl(0, 0%, ${(v[0].y + tm) % 100}%)` : 'alternative-color',
  
    (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, 100%, 75%)` : 'alternative-color',
  
    (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, 60%, 80%)` : 'alternative-color',v
    (v[0].y * 2 + tm) % 720 < 360 ? `hsl(${(v[0].y * 2 + tm) % 360}, 100%, 50%)` : 'alternative-color',
    360 - ((p[0].y + tm) % 360) > 180 ? `hsl(${360 - ((v[0].y + tm) % 360)}, 100%, 50%)` : 'alternative-color',
    (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, 100%, ${(tm % 100)}%)` : 'alternative-color',

    (v[0].y + tm) % 720 < 360 ? `hsl(${(v[0].y + tm) % 360}, ${(tm % 100)}%, ${(tm % 100)}%)` : 'alternative-color',
    // For linear gradients, we use a placeholder ternary expression as they don't fit the original format
    'linear-gradient-brown-beige',
    'linear-gradient-teal-peach',
    'linear-gradient-gold-silver',
    'linear-gradient-lime-dark-blue',
    'linear-gradient-cyan-magenta',
    'linear-gradient-black-white',
    'linear-gradient-pink-orange',
    'linear-gradient-blue-turquoise',
    'linear-gradient-red-yellow',
    'linear-gradient-green-purple',

    tm % 200 < 100 ? `hsl(240, ${(tm % 100)}%, 50%)` : 'alternative-color',

    tm % 720 < 360 ? `hsl(${tm % 360}, 100%, 30%)` : 'alternative-color',


    255 - Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${255 - Math.floor((v[0].z + R) / (2 * R) * 255)}, ${255 - Math.floor((v[0].z + R) / (2 * R) * 255)}, ${255 - Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255) % 255}, ${(Math.floor((v[0].z + R) / (2 * R) * 255) + 85) % 255}, ${(Math.floor((v[0].z + R) / (2 * R) * 255) + 170) % 255})` : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255) + 50})` : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? (Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? 'blue' : 'red') : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 360) < 180 ? `hsl(${Math.floor((v[0].z + R) / (2 * R) * 360)}, 100%, 50%)` : 'alternative-color',

    Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.random() * Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, 0, ${255 - Math.floor((v[0].z + R) / (2 * R) * 255)})` : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 360) < 180 ? `hsl(${Math.floor((v[0].z + R) / (2 * R) * 360)}, 100%, 50%)` : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgba(${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, ${Math.floor((v[0].z + R) / (2 * R) * 255)}, 0.5)` : 'alternative-color',

    Math.floor((v[0].z + R) / (2 * R) * 255) > 128 ? `rgb(${Math.floor((v[0].z + R) / (2 * R) * 255)}, 100, 150)` : 'alternative-color',

    Math.random() < 0.5 ? '#' + Math.floor(Math.random() * 16777215).toString(16) : 'alternative-color',

    'linear-gradient-e6e6fa-ff6b6b',
    'linear-gradient-228b22-8b0000',
    'linear-gradient-0077be-00a8e8',
    'linear-gradient-ff4500-ff8c00',
    'linear-gradient-8b4513-228b22',
    'linear-gradient-00008b-ffff00',
    'linear-gradient-ff6600-ff1493',
    'linear-gradient-ffd700-008080',
    'linear-gradient-00ff00-800080',
    'linear-gradient-ff0000-0000ff',

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 360)}, 30%, 50%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 40}, 50%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 250}, 70%, 50%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 40) + 30}, 70%, 30%)` : `hsl(${Math.floor(Math.random() * 60) + 180}, 70%, 60%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 40) + 30}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 30) + 270}, 80%, 50%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 360)}, 60%, 80%)` : `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 30) + 240}, 70%, 40%)` : `hsl(${Math.floor(Math.random() * 30) + 10}, 80%, 60%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 220}, 80%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 30}, 90%, 50%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 50) + 90}, 40%, 40%)` : `hsl(${Math.floor(Math.random() * 30) + 40}, 60%, 50%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60) + 180}, 70%, 50%)` : `hsl(${Math.floor(Math.random() * 40) + 10}, 90%, 60%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 50) + 70}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 50) + 20}, 100%, 50%)`,

    Math.random() > 0.5 ? `hsl(${Math.floor(Math.random() * 60)}, 100%, 50%)` : `hsl(${Math.floor(Math.random() * 60) + 180}, 100%, 50%)`,

    `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,

    Math.random() < 0.5 ? `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})` : 'alternative-color',

    `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,

    '#' + Math.floor(Math.random() * 16777215).toString(16),

    '#' + (Math.floor((Math.random() + 1) * 8388607) | 0x808080).toString(16),

    '#' + (Math.floor(Math.random() * 16777215) & 0x7F7F7F).toString(16),

    '#' + (Math.floor(Math.random() * 16777215) | 0x808080).toString(16),

    `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
  ];
}



