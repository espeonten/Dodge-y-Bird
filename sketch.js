var bird, birdA
var obstacle, oImage, oGroup
var flapSound
var restartSound
var score = 0;
var gamestate = "play"

function preload() {
  birdA = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png")
  oImage = loadImage("obstacle.png")
  flapSound = loadSound("flapWings.mp3")
  restartSound = loadSound("restart.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  edges = createEdgeSprites()

  bird = createSprite(width/10, height/2)
  bird.addAnimation("bird", birdA)
  bird.scale = 0.4
  bird.setCollider("circle", 0, 0, 100)

  oGroup = new Group()
}

//runs continuously
function draw() {
  background(rgb(230, 200, 75))
  if (gamestate == "play") {
    bird.velocityY = 3
    fill("white")
    textSize(50)
    text(score, width/2, height/2)
    if(bird.isTouching(edges) || bird.isTouching(oGroup)){
      gamestate = "end"
    }
    if(keyDown("up") || keyDown("space")){
      bird.velocityY = -10
    }
    //score += Math.round(getFrameRate() / 90)
    
    spawnO()
  }
  else if (gamestate == "end") {
    background("black")
    bird.visible = false
    oGroup.destroyEach()
    fill("white")
    textSize(50)
    text("You lost! Score: "+score+" seconds! \n Press the down arrow key to play again!", width/3, height/2)
    if(keyDown("down")) {
      restartSound.play()
      score = 0
      gamestate = "play"
      bird.y = height/2
      bird.visible = true
    }
  }
  drawSprites()
}

function spawnO() {
  if (frameCount % 50 == 0) {
    flapSound.play()
    var randomY = Math.round(random(0,height))
    obstacle = createSprite(width, randomY)
    obstacle.debug = false
    obstacle.addImage(oImage)
    obstacle.velocityX = -(score+10)
    score = obstacle.depth - 6
    oGroup.add(obstacle)
}}
