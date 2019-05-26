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

        "assets/pictures/spaghetti.jpg",

        "assets/se/twinkle.wav"
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
                "left":12, "right":12, "top":12, "bottom":12
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
        }
    ],

    // Events
    "events": {
        "_gameStart": [
            {"type":"Picture", "arguments":{"path":"assets/pictures/spaghetti.jpg"}},
            {"type":"ShowChoices", "arguments":{"background":"default", "options":[{"text":"New Game", "events":"newGame"}, {"text":"Continue"}, {"text":"Shutdown"}]}}
        ],
        "newGame": [
            {"type":"FadeOutPicture", "arguments":{"frameDuration":30}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"message":"Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do:", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it,", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"'and what is the use of a book,' thought Alice 'without pictures or conversations?'", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid),", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies,", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"when suddenly a White Rabbit with pink eyes ran close by her.", "y":0.5}},
            {"type":"Delay", "arguments":{"frameDuration":120}},
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":224, "y":160}}
        ],

        "doorOut": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"The door leading outside."}},
            {"type":"ShowChoices", "arguments":{"background":"default", "options":[{"text":"Go Out", "events":"goOut"}, {"text":"Stay"}]}}
        ],
        "goOut": [
            {"type":"MapChange", "arguments":{"map":"livingRoom", "x":367}},
            {"type":"AddFilter", "arguments":{"container":"viewport", "filter":"grayscale"}},
            {"type":"MovePlayer", "arguments":{"frameDuration":10, "direction":180}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"...the lights turned off."}}
        ],
        "doorToKitchen": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"The door leading to the kitchen."}},
            {"type":"ShowChoices", "arguments":{"background":"default", "options":[{"text":"Enter", "events":"goToKitchen"}, {"text":"Stay"}]}}
        ],
        "goToKitchen": [
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":113}},
            {"type":"MovePlayer", "arguments":{"frameDuration":10, "direction":0}}
        ],
        "sink": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A kitchen sink."}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"...the faucet doesn't seem to work."}}
        ],
        "stove": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A gas stove."}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"§{\"shake\":1, \"tint\":16711680}Ow!§{\"shake\":0, \"tint\":16777215} It's still hot."}}
        ],
        "refrigerator": [
            {"type":"Picture", "arguments":{"path":"assets/pictures/spaghetti.jpg", "y":0.4}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"There's a bowl of spaghetti in the refrigerator."}},
            {"type":"RemovePicture"}
        ],
        "kitchenHole": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A big hole, around 2 meters in diameter."}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"§{\"shake\":3}...Woah!§{\"shake\":0} I almost fell down through the hole!"}}
        ],
        "fireplace": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"§{\"shake\":2}Hi! I'm your friendly neighbourhood talking fireplace!"}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"§{\"shake\":2}I'm here to demonstrate Event.Code to you."}},
            {"type":"Code", "arguments":{"code":"console.log('A warm hello from your friendly neighbourhood talking fireplace!');"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"§{\"shake\":2}Check the console!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"§{\"shake\":2}Oh, I can also play songs for you!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"SoundEffect", "arguments":{"path":"assets/se/twinkle.wav", "async":true}},
            {"type":"Delay", "arguments":{"frameDuration":153}},
            {"type":"StopSound"},
            {"type":"ShowText", "arguments":{"background":"default", "message":"§{\"shake\":2}Actually, you know what, I don't really like that song. Forget it."}}
        ],
        "sofa": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A couch."}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"Looks cozy."}}
        ]
    }
}