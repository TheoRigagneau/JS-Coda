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
        this.positionX = updateData.positionX;
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
        console.log(Player1.positionX);
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
}
    
    // Définit la durée de l'action
    tempsRestantAction = Math.floor(Math.random() * 5) + 4;

const Player1 = new Player("Totor99","skin",[0,0]);

const choix = Math.floor(Math.random() * 3); 
if (choix === 0) Player1.iswalking = true;
else if (choix === 1) Player1.isattacking = true;
else if (choix === 2) Player1.isdying = true;
for (let i =0; i<20; i++) {
    Player1.animate();
}
