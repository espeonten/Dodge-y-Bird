var bird, birdI
var obstacle, oImage, oGroup
var score = 0;
var gamestate = "play"

function preload() {
  birdI = loadImage("player.png")
  oImage = loadImage("obstacle.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(rgb(0, 200, 255));

  edges = createEdgeSprites()

  bird = createSprite(width/10, height/2)
  bird.addImage(birdI)
  bird.scale = 0.4
  
  oGroup = new Group()
}

//runs continuously
function draw() {
  background(rgb(0, 200, 255))
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
  var randomY = Math.round(random(0,height))
  obstacle = createSprite(width, randomY)
  obstacle.addImage(oImage)
  obstacle.velocityX = -(score+10)
  score = obstacle.depth - 6
  oGroup.add(obstacle)
}}