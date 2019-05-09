class TileMap {
    constructor(displayName, data, width, height, tileset, solids, triggers) {
        this.solids = solids;
        this.triggers = triggers;
        this.displayName = displayName;

        this.graphics = new PIXI.Graphics();
        this.graphics.z = -1000;
        for (var k=0; k<data.length; k++) {
            for (var j=0; j<height; j++) {
                for (var i=0; i<width; i++) {
                    if (data[k][j * width + i] == 0) continue;
                    this.graphics.beginTextureFill(tileset[data[k][j * width + i] - 1]);
                    this.graphics.drawRect(i * gridWidth, j * gridHeight, gridWidth, gridHeight);
                    this.graphics.endFill();
                }
            }
        }
    }

    addTo(container) {
        container.addChild(this.graphics);
        solids = this.solids;
        triggers = this.triggers;
        for (var trigger of triggers) {
            trigger.addTo(app.stage);
        }
    }

    remove() {
        this.graphics.parent.removeChild(this.graphics);
        solids = [];
        for (var trigger of triggers) {
            trigger.remove();
        }
        triggers = [];
    }
}