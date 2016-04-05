var inputController = require('../engine/core/input-controller');

var Bomberman = require('./bomberman');

var Bomb = require('../bomb/bomb');

var settings = require('../controls/settings');

function Player() {
  Bomberman.apply(this, arguments);

  this.Render.getElement().addClass('game-field__bomberman--player');
}

Player.prototype = Object.create(Bomberman.prototype);
Player.prototype.constructor = Player;

$.extend(Player.prototype, {
  doNextAction: function () {
    var action = {
      space: inputController.getKey('SPACE') ? 1 : 0,
      x: inputController.getKey('RIGHT') ? 1 : inputController.getKey('LEFT') ? -1 : 0,
      y: inputController.getKey('UP') ? -1 : inputController.getKey('DOWN') ? 1 : 0
    };

    if (action.space) {
      this.placeBomb();
    }
    if (action.x || action.y) {
      this.move({ x: action.x, y: action.y });
    }
  }
});

module.exports = Player;
