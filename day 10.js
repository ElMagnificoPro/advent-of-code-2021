let input = require("fs").readFileSync("./day 10.txt", {
  encoding: "utf8"
}).split("\r\n")

function isValid(expr) { // from tutorial points(modified)

  let stack = [];
  for (let i = 0; i < expr.length; i++) {
    let x = expr[i];

    if (x == '(' || x == '[' || x == '{' || x == '<') {

      stack.push(x);
      continue;
    }

    if (stack.length == 0)
      return false;

    let check;
    switch (x) {
      case ')':
        check = stack.pop();
        if (check == '{' || check == '[' || check == '<')
          return [check, ')'];
        break;

      case '}':
        check = stack.pop();
        if (check == '(' || check == '[' || check == '<')
          return [check, '}'];
        break;

      case ']':
        check = stack.pop();
        if (check == '(' || check == '{' || check == '<')
          return [check, ']'];
        break;

      case '>':
        check = stack.pop();
        if (check == '(' || check == '{' || check == '[')
          return [check, '>'];
        break;
    }
  }
  return [false, stack];
}

function part1() {

  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    let res = isValid(input[i])
    if (res[0]) {
      if (res[1] == ')') sum += 3;
      if (res[1] == ']') sum += 57;
      if (res[1] == '}') sum += 1197;
      if (res[1] == '>') sum += 25137;
    }
  }

  return sum
}

function part2() {
  let scores = []

  for (let i = 0; i < input.length; i++) {
    let res = isValid(input[i])
    if (!res[0]) {

      res = res[1].reverse();

      let score = 0;
      for (let j = 0; j < res.length; j++) {
        score *= 5;
        if (res[j] == '(') score += 1
        if (res[j] == '[') score += 2
        if (res[j] == '{') score += 3
        if (res[j] == '<') score += 4
      }
      scores.push(score)
    }
  }
  return scores.sort((a, b) => a - b)[Math.floor(scores.length/2)]
}

console.log("part 1: ",part1());
console.log("part 2: ",part2());
