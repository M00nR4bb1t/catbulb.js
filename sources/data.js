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
            {"type":"ShowChoices", "arguments":{"options":[{"text":"New Game", "events":"newGame"}, {"text":"Continue"}, {"text":"Shutdown"}]}}
        ],
        "newGame": [
            {"type":"FadeOutPicture", "arguments":{"frameDuration":30}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"message":"Hey. It's me, Willy.", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"I'm very ill. I have been for a long time.", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"The only person I can depend on is you, you who've been a friend for so long.", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"Could you please free me from all this suffering?", "y":0.5}},
            {"type":"Delay", "arguments":{"frameDuration":120}},
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":224, "y":160}}
        ],

        "doorOut": [
            {"type":"ShowText", "arguments":{"message":"The door leading outside."}},
            {"type":"ShowChoices", "arguments":{"options":[{"text":"Go Out", "events":"goOut"}, {"text":"Stay"}]}}
        ],
        "goOut": [
            {"type":"MapChange", "arguments":{"map":"livingRoom", "x":367}},
            {"type":"AddFilter", "arguments":{"container":"viewport", "filter":"grayscale"}},
            {"type":"MovePlayer", "arguments":{"frameDuration":10, "direction":180}},
            {"type":"ShowText", "arguments":{"message":"...the lights turned off."}}
        ],
        "doorToKitchen": [
            {"type":"ShowText", "arguments":{"message":"The door leading to the kitchen."}},
            {"type":"ShowChoices", "arguments":{"options":[{"text":"Enter", "events":"goToKitchen"}, {"text":"Stay"}]}}
        ],
        "goToKitchen": [
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":113}},
            {"type":"MovePlayer", "arguments":{"frameDuration":10, "direction":0}}
        ],
        "sink": [
            {"type":"ShowText", "arguments":{"message":"A kitchen sink."}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"message":"...the faucet doesn't seem to work."}}
        ],
        "stove": [
            {"type":"ShowText", "arguments":{"message":"A gas stove."}},
            {"type":"ShowText", "arguments":{"message":"§{\"shake\":1, \"tint\":16711680}Ow!§{\"shake\":0, \"tint\":16777215} It's still hot."}}
        ],
        "refrigerator": [
            {"type":"Picture", "arguments":{"path":"assets/pictures/spaghetti.jpg", "y":0.4}},
            {"type":"ShowText", "arguments":{"message":"There's a bowl of spaghetti in the refrigerator."}},
            {"type":"RemovePicture"}
        ],
        "kitchenHole": [
            {"type":"ShowText", "arguments":{"message":"A big hole, around 2 meters in diameter."}},
            {"type":"ShowText", "arguments":{"message":"§{\"shake\":3}...Woah!§{\"shake\":0} I almost fell down through the hole!"}}
        ],
        "fireplace": [
            {"type":"ShowText", "arguments":{"message":"§{\"shake\":2}Hi! I'm your friendly neighbourhood talking fireplace!"}},
            {"type":"ShowText", "arguments":{"message":"§{\"shake\":2}I'm here to demonstrate Event.Code to you."}},
            {"type":"Code", "arguments":{"code":"console.log('A warm hello from your friendly neighbourhood talking fireplace!');"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"ShowText", "arguments":{"message":"§{\"shake\":2}Check the console!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"ShowText", "arguments":{"message":"§{\"shake\":2}Oh, I can also play songs for you!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"SoundEffect", "arguments":{"path":"assets/se/twinkle.wav", "async":true}},
            {"type":"Delay", "arguments":{"frameDuration":153}},
            {"type":"StopSound"},
            {"type":"ShowText", "arguments":{"message":"§{\"shake\":2}Actually, you know what, I don't really like that song. Forget it."}}
        ],
        "sofa": [
            {"type":"ShowText", "arguments":{"message":"A couch."}},
            {"type":"ShowText", "arguments":{"message":"Looks cozy."}}
        ]
    }
}