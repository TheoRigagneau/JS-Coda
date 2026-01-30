import Game from "./model/Game.js";
import GameView from "./view/GameViews.js";
import GameController from "./controller/GameController.js";

const gameController = new GameController(Game,GameView);