const width = 900
const height = 1600

const centerX = width / 2
const centerY = height / 2

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
  translate(centerX, centerY)
  stroke(255)

  noFill()
  let noOfRings = 27
  let totalWidth = width * 0.90
  let ringWidth = Math.round((totalWidth / noOfRings) / 2)

  let currentRing = noOfRings
  let currentRadius
  let alpha
  let resolutionDif = 0.2
  let noisePositionStructure = 0
  let noisePositionRadius = 0
  for (currentRadius = Math.round(totalWidth / 2); (currentRadius > 0); currentRadius -= ringWidth - noise(noisePositionRadius)) {
    console.log(`${currentRing}`, currentRing.toString().includes('7'))

    if (currentRing % 7 === 0 || currentRing.toString().includes('7')) {
      strokeWeight(2)
    } else {
      strokeWeight(1)
    }
    if (currentRing === noOfRings) {
      strokeWeight(4)
    }
    beginShape()
    for (alpha = 0; alpha < 360; alpha += resolutionDif) {
      const noiseRadius = currentRadius + (ringWidth * noise(noisePositionStructure, currentRadius, alpha)) * 0.7
      const y = sin(alpha) * noiseRadius
      const x = cos(alpha) * noiseRadius
      vertex(x, y)
      noisePositionStructure+=0.01
      resolutionDif += 0.005
    }
    endShape(CLOSE)

    noisePositionRadius +=0.1
    currentRing--

  }

}