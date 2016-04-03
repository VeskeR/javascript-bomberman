var GameObject = require('./game-object');
var settings = require('./settings');

function GameField() {
  GameObject.apply(this, arguments);

  this._$field = settings.gameField;
  this._field = [];

  this._barriersDensityDefault = 0.5;
  this._barriersDensity = this._barriersDensityDefault;

  this._spawnPositions = [
    function (n, m, i, j) { return (i === 1 && (j === 1 || j === 2)) || (i === 2 && j === 1); },
    function (n, m, i, j) { return (i === 1 && (j === m - 2 || j === m - 3)) || (i === 2 && j === m - 2); },
    function (n, m, i, j) { return (i === n - 2 && (j === 1 || j === 2)) || (i === n - 3 && j === 1); },
    function (n, m, i, j) { return (i === n - 2 && (j === m - 2 || j === m - 3)) || (i === n - 3 && j === m - 2); }
  ]
}

GameField.prototype = Object.create(GameObject.prototype);
GameField.prototype.constructor = GameField;

$.extend(GameField.prototype, {
  generateField: function (n, m) {
    n = n && n > 3 ? n : 4;
    m = m && m > 3 ? m : 4;

    this._generateDigitalField(n, m);
    this._generateHtmlField();
  },
  getCellTypeAt: function (i, j) {
    i = typeof i === 'number' ? i : -1;
    j = typeof j === 'number' ? j : -1;
    if (i < 0 || i > this.getFieldHeight() - 1 || j < 0 || j > this.getFieldWidth() - 1 || (i ^ 0) !== i || (j ^ 0) !== j) {
      throw new RangeError('Game Field: i, j indexes must point to field cell.');
    }

    return settings.cellTypes.getCellTypeName(this._field[i][j]);
  },
  getFieldWidth: function () {
    return this._field[0].length;
  },
  getFieldHeight: function () {
    return this._field.length;
  },
  getBarriersDensity: function () {
    return this._barriersDensity;
  },
  setBarriersDensity: function (newDensity) {
    this._barriersDensity = newDensity && newDensity >= 0 && newDensity <= 1 ?
                            newDensity :
                            this._barriersDensityDefault;
  },
  _generateDigitalField: function (n, m) {
    var field = [];

    for (var i = 0; i < n; i++) {
      field.push([]);
      for (var j = 0; j < m; j++) {
        var cellType = this._generateDigitalCell(n, m, i, j);
        field[i].push(cellType);
      }
    }

    this._field = field;
  },
  _generateDigitalCell: function (n, m, i, j) {
    if (i === 0 || i === n - 1 || j === 0 || j === m - 1) {
      cellType = settings.cellTypes.WALL;
    } else if (this._isSpawnPosition(n, m, i, j)) {
      cellType = settings.cellTypes.GRASS;
    } else {
      var r = Math.random();
      if (r < this._barriersDensity) {
        cellType = settings.cellTypes.BARRIER;
      } else {
        cellType = settings.cellTypes.GRASS;
      }
    }

    return cellType;
  },
  _isSpawnPosition: function (n, m, i, j) {
    return this._spawnPositions.some(function (spawn) {
      return spawn(n, m, i, j);
    });
  },
  _generateHtmlField: function () {
    var n = this._field.length;
    var m = this._field[0].length;

    var fieldDimension = n > m ? n : m;

    this._$field.attr('data-field-dimension', fieldDimension);

    for (var i = 0; i < n; i++) {
      var $row = this._generateHtmlFieldRow(this._field[i]);
      this._$field.append($row);
    }
  },
  _generateHtmlFieldRow: function (row) {
    var $row = $('<div></div>');
    $row.addClass('game-field__row');

    var m = row.length;

    for (var i = 0; i < m; i++) {
      var $cell = this._generateHtmlFieldCell(row[i]);
      $row.append($cell);
    }

    return $row;
  },
  _generateHtmlFieldCell: function (cellType) {
    var $cell = $('<div></div>');
    $cell.addClass('game-field__cell');
    $cell.attr('data-cell-type', settings.cellTypes.getCellTypeName(cellType).toLowerCase());
    return $cell;
  }
});

module.exports = GameField;
