var gameEngine = require('./game-engine');
var GameObject = require('./game-object');
var GameField = require('./game-field');
var Bomberman;
var Transform = require('./transform');
var RenderGameObject = require('./render-game-object');
var settings = require('./settings');

function Explosion(x, y) {
  GameObject.apply(this, arguments);

  Bomberman = require('./bomberman');

  this._lifeTime = 0.5;
  this._leftTime = this._lifeTime;

  this._gameField = gameEngine.getGameObject(GameField);
  this._bombermans = gameEngine.getGameObjects(Bomberman);

  this.addComponent(Transform);
  this.Transform.setPosition({ x: x, y: y });

  this.addComponent(RenderGameObject);
  this.Render.getElement().addClass('game-field__explosion');

  this._checkBarriers();
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
    this._checkBombermans();
  },
  _checkBombermans: function () {
    var self = this;
    var killed = [];
    this._bombermans.forEach(function (bomberman) {
      if (bomberman.Transform.getPosition().x === self.Transform.getPosition().x &&
          bomberman.Transform.getPosition().y === self.Transform.getPosition().y) {
            killed.push(bomberman);
          }
    });
    killed.forEach(function (bomberman) {
      bomberman.kill();
      self._bombermans.splice(self._bombermans.indexOf(bomberman), 1);
    });
  },
  _checkBarriers: function () {
    this._gameField.setGrassAt(this.Transform.getPosition().x, this.Transform.getPosition().y);
  }
});

module.exports = Explosion;
