var gameEngine = require('./game-engine');
var GameObject = require('./game-object');
var GameField = require('./game-field');
var Bomberman = require('./bomberman');
var Transform = require('./transform');
var RenderGameObject = require('./render-game-object');
var settings = require('./settings');

function Explosion(x, y) {
  GameObject.apply(this, arguments);

  this._lifeTime = 0.5;
  this._leftTime = this._lifeTime;

  this.addComponent(Transform);
  this.Transform.setPosition({ x: x, y: y });

  this.addComponent(RenderGameObject);
  this.Render.getElement().addClass('game-field__explosion')
}

Explosion.prototype = Object.create(GameObject.prototype);
Explosion.prototype.constructor = Explosion;

$.extend(Explosion.prototype, {
  update: function () {
    this._update();
    this._checkDestroyableObject();
    this._leftTime -= this.getSecondsFromLastUpdate();
    if (this._leftTime <= 0) {
      this.destroy();
    }
  },
  _checkDestroyableObject: function () {

  }
});

module.exports = Explosion;
