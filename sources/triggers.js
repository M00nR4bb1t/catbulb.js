class EventPlayer {
    constructor(events) {
        this.events = events;
        this.index = 0;
        this.playing = false;
        this.callback = null;
    }

    play(index=0, trigger=null, callback=null) {
        this.index = index;
        this.playing = true;
        this.trigger = trigger;
        this.callback = callback;
        this.events[this.index].play(this);
    }

    next() {
        this.index++;
        if (this.index >= this.events.length) {
            this.forceFinish();
        } else {
            this.events[this.index].play(this);
        }
    }
    
    forceFinish() {
        this.index = 0;
        this.playing = false;
        if (this.callback != null) {
            this.callback();
        }
    }
}

class Trigger extends Entity {
    constructor(position, mask, eventPlayer, autoTrigger=false) {
        super(position);
        this.mask = mask;
        this.mask.pos = this.pos;
        this.eventPlayer = eventPlayer;
        this.autoTrigger = autoTrigger;
    }

    play(index=0, eventPlayer=this.eventPlayer) {
        player.vel.x = 0;
        player.vel.y = 0;
        player.paralyzed = true;
        eventPlayer.play(index, this, this.onEventPlayerFinish);
    }

    onEventPlayerFinish() {
        player.paralyzed = false;
    }

    isPlaying() {
        return this.eventPlayer.playing;
    }
}