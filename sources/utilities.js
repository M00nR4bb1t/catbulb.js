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
        console.log(this);
    }

    redraw() {
        this.clear();
        var x = 0, y = 0;
        var charWidth = fonts.ascii[0].width, charHeight = fonts.ascii[0].height;
        for (var i=0; i<this.text.length; i++) {
            var charCode = this.text.charCodeAt(i);
            if (charCode < 128) {
                if (x + charWidth > this.wrapWidth) {
                    y += charHeight;
                    x = 0;
                    if (charCode == 32) {
                        continue;
                    }
                }
                this.beginTextureFill(fonts.ascii[charCode]);
                this.drawRect(x, y, charWidth, charHeight);
                this.endFill();
                x += charWidth;
            }
        }
    }
}