var gameEngine = require('./game-engine');
var gameManager = require('./game-manager');
var GameObject = require('./game-object');
var Component = require('./component');
var Transform = require('./transform');
var Bomberman = require('./bomberman');

window.gameEngine = gameEngine;
window.gameManager = gameManager;

new Bomberman();
