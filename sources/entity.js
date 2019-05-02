class Entity {
    constructor(position) {
        this.pos = position;
        this.vel = new SAT.V(0, 0);
        this.mask = null;
        this.container = new PIXI.Container();
    }

    update(delta) {
        this.pos.add(this.vel.clone().scale(delta, delta));
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
        this.container.x = Math.floor(this.pos.x);
        this.container.y = Math.floor(this.pos.y);
    }

    addTo(container) {
        container.addChild(this.container);
    }

    remove() {
        this.container.parent.removeChild(this.container);
    }
}