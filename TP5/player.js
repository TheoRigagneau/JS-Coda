class Player {
    constructor(pseudos,skin,positionX,positionY) {
        this.pseudos = pseudos;
        this.skin = skin;
        this.positionX = positionX;
        this.positionY = positionY;
        this.hp = hp;
        this.lvl =lvl;
        this.vitesse = vitesse;
        this.attaque = attaque;
        this.alive = alive;
        this.regen = regen;
        this.cooldown = cooldown;

        this.cooldown_max = cooldown_max;
        this.hp_max = hp_max;
    }
    update(updateData) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.hp = updateData.hp;
        this.lvl =updateData.lvl;
        this.vitesse = updateData.vitesse;
        this.attaque = updateData.attaque;
        this.alive = updateData.alive;
        this.regen = updateData.regen;
        this.cooldown = updateData.cooldown;
        this.cooldown_max = cooldown_max;
        this.hp_max = hp_max; 
    }


}

class Game {

}