class EventPlayer {
    constructor(events) {
        this.events = events;
        this.index = 0;
        this.playing = false;
        this.callback = null;
    }

    play(index=0, callback=null) {
        this.index = index;
        this.playing = true;
        this.callback = callback;
        this.events[this.index].play(this);
    }

    next() {
        this.index++;
        if (this.index >= this.events.length) {
            this.index = 0;
            this.playing = false;
            if (this.callback != null) {
                this.callback();
            }
        } else {
            this.events[this.index].play(this);
        }
    }
}

class Trigger extends Entity {
    constructor(position, mask, events, autoTrigger=false) {
        super(position);
        this.mask = mask;
        this.mask.pos = this.pos;
        this.eventPlayer = new EventPlayer(events);
        this.autoTrigger = autoTrigger;
    }

    play(index=0) {
        player.vel.x = 0;
        player.vel.y = 0;
        player.paralyzed = true;
        this.eventPlayer.play(index, this.onEventPlayerFinish);
    }

    onEventPlayerFinish() {
        player.paralyzed = false;
    }

    isPlaying() {
        return this.eventPlayer.playing;
    }
}