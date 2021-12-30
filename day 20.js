const input = require('fs').readFileSync('./day 20.txt', {
  encoding: 'utf8'
}).split('\r\n\r\n')

const iea = input[0]
const image = input[1].split('\r\n')

function enhance(times) {
  let pixels = {}
  let start = 0
  let end = image.length

  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image.length; j++) {
      pixels[`${j},${i}`] = image[j][i]
    }
  }

  for (let t = 0; t < times; t++) {
    const newPixels = {}
    start -= 1
    end += 1

    for (let i = start; i < end; i++) {
      for (let j = start; j < end; j++) {
        let str = ''
        for (let x = j - 1; x <= j + 1; x++) {
          for (let y = i - 1; y <= i + 1; y++) {
            if (pixels[`${x},${y}`] === '#' || (t % 2 && pixels[`${x},${y}`] !== '.')) {
              str += '1'
            } else {
              str += '0'
            }
          }
          // console.log(str);
          newPixels[`${j},${i}`] = iea.charAt(parseInt(str, 2))
        }
      }
    }
    pixels = newPixels
  }
  let count = 0
  for (const pixel in pixels) {
    if (pixels[pixel] === '#') count++
  }
  return count
}

console.log('part 1: ', enhance(2))
console.log('part 2: ', enhance(50))
