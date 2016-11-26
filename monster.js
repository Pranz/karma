import Entity from 'entity'


class Monster extends Entity {
    constructor(pos, size, health, strength, texture, hitSpeed, movementSpeed, direction) {
        super(pos, size, health, strength, texture);

        this.hitSpeed = hitSpeed; // Punches period, time to elapse between punches 
        this.movementSpeed = movementSpeed; // Squares per millisecond
        this.direction = direction; // Directions in radians. 0 => right, counter clockvise
        
        this.hitLoadtime = 0; // Miliseconds til next time the monster can punch
    }

    deltaMove(deltaTime) {
        let distance = this.movementSpeed*deltaTime;
        let dx = distance * Math.cos(this.direction);
        let dy = -1 * distance * Math.sin(this.direction);
        return {dx, dy};
    }

    tick(deltaTime, entityList) {
        this.hitLoadtime -= deltaTime;
        // Is there something infront of me??
        let dm = this.deltaMove(deltaTime);
        let coliders = this.collisionDetection(deltaMove, entityList)
                            .filter(e => !(e instanceof Monster));
        if (coliders.length != 0) {
            // Who should i punch??
            let toHit = coliders[0]
            
            if (this.hitLoadtime <= 0) {
                this.hitLoadtime = this.hitSpeed;
                // NOW HIIIITTTT!!!!
                // Punch the shit out of it...
                toHit.hurt(this.strength);
            }
            
        } else {
            this.pos.x += dm.dx;
            this.pos.y += dm.dy;
        }
    }
}


