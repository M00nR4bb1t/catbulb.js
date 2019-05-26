var Events = {};

Events.ShowText = class {
    constructor(args) {
        this.args = args;
        
        this.width = Math.ceil(width / 5 * 3);
        this.height = Math.ceil(height / 3);
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        this.time = 0;
        this.reveal = 0;
        this.waning = false;

        this.container = new PIXI.Container();
        this.container.pivot.x = this.halfWidth;
        this.container.pivot.y = this.halfHeight;
        this.container.x = Math.floor(width / 2);
        this.container.y = Math.floor(height * (this.args.hasOwnProperty('y')? this.args.y:0.775));

        if (this.args.hasOwnProperty('background')) {
            this.ns = nineslice[this.args.background]();
            this.ns.width = this.width;
            this.container.addChild(this.ns);
        }

        this.textContainer = new PIXI.Graphics();
        this.container.addChild(this.textContainer);

        this.messageText = new BitmapText(this.args.message, this.width - 12);
        this.messageText.x = 6;
        this.messageText.y = 8;
        this.textContainer.addChild(this.messageText);
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        if (this.ns) this.ns.height = 0;
        this.textContainer.visible = false;
        this.time = 0;
        this.waning = false;
        this.reveal = 0;
        this.messageText.reveal = 0;
        this.messageText.redraw();
        gui.addChild(this.container);
        needsUpdate.push(this);
    }

    update(delta) {
        if (this.waning) {
            if (this.time <= 0) {
                gui.removeChild(this.container);
                needsUpdate.remove(this);
                this.eventPlayer.next();
            }

            this.time -= delta;
        } else {
            if (this.time > 10 && this.time % ((keyDown.KeyX || gamepadButtonDown[1])? 1:3) < 1 && this.messageText.reveal < this.messageText.realLength) {
                this.messageText.reveal++;
            }
            
            if (this.time > 0 && (keyPressed.KeyZ || gamepadButtonPressed[0])) {
                if (this.messageText.reveal < this.messageText.realLength) {
                    this.messageText.reveal = this.messageText.realLength;
                } else {
                    this.time = 10;
                    this.waning = true;
                    this.textContainer.visible = false;
                }
            }

            if (!this.waning) {
                this.time += delta;

                if (this.time >= 10) {
                    this.textContainer.visible = true;
                }
            }
        }

        if (this.ns) {
            var ease = Math.pow(Math.clamp(this.time / 10, 0, 1) - 1, 3) + 1;
            this.ns.height = Math.floor(this.height * ease);
            this.ns.y = Math.floor((this.height - this.ns.height) / 2);
        }
        this.messageText.redraw();
    }
}

