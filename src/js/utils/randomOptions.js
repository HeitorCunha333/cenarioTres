
function randomPositions(length) {
  return Math.floor(Math.random() * length)
}

function recursiveGenerateList(uniqueList, positions, length){
  if(uniqueList.length >= length) return
  if(uniqueList.includes(positions)){
    recursiveGenerateList(uniqueList, randomPositions(length), length)
    return
  }
  
  uniqueList.push(positions)
  recursiveGenerateList(uniqueList, randomPositions(length), length)
}


export function getValidPosition(length){
  const newArr = []
  recursiveGenerateList(newArr, randomPositions(length), length)
  return newArr
} 