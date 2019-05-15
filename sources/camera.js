class Camera {
    constructor(container) {
        this.container = container;
    }

    setPosition(x, y) {
        this.container.x = -(x - width / 2);
        this.container.y = -(y - height / 2);
    }

    setZoom(zoom) {
        this.container.scale.set(zoom, zoom);
    }

    follow(target) {
        this.setPosition(Math.clamp(target.container.x, width / 2, map.graphics.width - width / 2), Math.clamp(target.container.y, height / 2, map.graphics.height - height / 2));
    }
}