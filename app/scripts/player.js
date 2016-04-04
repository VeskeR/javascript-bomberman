var inputController = require('./input-controller');
var Bomberman = require('./bomberman');
var Bomb = require('./bomb');
var settings = require('./settings');

function Player() {
  Bomberman.apply(this, arguments);

  this.Render.getElement().addClass('game-field__bomberman--player');
}

Player.prototype = Object.create(Bomberman.prototype);
Player.prototype.constructor = Player;

$.extend(Player.prototype, {
  update: function () {
    this._update();
    this._toNextAction -= this.getSecondsFromLastUpdate();
    if (this._toNextAction <= 0) {
      this._tryDoAction();
    }
  },
  _tryDoAction: function () {
    var action = {
      space: inputController.getKey('SPACE') ? 1 : 0,
      x: inputController.getKey('RIGHT') ? 1 : inputController.getKey('LEFT') ? -1 : 0,
      y: inputController.getKey('UP') ? -1 : inputController.getKey('DOWN') ? 1 : 0
    };

    if (action.space) {
      this._placeBomb();
      this._toNextAction = this._actionPause;
    }
    if (action.x || action.y) {
      this._move(action);
    }
  },
  _move: function (moveVector) {
    moveVector.y = moveVector.x ? 0 : moveVector.y;
    var currentPosition = this.Transform.getPosition();
    var newPosition = {};

    newPosition.x = currentPosition.x + moveVector.x;
    newPosition.y = currentPosition.y + moveVector.y;

    if (this._gameField.getCellTypeNameAt(newPosition.x, newPosition.y) === 'GRASS') {
      this.Transform.moveTo(newPosition);
      this._toNextAction = this._actionPause;
    }
  },
  _placeBomb: function () {
    if (this._bombs < this._maxBombs) {
      new Bomb(this, this.Transform.getPosition().x, this.Transform.getPosition().y);
    }
  },
});

module.exports = Player;
