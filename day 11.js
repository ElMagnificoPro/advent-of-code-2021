let test = [
  "5483143223", "2745854711", "5264556173", "6141336146", "6357385478", "4167524645", "2176841721", "6882881134", "4846848554", "5283751526",
].map(v => v.split("").map(v => Number(v)))

let input = [
  "3322874652", "5636588857", "7755117548", "5854121833", "2856682477", "3124873812", "1541372254", "8634383236", "2424323348", "2265635842",
].map(v => v.split("").map(v => Number(v)))

//input = test;



function getAdj(x, y) {
  let ret = []
  if (input[x - 1] && input[x - 1][y]) ret.push([x - 1, y])
  if (input[x + 1] && input[x + 1][y]) ret.push([x + 1, y])
  if (input[x] && input[x][y - 1]) ret.push([x, y - 1])
  if (input[x] && input[x][y + 1]) ret.push([x, y + 1])
  if (input[x - 1] && input[x - 1][y - 1]) ret.push([x - 1, y - 1])
  if (input[x - 1] && input[x - 1][y + 1]) ret.push([x - 1, y + 1])
  if (input[x + 1] && input[x + 1][y - 1]) ret.push([x + 1, y - 1])
  if (input[x + 1] && input[x + 1][y + 1]) ret.push([x + 1, y + 1])

  return ret
}

function part1(input) {
  let flashes = 0;
  let steps = 100
  for (let i = 0; i < steps; i++) {

    input = input.map(v => v.map(v => v + 1))

    let flag = true;

    while (flag) {
      flag = false

      for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
          const oct = input[y][x];
          if (oct > 9) {
            input[y][x] = -99;
            let adj = getAdj(x, y)
            adj.forEach(e => {
              input[e[1]][e[0]]++
            });

            flag = true
            flashes++
          }
        }
      }
    }
    input = input.map(v => v.map(v => (v < 0) ? 0 : v))
  }
  return flashes
}

function part2(input) {

  let i = 0;
  let sim = 0;
  while (i < 1000 && sim == 0) { // fear of endless loops ;(

    input = input.map(v => v.map(v => v + 1))

    let flag = true;

    while (flag) {
      flag = false

      for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
          const oct = input[y][x];
          if (oct > 9) {
            input[y][x] = -99;
            let adj = getAdj(x, y)
            adj.forEach(e => {
              input[e[1]][e[0]]++
            });

            flag = true
          }
        }
      }
    }
    input = input.map(v => v.map(v => (v < 0) ? 0 : v))

    i++
    sim = (input.flat().reduce((a, b) => a + b) === 0) ? i : 0;
  }
  return sim
}

console.log("part 1: ", part1(input));
console.log("part 2: ", part2(input));