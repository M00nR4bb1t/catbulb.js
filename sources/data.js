var dataJSON = {
    // List of assets
    "assets": [
        "assets/gui/font_ascii.png",
        "assets/gui/font_kr.png",

        "assets/gui/ns_default.png",

        "assets/shaders/grayscale.frag",
        "assets/shaders/red.frag",
        "assets/shaders/rgbsplit.frag",

        "assets/sprites/player_idle.png",
        "assets/sprites/player_walk.png",
        
        "assets/tilesets/indoors.png",
        
        "assets/maps/test.json",
        "assets/maps/livingRoom.json",
        "assets/maps/bedroom.json",

        "assets/pictures/spaghetti.jpg",
        "assets/pictures/black.png"
    ],

    // GUI Settings
    "gui": {
        "fonts": {
            "ascii":"assets/gui/font_ascii.png",
            "kr":"assets/gui/font_kr.png"
        },
        "nineslice": {
            "default": {
                "path":"assets/gui/ns_default.png",
                "left":2, "right":2, "top":2, "bottom":2
            }
        }
    },

    // Filters
    "filters": [
        {
            "name":"grayscale",
            "fragment":"assets/shaders/grayscale.frag"
        },
        {
            "name":"red",
            "fragment":"assets/shaders/red.frag"
        },
        {
            "name":"rgbsplit",
            "fragment":"assets/shaders/rgbsplit.frag"
        }
    ],

    // Tilesets
    "tilesets": [
        {
            "name":"indoors",
            "file":"assets/tilesets/indoors.png",
            "width":8,
            "height":8
        }
    ],

    // Maps
    "maps": [
        {
            "displayName":"Kitchen",
            "name":"kitchen",
            "file":"assets/maps/test.json",
            "tileset":"indoors"
        },
        {
            "displayName":"Living Room",
            "name":"livingRoom",
            "file":"assets/maps/livingRoom.json",
            "tileset":"indoors"
        },
        {
            "displayName":"Bedroom",
            "name":"bedroom",
            "file":"assets/maps/bedroom.json",
            "tileset":"indoors"
        }
    ],

    // Items
    "items": {
        "bedroomKey": {
            "displayName": "Bedroom Key"
        }
    },

    // Events
    "events": {
        "_gameStart": [
            {"type":"FadeInPicture", "arguments":{"path":"assets/pictures/spaghetti.jpg", "frameDuration":30}},
            {"type":"ShowChoices", "arguments":{"background":"default", "options":[{"text":"New Game", "events":"newGame"}, {"text":"Continue"}, {"text":"Shutdown"}]}}
        ],
        '_keyPressedKeyX': [
            {"type":"ShowInventory", "arguments":{"background":"default", "options":[{"text":"New Game"}, {"text":"Continue"}, {"text":"Shutdown"}, {"text":"New Game"}, {"text":"Continue"}, {"text":"Shutdown"}, {"text":"New Game"}, {"text":"Continue"}, {"text":"Shutdown"}, {"text":"New Game"}, {"text":"Continue"}, {"text":"Shutdown"}]}}
        ],
        "newGame": [
            {"type":"SetVariable", "arguments":{"variable":"sinkCounter", "value":0}},
            {"type":"SetVariable", "arguments":{"variable":"lightsOff", "value":false}},
            {"type":"FadeOutPicture", "arguments":{"frameDuration":30}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":224, "y":160}}
        ],

        "doorOut": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"The door leading outside."}},
            {"type":"ShowTextChoices", "arguments":{"background":"default", "message":"Go out?", "options":[{"text":"Yes", "events":"goOut"}, {"text":"No"}]}}
        ],
        "goOut": [
            {"type":"MapChange", "arguments":{"map":"livingRoom", "x":367}},
            {"type":"AddFilter", "arguments":{"container":"viewport", "filter":"grayscale"}},
            {"type":"MovePlayer", "arguments":{"x":342}},
            {"type":"Conditional", "arguments":{"code":"!variables.lightsOff", "if":"lightsOff"}}
        ],
        "lightsOff": [
            {"type":"SetVariable", "arguments":{"variable":"lightsOff", "value":true}},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Luke", "message":"...the lights turned off."}}
        ],
        "doorToKitchen": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"The door leading to the kitchen."}},
            {"type":"ShowTextChoices", "arguments":{"background":"default", "message":"Go into the kitchen?", "options":[{"text":"Yes", "events":"goToKitchen"}, {"text":"No"}]}}
        ],
        "goToKitchen": [
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":113}},
            {"type":"MovePlayer", "arguments":{"x":138}}
        ],
        "sink": [
            {"type":"Conditional", "arguments":{"code":"variables.sinkCounter == 0", "if":"sinkA", "else":"sinkB"}}
        ],
        "sinkA": [
            {"type":"SetVariable", "arguments":{"variable":"sinkCounter", "value":1}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"A kitchen sink."}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"...the faucet doesn't seem to work."}}
        ],
        "sinkB": [
            {"type":"Conditional", "arguments":{"code":"variables.sinkCounter == 1", "if":"sinkBA", "else":"sinkBB"}}
        ],
        "sinkBA": [
            {"type":"SetVariable", "arguments":{"variable":"sinkCounter", "value":2}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"A kitchen sink."}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"...upon closer inspection, you see a small key stuck inside the drain."}},
            {"type":"GiveItem", "arguments":{"item":"bedroomKey"}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"You got a BEDROOM KEY!", "y":0.5}}
        ],
        "sinkBB": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A kitchen sink."}}
        ],
        "stove": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A gas stove."}},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Luke", "message":"§{\"shakeAmount\":1, \"tint\":16711680}Ow!§{\"shakeAmount\":0, \"tint\":16777215} It's still hot."}}
        ],
        "refrigerator": [
            {"type":"Picture", "arguments":{"path":"assets/pictures/spaghetti.jpg", "y":0.4}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"There's a bowl of spaghetti in the refrigerator."}},
            {"type":"RemovePicture"}
        ],
        "kitchenHole": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A big hole, around 2 meters in diameter."}},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Luke", "message":"§{\"shakeAmount\":3}...Woah!§{\"shakeAmount\":0} I almost fell down through the hole!"}}
        ],
        "fireplace": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A wood-burning fireplace."}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"The sound of wood crackling makes you feel right at home."}}
        ],
        "sofa": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A couch."}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"Looks cozy."}}
        ],
        "doorToBedroom": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"The door leading to the bedroom."}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Luke", "message":"It's locked. I think I need the key to get in."}},
            {"type":"ShowInventory", "arguments":{"background":"default", "events":{"bedroomKey":"goToBedroom", "_default":"bedroomNoKey"}}}
        ],
        "goToBedroom": [
            {"type":"MapChange", "arguments":{"map":"bedroom", "x":367, "y":176}},
            {"type":"MovePlayer", "arguments":{"x":342}}
        ],
        "bedroomNoKey": [
            {"type":"ShowText", "arguments":{"background":"default", "name":"Luke", "message":"Hmm... Where did I leave the key again?"}}
        ],
        "bed": [
            {"type":"FadeInPicture", "arguments":{"path":"assets/pictures/black.png", "frameDuration":180}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"message":"Slowly but surely, you feel your eyelids droop...", "y":0.5}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"message":"END 1 - Sleep", "y":0.5}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"Code", "arguments":{"code":"location.reload();"}}
        ]
    }
}