var initializator = require('./core/initializator');

function GameEngine() {
  this._gameObjects = [];
  this._newGameObjects = [];
  this._updatableGameObjects = [];

  this._fps = 60;
  this._frameTickCount = 1000 / this._fps;

  this._timeCreated = Date.now();
  this._lastUpdate = this._timeCreated;
  this._lastUpdateDelta = 0;
}

$.extend(GameEngine.prototype, {
  init: function () {
    initializator.init();
    this._initGameLoop();
  },
  getGameObject: function (type) {
    if (type && typeof type === 'function') {
      for (var i = 0; i < this._gameObjects.length; i++) {
        var go = this._gameObjects[i];
        if (go instanceof type) {
          return go;
        }
      }
      throw new TypeError('Not found game object of type ' + type.name);
    } else {
      return this._gameObjects[0];
    }
  },
  getGameObjects: function (type) {
    if (type && typeof type === 'function') {
      var gos = [];
      this._gameObjects.forEach(function (go) {
        if (go instanceof type) {
          gos.push(go);
        }
      });
      return gos;
    } else {
      return this._gameObjects;
    }
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

var gameEngine = new GameEngine();

module.exports = gameEngine;
