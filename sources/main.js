/**
 * Constants
 */
var width = 480, height = 270; // The size of the Application
var gridWidth = 32, gridHeight = 32; // The width and height of the grid

/**
 * Create the Application
 */
var app = new PIXI.Application({
    width: width,
    height: height
}); // Create the Application
document.body.appendChild(app.view); // Append the canvas to the <body>

/**
 * Load assets
 */
var dataJSON;
new PIXI.Loader()
    .add('data', 'assets/data.json')
    .load(function(loader, resources) {
        dataJSON = resources.data.data;
        var assetManifest = dataJSON.assets;
        for (var i=0; i<assetManifest.length; i++) {
            PIXI.Loader.shared.add(assetManifest[i]);
        }
        PIXI.Loader.shared.load(init);
    });

/**
 * Main Game Logic
 */
var fonts = {};
var tilesets = {}, maps = {};
var solids = [], triggers = [];
var player;

var keyDown = {}, keyPressed = {}, keyReleased = {};

function init(loader, resources) {
    if (dataJSON.gui.fonts.ascii) fonts.ascii = Spritesheet.cut(resources[dataJSON.gui.fonts.ascii].texture, 16, 8);
    if (dataJSON.gui.fonts.kr) fonts.kr = Spritesheet.cut(resources[dataJSON.gui.fonts.kr].texture, 32, 16);

    for (var i=0; i<dataJSON.tilesets.length; i++) {
        tilesets[dataJSON.tilesets[i].name] = Spritesheet.cut(resources[dataJSON.tilesets[i].file].texture, dataJSON.tilesets[i].width, dataJSON.tilesets[i].height);
    }
    
    for (var i=0; i<dataJSON.maps.length; i++) {
        var mapJSON = resources[dataJSON.maps[i].file].data;
        var tileLayers = [];
        var solids = [];
        for (var j=0; j<mapJSON.layers.length; j++) {
            if (mapJSON.layers[j].type == 'tilelayer') {
                tileLayers.push(mapJSON.layers[j].data);
            } else if (mapJSON.layers[j].type == 'objectgroup') {
                for (var k=0; k<mapJSON.layers[j].objects.length; k++) {
                    var type = mapJSON.layers[j].objects[k].type, types = [];
                    if (type != "") types = type.split(/ *, */g);
                    
                    if (types.length == 0 || types.indexOf('solid') != -1) {
                        solids.push(new SAT.Box(new SAT.V(mapJSON.layers[j].objects[k].x, mapJSON.layers[j].objects[k].y), mapJSON.layers[j].objects[k].width, mapJSON.layers[j].objects[k].height).toPolygon());
                    }
                    
                    if (types.indexOf('trigger') != -1) {
                        var events = [];
                        var eventsData = dataJSON.events[mapJSON.layers[j].objects[k].name];
                        for (var l=0; l<eventsData.length; l++) {
                            events[l] = new Events[eventsData[l].type](eventsData[l].arguments);
                        }
                        triggers.push(new Trigger(
                                new SAT.V(mapJSON.layers[j].objects[k].x, mapJSON.layers[j].objects[k].y),
                                new SAT.Box(new SAT.V(0, 0), mapJSON.layers[j].objects[k].width, mapJSON.layers[j].objects[k].height).toPolygon(),
                                events,
                                (types.indexOf('autoTrigger') != -1)
                            )
                        );
                    }
                } 
            }
        }
        maps[dataJSON.maps[i].name] = new TileMap(tileLayers, mapJSON.width, mapJSON.height, tilesets[dataJSON.maps[i].tileset], solids, triggers);
    }
    
    maps['kitchen'].addTo(app.stage);
    
    player = new Player(new SAT.V(224, 160), Spritesheet.cut(resources['assets/sprites/player_idle.png'].texture, 2, 1), Spritesheet.cut(resources['assets/sprites/player_walk.png'].texture, 4, 1));
    player.addTo(app.stage);

    document.addEventListener('keydown', e => onKeyDown(e.code));
    document.addEventListener('keyup', e => onKeyUp(e.code));
    app.ticker.add(delta => update(delta));
}

function update(delta) {
    player.update(delta);
    for (var i in triggers) {
      triggers[i].update(delta);
    }

    for (var key in keyPressed) {keyPressed[key] = false;}
    for (var key in keyReleased) {keyReleased[key] = false;}
}

function onKeyDown(code) {
    if (!keyDown[code]) keyPressed[code] = true;
    keyDown[code] = true;
}

function onKeyUp(code) {
    keyReleased[code] = true;
    keyDown[code] = false;
}