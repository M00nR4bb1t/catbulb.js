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

class BitmapText extends PIXI.Graphics {
    constructor(text, wrapWidth) {
        super();
        this.text = text;
        this.wrapWidth = wrapWidth;
        this.redraw();
    }

    redraw() {
        this.clear();
        var x = 0, y = 0;
        var shake = 0, tint = 0xffffff;
        var charWidth = fonts.ascii[0].width, charHeight = fonts.ascii[0].height;
        for (var i=0; i<this.text.length; i++) {
            var charCode = this.text.charCodeAt(i);
            if (charCode == 167 && this.text.length > i + 1 && this.text.charCodeAt(i + 1) == 123) {
                var JSONString = this.text.substr(i + 1).match(/{.*?}/g)[0];
                var JSONData = JSON.parse(JSONString);
                
                if (JSONData.shake != undefined) {
                    shake = JSONData.shake;
                }
                if (JSONData.tint != undefined) {
                    tint = JSONData.tint;
                }

                i += JSONString.length;
                continue;
            } else if (charCode < 128) {
                var nextWord = this.text.substr(i).match(/ .*?(?=(?: |$))/g);
                if (x + charWidth > this.wrapWidth || (charCode == 32 && nextWord != null && x + charWidth * nextWord[0].length > this.wrapWidth)) {
                    y += charHeight;
                    x = 0;
                    continue;
                }
                var shakeOffset = Math.round((Math.sin(Date.now() / 100 + i) - 0.5) * shake);
                this.beginTextureFill(fonts.ascii[charCode], tint, 1, new PIXI.Matrix(1, 0, 0, 1, 0, shakeOffset));
                this.drawRect(x, y + shakeOffset, charWidth, charHeight);
                this.endFill();
                x += charWidth;
            }
        }
    }
}