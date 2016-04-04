var gameEngine = require('./game-engine');
var GameObject = require('./game-object');
var GameManager;
var Transform = require('./transform');
var RenderGameObject = require('./render-game-object');
var settings = require('./settings');

function Explosion(x, y) {
  GameObject.apply(this, arguments);

  GameManager = require('./game-manager');

  this._lifeTime = 0.5;
  this._leftTime = this._lifeTime;

  this._gameManager = gameEngine.getGameObject(GameManager);
  this._gameField = this._gameManager.getGameField();

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
    var bombermans = this._gameManager.getBombermans();

    bombermans.forEach(function (bomberman) {
      if (bomberman.Transform.getPosition().x === self.Transform.getPosition().x &&
          bomberman.Transform.getPosition().y === self.Transform.getPosition().y) {
            killed.push(bomberman);
          }
    });

    killed.forEach(function (bomberman) {
      self._gameManager.removeBomberman(bomberman);
      bomberman.kill();
    });
  },
  _checkBarriers: function () {
    this._gameField.setGrassAt(this.Transform.getPosition().x, this.Transform.getPosition().y);
  }
});

module.exports = Explosion;
