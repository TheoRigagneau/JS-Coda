export default
class GameView {
    constructor() {
        this.canvas = document.querySelector("#gameCanvas");
        this.scoreboard = document.querySelector("#scoreboard");
        this.ctx_sb=this.scoreboard.getContext("2d");
        this.ctx = this.canvas.getContext("2d");
        this.playerImages = {};
        this.startTime = Date.now();
    }

    clear(game) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }
    clear_sb(game) {
        this.ctx_sb.clearRect(0, 0, 200, 70);
    }

    drawBackground() {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(0, 0, 800, 600);
        
    }

    render(game) {
        this.clear(game);
        this.drawBackground();

        const playerIds = Object.keys(game.players);
        for (let i = 0; i < playerIds.length; i++) {
            const playerId = playerIds[i];
            const player = game.players[playerId];
            player.animate();
            this.drawPlayer(player,game);
        }
        this.clear_sb(game)
        this.drawScoreboard(game,playerIds.length);
    }

    coordX(coord_x) {
        return coord_x * this.canvas.width;
    }

    coordY(coord_y) {
        return coord_y * this.canvas.height;
    }

    drawHpBar(player, co_x, co_y, frameWidth) {
        if (player.isDying) return;

        const barWidth = 40;
        const barHeight = 6;

        const hpRatio = player.hp / player.maxHp;

        const barX = co_x + frameWidth / 2 - barWidth / 2;
        const barY = co_y - 10;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(barX - 1, barY - 1, barWidth + 2, barHeight + 2);

        if (hpRatio > 0.6){
         this.ctx.fillStyle = "green";
        }
        else if (hpRatio > 0.3){
         this.ctx.fillStyle = "orange";
        }
        else {this.ctx.fillStyle = "red";
        }
        this.ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);
    }

    drawCdBar(player, co_x, co_y,frameWidth) {
        if (player.isDying) return;
        if (player.currentAttackCooldown == 0) return ;

        const barWidth = 40;
        const barHeight = 6;

        const CdRatio = player.currentAttackCooldown / player.attackCooldown;
        const barX = co_x + frameWidth / 2 - barWidth / 2;
        const barY = co_y - 20;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(barX - 1, barY - 1, barWidth + 2, barHeight + 2);
        this.ctx.fillStyle = "cyan";
        this.ctx.fillRect(barX, barY, barWidth * CdRatio, barHeight);


    }

    drawScoreboard(game,joueur_max) {
        const ctx_sb = this.ctx_sb;
        let timer_game = 0;
        const ctx = this.ctx;
        if (game.isRunning) {
        timer_game = Math.floor((Date.now() - this.startTime) / 1000);
        }
        const alivePlayers = Object.values(game.players).filter(p => !p.isDying);
        const alivePlayers_lenght= Object.values(game.players).filter(p => !p.isDying).length;
        const deathPlayers = Object.values(game.players).filter(p => p.isDying);
        const deathPlayers_length = Object.values(game.players).filter(p => p.isDying).length;

        this.player_death ??= [];
        for (let i = 0; i < deathPlayers_length; i++) {
            const deadPlayer = deathPlayers[i];

            if (!this.player_death.includes(deadPlayer)) {
                
                this.player_death.push(deadPlayer);
                const number = this.player_death.length; 
                const position = deathPlayers_length - number + 1;
                const co_mort = 600 - (number * 20);
                this.ctx_sb.fillStyle = "gray";
                this.ctx_sb.fillText(
                    `${position}: ${deadPlayer.name} -> kill effectué ${(deadPlayer.lvl - 1)}`,
                    0,
                    co_mort
                    );
            }
        };
        ctx_sb.font = "18px Arial";
        ctx_sb.fillStyle = "white";
        ctx_sb.textAlign = "left";
        ctx_sb.textBaseline = "top";

        ctx_sb.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx_sb.fillRect(600, 0, 200, 80);

        ctx_sb.fillStyle = "gray";
        ctx_sb.fillText(`Joueurs restants : ${alivePlayers_lenght}/${joueur_max}`, 0, 20);
        if (game.isRunning) {
            ctx_sb.fillText(`Temps : ${timer_game}s`, 0, 40);
        }
        else {
            ctx_sb.fillText(`Temps : 0s`, 0, 40);
            this.ctx.textBaseline ="top";
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            ctx.fillText(`Waiting...`,300,20);
        }
        if (alivePlayers_lenght === 1 && timer_game >5) {
        this.ctx.textBaseline ="top";
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Bravo ${alivePlayers[0].name} vous avez gagné la partie 🎉 🎉`,100,20);
        game.isRunning = false;
        }
    }

    drawPlayer(player,game) {
        const alivePlayers = Object.values(game.players) .filter(player => !player.isDead).length;
        let player_death=[];
        const sprite_diff = [7,13,18,21,24,26,29];
        const id = player.id;
        const canvasX = this.coordX(player.renderX);
        const canvasY = this.coordY(player.renderY);

        if (!this.playerImages[id]) {
            const img = new Image();
            img.src = player.skinPath;

            img.onload = () => console.log("IMAGE LOADED:", player.skinPath);
            img.onerror = () => console.error("IMAGE NOT FOUND:", player.skinPath);

            this.playerImages[id] = img;
            return;
        }

        const spriteImg = this.playerImages[id];

        let spriteSize = 64;

        let sx = 0;
        let sy = 0;

        const lookDirection = {
            0: 0, // haut
            1: 3, // droite
            2: 2, // bas
            3: 1  // gauche
        };

        const spriteDirection = lookDirection[player.direction];
        if (player.isDying) {
            sx = player.deathSpriteIndex * spriteSize ;
            sy = 20*spriteSize;
        }
        else if (player.isAttacking || player.currentAttackSpriteStep > 0 || player.attackSpriteIndex > 0) {

            let check = 0;
            for (let i=0; i<sprite_diff.length;i++) {
                if (player.skinPath ===`assets/${sprite_diff[i]}.png`)
                {
                    check=1;
                }

            if (check == 1) spriteSize = 128;
            else spriteSize = 192;

            sx = player.attackSpriteIndex * spriteSize;
            sy = 3456 + (spriteDirection * spriteSize);
            }
        }
        else if (player.isWalking) {
            sx = player.walkSpriteIndex * spriteSize;
            sy = (8 + spriteDirection) * spriteSize;
        }
        
        else {
            sx = (player.idleSpriteIndex || 0) * spriteSize;
            sy = spriteDirection * spriteSize;
            player.isDead = false
        }
        if (spriteImg.complete) {
            if (!game.isRunning && alivePlayers===1 ) {
                const offsetX = spriteSize / 2;
                const offsetY = spriteSize / 2;
                this.ctx.drawImage(
                    spriteImg,
                    sx, sy,
                    spriteSize, spriteSize,
                    canvasX - offsetX,
                    canvasY - offsetY,
                    spriteSize*3, spriteSize*3
                );
                }
            else {
                const offsetX = spriteSize / 2;
            const offsetY = spriteSize / 2;
            this.ctx.drawImage(
                spriteImg,
                sx, sy,
                spriteSize, spriteSize,
                canvasX - offsetX,
                canvasY - offsetY,
                spriteSize, spriteSize
            );
            }
        }

        // --- PSEUDO + HP (on garde ton système actuel) ---
        if (!player.isDying) {
            const drawSize = 64;
            this.ctx.fillStyle = "white";
            this.ctx.font = "18px Arial";
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "top";
            if (player.currentAttackCooldown != 0) {
            this.ctx.fillText(player.name, canvasX - 15, canvasY - drawSize / 2 - 25);
            this.ctx.fillText(`(lvl : ${player.lvl})`, canvasX +10, canvasY - drawSize / 2 - 25);
            }
            else {
            this.ctx.fillText(player.name, canvasX - 15, canvasY - drawSize / 2 - 15);
            this.ctx.fillText(`(lvl : ${player.lvl})`, canvasX -20, canvasY - drawSize / 2 - 35);
            }
            if (game.isRunning) {
            this.drawHpBar(player, canvasX - drawSize / 2, canvasY - drawSize / 2+15, drawSize);
            this.drawCdBar(player, canvasX - drawSize / 2, canvasY - drawSize / 2+15, drawSize);
            }
        }
    }
}