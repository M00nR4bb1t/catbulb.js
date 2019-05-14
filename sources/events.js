var Events = {};

Events.BaseEvent = class {
    constructor(args) {this.trigger = null; this.args = args;}
    play(trigger) {this.trigger = trigger;}
    update() {}
    keydown() {}
    keyup() {}
}

Events.Message = class extends Events.BaseEvent {
    constructor(args) {
        super(args);
        
        this.width = Math.ceil(width / 5 * 3);
        this.height = Math.ceil(height / 3);
        this.time = 0;
        this.reveal = 0;
        this.waning = false;

        this.container = new PIXI.Container();
        this.container.x = Math.floor(width / 2);

        this.graphics = new PIXI.Graphics();
        this.graphics.x = -this.width / 2;
        this.container.addChild(this.graphics);

        this.graphics.beginFill(0xffffc9);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();

        this.graphics.beginFill(0x004d4d);
        this.graphics.drawRect(2, 2, this.width - 4, this.height - 4);
        this.graphics.endFill();

        this.bitmapText = new BitmapText('', this.width - 12);
        this.bitmapText.x = Math.floor(-this.width / 2 + 6);
        this.bitmapText.y = 6;
        this.container.addChild(this.bitmapText);
    }

    play(trigger) {
        super.play(trigger);
        this.container.y = height;
        this.time = 0;
        this.waning = false;
        this.reveal = 0;
        this.bitmapText.text = '';
        gui.addChild(this.container);
        needsUpdate.push(this);
    }

    update(delta) {
        if (this.waning) {
            if (this.time < 0) {
                gui.removeChild(this.container);
                needsUpdate.remove(this);
                this.trigger.next();
            }

            this.time -= delta;
        } else {
            if (this.time % 2 < 1 && this.bitmapText.text != this.args.message) {
                this.reveal++;
                if (this.args.message.charAt(this.reveal - 1) == '§') {
                    this.reveal += this.args.message.substr(this.reveal).match(/{.*?}/g)[0].length;
                }
                this.bitmapText.text = this.args.message.substr(0, this.reveal);
            }
            
            if (this.time > 0 && (keyPressed.KeyZ || gamepadButtonPressed[0])) {
                if (this.bitmapText.text != this.args.message) {
                    this.bitmapText.text = this.args.message;
                } else {
                    this.time = 7;
                    this.waning = true;
                }
            }

            this.time += delta;
        }

        this.container.y = Math.floor(height - (Math.pow(Math.min(this.time / 7, 1) - 1, 3) + 1) * this.height * 1.25);
        this.bitmapText.redraw();
    }
}

Events.MapChange = class extends Events.BaseEvent {
    constructor(args) {
        super(args);

        this.time = 0;
        this.t = 0;
        
        this.container = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.container.addChild(this.graphics);
        this.bitmapText = new BitmapText('', width);
        this.container.addChild(this.bitmapText);
        this.bitmapText.y = 6;

        this.graphics.endFill();
    }

    play(trigger) {
        super.play(trigger);
        map.remove();
        (map = maps[this.args.map]).addTo(viewport);
        if (this.args.x != undefined) {
            player.pos.x = this.args.x;
        }
        if (this.args.y != undefined) {
            player.pos.y = this.args.y;
        }
        player.mask.pos = player.pos;
        var response = new SAT.Response();
        for (var i=0; i<triggers.length; i++) {
            if (SAT.testPolygonPolygon(player.mask, triggers[i].mask, response) && response.overlap > 0) {
                if (triggers[i].autoTrigger) player.searched.set(triggers[i], true);
            }
            response.clear();
        }
        for (var child of gui.children) {
            gui.removeChild(child);
        } 
        this.trigger.next();

        if (!this.bitmapText.text) {
            this.bitmapText.text = '§{"shake":3}' + maps[this.args.map].displayName;
            this.bitmapText.redraw();

            this.width = this.bitmapText.width + 12;
            this.height = this.bitmapText.height + 12;
            this.halfWidth = Math.floor(this.width / 2);
            this.desty = Math.floor(height / 6);

            this.container.x = Math.floor(width / 2) - this.halfWidth;
            this.graphics.beginFill(0xffffc9);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
            this.graphics.beginFill(0x004d4d);
            this.graphics.drawRect(0, 0, this.width, this.height - 4);
            this.graphics.endFill();

            this.bitmapText.x = Math.floor(this.halfWidth - this.bitmapText.width / 2);
            this.container.y = -this.height;
        }
        gui.addChild(this.container);
        this.time = 0;
        this.t = 0;
        needsUpdate.push(this);
    }

    update(delta) {
        this.time += delta;
        if (this.time > 120) {
            this.t -= 1/10;
            if (this.t < 0) {
                needsUpdate.remove(this);
                gui.removeChild(this.container);
                return;
            }
        } else {
            this.t = Math.min(this.t + 1/10, 1);
        }
        this.container.y = -this.height + (this.height + this.desty) * (Math.pow(this.t - 1, 3) + 1);
        this.bitmapText.redraw();
    }
}

Events.AddFilter = class extends Events.BaseEvent {
    constructor(args) {
        super(args);
    }

    play(trigger) {
        super.play(trigger);
        if (window[this.args.container].filters) {
            window[this.args.container].filters.push(filters[this.args.filter]);
        } else {
            window[this.args.container].filters = [filters[this.args.filter]];
        }
        this.trigger.next();
    }
}

Events.RemoveFilter = class extends Events.BaseEvent {
    constructor(args) {
        super(args);
    }

    play(trigger) {
        super.play(trigger);
        if (window[this.args.container].filters) {
            window[this.args.container].filters.remove(filters[this.args.filter]);
        }
        this.trigger.next();
    }
}

Events.ClearFilters = class extends Events.BaseEvent {
    constructor(args) {
        super(args);
    }

    play(trigger) {
        super.play(trigger);
        window[this.args.container].filters = [];
        this.trigger.next();
    }
}