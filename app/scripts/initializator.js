var GameManager;
var GameField;
var Bomberman;

function Initializator() {

}

$.extend(Initializator.prototype, {
  createObjects: function () {
    GameManager = require('./game-manager');
    GameField = require('./game-field');
    Bomberman = require('./bomberman');

    new GameManager();
    new GameField();
    new Bomberman();
  }
});

var initializator = new Initializator();

module.exports = initializator;
