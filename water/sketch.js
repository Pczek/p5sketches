const width = 1800
const height = 3200

const dropLength = Math.round(height / 10)

setup = () => {
  pixelDensity(3.0)
  createCanvas(width, height)
  background(50)
  noLoop()
  angleMode(DEGREES) // Change the mode to DEGREES
  strokeWeight(1)
  strokeJoin(ROUND)

}

draw = () => {

  stroke(255)

  noFill()

  let noOfDrops = 2048
  let noiseValue = 0
  const groundY = height * 0.9
  for (noOfDrops; (noOfDrops > 0); noOfDrops--) {
    if (noOfDrops % 7 === 0){
      strokeWeight(2)
    } else {
      strokeWeight(1)
    }
    let x = Math.round(noise(noOfDrops, new Date().getMilliseconds()) * width * 2) - (width / 2)
    let y = Math.round(noise(new Date().getMilliseconds(), noOfDrops, x) * (height * 2)) - (height / 2)

    if (y < groundY) {
      let dropEnd = y + (dropLength)
      if (dropEnd > groundY) {
        dropEnd = groundY + ((height * 0.1) * (noise(noiseValue, new Date().getMilliseconds())))
        const spreadValue = (1 - ((dropEnd - y) / dropLength)) * 5
        const currentNoise = noise(noiseValue)
        let noOfRings = spreadValue > 0.5 ? spreadValue > 0.8 ? 3 : 2 : 1
        const ringRatio = 3
        let ringHeight = 5
        strokeWeight(1)
        for (noOfRings; noOfRings > 0; noOfRings--) {
          ellipse(x, dropEnd - 7, (ringHeight * ringRatio) * spreadValue, ringHeight * spreadValue)
          ringHeight += spreadValue > 0.5 ? spreadValue > 0.8 ? 3 : 2 : 1
        }
      }
      line(x, y, x, dropEnd)
    }
    noiseValue += 12
  }

}