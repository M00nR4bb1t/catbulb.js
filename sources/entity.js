class Entity {
    constructor(position) {
        this.pos = position;
        this.vel = new SAT.V(0, 0);
        this.mask = null;
        this.container = new PIXI.Container();
    }

    move(delta) {
        this.pos.add(this.vel.clone().scale(delta, delta));
    }

    resolveCollisions() {
        if (this.mask != null) {
            this.mask.pos = this.pos;
            var response = new SAT.Response();
            for (var i=0; i<solids.length; i++) {
                if (SAT.testPolygonPolygon(this.mask, solids[i], response)) {
                    this.pos.sub(response.overlapV);
                }
                response.clear();
            }
        }
    }

    updateContainerPosition() {
        this.container.x = Math.floor(this.pos.x);
        this.container.y = this.container.z = Math.floor(this.pos.y);
    }

    update(delta) {
        this.move(delta);
        this.resolveCollisions();
        this.updateContainerPosition();
    }

    addTo(container) {
        container.addChild(this.container);
    }

    remove() {
        this.container.parent.removeChild(this.container);
    }
}