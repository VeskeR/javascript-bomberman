var GameObject = require('./game-object');
var CellTypes = require('./cell-types');

function GameField(target) {
  GameObject.apply(this, arguments);

  this._target = target || $('body');
  this._field = [];
  this._$field = null;
}

GameField.prototype = Object.create(GameObject.prototype);
GameField.prototype.constructor = GameField;

$.extend(GameField.prototype, {
  generateField: function (n, m) {
    this._field = [];

    n = n && n > 3 ? n : 4;
    m = m && m > 3 ? m : 4;

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < m; j++) {
        var cellType;
        if (i === 0 || i === n - 1 || j === 0 || j === m - 1) {
          cellType = CellTypes.WALL;
        } else {
          cellType = CellTypes.GRASS;
        }
        this._field[i] = this._field[i] || [];
        this._field[i].push(cellType);
      }
    }
  },
  appendFieldToTarget: function () {
    this._target.append(this._$field);
  }
});

module.exports = GameField;
