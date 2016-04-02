function GameEngine() {
  this._gameObjects = [];
  this._newGameObjects = [];
  this._updatableGameObjects = [];

  this._fps = 60;
  this._frameTickCount = 1000 / this._fps;

  this._timeCreated = Date.now();
  this._lastUpdate = this._timeCreated;
  this._lastUpdateDelta = 0;

  this._initGameLoop();
}

$.extend(GameEngine.prototype, {
  getGameObjects: function () {
    return this._gameObjects;
  },
  getUpdatableGameObjects: function () {
    return this._updatableGameObjects;
  },
  addGameObject: function (object) {
    this._gameObjects.push(object);
    this._newGameObjects.push(object);
  },
  removeGameObject: function (object) {
    var i = this._gameObjects.indexOf(object);
    if (i !== -1) {
      this._gameObjects.splice(i, 1);
    }
    var j = this._updatableGameObjects.indexOf(object);
    if (j !== -1) {
      this._updatableGameObjects.splice(j, 1);
    }
    var k = this._newGameObjects.indexOf(object);
    if (k !== -1) {
      this._newGameObjects.splice(k, 1);
    }
  },
  _initGameLoop: function () {
    this._update();
  },
  _update: function () {
    var self = this;

    this._lastUpdateDelta = Date.now() - this._lastUpdate;
    var delta = this._frameTickCount - this._lastUpdateDelta;
    delta = delta < 0 ? 0 : delta;

    setTimeout(function () {
      self._lastUpdate = Date.now();
      self._processNewObjects();
      self._updatableGameObjects.forEach(function (go) {
        go.update();
      });
      self._update();
    }, delta);
  },
  _processNewObjects: function () {
    while (this._newGameObjects.length > 0) {
      var go = this._newGameObjects.shift();
      if (go.update && typeof go.update === 'function') {
        this._updatableGameObjects.push(go);
      }
    }
  }
});

var GameEngine = new GameEngine();

module.exports = GameEngine;
