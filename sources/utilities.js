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
                var charWidth = fonts.ascii[0].width, charHeight = fonts.ascii[0].height;
                var nextWord = this.text.substr(i).match(/ .*?(?=(?: |$))/g);
                if (charCode == 32 && nextWord != null && x + charWidth * nextWord[0].length > this.wrapWidth) {
                    y += charHeight;
                    x = 0;
                    continue;
                }
                var shakeOffset = Math.round((Math.sin(Date.now() / 100 + i) - 0.5) * shake);
                this.beginTextureFill(fonts.ascii[charCode], tint, 1, new PIXI.Matrix(1, 0, 0, 1, 0, shakeOffset));
                this.drawRect(x, y + shakeOffset, charWidth, charHeight);
                this.endFill();
                x += charWidth;
            } else if (charCode >= 0xac00 && charCode <= 0xd7a3) {
                var charWidth = fonts.kr[0].width, charHeight = fonts.kr[0].height;
                var nextWord = this.text.substr(i).match(/ .*?(?=(?: |$))/g);
                
                var _charCode = charCode - 0xac00;
                var jong = _charCode % 28;
                var jung = ((_charCode - jong) / 28 ) % 21;
                var cho = (((_charCode - jong) / 28 ) - jung ) / 21;

                var choBul = 0;
                var jungBul = 0;
                var jongBul = 0;

                if (jong == 0) {
                    if (jung == 8 || jung == 12 || jung == 18) {
                        choBul = 1;
                    } else if (jung == 13 || jung == 17) {
                        choBul = 2;
                    } else if (jung == 9 || jung == 10 || jung == 11 || jung == 19) {
                        choBul = 3;
                    } else if (jung == 14 || jung == 15 || jung == 16) {
                        choBul = 4;
                    }
		
                    if (cho != 0 && cho != 15) {
                        jungBul = 1;
                    }
                } else {
                    if (jung == 0 || jung == 1 || jung == 2 || jung == 3 || jung == 4 || jung == 5 || jung == 6 || jung == 7 || jung == 20) {
                        choBul = 5;
                    } else if (jung == 8 || jung == 12 || jung == 13 || jung == 17 || jung == 18) {
                        choBul = 6;
                    } else if (jung == 9 || jung == 10 || jung == 11 || jung == 14 || jung == 15 || jung == 16 || jung == 19) {
                        choBul = 7;
                    }
                                
                    if (cho == 0 || cho == 15) {
                        jungBul = 2;
                    } else {
                        jungBul = 3;
                    }
                }

                if (jung == 4 || jung == 6 || jung == 11 || jung == 14 || jung == 16 || jung == 19 || jung == 20) {
                    jongBul = 1;
                } else if (jung == 1 || jung == 3 || jung == 5 || jung == 7 || jung == 10 || jung == 15) {
                    jongBul = 2;
                } else if (jung == 8 || jung == 12 || jung == 13 || jung == 17 || jung == 18) {
                    jongBul = 3;
                }

                var shakeOffset = Math.round((Math.sin(Date.now() / 100 + i) - 0.5) * shake);
                this.beginTextureFill(fonts.kr[choBul * 32 + cho], tint, 1, new PIXI.Matrix(1, 0, 0, 1, 0, shakeOffset));
                this.drawRect(x, y + shakeOffset, charWidth, charHeight);
                this.endFill();
                this.beginTextureFill(fonts.kr[(jungBul + 8) * 32 + jung], tint, 1, new PIXI.Matrix(1, 0, 0, 1, 0, shakeOffset));
                this.drawRect(x, y + shakeOffset, charWidth, charHeight);
                this.endFill();
                this.beginTextureFill(fonts.kr[(jongBul + 12) * 32 + jong], tint, 1, new PIXI.Matrix(1, 0, 0, 1, 0, shakeOffset));
                this.drawRect(x, y + shakeOffset, charWidth, charHeight);
                this.endFill();
                x += charWidth;
            }
        }
    }
}