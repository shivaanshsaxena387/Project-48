var stone,snake,lion,rhino,pc,oro,trap,forest;
var trapImage,oroImage,pcImage, forestImage,stoneImage,bg,lion,lionImage,rhino,rhinoImage,stone,stoneImage;
var score=0;
var rs,rsImage,gmo,gmoImage;
var gamestate = "play";

function preload(){
  trapImage=loadImage("beartrap.png")
  stoneImage=loadImage("stone.png")
  oroImage=loadImage("orochimaru.png")
  pcImage=loadAnimation("h1.png","h2.png","h3.png","h4.png","h5.png","h6.png","h7.png","h8.png","h9.png",
                        "h10.png","h11.png","h12.png","h13.png","h14.png")
  forestImage=loadImage("forest.png")
  lionImage=loadAnimation("tile000.png","tile001.png","tile002.png","tile003.png","tile004.png","tile005.png","tile006.png",
                     "tile007.png")
  rhinoImage=loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png","r6.png","r7.png","r8.png","r9.png",
                       "r10.png","r11.png","r12.png",)
  stoneImage=loadImage("stone.png")
  gmoImage=loadImage("gameover.jpg")
  rsImage=loadImage("restart.png")
}

function setup() {
  createCanvas(800,550,200,200)
  bg = createSprite(500,300)
  bg.addImage(forestImage)
  bg.scale=1.77
  bg.velocityX=-10

  pc=createSprite(10,200)
  pc.addAnimation("pc1",pcImage)
  pc.scale=1.1

  gmo=createSprite(400,250)
  gmo.addImage(gmoImage)
  gmo.scale=2

  rs=createSprite(400,470)
  rs.addImage(rsImage)
  rs.scale=0.3

  obstaclesGroup=new Group ();
  stoneGroup = new Group();
}

function draw() {
  background("green");
  
  if(gamestate === "play"){

    if(bg.x<0){
      bg.x=400
    }

    if(keyDown("space")){
      pc.velocityY=-3
    }

    pc.velocityY=pc.velocityY+0.5

   edges= createEdgeSprites()
    pc.collide(edges)

      
  if (keyDown("enter")) {
    stones();
}

 if(keyDown("enter")){
  stone.x = pc.x;
  stone.y=pc.y;
  stone.visible=true
  stone.velocityX = 3;

   }

    gmo.visible=false;
    rs.visible=false;

    if(stoneGroup.isTouching(obstaclesGroup)){
      score=score+1
      obstaclesGroup.destroyEach();
   }
   obstacles();
   stones();

   if (obstaclesGroup.isTouching(pc)){ 
     gamestate ="end";
  }
 
  }
  else if (gamestate=== "end"){
      score=0;
      bg.visible = false;
      gmo.visible=true;
      rs.visible=true;
      pc.visible=false;
      obstaclesGroup.destroyEach();
      stoneGroup.destroyEach();
  }
  
 
  if(score===20){
    rs.visible=true;
    obstaclesGroup.destroyEach();
    stoneGroup.destroyEach();
    bg.visible = false;
    pc.visible=false;
 
  textSize(40)
  fill ("red")
  text("Congratulations! You have won the game",50,400)
  }

  if(mousePressedOver(rs)){
    score=0;
    pc.visible=true
    bg.visible=true
    rs.visible=false
    gamestate = "play"
  }


  drawSprites()

  textSize(20)
  fill ("blue")
  text("SCORE:"+score,100,100)

  textSize(20)
  fill (255,192,203)
  text("SCORE REQUIRED:20",550,100)

  textSize(40)
  fill ("red")
  text("Press space to jump and enter to attack",50,50)


}

function obstacles() {
  if(frameCount%165===0){
  obstacle=createSprite(800,501)
  obstacle.velocityX=-3
  obstaclesGroup.add(obstacle)
  obstacle.x=Math.round(random(780,540));
  obstaclesGroup.Lifetime=800;

  var rand=Math.round(random(1,3));
  switch(rand){
    case 1:obstacle.addImage(trapImage);
    obstacle.scale=0.5
    break;
    case 2:obstacle.addAnimation("lion1",lionImage);
    obstacle.scale=2
    break;
    case 3:obstacle.addAnimation("rhino1",rhinoImage);
    obstacle.scale=2
    break;
  default:break;
  }
}
 }
 function stones(){
  stone=createSprite(50,450) 
  stone.addImage(stoneImage);
  stoneGroup.add(stone);
  stone.scale=0.13
  stone.visible=false

  pc.depth = stone.depth;
  pc.depth= pc.depth+1;
}