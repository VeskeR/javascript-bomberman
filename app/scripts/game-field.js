var GameObject = require('./game-object');
var CellTypes = require('./cell-types');

function GameField(target) {
  GameObject.apply(this, arguments);

  this._target = target || $('body');
  this._field = [];
  this._$field = null;

  this._barriersDensityDefault = 0.4;
  this._barriersDensity = this._barriersDensityDefault;
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
  appendFieldToTarget: function () {
    this._target.append(this._$field);
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
      cellType = CellTypes.WALL;
    } else {
      var r = Math.random();
      console.log(r);
      if (r < this._barriersDensity) {
        cellType = CellTypes.BARRIER;
      } else {
        cellType = CellTypes.GRASS;
      }
    }

    return cellType;
  },
  _generateHtmlField: function () {
    var $field = $('<div></div>');
    $field.addClass('game-field');

    var n = this._field.length;
    var m = this._field[0].length;

    var fieldDimension = n > m ? n : m;

    $field.attr('data-field-dimension', fieldDimension);

    for (var i = 0; i < n; i++) {
      var $row = this._generateHtmlFieldRow(this._field[i]);
      $field.append($row);
    }

    this._$field = $field;
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
    $cell.attr('data-cell-type', CellTypes.getCellTypeName(cellType));
    return $cell;
  }
});

module.exports = GameField;
