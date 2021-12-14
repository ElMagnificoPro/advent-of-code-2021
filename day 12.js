/* eslint-disable no-unused-vars */
const input = [
  'nu-start', 'rt-start', 'db-qh', 'PE-end', 'sl-rt', 'qh-end', 'ZH-rt', 'nu-rt', 'PE-db', 'db-sl', 'nu-ZH', 'nu-qh', 'PE-qh', 'ZH-db', 'ne-end', 'ne-ZH', 'QG-db', 'qh-sl', 'ZH-qh', 'start-ZH', 'nu-PE', 'uf-db', 'ne-sl'
]

const test1 = [
  'start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'
]

const test2 = [
  'dc-end', 'HN-start', 'start-kj', 'dc-start', 'dc-HN', 'LN-dc', 'HN-end', 'kj-sa', 'kj-HN', 'kj-dc'
]

const test3 = [
  'fs-end', 'he-DX', 'fs-he', 'start-DX', 'pj-DX', 'end-zg', 'zg-sl', 'zg-pj', 'pj-he', 'RW-he', 'fs-DX', 'pj-RW', 'zg-RW', 'start-pj', 'he-WI', 'zg-he', 'pj-fs', 'start-RW'
]

// input = test1;

const paths = new Map()

input.forEach(
  row => {
    const [start, end] = row.split('-')

    const addToStart = paths.get(start)

    if (addToStart === undefined) {
      paths.set(start, [end])
    } else {
      addToStart.push(end)
    }

    const addToEnd = paths.get(end)

    if (addToEnd === undefined) {
      paths.set(end, [start])
    } else {
      addToEnd.push(start)
    }
  }
)

function getPossiblePaths (node, visited, part2) {
  const nextVisited = [...visited, node]

  if (node === 'end') {
    return [nextVisited]
  }

  const possibles = paths.get(node)

  const toReturn = []

  possibles.forEach(nextNode => {
    if (nextNode.toLowerCase() === nextNode) {
      if (!part2 && visited.includes(nextNode)) {
        return
      }

      if (part2) {
        if (nextNode === 'start') {
          return
        }

        const counts = {}
        let visitedTwice = false

        nextVisited.forEach(val => {
          if (val.toLowerCase() !== val) {
            return
          }

          if (counts[val]) {
            visitedTwice = true
          } else {
            counts[val] = true
          }
        })

        if (visitedTwice && counts[nextNode]) {
          return
        }
      }
    }

    toReturn.push(...getPossiblePaths(nextNode, nextVisited, part2))
  })

  return toReturn
}

console.log('Part 1: ', getPossiblePaths('start', [], false).length)
console.log('Part 2: ', getPossiblePaths('start', [], true).length)
