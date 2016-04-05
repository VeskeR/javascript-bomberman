var Bomberman = require('./bomberman');

var Bomb = require('../bomb/bomb');

var settings = require('../controls/settings');

function Enemy() {
  Bomberman.apply(this, arguments);

  this.Render.getElement().addClass('game-field__bomberman--enemy');
}

Enemy.prototype = Object.create(Bomberman.prototype);
Enemy.prototype.constructor = Enemy;

$.extend(Enemy.prototype, {
  doNextAction: function () {
    var r = Math.random() * 10 | 0;
    if (r < 2) {
      this.move({ x: 1, y: 0 });
    } else if (r < 4) {
      this.move({ x: -1, y: 0 });
    } else if (r < 6) {
      this.move({ x: 0, y: 1 });
    } else if (r < 8) {
      this.move({ x: 0, y: -1 });
    } else {
      this.placeBomb();
    }
  }
});

module.exports = Enemy;
