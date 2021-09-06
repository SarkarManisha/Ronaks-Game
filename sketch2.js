var bg,bgImg,bgImg2,bgImg3,bgImg4,bgImg5;
var player,playerImg;
var gameState="start";
var l1ob1,l1ob2,l1ob3,l1ob4;
var key1,keyImg;
var clue1,q1,question1;

function preload(){
  bgImg=loadImage("intro.jpg")
  bgImg2=loadImage("level1.jpg")
  bgImg3=loadImage("l2.jpg")
  bgImg4=loadImage("l3.jpg")
  bgImg5=loadImage("GM.png")
  playerImg=loadImage("th.png")
  keyImg=loadImage("key.png")
  question1=loadImage("question1.png")
}

function setup(){
  createCanvas(800,600)
  bg=createSprite(width/2,height/2)
  bg.addImage(bgImg)

  l1ob1=createSprite(width/2,height/2+55,450,300);
  l1ob1.shapeColor="blue"
  l1ob1.visible=false;
  l1ob2=createSprite(width/2+250,height/2-20,450,300)
  l1ob2.shapeColor="red"
  l1ob2.visible=false;
  l1ob3=createSprite(720,430,200,20);
  l1ob3.shapeColor="blue";
  l1ob3.visible=false;
  l1ob4=createSprite(780,50,70,200);
  l1ob4.shapeColor="red";
  l1ob4.visible=false;

  player=createSprite(665,560,50,50)
  player.addImage(playerImg)
  player.scale=0.1

  key1=createSprite(260,75,10,10)
  key1.addImage(keyImg)
  key1.scale=0.01
  key1.visible=false;

  q1=createSprite(width/2,height/2);
  q1.addImage(question1);
  q1.scale=0.7;
  q1.visible=false;
  clue1=createSprite(68,286,10,10);
  clue1.visible=false;
}

function draw(){
  background(0);
  
  if(keyDown(UP_ARROW)){
    player.y=player.y-5;
  }
  if(keyDown(DOWN_ARROW)){
    player.y=player.y+5;
  }
  if(keyDown(RIGHT_ARROW)){
    player.x=player.x+5;
  }
  if(keyDown(LEFT_ARROW)){
    player.x=player.x-5;
  }

  player.bounceOff(l1ob1);
  player.bounceOff(l1ob3);

  if(gameState==="start"){
    player.visible=false;
    if(keyDown("space")){
      gameState="level1"
    }
  }
  else if(gameState==="level1"){
    player.visible=true;
    console.log(gameState)
    bg.addImage(bgImg2)
    if(player.isTouching(clue1)){
        key1.visible=true;
    }
    if(player.isTouching(key1)){
        q1.visible=true;
    }
    if(keyDown("b")){
      gameState="level2"
      player.x=250;
      player.y=150;
    }
    if(player.isTouching(l1ob2) || player.isTouching(l1ob4)){
      player.destroy();
      gameState="over"
    }
  }
  else if(gameState==="level2"){
    l1ob1.destroy();
    l1ob2.destroy();
    l1ob3.destroy();
    l1ob4.destroy();
    q1.destroy();
    console.log(gameState)
    bg.addImage(bgImg3)
    bg.scale=1.7
    
    if(keyDown("t")){
      gameState="level3"
      player.x=665;
      player.y=515;
    }
  }
  else if(gameState==="level3"){
    console.log(gameState)
    bg.addImage(bgImg4)
    bg.scale=1.5
    if(keyDown("m")){
      gameState="level4"
    }
  }
  else if(gameState==="over"){
    bg.addImage(bgImg5)
    bg.scale=0.5
  }
  drawSprites();
  textSize(25)
  text(mouseX +" , "+ mouseY, mouseX,mouseY)
}