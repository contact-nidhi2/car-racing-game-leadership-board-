class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1", car1Img);
    car2 = createSprite(300,200);
    car2.addImage("car1", car1Img);
    car3 = createSprite(500,200);
    car3.addImage("car1", car1Img);
    car4 = createSprite(700,200);
    car4.addImage("car1", car1Img);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(ground);
      image(track, 0,-displayHeight*4, displayWidth, displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x=200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
            x = x + 200;
      
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1;
      player.update(player.rank);
      console.log();
      Player.updateCarsAtEnd(player.rank);
      swal( {
        title: "Awesome trial ::"+ player.name,
        text: "You ranked::" + player.rank,
        icon: "success",
      })

    }

    drawSprites();
  }

end(){
  console.log("Game Ended");
 
}


displayRanks(){
  camera.position.x=0;
  camera.position.y=0; 
  Player.getPlayerInfo();
  for(var plr in allPlayers){
    textSize(40);
    stroke("green")
    if(allPlayers[plr].rank===1 ){
      text(allPlayers[plr].name +"You are 1st ",200,200);
    }
    if(allPlayers[plr].rank===2){
      text(allPlayers[plr].name +"You are 2st ",200,220);
    }
    if(allPlayers[plr].rank===3 ){
      text(allPlayers[plr].name +"You are 3st ",200,240);
    }
    if(allPlayers[plr].rank===4){
      text(allPlayers[plr].name +"You are 4st ",200,260);
    }
  }

}


}
