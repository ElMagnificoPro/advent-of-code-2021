let test = [3, 4, 3, 1, 2]

let input = require("fs").readFileSync("./day 6.txt", {
  encoding: "utf8"
}).split(',').map(v => Number(v))

//input = test;


function getFish(days) {


  // group all fish that have x timer on them

  let timer = Array(9).fill(0);
  input.forEach(e => {
    timer[e]++;
  });

  //  each day shift fish in a circular fashion

  // day 0 => put everyone in new fish pile
  // day 1 => put everyone that has a day to hatch in new pile ...

  for (let i = 0; i < days; i++) {
    timer[(i + 7) % 9] += timer[i % 9]
  }
 return timer.reduce((a, b) => a + b)
}

console.log("part 1: ", getFish(80));
console.log("part 2: ", getFish(256));