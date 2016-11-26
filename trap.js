import Entity from 'entity';
import Monster from 'monster';

export class Trap extends Entity {
    constructor(pos, size, health, strength, texture) {
        super(pos, size, health, strength, texture);
    }

    collidedWith(ent) {
        if (ent instanceof Monster) {
            ent.hurt(this.strength);
            this.hurt(1);
        }
    }
}