Events.ShowChoices = class {
    constructor(args) {
        this.args = args;
        
        this.width = Math.ceil(width / 25 * 6);
        this.halfWidth = Math.floor(this.width / 2);
        this.time = 0;
        this.waning = false;

        this.container = new PIXI.Container();
        this.container.x = Math.floor(width / 2);
        this.container.y = Math.floor(height * (this.args.hasOwnProperty('y')? this.args.y:0.775));

        this.textContainer = new PIXI.Graphics();
        this.container.addChild(this.textContainer);

        this.optionTexts = [];
        var y = 6;
        for (var i=0; i<this.args.options.length; i++) {
            this.optionTexts[i] = new BitmapText(this.args.options[i].text, this.width - 12, 0xcccccc);
            this.optionTexts[i].x = 6;
            y += 4;
            this.optionTexts[i].y = y;
            y += this.optionTexts[i].height + 6;
            this.textContainer.addChild(this.optionTexts[i]);
        }

        this.height = y + 4;
        this.halfHeight = Math.floor(this.height / 2);
        this.container.pivot.x = this.halfWidth;
        this.container.pivot.y = this.halfHeight;

        if (this.args.hasOwnProperty('background')) {
            this.bgNS = nineslice[this.args.background]();
            this.container.addChildAt(this.bgNS, 0);

            this.bgNS.x = -6;
            this.bgNS.width = this.width + 12;

            this.selectionNS = nineslice[this.args.background]();
            this.textContainer.addChildAt(this.selectionNS, 0);
            
            this.selectionNS.width = this.width;
            this.selectionNS.height = this.optionTexts[0].height + 6;
        }
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        if (this.bgNS) this.bgNS.height = 0;
        this.textContainer.visible = false;
        this.time = 0;
        this.waning = false;
        
        this.selection = 0;

        this.optionTexts[this.selection].tint = 0xffffff;
        this.optionTexts[this.selection].redraw();
        if (this.selectionNS) this.selectionNS.x = this.optionTexts[this.selection].x - 6;
        if (this.selectionNS) this.selectionNS.y = this.optionTexts[this.selection].y - 4;
        
        gui.addChild(this.container);
        needsUpdate.push(this);
    }

    update(delta) {
        if (this.waning) {
            if (this.time <= 0) {
                gui.removeChild(this.container);
                needsUpdate.remove(this);
                if (this.args.options[this.selection].events) {
                    this.eventPlayer.callback = null;
                    this.eventPlayer.forceFinish();
                    if (this.eventPlayer.trigger) {
                        this.eventPlayer.trigger.play(0, eventPlayers[this.args.options[this.selection].events]);
                    } else {
                        eventPlayers[this.args.options[this.selection].events].play();
                    }
                } else {
                    this.eventPlayer.next();
                }
            }

            this.time -= delta;
        } else {
            if (this.time > 0 && (keyPressed.KeyZ || gamepadButtonPressed[0])) {
                this.time = 10;
                this.waning = true;
                this.textContainer.visible = false;
            }
            
            var axisLengthPrev = Math.sqrt(Math.pow(gamepadAxesPrev[0], 2) + Math.pow(gamepadAxesPrev[1], 2));
            var axisLength = Math.sqrt(Math.pow(gamepadAxes[0], 2) + Math.pow(gamepadAxes[1], 2));
            var axisDir = Math.rad2deg(Math.atan2(gamepadAxes[1], gamepadAxes[0]));
            if (keyPressed.ArrowDown || gamepadButtonPressed[13] || (axisLengthPrev < 0.5 && axisLength >= 0.5 && axisDir >= 225 && axisDir <= 315)) {
                this.selection = Math.modulo(this.selection + 1, this.args.options.length);
    
                for (var i=0; i<this.optionTexts.length; i++) {
                    if (i == this.selection) {
                        this.optionTexts[i].tint = 0xffffff;
                    } else {
                        this.optionTexts[i].tint = 0xcccccc;
                    }
                    this.optionTexts[i].redraw();
                }
    
                if (this.selectionNS) this.selectionNS.x = this.optionTexts[this.selection].x - 6;
                if (this.selectionNS) this.selectionNS.y = this.optionTexts[this.selection].y - 4;
            } else if (keyPressed.ArrowUp || gamepadButtonPressed[12] || (axisLengthPrev < 0.5 && axisLength >= 0.5 && axisDir >= 45 && axisDir <= 135)) {
                this.selection = Math.modulo(this.selection - 1, this.args.options.length);
    
                for (var i=0; i<this.optionTexts.length; i++) {
                    if (i == this.selection) {
                        this.optionTexts[i].tint = 0xffffff;
                    } else {
                        this.optionTexts[i].tint = 0xcccccc;
                    }
                    this.optionTexts[i].redraw();
                }
    
                if (this.selectionNS) this.selectionNS.x = this.optionTexts[this.selection].x - 6;
                if (this.selectionNS) this.selectionNS.y = this.optionTexts[this.selection].y - 4;
            }

            if (!this.waning) {
                this.time += delta;

                if (this.time >= 10) {
                    this.textContainer.visible = true;
                }
            }
        }

        if (this.bgNS) {
            var ease = Math.pow(Math.clamp(this.time / 10, 0, 1) - 1, 3) + 1;
            this.bgNS.height = Math.floor(this.height * ease);
            this.bgNS.y = Math.floor((this.height - this.bgNS.height) / 2);
        }
        for (var optionText of this.optionTexts) {
            optionText.redraw();
        }
    }
}

