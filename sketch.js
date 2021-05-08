var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;


function preload(){
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  
  backgroundImg = loadImage("assets/backgroundImg.png")
  sunAnimation = loadImage("assets/sun.png");
  
  trex_running = loadAnimation("assets/trex_2.png","assets/trex_1.png","assets/trex_3.png");
  trex_collided = loadAnimation("assets/trex_collided.png");
  
  groundImage = loadImage("assets/ground.png");
  
  cloudImage = loadImage("assets/cloud.png");
  
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  obstacle4 = loadImage("assets/obstacle4.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(displayWidth , displayHeight - 360);
  
  sun = createSprite(350,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1
  
  trex = createSprite(50,330,20,50);
     
  //night = createSprite(windowWidth + 340000, windowHeight - 100,           windowWidth + 76000, windowHeight*2   )
 // night.velocityX = -150
  //night.shapeColor=("black")
  
  //sprite1 = createSprite(windowWidth + 400000, windowHeight - 100, 75,     windowHeight*2 ) 
  
  //sprite2 = createSprite(windowWidth - 400000, windowHeight - 100, 75,     windowHeight*2 ) 
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.08
  // trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width+1000,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  visibleGround = createSprite(width/2,height-10,width+1000,135);  
  visibleGround.shapeColor = "#f4cbaa";
  
  //ground = createSprite(width/2,-500,width,2);
  //ground.addImage("ground",groundImage);
  //ground.x = width/2
 // ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
 // ground.velocityX = obstaclesGroup.velocityEach
  score = 0;
}

function draw() {
  //trex.debug = true;
//
  background(backgroundImg);
  // background("rgb(0,500,999)")
  stroke("white")
  textSize(20);
  textFont("caveat")
  fill("black")
  text("Score: "+ score,trex.x - 75,50);
  
//  night.bounceOff(sprite1);
  //night.bounceOff(sprite2);
  //cars = [trex]
  sun.x = trex.x + 325 
 // var index = 0;
  //var x = 0;
  //var y = 1500
  obstacles1 = createSprite(1250,height-95)
  obstacles1.addImage(obstacle1);

if(obstacles1.x < trex.x - 200){
  obstacles1.x = displayWidth + 1200
}
obstacles1.setCollider('circle',0,0,45)
  camera.position.x = trex.x + 500
  //camera.position.y = cars[index-1].y
 
  //obstaclesGroup.setVelocityXEach(-(7.5 + 1.5*score/100)) 
 // ground.velocityX = 0
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
   // ground.velocityX = -(7.5 + 1.5*score/100);
   trex.velocityX = (7.5 + 1.5*score/100)

    if(touches.length < 0 || (keyDown("SPACE")) && trex.y  >= height-110) {
      jumpSound.play( )
      trex.velocityY = -14;
      
    }
        if(touches.length < 0 || (keyDown("up")) && trex.y  >= height-110) {
      jumpSound.play( )
      trex.velocityY = -14;
      
    }
    
    trex.velocityY = trex.velocityY + 1
    
  
   // if (ground.x < trex.x - width/2){
     // ground.x = ground.width/2 + trex.x/2;
    //}
  
    trex.collide(invisibleGround);
    invisibleGround.x = trex.x
    visibleGround.x = trex.x
   // spawnClouds();
   // spawnObstacles();
  
    if(obstacles1.isTouching(trex)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityX = 0
    //night.destroy();
    gameOver.x = trex.x + 250
    restart.x = trex.x + 250
    //set velcity of each game object to 0
 //   ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  if(keyDown("down")){
   // trex.rotation = 270
   //trex.scale = 0.07 
  }
  else{
 //  trex.rotation = 360
   //trex.scale = 0.08   
  }
  trex.x = trex.x
  if(mousePressedOver(restart)){
    reset()
  }
  if(obstacles1.x < trex.x - 400){
    trex.x = 50
    obstacles1.x = displayWidth + 1200
  }
  obstacles1.scale = 0.3;
  trex.debug = true
  obstacles1.debug = true
 // 
 obstacles1.setCollider('circle',0,0,45)
 trex.setCollider('rectangle',0,0,22.5,580)
 trex.x = trex.x
 obstacles1.depth = 1
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = 3;
    
     //assign lifetime to the variable
    cloud.lifetime = 650;
    
    //adjust the depth 
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
    
  
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(windowWidth + 25,height-95,75,75);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  obstacle.shapeColor = "orange"
   // obstacle.velocityX = -(7.5 + 1.5*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //obstacle.depth = trex.depth;
  //  trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  obstacles1.x = 1250
  trex.x = 50
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
