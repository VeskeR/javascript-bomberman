var GameManager;
var GameField;
var Bomberman;

function Initializator() {

}

$.extend(Initializator.prototype, {
  createObjects: function () {
    GameManager = require('./game-manager');

    new GameManager();
  }
});

var initializator = new Initializator();

module.exports = initializator;
