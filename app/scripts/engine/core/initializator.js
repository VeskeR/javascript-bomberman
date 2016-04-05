var GameManager;

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
    GameManager = require('../../controls/game-manager');

    new GameManager();
  }
});

var initializator = new Initializator();

module.exports = initializator;
