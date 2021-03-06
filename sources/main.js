/**
 * Constants
 */
var width = 480, height = 270; // The size of the Application
var gridWidth = 32, gridHeight = 32; // The width and height of the grid

/**
 * PIXI Settings
 */

// PIXI.settings.ROUND_PIXELS = true;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

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
var fonts = {}, nineslice = {}, filters = {};
var tilesets = {}, maps = {};
var map, solids = [], eventPlayers = [], triggers = [];

var resources, variables = {};
var needsUpdate = [];
var player, inventory = {};

var viewport = new PIXI.Container();
var camera = new Camera(viewport);
app.stage.addChild(viewport);
var gui = new PIXI.Container();
app.stage.addChild(gui);

var keyDown = {}, keyPressed = {}, keyReleased = {};
var gamepads = [], needsGamepadScan = false;
var gamepadButtonDown = {}, gamepadButtonPressed = {}, gamepadButtonReleased = {};
var gamepadAxes = [], gamepadAxesPrev = [];

function init(loader, _resources) {
    resources = _resources;

    if (dataJSON.gui.fonts.ascii) fonts.ascii = Spritesheet.cut(resources[dataJSON.gui.fonts.ascii].texture, 16, 8);
    if (dataJSON.gui.fonts.kr) fonts.kr = Spritesheet.cut(resources[dataJSON.gui.fonts.kr].texture, 32, 16);

    for (var k in dataJSON.gui.nineslice) {
        var v = dataJSON.gui.nineslice[k];
        nineslice[k] = function() {
            return new PIXI.NineSlicePlane(resources[v.path].texture, v.left, v.top, v.right, v.bottom);
        }
    }

    for (var i=0; i<dataJSON.filters.length; i++) {
        filters[dataJSON.filters[i].name] = new PIXI.Filter(dataJSON.filters[i].vertex? resources[dataJSON.filters[i].vertex].data:undefined, dataJSON.filters[i].fragment? resources[dataJSON.filters[i].fragment].data:undefined);
    }

    for (var i=0; i<dataJSON.tilesets.length; i++) {
        tilesets[dataJSON.tilesets[i].name] = Spritesheet.cut(resources[dataJSON.tilesets[i].file].texture, dataJSON.tilesets[i].width, dataJSON.tilesets[i].height);
    }

    for (var key in dataJSON.events) {
        var events = [];
        for (var i=0; i<dataJSON.events[key].length; i++) {
            events[i] = new Events[dataJSON.events[key][i].type](dataJSON.events[key][i].arguments || {});
        }
        eventPlayers[key] = new EventPlayer(events);
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
                        _triggers.push(new Trigger(
                                new SAT.V(mapJSON.layers[j].objects[k].x, mapJSON.layers[j].objects[k].y),
                                new SAT.Box(new SAT.V(0, 0), mapJSON.layers[j].objects[k].width, mapJSON.layers[j].objects[k].height).toPolygon(),
                                eventPlayers[mapJSON.layers[j].objects[k].name],
                                (types.indexOf('autoTrigger') != -1)
                            )
                        );
                    }
                } 
            }
        }
        maps[dataJSON.maps[i].name] = new TileMap(dataJSON.maps[i].hasOwnProperty('displayName')? dataJSON.maps[i].displayName:dataJSON.maps[i].name, tileLayers, mapJSON.width, mapJSON.height, tilesets[dataJSON.maps[i].tileset], _solids, _triggers);
    }

    for (var k in dataJSON.items) {
        inventory[k] = 0;
    }
    
    if (eventPlayers.hasOwnProperty('_gameStart')) eventPlayers['_gameStart'].play();

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
    for (var elem of needsUpdate) {
        elem.update(delta);
    }

    for (var key in keyPressed) {keyPressed[key] = false;}
    for (var key in keyReleased) {keyReleased[key] = false;}
    for (var button in gamepadButtonPressed) {gamepadButtonPressed[button] = false;}
    for (var button in gamepadButtonReleased) {gamepadButtonReleased[button] = false;}
    gamepadAxesPrev = gamepadAxes.slice();

    viewport.children.sort(zSort);
}

function zSort(a, b) {
    return a.z - b.z;
}

function onKeyDown(e) {
    if (!keyDown[e.code]) keyPressed[e.code] = true;
    keyDown[e.code] = true;
    if (player && !player.paralyzed && eventPlayers.hasOwnProperty('_keyPressed' + e.code)) {
        player.paralyzed = true;
        eventPlayers['_keyPressed' + e.code].play(0, null, () => {player.paralyzed = false;});
    }
}

function onKeyUp(e) {
    keyReleased[e.code] = true;
    keyDown[e.code] = false;
    if (player && !player.paralyzed && eventPlayers.hasOwnProperty('_keyReleased' + e.code)) {
        player.paralyzed = true;
        eventPlayers['_keyReleased' + e.code].play(0, null, () => {player.paralyzed = false;});
    }
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
            if (player && !player.paralyzed && eventPlayers.hasOwnProperty('_gamepadButtonPressed' + e.code)) {
                player.paralyzed = true;
                eventPlayers['_gamepadButtonPressed' + e.code].play(0, null, () => {player.paralyzed = false;});
            }
        } else if (gamepadButtonDown[i] && !_gamepadButtonDown[i]) {
            gamepadButtonReleased[i] = true;
            if (player && !player.paralyzed && eventPlayers.hasOwnProperty('_gamepadButtonReleased' + e.code)) eventPlayers['_gamepadButtonReleased' + e.code].play();
        }
    }
    gamepadAxes = gamepads[0].axes;
    gamepadButtonDown = _gamepadButtonDown;
}