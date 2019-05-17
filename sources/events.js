var Events = {};

Events.Message = class {
    constructor(args) {
        this.args = args;
        
        this.width = Math.ceil(width / 5 * 3);
        this.height = Math.ceil(height / 3);
        this.time = 0;
        this.reveal = 0;
        this.waning = false;

        this.container = new PIXI.Container();
        this.container.x = Math.floor(width / 2 - this.width / 2);

        this.graphics = new PIXI.Graphics();
        this.graphics.x = 0;
        this.container.addChild(this.graphics);

        this.graphics.beginFill(0xffffc9);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();

        this.graphics.beginFill(0x004d4d);
        this.graphics.drawRect(2, 2, this.width - 4, this.height - 4);
        this.graphics.endFill();

        this.messageText = new BitmapText('', this.width - 12);
        this.messageText.x = 6;
        this.messageText.y = 8;
        this.container.addChild(this.messageText);

        if (this.args.name) {
            this.nameText = new BitmapText(this.args.name, this.width - 12);
            this.nameText.x = 6;
            this.nameText.y = 8;
            this.container.addChild(this.nameText);
            this.messageText.y = 12 + this.nameText.height;
        }
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        this.container.y = height;
        this.time = 0;
        this.waning = false;
        this.reveal = 0;
        this.messageText.text = '';
        gui.addChild(this.container);
        needsUpdate.push(this);
    }

    update(delta) {
        if (this.waning) {
            if (this.time < 0) {
                gui.removeChild(this.container);
                needsUpdate.remove(this);
                this.eventPlayer.next();
            }

            this.time -= delta;
        } else {
            if (this.time % ((keyDown.KeyX || gamepadButtonDown[1])? 1:3) < 1 && this.messageText.text != this.args.message) {
                this.reveal++;
                if (this.args.message.charAt(this.reveal - 1) == '§') {
                    this.reveal += this.args.message.substr(this.reveal).match(/{.*?}/g)[0].length;
                }
                this.messageText.text = this.args.message.substr(0, this.reveal);
            }
            
            if (this.time > 0 && (keyPressed.KeyZ || gamepadButtonPressed[0])) {
                if (this.messageText.text != this.args.message) {
                    this.messageText.text = this.args.message;
                } else {
                    this.time = 7;
                    this.waning = true;
                }
            }

            this.time += delta;
        }

        this.container.y = Math.floor(height - (Math.pow(Math.min(this.time / 7, 1) - 1, 3) + 1) * this.height * 1.25);
        this.messageText.redraw();
        this.nameText.redraw();
    }
}

