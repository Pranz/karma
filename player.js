let Entity = require('./entity');
let Monster = require('./monster');

module.exports = class extends Entity {
    constructor(pos, size, health, strength, texture, hitSpeed, movementSpeed, direction) {
        super(pos, size, health, strength, texture);

        this.karma = 9001;
        this.hitSpeed = hitSpeed; // Punches period, time to elapse between punches 
        this.movementSpeed = movementSpeed; // Squares per millisecond
        this.direction = direction; // Directions in radians. 0 => right, counter clockvise
        
        this.hitLoadtime = 0; // Miliseconds til next time the monster can punch
        this.walls = 0;
        this.traps = 0;
        this.lastMove = Date.now();
        this.lastPunch = Date.now();
    }

    deltaPunch() {
        return Date.now() - this.lastPunch;
    }

    deltaMove() {
        return Date.now() - this.lastMove;
    }

    deltaMoveToDistance(dm) {
        return Math.sqrt(dm.dx*dm.dx + dm.dy*dm.dy)
    }

    onMove(deltaMove, entityList) {
        // Check if it is too fast
        let distance = this.deltaMoveToDistance(deltaMove);
        let speed = distance/this.deltaMove();
        if (speed > this.movementSpeed) {
            let newDistance = this.movementSpeed * this.deltaMove();

            let dx = newDistance * deltaMove.dx/distance;
            let dy = newDistance * deltaMove.dy/distance;
            deltaMove = {dx, dy};
        }

        // Check if there is a collition
        let collitionList = this.collisionDetection(deltaMove, entityList).
                                filter((e) => !(e instanceof Trap)).
                                filter((e) => !(e instanceof Player)).
                                filter((e) => !(e instanceof Spawn));
        if (collitionList.length != 0) {
            // You have colided
            return;
        }
        if (deltaMove.dx == 0) {
            this.direction = deltaMove.dy > 0 ? Math.PI/2: 3*Math.PI/2;
        } else {
            let atan = Math.atan(deltaMove.dy/deltaMove.dx);
            if (deltaMove.dx < 0) {
                atan += Math.PI;
            }
            if (atan < 0) {
                atan += 2*Math.PI;
            }
            this.direction = atan;
        }

        this.pos.x += deltaMove.dx;
        this.pos.y += deltaMove.dy;
    }

    onPunch(entityList) {
        let dx = Math.cos(this.direction);
        let dy = -1 * Math.sin(this.direction);
        let collitionList = this.collisionDetection({dx, dy}, entityList).
                                filter((e) => (e instanceof Monster));
        if (collitionList.length != 0) {
            collitionList[0].hurt(this.strength);
        }
    }

    onPlace(type) {
        
    }
}


