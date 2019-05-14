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
        "assets/maps/livingRoom.json"
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
        "doorOut": [
            {"type":"MapChange", "arguments":{"map":"livingRoom", "x":367}},
            {"type":"AddFilter", "arguments":{"container":"viewport", "filter":"grayscale"}},
            {"type":"Message", "arguments":{"message":"...the lights turned off."}}
        ],
        "doorToKitchen": [
            {"type":"MapChange", "arguments":{"map":"kitchen", "x":113}},
            {"type":"Message", "arguments":{"message":"I'm in the mood for snacking on something..."}}
        ],
        "sink": [
            {"type":"Message", "arguments":{"message":"A kitchen sink."}},
            {"type":"Message", "arguments":{"message":"...the faucet doesn't seem to work."}}
        ],
        "stove": [
            {"type":"Message", "arguments":{"message":"A gas stove."}},
            {"type":"Message", "arguments":{"message":"§{\"shake\":1, \"tint\":16711680}Ow!§{\"shake\":0, \"tint\":16777215} It's still hot."}}
        ],
        "kitchenHole": [
            {"type":"Message", "arguments":{"message":"A big hole, around 2 meters in diameter."}},
            {"type":"Message", "arguments":{"message":"§{\"shake\":3}...Woah!§{\"shake\":0} I almost fell down through the hole!"}}
        ],
        "fireplace": [
            {"type":"Message", "arguments":{"message":"A wood-burning fireplace."}},
            {"type":"Message", "arguments":{"message":"I can hear the firewood crackle."}}
        ],
        "sofa": [
            {"type":"Message", "arguments":{"message":"A couch."}},
            {"type":"Message", "arguments":{"message":"Looks cozy."}}
        ]
    }
}