# catbulb.js
*English / [한국어](https://github.com/M00nR4bb1t/catbulb.js/blob/master/README-kr.md)*

## Table of Contents
- [catbulb.js](#catbulbjs)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)

>**DISCLAIMER: catbulb is currently in its earliest stage of development. As such, some features mentioned in this README may not have been implemented yet. Such features (unless explicitly marked otherwise, such as with checkboxes in the Features section) are marked with ~~a strikethrough~~.**

***catbulb.js*** is a JavaScript framework for jrpg-esque adventure games on the web. Powered by [PixiJS](http://pixijs.com), it has full support for both WebGL and the HTML5 Canvas API. It can also be ported effortlessly to desktop using something like [Electron](https://electronjs.org/).

catbulb allows you to develop games codelessly<sup id="a1">[[1]](#footnote1)</sup>, ~~loading all data from a single JSON file~~ and supporting [Tiled](https://www.mapeditor.org/) map files (.json). On the other hand, it is also easily and extensively customizable, making use of ES6 Classes.

Currently, catbulb is its earliest stage of development and lacks many basic features. Therefore, I highly discourage you use catbulb for production at this point in time. (Which is why, at the moment, there is no LICENSE file in this repository) However, if for some reason you need to use catbulb in your own project, please [open an issue](https://github.com/M00nR4bb1t/catbulb.js/issues/new).

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
* [ ] Loader
   * [ ] data.json
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
<span id="footnote1">[[1]](#a1)</span> JSON is a *data format*, so not counting that as code here.