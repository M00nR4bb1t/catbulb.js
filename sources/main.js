/**
 * Constants
 */
var width = 240, height = 135; // The size of the Application
var gridWidth = 16, gridHeight = 16; // The width and height of the grid

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
var tilesets = {}, maps = {};
var solids = [];
var player;

var isKeyDown = {};

function init(loader, resources) {
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
                    if (!mapJSON.layers[j].objects[k].type) {
                        solids.push(new SAT.Box(new SAT.V(mapJSON.layers[j].objects[k].x, mapJSON.layers[j].objects[k].y), mapJSON.layers[j].objects[k].width, mapJSON.layers[j].objects[k].height).toPolygon());
                    }
                } 
            }
        }
        maps[dataJSON.maps[i].name] = new TileMap(tileLayers, mapJSON.width, mapJSON.height, tilesets[dataJSON.maps[i].tileset], solids);
    }
    
    maps['kitchen'].addTo(app.stage);
    
    player = new Player(new SAT.V(112, 80), Spritesheet.cut(resources['assets/sprites/player_idle.png'].texture, 2, 1), Spritesheet.cut(resources['assets/sprites/player_walk.png'].texture, 4, 1));
    player.addTo(app.stage);

    document.addEventListener('keydown', e => keyDown(e.code));
    document.addEventListener('keyup', e => keyUp(e.code));
    app.ticker.add(delta => update(delta));
}

function update(delta) {
    player.update(delta);
}

function keyDown(code) {
    isKeyDown[code] = true;
}

function keyUp(code) {
    isKeyDown[code] = false;
}