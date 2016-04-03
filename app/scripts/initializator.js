var GameManager;
var GameField;
var Bomberman;

function Initializator() {

}

$.extend(Initializator.prototype, {
  init: function () {
    this._createCoreObjects();
    this._createGameObjects();
  },
  _createCoreObjects: function () {
    require('./input-controller');
  },
  _createGameObjects: function () {
    GameManager = require('./game-manager');

    new GameManager();
  }
});

var initializator = new Initializator();

module.exports = initializator;
