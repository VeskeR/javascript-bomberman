var Bomberman = require('./bomberman');
var Bomb = require('./bomb');
var settings = require('./settings');

function Enemy() {
  Bomberman.apply(this, arguments);

  this.Render.getElement().addClass('game-field__bomberman--enemy');
}

Enemy.prototype = Object.create(Bomberman.prototype);
Enemy.prototype.constructor = Enemy;

$.extend(Enemy.prototype, {
  doNextAction: function () {

  }
});

module.exports = Enemy;
