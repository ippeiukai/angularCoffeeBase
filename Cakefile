fs = require 'fs'
Snockets = require 'snockets'

NAME = 'angularCoffeeBase'
INPUT_FILE = "src/#{NAME}.js.coffee"
OUTPUT_FILE = "lib/#{NAME}.js"
OUTPUT_MIN_FILE = "lib/#{NAME}.min.js"

task 'build', 'Build lib/ from src/', ->
  snockets = new Snockets()
  js = snockets.getConcatenation INPUT_FILE, async: false
  fs.writeFileSync OUTPUT_FILE, js
  jsMin = snockets.getConcatenation INPUT_FILE, async: false, minify: true
  fs.writeFileSync OUTPUT_MIN_FILE, jsMin

task 'clean', "remove #{OUTPUT_FILE}", ->
  fs.unlinkSync OUTPUT_FILE, OUTPUT_MIN_FILE
