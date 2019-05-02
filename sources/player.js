class Player extends Entity {
    constructor(position, idleAnim, walkAnim) {
        super(position);
        
        this.idleAnim = idleAnim;
        this.walkAnim = walkAnim;

        this.sprite = new PIXI.AnimatedSprite(this.idleAnim);
        this.sprite.anchor.set(0.5, 1);
        this.sprite.animationSpeed = 0.05;
        this.sprite.play();
        this.container.addChild(this.sprite);

        this.mask = new SAT.Polygon(new SAT.V(0, 0), [
            new SAT.V(-8, -8),
            new SAT.V(8, -8),
            new SAT.V(8, 0),
            new SAT.V(-8, 0)
        ]);
        
        this.speed = 1.25;
    }

    update(delta) {
        this.vel.x = (isKeyDown.ArrowRight? 1:0) - (isKeyDown.ArrowLeft? 1:0);
        this.vel.y = (isKeyDown.ArrowDown? 1:0) - (isKeyDown.ArrowUp? 1:0);
        
        if (this.vel.len() > 0) {
            this.vel.normalize().scale(this.speed, this.speed);
            if (this.sprite.textures != this.walkAnim) {
                this.sprite.textures = this.walkAnim;
                this.sprite.animationSpeed = 0.15;
                this.sprite.gotoAndPlay(0);
            }
            if (this.vel.x != 0) {
                this.sprite.scale.x = Math.sign(this.vel.x);
            }
        } else if (this.sprite.textures != this.idleAnim) {
            this.sprite.textures = this.idleAnim;
            this.sprite.animationSpeed = 0.05;
            this.sprite.gotoAndPlay(0);
        }

        super.update(delta);
    }
}