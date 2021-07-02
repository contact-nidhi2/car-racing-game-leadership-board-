var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var finishedPlayer=0;

var form, player, game;

var cars, car1, car2, car3, car4;
var track ,car1Img, car2Img, car3Img,car4Img ,ground;

function preload(){
    track = loadImage("../images/track.jpg");
    car1Img =loadImage("../images/car1.png");
    car1Img =loadImage("../images/car2.png");
    car1Img =loadImage("../images/car3.png");
    car1Img =loadImage("../images/car4.png");
    ground = loadImage("../images/ground.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(200);
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  
  if(gameState === 2 && player.rank===4){
    
    game.end();
  }
  
}