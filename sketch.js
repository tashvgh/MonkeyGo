var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground;
var  survivalTime=0;

function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale= 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  
} 

  



function draw() {
background('white');
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time : " + survivalTime, 100, 50);
        
  
  
  
  spawnBananas();
  spawnobstacles();
  
  if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        monkey.velocityX = 0;
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    }
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }  
  drawSprites();
}


function spawnobstacles() {
 
  if(World.frameCount%300 === 0){
    obstacle = createSprite(600,320,10,40);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.2;
    
  }
  
}


function spawnBananas() {
  if(World.frameCount%80 === 0){
  banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(100,200));
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.lifetime = 300;
    bananaGroup.add(banana);
    banana.scale = 0.1;
  }
}

 