var gameEngine = require('./game-engine');

function GameObject() {
  this._timeCreated = 0;
  this._lastUpdate = 0;
  this._lastUpdateDelta = 0;

  this._controller();
}

GameObject.prototype = {
  destroy: function () {
    this._removeFromGameEngine();
  },
  _controller: function () {
    this._timeCreated = Date.now();
    this._lastUpdate = this._timeCreated;

    this._addToGameEngine();
  },
  _addToGameEngine: function () {
    gameEngine.addGameObject(this);
  },
  _removeFromGameEngine: function () {
    gameEngine.removeGameObject(this);
  },
  _update: function () {
    var currentTime = Date.now();
    this._lastUpdateDelta = currentTime - this._lastUpdate;
    this._lastUpdate = currentTime;
  }
};

module.exports = GameObject;
