
// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
   "isRunning":true,
   "isOver":false,
   "timer":190.6000000000091,
   "players":{
      "3cd71bbb-6a6b-4d4e-80e3-107130328a27":{
         "name":"blabla",
         "skinPath":"./assets/3.png",
         "position":[
            0.5600000000000003,
            0.17999999999999977
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":3,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      },
      "28ead291-fcea-4b41-a596-d3c876c49a53":{
         "name":"bloublou",
         "skinPath":"./assets/4.png",
         "position":[
            0.44,
            0.19
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":0,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      }
   }
};
class Game {
   constructor() {
      this.isRunning = true;
      this.isOver = false;
      this.timer = 0;
      this.players = {};

   }
   update(gameStateFromServer) {
      this.isRunning = gameStateFromServer.isRunning;
      this.isOver = gameStateFromServer.isOver;
      this.timer = gameStateFromServer.timer;  

      const Player_serveur = gameStateFromServer.players;

    for (const id in Player_serveur) {
        const data = Player_serveur[id];

        if (!this.players[id]) {
            this.players[id] = new Player(data);
        } else {
            this.players[id].update(data);
        }
    }

    for (const id in this.players) {
        if (!Player_serveur[id]) {
            delete this.players[id];
        }
      }
   }
}
const game = new Game();
game.update(backendData);
const modifiedBackendData = JSON.parse(JSON.stringify(backendData));
console.log(game);
delete modifiedBackendData.players["28ead291-fcea-4b41-a596-d3c876c49a53"];
game.update(modifiedBackendData);
console.log(game);
modifiedBackendData.players 
["3cd71bbb-6a6b-4d4e-80e3-107130328a28"] = {
         name:"blaup blaupe",
         skinPath:"./assets/4.png",
         position:[
            0.5600000000000003,
            0.17999999999999977
         ],
         lvl : 1,
         hp:100,
         maxHp:100,
         hpRegenRate:10,
         speed:0.2,
         direction:3,
         isAttacking:false,
         isWalking:false,
         isDying:false,
         attackCooldown:1,
         currentAttackCooldown:0
      }
game.update(modifiedBackendData);
