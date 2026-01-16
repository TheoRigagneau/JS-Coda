const selectedSkin = document.getElementById("selectedskin");
class Player {
    constructor(pseudos,skin,positionX,positionY) {
        this.pseudos = pseudos;
        this.skin = skin;
        this.positionX = positionX;
        this.positionY = positionY;

        this.hp = 10;
        this.lvl =1;
        this.vitesse = 1;
        this.attaque = 1;
        this.alive = true;
        this.regen = 1;
        this.cooldown = 0;
        this.cooldown_max = 1;
        this.hp_max = 20;

        this.isattacking = false;
        this.iswalking = false;
        this.isdying = false;

        this.WalkSpriteDuration = 2;
        this.WalkSpriteIndex = 0;
        this.WalkSpriteNumber = 9;
        this.currentWalkSpriteStep = 0;

        this.AttackSpriteDuration = 2;
        this.AttackSpriteIndex = 0;
        this.AttackSpriteNumber = 6;
        this.currentAttackSpriteStep = 0;

        this.DyingSpriteDuration = 2;
        this.DyingSpriteIndex = 0;
        this.DyingSpriteNumber = 6;
        this.currentDyingSpriteStep = 0;

    }
    update(updateData) {
        console.log("position X :",this.positionX)
        this.positionX = updateData.positionX;
        console.log("position X :",this.positionX)
        this.positionY = updateData.positionY;

        this.hp = updateData.hp;
        this.lvl =updateData.lvl;
        this.vitesse = updateData.vitesse;
        this.attaque = updateData.attaque;
        this.alive = updateData.alive;
        this.regen = updateData.regen;
        this.cooldown = updateData.cooldown;
        this.cooldown_max = updateData.cooldown_max;
        this.hp_max = updateData.hp_max;
        this.iswalking = updateData.iswalking;
        this.isattacking = updateData.isattacking;
        this.isdying = updateData.isdying
    }
    
    animate() {
        if (this.isdying) {
            this.currentDyingSpriteStep++;
            if (this.currentDyingSpriteStep >= this.DyingSpriteDuration) {
                this.currentDyingSpriteStep = 0;
                this.DyingSpriteIndex++
            }
            if (this.DyingSpriteIndex >= this.DyingSpriteNumber) {
                console.log("Vous êtes mort")
                this.isdying = false;
                this.alive = false;
            }
        }
        
        else if (this.iswalking) {
            this.currentWalkSpriteStep++;
            if (this.currentWalkSpriteStep >= this.WalkSpriteDuration) {
                this.currentWalkSpriteStep = 0;
                this.WalkSpriteIndex++
            }
            if (this.WalkSpriteIndex >= this.WalkSpriteNumber) {
                this.WalkSpriteIndex = 0;
            }
        }
        else if (this.isattacking) {
            this.WalkSpriteIndex = 0;
            this.currentAttackSpriteStep++;
            if (this.currentAttackSpriteStep >= this.AttackSpriteDuration) {
                this.currentAttackSpriteStep = 0;
                this.AttackSpriteIndex++
            }
            if (this.AttackSpriteIndex >= this.AttackSpriteNumber) {
                this.AttackSpriteIndex = 0;
                this.isattacking=false;
                console.log("Vous avez fini votre animation d'attaque") ;

            }
        }
        else {
            this.WalkSpriteIndex = 0
        }
        if (this.iswalking) {
        console.log("Walk Animation : \n");
        console.log("isWalking = ", this.iswalking);
        console.log("walkSpriteIndex = ",this.WalkSpriteIndex);
        console.log("this.currentWalkSpriteStep = ",this.currentWalkSpriteStep)
        }
        if (this.isattacking) {
            console.log("attack Animation : \n");
            console.log("isattacking = ", this.isattacking);
            console.log("attackSpriteIndex = ",this.AttackSpriteIndex);
            console.log("this.currentattackSpriteStep = ",this.currentAttackSpriteStep)
            }
        if (this.isdying) {
            console.log("Dying Animation : \n");
            console.log("isDying = ", this.isdying);
            console.log("DyingSpriteIndex = ",this.DyingSpriteIndex);
            console.log("this.currentdyingSpriteStep = ",this.currentDyingSpriteStep)
            }
    }
    draw(ctx) {
        if (!this.spriteLoaded) return;

        const frameWidth = 64;   // largeur d’une frame
        const frameHeight = 64;  // hauteur d’une frame

        let frameX = 0;
        let frameY = 0;

        if (this.isdying) {
            frameX = this.DyingSpriteIndex * frameWidth;
            frameY = 2 * frameHeight; // ligne 2 = mort
        } else if (this.isattacking) {
            frameX = this.AttackSpriteIndex * frameWidth;
            frameY = 1 * frameHeight; // ligne 1 = attaque
        } else if (this.iswalking) {
            frameX = this.WalkSpriteIndex * frameWidth;
            frameY = 0 * frameHeight; // ligne 0 = marche
        } else {
            frameX = 0;
            frameY = 0;
        }

        ctx.drawImage(
            this.spriteSheet,
            frameX, frameY, frameWidth, frameHeight,
            this.positionX, this.positionY, frameWidth, frameHeight
        );
    }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const sprite = new Image();
const savedPseudo = localStorage.getItem("playerPseudo") || "Inconnu";
const savedSkin = localStorage.getItem("playerSkin") || "assets/23.png";
console.log("Pseudo :", savedPseudo);
console.log("url :",localStorage.getItem("Url") );
console.log("Skin :", savedSkin);
sprite.onload = () => {
    // On crée le joueur UNE FOIS, quand le sprite est prêt
    window.Player1 = new Player(savedPseudo, savedSkin, 10, 0);
    console.log(Player1.positionX);
    Player1.spriteSheet = sprite;
    Player1.spriteLoaded = true;

    // On applique la sauvegarde
    const saved = localStorage.getItem("playerState");
    console.log(Player1.positionX);
    if (saved) {
        console.log("saved =", JSON.parse(saved));
        Player1.update(JSON.parse(saved));
    }
    gameLoop(Player1);
};

let keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function gameLoop(Player1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let walking = false;

    if (keys["z"]) {
        Player1.positionY -= Player1.vitesse;
        walking = true;
    }

    if (keys["q"]) {
        Player1.positionX -= Player1.vitesse;
        walking = true;
    }

    if (keys["d"]) {
        Player1.positionX += Player1.vitesse;
        walking = true;
    }

    if (keys["s"]) {
        Player1.positionY += Player1.vitesse;
        walking = true;
    }

    Player1.iswalking = walking;
    Player1.animate();
    Player1.draw(ctx);

    savePlayerState(Player1);

    requestAnimationFrame(() => gameLoop(Player1));
}
function savePlayerState(player) {
    const data = {
        positionX: player.positionX,
        positionY: player.positionY,
        hp: player.hp,
        lvl: player.lvl,
        alive: player.alive,
    };

    localStorage.setItem("playerState", JSON.stringify(data));
}

