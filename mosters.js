import Entity from 'entity'

class Monster extends Entity {
    constructor() {
        this.health = 1000;
        this.strength = 100; // Damage per punch
        this.hitSpeed = 100; // Punches period, time to elapse between punches 
        this.movementSpeed = 0.01 // Squares per millisecond

        this.hitLoadtime = 0; // Miliseconds til next time the monster can punch
        
    }

    tick(delta, entityList) {
        this.hitLoadtime -= delta
        // Is there something infront of me??
        if () {
            // Can I puch now??
            if (this.hitLoadtime <= 0) {
                this.hitLoadtime = this.hitSpeed;
                // NOW HIIIITTTT!!!!
                // Punch the shit out of it...
            }
        } else {
            // Else I probaby want to move my ass
            // Use the delta to move
            let distance = this.movementSpeed*delta;
        }
    }

}


