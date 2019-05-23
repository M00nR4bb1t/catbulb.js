class Camera {
    constructor(container) {
        this.container = container;
        this._zoom = 1;
    }

    setPosition(x, y) {
        this.container.x = Math.clamp((-x * this._zoom) + (width / 2), -map.graphics.width * this._zoom + width, 0);
        this.container.y = Math.clamp((-y * this._zoom) + (height / 2), -map.graphics.height * this._zoom + height, 0);
    }

    setZoom(zoom) {
        this.container.scale.set(zoom, zoom);
        this._zoom = zoom;
    }

    follow(target) {
        this.setPosition(target.container.x, target.container.y);
    }
}