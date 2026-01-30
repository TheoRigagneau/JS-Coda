import Player from "./player.js";
export default 
class Game {
   constructor(){
      this.players = {};
      this.timer = 0;
      this.isOver = false;
      this.isRunning = true;
      
   }

   update(gameStatFromServer) {
      this.timer = gameStatFromServer.timer;
      this.isOver = gameStatFromServer.isOver;
      this.isRunning = gameStatFromServer.isRunning;

      const serverPlayers = gameStatFromServer.players;

      for (let id in serverPlayers) {
         const data = serverPlayers[id];


        if (!this.players[id]) {
            this.players[id] = new Player(id, data.name, data.skinPath, data.position);
        }
        else {
            this.players[id].update(data);
            }
        }

    for (let id in this.players) {
        if (!serverPlayers[id]) {
            delete this.players[id];
        }
    }
}
}
const game = new Game;



    

     