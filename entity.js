export class Entity {
    constructor(pos, size, health, strength, texture) {
       // Add props 
       this.pos = pos; // Top left on ent
       this.size = size;
       this.health = health;
       this.strength = strength;
       this.texture = texture;
    }

    // Aprox the radius, but its not a circle
    get radisch() {
        return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2))
    }

    distanceBetween(pos) {
        return Math.sqrt(Math.pow(this.pos.x-pos.x, 2) + Math.pow(this.pos.y - pos.y, 2));
    }

    colide(other, dx, dy) {
       if(other.distanceBetween({x:this.pos.x + dx, y: this.pos.y + dy}) <= this.radisch + other.radisch) {
           // They are close enough to test more collition
       }
       return false
    }

    collisionDetection(dx, dy, entityList) {
        for (let e of entityList) {
            if (this.colide(e, dx, dy)) {
                // You have colided
                
            }
        }
    }

    tick(delta, entityList) {
        throw "Not Implemented"
    }


}


