import GameView from "../view/GameViews.js";
import Game from "../model/Game.js";
export default
class GameController {
    constructor() {
       
        // Server sends updates at 20 ticks per second
        this.SERVER_TICK_RATE = 20;
        // Duration between two server ticks in milliseconds
        this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

        // Permanently bind "this" at the instance of the GameController class

        this.game = new Game;
        this.gameview = new GameView(this.game);
        this.lastServerUpdate = performance.now();
        this.name = localStorage.getItem("playerPseudo");
        this.url = localStorage.getItem("Url") ;
        this.skin = localStorage.getItem("playerSkin") || "assets/1.png";


        this.socket = new WebSocket("ws://13.38.137.68:8000/ws");
        this.initSocket()

        this.inputState = {
            up : false,
            down : false,
            left : false,
            right : false,
            attack : false,
            damage : false,
        }
        // Regulates framerate to keep 60fps
        this.initInput();
        this.startInputSender();
         this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }
    
    // === Main render loop ===
    loop(timestamp) {
        // Request the next frame
        const alpha = Math.min((timestamp - this.lastServerUpdate) / this.SERVER_INTERVAL, 1);
        for (let player in this.game.players){
            this.game.players[player].interpolate(alpha);
        }
        this.gameview.render(this.game);
        requestAnimationFrame(this.loop);
    }

    initSocket() {
        this.socket.onopen = () => {
            console.log('WebSocket connexion établie');
        this.socket.send(JSON.stringify({
            name : this.name,
            skinPath : this.skin
        }));
    };
        this.socket.onmessage = (event) => {
            this.game.update(JSON.parse(event.data));
            this.gameview.render(this.game);
            this.lastServerUpdate= performance.now()
        };
    };
    initInput() {
        window.addEventListener("keydown", (event) => {
        switch (event.key.toLowerCase()) {
            
            case "z":
                this.inputState.up = true;
                break;
            case "s":
                this.inputState.down = true;
                break;
            case "q":
                this.inputState.left = true;
                break;
            case "d":
                this.inputState.right = true;
                break;
            case " ":
                this.inputState.attack = true;
                break;
            default :
        }
        this.gameview.render(this.game);
        });


        window.addEventListener("keyup", (event) => {
        switch (event.key.toLowerCase()) {
            case "z":
                this.inputState.up = false;
                break;
            case "s":
                this.inputState.down = false;
                break;
            case "q":
                this.inputState.left = false;
                break;
            case "d":
                this.inputState.right = false;
                break;
            case " ":
                this.inputState.attack = false;
                break;
            
        }
    });
    }
    startInputSender() {
        setInterval(() => {
            if (this.socket.readyState !== WebSocket.OPEN) {
                return;
            }
            const message = {
                type : "input",
                input: this.inputState
            };
            this.socket.send(JSON.stringify(message));
        }, this.SERVER_INTERVAL);
    }

}

