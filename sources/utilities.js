var Spritesheet = {
    cut: function(baseTexture, columns, rows) {
        var output = [];
        var cellWidth = baseTexture.width / columns, cellHeight = baseTexture.height / rows;
        for (var j=0; j<rows; j++) {
            for (var i=0; i<columns; i++) {
                output[j * columns + i] = new PIXI.Texture(baseTexture, new PIXI.Rectangle(i * cellWidth, j * cellHeight, cellWidth, cellHeight));
            }
        }
        return output;
    }
}

var Vector = {
    create: function(x, y) {return {x: x, y: y};},

    zero: function() {return {x: 0, y: 0};},
    one: function() {return {x: 1, y: 1};},
    down: function() {return {x: 0, y: 1};},
    left: function() {return {x: -1, y: 0};},
    right: function() {return {x: 1, y: 0};},
    up: function() {return {x: 0, y: -1};},

    add: function(a, b, createNew=false) {
        if (createNew) {
            return {x: a.x + b.x, y: a.y + b.y};
        } else {
            a.x += b.x;
            a.y += b.y;
            return a;
        }
    },
    sub: function(a, b, createNew=false) {
        if (createNew) {
            return {x: a.x - b.x, y: a.y - b.y};
        } else {
            a.x -= b.x;
            a.y -= b.y;
            return a;
        }
    },
    mult: function(vector, multiplier, createNew=false) {
        if (createNew) {
            return {x: vector.x * multiplier, y: vector.y * multiplier};
        } else {
            vector.x *= multiplier;
            vector.y *= multiplier;
            return vector;
        }
    },
    div: function(vector, divisor, createNew=false) {
        if (createNew) {
            return {x: vector.x / divisor, y: vector.y / divisor};
        } else {
            vector.x /= divisor;
            vector.y /= divisor;
            return vector;
        }
    },

    mag: function(vector, value, createNew=false) {
        var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        if (value == undefined)  {
            return magnitude;
        } else {
            if (createNew) {
                return {x: vector.x / magnitude * value, y: vector.y / magnitude * value};
            } else {
                vector.x /= magnitude / value;
                vector.y /= magnitude / value;
                return vector;
            }
        }
    },
    dir: function(vector, value, createNew=false) {
        if (value == undefined) {
            return Math.atan2(vector.y, vector.x);
        } else {
            var originalMagnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
            if (createNew) {
                var newVector = {x: 1, y: Math.tan(value)};
                var magnitude = Math.sqrt(Math.pow(newVector.x, 2) + Math.pow(newVector.y, 2));
                newVector.x /= magnitude / originalMagnitude;
                newVector.y /= magnitude / originalMagnitude;
                return newVector;
            } else {
                vector.x = 1;
                vector.y = Math.tan(value);
                var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
                vector.x /= magnitude / originalMagnitude;
                vector.y /= magnitude / originalMagnitude;
                return vector;
            }
        }
    },
    normalize: function(vector, createNew=false) {
        var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        if (createNew) {
            return {x: vector.x / magnitude, y: vector.y / magnitude};
        } else {
            vector.x /= magnitude;
            vector.y /= magnitude;
            return vector;
        }
    }
}