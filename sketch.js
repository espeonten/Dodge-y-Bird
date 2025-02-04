var bird, birdA
var obstacle, oImage, oGroup
var flapSound
var restartSound
var playButton, pbI
var howButton, hbI
var backButton, bbI
var title, titleI
var heart1, heart2, heart3, hImage, hGroup
var score = 0;
var gamestate = "start"

function preload() {
  birdA = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png")
  oImage = loadImage("obstacle.png")
  flapSound = loadSound("flapWings.mp3")
  restartSound = loadSound("restart.mp3")
  hImage = loadImage("heart.png")
  pbI = loadImage("playButton.png")
  hbI = loadImage("howButton.png")
  bbI = loadImage("backButton.png")
  titleI = loadImage("title.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  edges = createEdgeSprites()

  bird = createSprite(width/10, height/2)
  bird.addAnimation("bird", birdA)
  bird.scale = 0.4
  bird.setCollider("circle", 0, 0, 100)

  playButton = createSprite(width/2, height/1.5)
  playButton.debug = false
  playButton.setCollider("circle", 0, 0 ,140)
  playButton.addImage(pbI)
  playButton.scale = 0.45

  howButton = createSprite(width/2, height-150)
  howButton.addImage(hbI)

  backButton = createSprite(width/2, height/2)
  backButton.addImage(bbI)
  backButton.debug = false
  backButton.setCollider("rectangle", 0, 0, 150, 65)

  title = createSprite(width/2, height/4)
  title.addImage(titleI)

  hGroup = new Group()
  heart1 = createSprite(width/40, height/20)
  heart1.scale = 0.1
  heart1.addImage(hImage)
  hGroup.add(heart1)
  heart2 = createSprite(width/18, height/20)
  heart2.scale = 0.1
  heart2.addImage(hImage)
  hGroup.add(heart2)
  heart3 = createSprite(width/11.5, height/20)
  heart3.scale = 0.1
  heart3.addImage(hImage)
  hGroup.add(heart3)

  oGroup = new Group()
}

//runs continuously
function draw() {
  background(rgb(230, 200, 75))
  if (gamestate == "start") {
    hGroup.visibleAll = false
    bird.visible = false
    backButton.visible = false
    playButton.visible = true
    howButton.visible = true
    title.visible = true
    if(mousePressedOver(playButton)) {
      gamestate = "play"
    }
    if(mousePressedOver(howButton)) {
      gamestate = "how"
    }
  }
  if (gamestate == "how") {
    hGroup.visible = false
    playButton.visible = false
    howButton.visible = false
    title.visible = false
    bird.visible = false
    backButton.visible = true
    if(mousePressedOver(backButton)) {
      gamestate = "start"
    }
    textSize(50)
    fill("black")
    text("Move the bird by pressing space or up arrow key to fly. \nDodge the monsters.", width/15, height/3)
  }
  if (gamestate == "play") {
    hGroup.visible = true
    backButton.visible = false
    title.visible = false
    playButton.visible = false
    howButton.visible = false
    bird.visible = true
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
    spawnO()
  }
  else if (gamestate == "end") {
    background("black")
    bird.visible = false
    oGroup.destroyEach()
    fill("white")
    textSize(50)
    text("You lost! Score: "+score+" seconds! \n Press the down arrow key to go back to start screen!", width/10, height/2)
    if(keyDown("down")) {
      restartSound.play()
      score = 0
      gamestate = "start"
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
