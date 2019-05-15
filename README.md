# catbulb.js ![icon](_favicon.ico)
*English / [한국어](https://github.com/M00nR4bb1t/catbulb.js/blob/master/README-kr.md)*

## Table of Contents
- [catbulb.js](#catbulbjs-icon)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Quick Setup](#quick-setup)
    - [Detailed Setup](#detailed-setup)
    - [Things to Note](#things-to-note)
  - [Features](#features)

>**DISCLAIMER: This README is currently NOT BEING UPDATED.**

>**DISCLAIMER: catbulb is currently in its earliest stage of development. As such, some features mentioned in this README may not have been implemented yet. Such features (unless explicitly marked otherwise, such as with checkboxes in the Features section) are marked with ~~a strikethrough~~.**

***catbulb.js*** is a JavaScript framework for jrpg-esque adventure games on the web. ([demo](https://catbulb-demo.herokuapp.com)) Powered by [PixiJS](http://pixijs.com), it has full support for both WebGL and the HTML5 Canvas API. It can also be ported effortlessly to desktop using something like [Electron](https://electronjs.org/).

catbulb allows you to develop games codelessly<sup id="a1">[[1]](#footnote1)</sup>, ~~loading all data from a single JSON file~~ and supporting [Tiled](https://www.mapeditor.org/) map files (.json). On the other hand, it is also easily and extensively customizable, making use of ES6 Classes.

Currently, catbulb is its earliest stage of development and lacks many basic features. Therefore, I highly discourage you use catbulb for production at this point in time. (Which is why, at the moment, there is no LICENSE file in this repository) However, if for some reason you need to use catbulb in your own project, please [open an issue](https://github.com/M00nR4bb1t/catbulb.js/issues/new).

## Installation

### Quick Setup

Assuming you have Python installed on your system, you can use the following commands to grab a copy of catbulb and set up a development web server.

```shell
git clone https://github.com/M00nR4bb1t/catbulb.js.git
cd catbulb.js
python -m http.server 5000
```
Or, if you are using Python 2.* or below,
```shell
git clone https://github.com/M00nR4bb1t/catbulb.js.git
cd catbulb.js
python -m SimpleHTTPServer 5000
```

Afterwards, just navigate to [localhost:5000](http://localhost:5000).

### Detailed Setup

First, get youself a copy of catbulb by running `git clone`.

```shell
git clone https://github.com/M00nR4bb1t/catbulb.js.git 
```

You will see a working demo of catbulb under `catbulb.js/`.


This is what the directory structure looks like (ignoring Git-related files, README files, etc.):

```
catbulb.js/
├── sources/
│   ├── entity.js
│   ├── events.js
│   ├── main.js
│   ├── player.js
│   ├── tilemap.js
│   ├── triggers.js
│   ├── utilities.js
│   │
│   └── data.js
├── assets/
│   ├── .../
│   └── └── ...
├── build.py
├── index.html
├── index.php
├── pixi.min.js
├── SAT.min.js
└── style.css
```

In case you don't plan to edit any of the catbulb source files, catbulb provides a `build.py` Python script to bundle all of these JS files. Run the following command to combine and minify catbulb and its dependencies into one `catbulb.min.js` file. Note that the script uses the [JavaScript Minifier Web API](https://javascript-minifier.com/) to minify JavaScript, and thus requires an internet connection to work.

```shell
python ./build.py -- includeDependencies catbulb.min.js
```
Or, alternatively,
```shell
chmod +x build.py
./build.py --includeDependencies catbulb.min.js
```
Then, you can just include the file like this, preferably at the end of `<body>`:
```html
<!-- You still need the data file, obviously. -->
<script src="data.js"></script>
<script src="catbulb.min.js"></script>
```

If you *are* looking to edit the catbulb source files, make sure to include all the JS files under `source/` as well as the `SAT.min.js` and `pixi.min.js` like so, preferably at the end of `<body>` (order matters!):

```html
<!-- Dependencies -->
<script src="pixi.min.js"></script>
<script src="SAT.min.js"></script>

<!-- catbulb Source Files -->
<script src="sources/data.js"></script>

<script src="sources/utilities.js"></script>
<script src="sources/entity.js"></script>
<script src="sources/events.js"></script>
<script src="sources/triggers.js"></script>
<script src="sources/player.js"></script>
<script src="sources/tilemap.js"></script>
<script src="sources/main.js"></script>
```

### Things to Note

* If you want to (for some reason or the other) bundle only catbulb source files without dependencies ([PixiJS](http://www.pixijs.com), [SAT.js](http://jriecken.github.io/sat-js/)), you can do so by running `build.py` without the `--includeDependencies` flag.

## Features
* [ ] Player
   * [x] Walking
   * [ ] Running
* [x] Tilemap
   * [x] Tile Rendering
   * [ ] Tile Animation
* [ ] Events & Triggers
   * [x] `EventPlayer` & `Trigger`
   * [x] Message Event
   * [x] MapChange Event
* [ ] Loader
   * [ ] data.js
      * [x] List of Assets
      * [x] Maps
      * [x] Tilesets
      * [x] Events & Triggers
      * [x] Bitmap Fonts
      * [ ] Player Party
      * [ ] SE & BGM
      * [ ] ...
   * [x] Tiled JSON Loader
* [ ] `BitmapText`
   * [ ] Glyphs
      * [x] ASCII
      * [x] Hangul Johab
      * [ ] Hangul Wansung
      * [ ] Hiragana & Katakana
      * [ ] Japanese Kanji
      * [ ] Latin Extended
      * [ ] Chinese Hanzi (Traditional)
      * [ ] Chinese Hanzi (Simplified)
      * [ ] ...
   * [ ] Formatting
      * [x] Shake
      * [x] Tint
      * [ ] Size
      * [x] Line Wrapping
* [ ] Inventory System
   * [ ] ...
* [ ] Battle System
   * [ ] ...

***
<span id="footnote1">[[1]](#a1)</span> `data.js` is really just JSON, so not counting that as code.