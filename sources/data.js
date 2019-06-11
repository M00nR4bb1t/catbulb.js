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
        }
    ],

    // Events
    "events": {
        "_gameStart": [
            {"type":"FadeInPicture", "arguments":{"path":"assets/pictures/spaghetti.jpg", "frameDuration":30}},
            {"type":"ShowChoices", "arguments":{"background":"default", "options":[{"text":"New Game", "events":"newGame"}, {"text":"Continue"}, {"text":"Shutdown"}]}}
        ],
        "newGame": [
            {"type":"FadeOutPicture", "arguments":{"frameDuration":30}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"message":"§{\"shakeAmount\":2}Sine shake§{\"shakeAmount\":0} test\nAmount: §{\"shakeAmount\":1}1 §{\"shakeAmount\":2}2 §{\"shakeAmount\":3}3 §{\"shakeAmount\":4}4\n§{\"shakeAmount\":0}Speed: §{\"shakeAmount\":2, \"shakeSpeed\":0.005}0.005 §{\"shakeSpeed\":0.01}0.01 §{\"shakeSpeed\":0.02}0.02\n§{\"shakeSpeed\":0.01, \"shakeAmount\":0}Increment: §{\"shakeAmount\":2, \"shakeIncrement\":0.1}0.1 §{\"shakeIncrement\":0.2}0.2 §{\"shakeIncrement\":0.3}0.3 §{\"shakeIncrement\":0.4}0.4", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"§{\"shakeAmount\":2, \"shakeType\":\"saw\"}Saw shake§{\"shakeAmount\":0} test\nAmount: §{\"shakeAmount\":1}1 §{\"shakeAmount\":2}2 §{\"shakeAmount\":3}3 §{\"shakeAmount\":4}4\n§{\"shakeAmount\":0}Speed: §{\"shakeAmount\":2, \"shakeSpeed\":0.005}0.005 §{\"shakeSpeed\":0.01}0.01 §{\"shakeSpeed\":0.02}0.02\n§{\"shakeSpeed\":0.01, \"shakeAmount\":0}Increment: §{\"shakeAmount\":2, \"shakeIncrement\":0.1}0.1 §{\"shakeIncrement\":0.2}0.2 §{\"shakeIncrement\":0.3}0.3 §{\"shakeIncrement\":0.4}0.4", "y":0.5}},
            {"type":"ShowText", "arguments":{"message":"§{\"shakeAmount\":2, \"shakeType\":\"triangle\"}Triangle shake§{\"shakeAmount\":0} test\nAmount: §{\"shakeAmount\":1}1 §{\"shakeAmount\":2}2 §{\"shakeAmount\":3}3 §{\"shakeAmount\":4}4\n§{\"shakeAmount\":0}Speed: §{\"shakeAmount\":2, \"shakeSpeed\":0.005}0.005 §{\"shakeSpeed\":0.01}0.01 §{\"shakeSpeed\":0.02}0.02\n§{\"shakeSpeed\":0.01, \"shakeAmount\":0}Increment: §{\"shakeAmount\":2, \"shakeIncrement\":0.1}0.1 §{\"shakeIncrement\":0.2}0.2 §{\"shakeIncrement\":0.3}0.3 §{\"shakeIncrement\":0.4}0.4", "y":0.5}},
            {"type":"Delay", "arguments":{"frameDuration":120}},
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
            {"type":"ShowText", "arguments":{"background":"default", "message":"A kitchen sink."}},
            {"type":"Delay", "arguments":{"frameDuration":60}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"...the faucet doesn't seem to work."}}
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
            {"type":"ShowText", "arguments":{"background":"default", "name":"Friendly Neighbourhood Fireplace", "message":"§{\"shakeAmount\":2}Hi! I'm your friendly neighbourhood talking fireplace!"}},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Friendly Neighbourhood Fireplace", "message":"§{\"shakeAmount\":2}I'm here to demonstrate Event.Code to you."}},
            {"type":"Code", "arguments":{"code":"console.log('A warm hello from your friendly neighbourhood talking fireplace!');"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Friendly Neighbourhood Fireplace", "message":"§{\"shakeAmount\":2}Check the console!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Friendly Neighbourhood Fireplace", "message":"§{\"shakeAmount\":2}Oh, I can also play songs for you!"}},
            {"type":"Delay", "arguments":{"frameDuration":90}},
            {"type":"SoundEffect", "arguments":{"path":"assets/se/twinkle.wav", "async":true}},
            {"type":"Delay", "arguments":{"frameDuration":153}},
            {"type":"StopSound"},
            {"type":"ShowText", "arguments":{"background":"default", "name":"Friendly Neighbourhood Fireplace", "message":"§{\"shakeAmount\":2}Actually, you know what, I don't really like that song. Forget it."}}
        ],
        "sofa": [
            {"type":"ShowText", "arguments":{"background":"default", "message":"A couch."}},
            {"type":"ShowText", "arguments":{"background":"default", "message":"Looks cozy."}}
        ]
    }
}