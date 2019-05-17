var dataJSON = {
    // List of assets
    "assets": [
        "assets/gui/font_ascii.png",
        "assets/gui/font_kr.png",

        "assets/shaders/grayscale.frag",
        "assets/shaders/red.frag",
        "assets/shaders/rgbsplit.frag",

        "assets/sprites/player_idle.png",
        "assets/sprites/player_walk.png",
        
        "assets/tilesets/indoors.png",
        
        "assets/maps/test.json",
        "assets/maps/livingRoom.json",

        "assets/pictures/spaghetti.jpg",

        "assets/se/twinkle.wav"
    ],

    // GUI Settings
    "gui": {
        "fonts": {
            "ascii":"assets/gui/font_ascii.png",
            "kr":"assets/gui/font_kr.png"
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
        }
    ],

    // Events
    "events": {
        "_gameStart": [
            {"type":"Picture", "arguments":{"path":"assets/pictures/spaghetti.jpg"}},
            {"type":"Selection", "arguments":{"options":[{"text":"New Game", "events":"newGame"}, {"text":"Continue"}, {"text":"Shutdown"}]}}
        ],
        "newGame": [
            {"type":"FadeOutPicture", "arguments":{"frameDuration":30}},
            {"type":"Delay", "arguments":{"frameDuration":30}},
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":224, "y":160}}
        ],

        "doorOut": [
            {"type":"Selection", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"Go out?", "options":[{"text":"Yes", "events":"goOut"}, {"text":"No"}]}}
        ],
        "goOut": [
            {"type":"MapChange", "arguments":{"map":"livingRoom", "x":367}},
            {"type":"AddFilter", "arguments":{"container":"viewport", "filter":"grayscale"}},
            {"type":"MovePlayer", "arguments":{"frameDuration":10, "direction":180}},
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"...the lights turned off."}}
        ],
        "doorToKitchen": [
            {"type":"Selection", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"Go into the kitchen?", "options":[{"text":"Yes", "events":"goToKitchen"}, {"text":"No"}]}}
        ],
        "goToKitchen": [
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":113}},
            {"type":"MovePlayer", "arguments":{"frameDuration":10, "direction":0}}
        ],
        "sink": [
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"A kitchen sink."}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"...the faucet doesn't seem to work."}}
        ],
        "stove": [
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"A gas stove."}},
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"§{\"shake\":1, \"tint\":16711680}Ow!§{\"shake\":0, \"tint\":16777215} It's still hot."}}
        ],
        "refrigerator": [
            {"type":"Picture", "arguments":{"path":"assets/pictures/spaghetti.jpg", "y":0.4}},
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"There's a bowl of spaghetti in the refrigerator."}},
            {"type":"RemovePicture"}
        ],
        "kitchenHole": [
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"A big hole, around 2 meters in diameter."}},
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"§{\"shake\":3}...Woah!§{\"shake\":0} I almost fell down through the hole!"}}
        ],
        "fireplace": [
            {"type":"Message", "arguments":{"name":"Fireplace", "message":"§{\"shake\":2}Hi! I'm your friendly neighbourhood talking fireplace!"}},
            {"type":"Message", "arguments":{"name":"Fireplace", "message":"§{\"shake\":2}I'm here to demonstrate Event.Code to you."}},
            {"type":"Code", "arguments":{"code":"console.log('A warm hello from your friendly neighbourhood talking fireplace!');"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"Message", "arguments":{"name":"Fireplace", "message":"§{\"shake\":2}Check the console!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"Message", "arguments":{"name":"Fireplace", "message":"§{\"shake\":2}Oh, I can also play songs for you!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"SoundEffect", "arguments":{"path":"assets/se/twinkle.wav", "async":true}},
            {"type":"Delay", "arguments":{"frameDuration":153}},
            {"type":"StopSound"},
            {"type":"Message", "arguments":{"name":"Fireplace", "message":"§{\"shake\":2}Actually, you know what, I don't really like that song. Forget it."}}
        ],
        "sofa": [
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"A couch."}},
            {"type":"Message", "arguments":{"name":"§{\"tint\":\"#78a63e\"}Catbulb§{\"tint\":\"#ffffff\"}", "message":"Looks cozy."}}
        ]
    }
}