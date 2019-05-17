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
            new SAT.V(-16, -16),
            new SAT.V(16, -16),
            new SAT.V(16, 0),
            new SAT.V(-16, 0)
        ]);
        
        this.walkSpeed = 2.5;
        this.dashSpeed = 5;
        this.paralyzed = false;
        this.searched = new Map();
    }

    update(delta) {
        if (!this.paralyzed) {
            this.vel.x = (keyDown.ArrowRight? 1:0) - (keyDown.ArrowLeft? 1:0);
            this.vel.y = (keyDown.ArrowDown? 1:0) - (keyDown.ArrowUp? 1:0);
            if (this.vel.x == 0 && this.vel.y == 0) {
                this.vel.x = gamepadAxes[0];
                this.vel.y = gamepadAxes[1];
                if (this.vel.len() < 0.5) {
                    this.vel.x = 0;
                    this.vel.y = 0;
                }
            }
            if (this.vel.x == 0 && this.vel.y == 0) {
                this.vel.x = (gamepadButtonDown[15]? 1:0) - (gamepadButtonDown[14]? 1:0);
                this.vel.y = (gamepadButtonDown[13]? 1:0) - (gamepadButtonDown[12]? 1:0);
            }
            
            if (this.vel.len() > 0) {
                this.vel.normalize().scale((keyDown.LeftShift || gamepadButtonDown[2])? this.dashSpeed:this.walkSpeed, (keyDown.LeftShift || gamepadButtonDown[2])? this.dashSpeed:this.walkSpeed);
            }
        }

        var xPrev = this.pos.x, yPrev = this.pos.y;
        this.move(delta);

        if (!this.paralyzed) {
            this.mask.pos = this.pos;
            var response = new SAT.Response();
            for (var i=0; i<triggers.length; i++) {
                if (SAT.testPolygonPolygon(this.mask, triggers[i].mask, response) && response.overlap > 0) {
                    if (!triggers[i].isPlaying() && !this.searched.get(triggers[i]) && (triggers[i].autoTrigger || keyPressed.KeyZ || gamepadButtonPressed[0])) {
                        triggers[i].play();
                        if (triggers[i].autoTrigger) this.searched.set(triggers[i], true);
                    }
                } else if (this.searched.get(triggers[i])) {
                    this.searched.set(triggers[i], false);
                }
                response.clear();
            }
        }

        this.resolveCollisions();

        if (this.pos.x != xPrev || this.pos.y != yPrev) {
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

        this.updateContainerPosition();
    }
}