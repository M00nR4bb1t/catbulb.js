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
var assetManifest = dataJSON.assets;
for (var i=0; i<assetManifest.length; i++) {
    PIXI.Loader.shared.add(assetManifest[i]);
}
PIXI.Loader.shared.load(init);

/**
 * Main Game Logic
 */
var fonts = {}, filters = {};
var tilesets = {}, maps = {};
var map, solids = [], triggers = [];
var needsUpdate = [];
var player;

var viewport = new PIXI.Container();
app.stage.addChild(viewport);
var gui = new PIXI.Container();
app.stage.addChild(gui);

var keyDown = {}, keyPressed = {}, keyReleased = {};
var gamepads = [], needsGamepadScan = false;
var gamepadButtonDown = {}, gamepadButtonPressed = {}, gamepadButtonReleased = {};
var gamepadAxes = [];

function init(loader, resources) {
    if (dataJSON.gui.fonts.ascii) fonts.ascii = Spritesheet.cut(resources[dataJSON.gui.fonts.ascii].texture, 16, 8);
    if (dataJSON.gui.fonts.kr) fonts.kr = Spritesheet.cut(resources[dataJSON.gui.fonts.kr].texture, 32, 16);

    for (var i=0; i<dataJSON.filters.length; i++) {
        filters[dataJSON.filters[i].name] = new PIXI.Filter(dataJSON.filters[i].vertex? resources[dataJSON.filters[i].vertex].data:undefined, dataJSON.filters[i].fragment? resources[dataJSON.filters[i].fragment].data:undefined);
    }

    for (var i=0; i<dataJSON.tilesets.length; i++) {
        tilesets[dataJSON.tilesets[i].name] = Spritesheet.cut(resources[dataJSON.tilesets[i].file].texture, dataJSON.tilesets[i].width, dataJSON.tilesets[i].height);
    }
    
    for (var i=0; i<dataJSON.maps.length; i++) {
        var mapJSON = resources[dataJSON.maps[i].file].data;
        var tileLayers = [];
        var _solids = [], _triggers = [];
        for (var j=0; j<mapJSON.layers.length; j++) {
            if (mapJSON.layers[j].type == 'tilelayer') {
                tileLayers.push(mapJSON.layers[j].data);
            } else if (mapJSON.layers[j].type == 'objectgroup') {
                for (var k=0; k<mapJSON.layers[j].objects.length; k++) {
                    var type = mapJSON.layers[j].objects[k].type, types = [];
                    if (type != "") types = type.split(/ *, */g);
                    
                    if (types.length == 0 || types.indexOf('solid') != -1) {
                        _solids.push(new SAT.Box(new SAT.V(mapJSON.layers[j].objects[k].x, mapJSON.layers[j].objects[k].y), mapJSON.layers[j].objects[k].width, mapJSON.layers[j].objects[k].height).toPolygon());
                    }
                    
                    if (types.indexOf('trigger') != -1) {
                        var events = [];
                        var eventsData = dataJSON.events[mapJSON.layers[j].objects[k].name];
                        for (var l=0; l<eventsData.length; l++) {
                            events[l] = new Events[eventsData[l].type](eventsData[l].arguments);
                        }
                        _triggers.push(new Trigger(
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
        maps[dataJSON.maps[i].name] = new TileMap(dataJSON.maps[i].hasOwnProperty('displayName')? dataJSON.maps[i].displayName:dataJSON.maps[i].name, tileLayers, mapJSON.width, mapJSON.height, tilesets[dataJSON.maps[i].tileset], _solids, _triggers);
    }
    
    (map = maps['kitchen']).addTo(viewport);
    
    player = new Player(new SAT.V(224, 160), Spritesheet.cut(resources['assets/sprites/player_idle.png'].texture, 2, 1), Spritesheet.cut(resources['assets/sprites/player_walk.png'].texture, 4, 1));
    player.addTo(viewport);

    document.addEventListener('keydown', e => onKeyDown(e));
    document.addEventListener('keyup', e => onKeyUp(e));
    if (window.hasOwnProperty('ongamepadconnected')) {
        document.addEventListener('gamepadconnected', e => onGamepadConnected(e));
        document.addEventListener('gamepaddisconnected', e => onGamepadDisconnected(e));
    } else {
        needsGamepadScan = true;
    }
    app.ticker.add(delta => update(delta));
}

function update(delta) {
    updateGamepadInputs();
    player.update(delta);
    for (var elem of needsUpdate) {
        elem.update(delta);
    }

    for (var key in keyPressed) {keyPressed[key] = false;}
    for (var key in keyReleased) {keyReleased[key] = false;}
    for (var button in gamepadButtonPressed) {gamepadButtonPressed[button] = false;}
    for (var button in gamepadButtonReleased) {gamepadButtonReleased[button] = false;}

    viewport.children.sort(zSort);
}

function zSort(a, b) {
    return a.z - b.z;
}

function onKeyDown(e) {
    if (!keyDown[e.code]) keyPressed[e.code] = true;
    keyDown[e.code] = true;
}

function onKeyUp(e) {
    keyReleased[e.code] = true;
    keyDown[e.code] = false;
}

function onGamepadConnected(e) {
    gamepads.push(e.gamepad);
}

function onGamepadDisconnected(e) {
    gamepads.remove(e.gamepad);
}

function updateGamepadInputs() {
    if (needsGamepadScan) {
        gamepads = [];
        for (var gamepad of (navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []))) {
            if (gamepad) {
                gamepads[gamepad.index] = gamepad;
            }
        }
    }

    if (gamepads.length < 1) {
        return;
    }

    var _gamepadButtonDown = [];
    for (var gamepad of gamepads) {
        for (var i=0; i<gamepad.buttons.length; i++) {
            _gamepadButtonDown[i] = _gamepadButtonDown[i] || gamepad.buttons[i].pressed;
        }
    }
    for (var i=0; i<_gamepadButtonDown.length; i++) {
        if (_gamepadButtonDown[i] && !gamepadButtonDown[i]) {
            gamepadButtonPressed[i] = true;
        } else if (gamepadButtonDown[i] && !_gamepadButtonDown[i]) {
            gamepadButtonReleased[i] = true;
        }
    }
    gamepadAxes = gamepads[0].axes;
    gamepadButtonDown = _gamepadButtonDown;
}