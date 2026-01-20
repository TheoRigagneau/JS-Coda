class GameController {
    constructor() {
       
        // Server sends updates at 20 ticks per second
        this.SERVER_TICK_RATE = 20;
        // Duration between two server ticks in milliseconds
        this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

        // Permanently bind "this" at the instance of the GameController class
        this.loop = this.loop.bind(this);

        this.game = new Game;
        this.name = localStorage.getItem("playerPseudo");
        this.url = localStorage.getItem("Url") ;
        this.skin = localStorage.getItem("playerSkin");


        this.socket = new WebSocket("ws://localhost:8000/ws");
        this.initSocket()

        this.inputState = {
            up : false,
            down : false,
            left : false,
            right : false,
            attack : false
        }
        // Regulates framerate to keep 60fps
        this.initInput();
        this.startInputSender();
        requestAnimationFrame(this.loop);
        console.log(this.socket);
    }
    initSocket() {
        this.socket.onopen = () => {
            console.log('WebSocket connexion établie');
        this.socket.send(JSON.stringify({
            name : this.name,
            skinPath : this.skin
        }));}
        this.socket.onmessage = (event) => {
            this.game.update(JSON.parse(event.data));}
    };
    initInput() {
        window.addEventListener("keydown", (event) => {
        switch (event.key.toLowerCase()) {
            
            case "z":
                this.inputState.up = true;
                console.log(this.inputState);
                break;
            case "s":
                this.inputState.down = true;
                console.log(this.inputState);
                break;
            case "q":
                this.inputState.left = true;
                console.log(this.inputState);
                break;
            case "d":
                this.inputState.right = true;
                console.log(this.inputState);
                break;
            case " ":
                this.inputState.attack = true;
                console.log(this.inputState,game);
                break;
            default :
                console.log(event.key);
        }
        });


        window.addEventListener("keyup", (event) => {
        switch (event.key.toLowerCase()) {
            case "z":
                this.inputState.up = false;
                console.log(this.inputState);
                break;
            case "s":
                this.inputState.down = false;
                console.log(this.inputState);
                break;
            case "q":
                this.inputState.left = false;
                console.log(this.inputState);
                break;
            case "d":
                this.inputState.right = false;
                console.log(this.inputState);
                break;
            case " ":
                this.inputState.attack = false;
                console.log(this.inputState);
                break;
            default :
                console.log(this.inputState);
            
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

    // === Main render loop ===
    loop(timestamp) {
        // Request the next frame
        requestAnimationFrame(this.loop);
    }

}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();
