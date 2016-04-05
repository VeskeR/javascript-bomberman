var gameEngine = require('../engine/game-engine');
var Transform = require('../engine/components/transform');
var GameObject = require('../engine/core/game-object');

var RenderGameObject = require('../components/render-game-object');

var GameManager;
var settings = require('../controls/settings');

function Explosion(x, y) {
  GameObject.apply(this, arguments);

  GameManager = require('../controls/game-manager');

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
