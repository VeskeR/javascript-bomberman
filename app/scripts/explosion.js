var gameEngine = require('./game-engine');
var GameObject = require('./game-object');
var GameField = require('./game-field');
var Bomberman = require('./bomberman');
var settings = require('./settings');

function Explosion() {
  GameObject.apply(this, arguments);
}

 Explosion.prototype = Object.create(GameObject.prototype);
 Explosion.prototype.constructor = Explosion;

 $.extend(Explosion.prototype, {
   
 });

module.exports = Explosion;
