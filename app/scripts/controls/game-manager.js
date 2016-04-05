var GameObject = require('../engine/core/game-object');

var GameField = require('./game-field');

var Bomberman = require('../bomberman/bomberman');
var Enemy = require('../bomberman/enemy');
var Player = require('../bomberman/player');

var settings = require('../controls/settings');

function GameManager() {
  GameObject.apply(this, arguments);

  this._fieldWidth = settings.gameFieldWidth;
  this._fieldHeight = settings.gameFieldHeight;

  this._gameField = new GameField();
  this._player = new Player();
  this._enemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
  ];

  this._bombermans = [];
  this._bombermans.push(this._player);
  Array.prototype.push.apply(this._bombermans, this._enemies);

  for (var i = 0; i < this._bombermans.length; i++) {
    this._bombermans[i].Transform.moveTo(settings.spawnPositions[i % 4]());
  }

  this._gameField.generateField(this._fieldHeight, this._fieldWidth);
}

GameManager.prototype = Object.create(GameObject.prototype);
GameManager.prototype.constructor = GameManager;

$.extend(GameManager.prototype, {
  getGameField: function () {
    return this._gameField;
  },
  getPlayer: function () {
    return this._player;
  },
  getEnemies: function () {
    return this._enemies;
  },
  getBombermans: function () {
    return this._bombermans;
  },
  removeBomberman: function (bomberman) {
    if (this._player === bomberman) {
      this._player = null;
    }

    var i = this._enemies.indexOf(bomberman);
    if (i !== -1) {
      this._enemies.splice(i, 1);
    }

    var j = this._bombermans.indexOf(bomberman);
    if (j !== -1) {
      this._bombermans.splice(j, 1);
    }
  },
  update: function () {
    this._update();
  }
});

module.exports = GameManager;