Events.Selection = class {
    constructor(args) {
        this.args = args;
        
        this.width = Math.ceil(width / 5 * 3);
        this.height = Math.ceil(height / 3);
        this.time = 0;
        this.reveal = 0;
        this.waning = false;

        this.container = new PIXI.Container();
        this.container.x = Math.floor(width / 2 - this.width / 2);

        this.graphics = new PIXI.Graphics();
        this.graphics.x = 0;
        this.container.addChild(this.graphics);

        if (this.args.message) {
            this.messageText = new BitmapText('', this.width - 12);
            this.messageText.x = 6;
            this.messageText.y = 8;
            this.container.addChild(this.messageText);
        }

        this.optionTexts = [];
        this.optionWidth = (this.args.message || this.args.name)? Math.floor(this.width / 3):Math.floor(this.width / 5 * 2);
        var y = (this.args.message || this.args.name)? 0:(this.height - 4);
        for (var i=this.args.options.length - 1; i>=0; i--) {
            this.optionTexts[i] = new BitmapText(this.args.options[i].text, this.optionWidth - 12, 0xcccccc);
            this.optionTexts[i].x = Math.floor((this.width - this.optionWidth) / ((this.args.message || this.args.name)? 1:2)) + 6;
            y -= this.optionTexts[i].height + 6;
            this.optionTexts[i].y = y;
            y -= 4;
            this.container.addChild(this.optionTexts[i]);

            this.graphics.beginFill(0x004d4d);
            this.graphics.drawRect((this.width - this.optionWidth) / ((this.args.message || this.args.name)? 1:2), y, this.optionWidth, this.optionTexts[i].height + 8);
            this.graphics.endFill();
        }

        this.selectionGraphics = new PIXI.Graphics();
        this.container.addChild(this.selectionGraphics);

        if (this.args.message || this.args.name) {
            this.graphics.beginFill(0xffffc9);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();

            this.graphics.beginFill(0x004d4d);
            this.graphics.drawRect(2, 2, this.width - 4, this.height - 4);
            this.graphics.endFill();

            this.selectionGraphics.beginFill(0xffffc9);
            this.selectionGraphics.drawRect(0, this.optionTexts[0].height + 6, this.optionWidth, 2);
            this.selectionGraphics.endFill();
        } else {
            this.graphics.beginFill(0xffffc9);
            this.graphics.drawRect((this.width - this.optionWidth) / 2 - 6, y - 6, this.optionWidth + 12, this.height - y + 6);
            this.graphics.endFill();

            this.graphics.beginFill(0x004d4d);
            this.graphics.drawRect((this.width - this.optionWidth) / 2 - 4, y - 4, this.optionWidth + 8, this.height - y + 2);
            this.graphics.endFill();

            this.selectionGraphics.beginFill(0xffffc9);
            this.selectionGraphics.drawRect(0, 0, this.optionWidth, 2);
            this.selectionGraphics.drawRect(0, this.optionTexts[0].height + 6, this.optionWidth, 2);
            this.selectionGraphics.drawRect(0, 0, 2, this.optionTexts[0].height + 6);
            this.selectionGraphics.drawRect(this.optionWidth - 2, 0, 2, this.optionTexts[0].height + 6);
            this.selectionGraphics.endFill();
        }

        if (this.args.name) {
            this.nameText = new BitmapText(this.args.name, this.width - 12);
            this.nameText.x = 6;
            this.nameText.y = 8;
            this.container.addChild(this.nameText);
            this.messageText.y = 12 + this.nameText.height;
        }
    }

    play(eventPlayer) {
        this.eventPlayer = eventPlayer;
        this.container.y = height;
        this.time = 0;
        this.waning = false;
        this.reveal = 0;
        
        this.selection = 0;

        this.optionTexts[this.selection].tint = 0xffffff;
        this.optionTexts[this.selection].redraw();
        this.selectionGraphics.x = this.optionTexts[this.selection].x - 6;
        this.selectionGraphics.y = this.optionTexts[this.selection].y - 4;
        
        if (this.args.message) this.messageText.text = '';
        gui.addChild(this.container);
        needsUpdate.push(this);
    }

    update(delta) {
        if (this.waning) {
            if (this.time < 0) {
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
            if (this.args.message && this.time % ((keyDown.KeyX || gamepadButtonDown[1])? 1:3) < 1 && this.messageText.text != this.args.message) {
                this.reveal++;
                if (this.args.message.charAt(this.reveal - 1) == '§') {
                    this.reveal += this.args.message.substr(this.reveal).match(/{.*?}/g)[0].length;
                }
                this.messageText.text = this.args.message.substr(0, this.reveal);
            }
            
            if (this.time > 0 && (keyPressed.KeyZ || gamepadButtonPressed[0])) {
                if (this.args.message && this.messageText.text != this.args.message) {
                    this.messageText.text = this.args.message;
                } else {
                    this.time = 7;
                    this.waning = true;
                }
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
    
                this.selectionGraphics.x = this.optionTexts[this.selection].x - 6;
                this.selectionGraphics.y = this.optionTexts[this.selection].y - 4;
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
    
                this.selectionGraphics.x = this.optionTexts[this.selection].x - 6;
                this.selectionGraphics.y = this.optionTexts[this.selection].y - 4;
            }

            this.time += delta;
        }

        this.container.y = Math.floor(height - (Math.pow(Math.min(this.time / 7, 1) - 1, 3) + 1) * this.height * 1.25);
        if (this.args.message) this.messageText.redraw();
        for (var optionText of this.optionTexts) {
            optionText.redraw();
        }
        if (this.args.message && this.args.name) this.nameText.redraw();
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