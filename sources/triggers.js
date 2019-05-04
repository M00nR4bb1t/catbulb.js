class EventPlayer {
    constructor(events) {
        this.events = events;
        this.index = 0;
        this.playing = false;
    }

    play(index=0) {
        this.index = index;
        this.playing = true;
        this.events[this.index].play(this);
    }

    next() {
        this.index++;
        if (this.index >= this.events.length) {
            this.index = 0;
            this.playing = false;
        } else {
            events[this.index].play(this);
        }
    }

    update(delta) {
        if (this.playing) {
            this.events[this.index].update(delta);
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
        this.eventPlayer.play(index);
    }

    isPlaying() {
        return this.eventPlayer.playing;
    }

    update(delta) {
        this.eventPlayer.update(delta);
    }
}