var gameEngine = require('../engine/game-engine');
var Transform = require('../engine/components/transform');
var GameObject = require('../engine/core/game-object');

var RenderGameObject = require('../components/render-game-object');

var GameField = require('../controls/game-field');
var settings = require('../controls/settings');

var Explosion = require('./explosion');

function Bomb(bomberman, x, y) {
  GameObject.apply(this, arguments);

  this._gameField = gameEngine.getGameObject(GameField);

  this._bomberman = bomberman;
  this._bomberman.increaseBombsCount();

  this._lifeTime = 2;
  this._leftTime = this._lifeTime;

  this._explosionRadius = 2;
  this._explosionDirections = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];

  this.addComponent(Transform);
  this.Transform.setPosition({ x: x, y: y });

  this.addComponent(RenderGameObject);
  this.Render.getElement().addClass('game-field__bomb');
}

Bomb.prototype = Object.create(GameObject.prototype);
Bomb.prototype.constructor = Bomb;

$.extend(Bomb.prototype, {
  update: function () {
    this._update();
    this._leftTime -= this.getSecondsFromLastUpdate();
    if (this._leftTime <= 0) {
      this.explode();
    }
  },
  explode: function () {
    this._createExplosions();
    this._bomberman.decreaseBombsCount();
    this.destroy();
  },
  _createExplosions: function () {
    var self = this;

    var bombPosition = this.Transform.getPosition();
    new Explosion(bombPosition.x, bombPosition.y);

    this._explosionDirections.forEach(function (dir) {
      for (var i = 1; i <= self._explosionRadius; i++) {
        var explosionPosition = {
          x: bombPosition.x + dir.x * i,
          y: bombPosition.y + dir.y * i
        };
        var cellTypeName = self._gameField.getCellTypeNameAt(explosionPosition.x, explosionPosition.y);
        if (cellTypeName !== 'WALL') {
          new Explosion(explosionPosition.x, explosionPosition.y);
          if (cellTypeName === 'BARRIER') {
            break;
          }
        } else {
          break;
        }
      }
    });
  }
});

module.exports = Bomb;
