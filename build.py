#!/usr/bin/env python

import sys
import codecs
import requests
import argparse

parser = argparse.ArgumentParser(description="Compress catbulb into a single JS file.")
parser.add_argument("file", metavar="file", type=str, default="catbulb.min.js",
                    help="the JS file to write to")
parser.add_argument("--includeDependencies", dest="includeDependencies", action="store_const",
                    const=True, default=False,
                    help="include dependencies in the outputted JS")
args = parser.parse_args()

str = ""
if (args.includeDependencies):
    print('Loading dependencies...')
    str += codecs.open("pixi.min.js", encoding="utf-8", mode="r").read()
    str += "\n"
    print('Loaded pixi.min.js')
    str += codecs.open("pixi-sound.js", encoding="utf-8", mode="r").read()
    str += "\n"
    print('Loaded pixi-sound.js')
    str += codecs.open("SAT.min.js", encoding="utf-8", mode="r").read()
    str += "\n"
    print('Loaded SAT.min.js')

print('Loading source files...')
str += codecs.open("sources/utilities.js", encoding="utf-8", mode="r").read()
str += "\n"
print('Loaded sources/utilities.js')
str += codecs.open("sources/entity.js", encoding="utf-8", mode="r").read()
str += "\n"
print('Loaded sources/entity.js')
str += codecs.open("sources/events.js", encoding="utf-8", mode="r").read()
str += "\n"
print('Loaded sources/events.js')
str += codecs.open("sources/player.js", encoding="utf-8", mode="r").read()
str += "\n"
print('Loaded sources/player.js')
str += codecs.open("sources/triggers.js", encoding="utf-8", mode="r").read()
str += "\n"
print('Loaded sources/triggers.js')
str += codecs.open("sources/tilemap.js", encoding="utf-8", mode="r").read()
str += "\n"
print('Loaded sources/tilemap.js')
str += codecs.open("sources/main.js", encoding="utf-8", mode="r").read()
print('Loaded sources/main.js')

url = "https://javascript-minifier.com/raw"
data = {"input": str}
print('Sending POST request to ' + url + '...')
response = requests.post(url, data=data)

print('Writing to ' + args.file + '...')
f = codecs.open(args.file, encoding="utf-8", mode="w+")
f.write(response.text)
f.close()

print('Done.')