Events.MapChange = class {
    constructor(args) {
        this.args = args;

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

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        
        if (player) {
            if (this.args.x != undefined) {
                player.pos.x = player.container.x = this.args.x;
            }
            if (this.args.y != undefined) {
                player.pos.y = player.container.y = this.args.y;
            }
            player.mask.pos = player.pos;
        } else {
            player = new Player(new SAT.V(this.args.x, this.args.y), Spritesheet.cut(resources['assets/sprites/player_idle.png'].texture, 2, 1), Spritesheet.cut(resources['assets/sprites/player_walk.png'].texture, 4, 1));
            player.addTo(viewport);
        }

        if (map) map.remove();
        (map = maps[this.args.map]).addTo(viewport);

        camera.follow(player);
        
        var response = new SAT.Response();
        for (var i=0; i<eventPlayers.length; i++) {
            if (SAT.testPolygonPolygon(player.mask, eventPlayers[i].mask, response) && response.overlap > 0) {
                if (eventPlayers[i].autoTrigger) player.searched.set(eventPlayers[i], true);
            }
            response.clear();
        }
        for (var child of gui.children) {
            gui.removeChild(child);
        } 
        this.eventPlayer.next();

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

Events.Delay = class {
    constructor(args) {
        this.args = args;
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        this.time = this.args.frameDuration;
        needsUpdate.push(this);
    }

    update(delta) {
        this.time -= delta;
        if (this.time < 0) {
            needsUpdate.remove(this);
            this.eventPlayer.next();
        }
    }
}

Events.MovePlayer = class {
    constructor(args) {
        this.args = args;
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        this.time = this.args.frameDuration;
        needsUpdate.push(this);
    }

    update(delta) {
        this.time -= delta;
    
        var _speed = this.args.dash? player.dashSpeed:player.walkSpeed;
        var _direction = Math.deg2rad(this.args.direction);
        player.vel.x = _speed * Math.cos(_direction);
        player.vel.y = _speed * -Math.sin(_direction);

        if (this.time < 0) {
            player.vel.x = 0;
            player.vel.y = 0;
            needsUpdate.remove(this);
            this.eventPlayer.next();
        }
    }
}

Events.SetVariable = class {
    constructor(args) {
        this.args = args;
    }

    play(trigger) {
        variables[this.args.variable] = this.args.value;
        trigger.next();
    }
}

Events.Picture = class {
    constructor(args) {
        this.args = args;
        this.sprite = new PIXI.Sprite(resources[this.args.path].texture);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = width * (this.args.hasOwnProperty('x')? this.args.x:0.5);
        this.sprite.y = height * (this.args.hasOwnProperty('y')? this.args.y:0.5);
    }

    play(trigger) {
        gui.addChild(this.sprite);
        variables[this.args.hasOwnProperty('variable')? args.variable:'_picture'] = this.sprite;
        trigger.next();
    }
}

Events.RemovePicture = class {
    constructor(args) {
        this.args = args;
    }

    play(trigger) {
        gui.removeChild(variables[this.args.hasOwnProperty('variable')? this.args.variable:'_picture']);
        trigger.next();
    }
}

Events.FadeOutPicture = class {
    constructor(args) {
        this.args = args;
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        this.time = this.args.frameDuration;
        needsUpdate.push(this);
    }

    update(delta) {
        this.time -= delta;
        variables[this.args.hasOwnProperty('variable')? this.args.variable:'_picture'].alpha = this.time / this.args.frameDuration;

        if (variables[this.args.hasOwnProperty('variable')? this.args.variable:'_picture'].alpha < 0) {
            needsUpdate.remove(this);
            this.eventPlayer.next();
        }
    }
}

Events.SoundEffect = class {
    constructor(args) {
        this.args = args;
    }

    play(trigger) {
        var sound = variables[this.args.hasOwnProperty('variable')? this.args.variable:'_soundEffect'] = resources[this.args.path].sound.play();
        if (this.args.async) {
            trigger.next();
        } else {
            sound.on('end', function() {
                trigger.next();
            });
        }
    }
}

Events.StopSound = class {
    constructor(args) {
        this.args = args;
    }

    play(trigger) {
        variables[this.args.hasOwnProperty('variable')? this.args.variable:'_soundEffect'].stop();
        trigger.next();
    }
}

Events.Code = class {
    constructor(args) {
        this.args = args;
    }

    play(trigger) {
        eval(this.args.code);
        trigger.next();
    }
}

Events.AddFilter = class {
    constructor(args) {
        this.args = args;
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        if (window[this.args.container].filters) {
            window[this.args.container].filters.push(filters[this.args.filter]);
        } else {
            window[this.args.container].filters = [filters[this.args.filter]];
        }
        this.eventPlayer.next();
    }
}

Events.RemoveFilter = class {
    constructor(args) {
        this.args = args;
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        if (window[this.args.container].filters) {
            window[this.args.container].filters.remove(filters[this.args.filter]);
        }
        this.eventPlayer.next();
    }
}

Events.ClearFilters = class {
    constructor(args) {
        this.args = args;
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        window[this.args.container].filters = [];
        this.eventPlayer.next();
    }
}