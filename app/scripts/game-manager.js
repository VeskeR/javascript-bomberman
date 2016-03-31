function GameManager() {
  this._gameObjects = [];

  this._fps = 60;
  this._frameTickCount = 1000 / this._fps;

  this._timeCreated = 0;
  this._lastUpdate = 0;
  this._lastUpdateDelta = 0;

  this._controller();
}

GameManager.prototype = {
  addGameObject: function (object) {
    this._gameObjects.push(object);
  },
  removeGameObject: function (object) {
    this._gameObjects.splice(this._gameObjects.indexOf(object), 1);
  },
  _controller: function () {
    this._timeCreated = Date.now();
    this._lastUpdate = this._timeCreated;

    this._initGameLoop();
  },
  _initGameLoop: function () {
    this._update();
  },
  _update: function () {
    var self = this;

    var currentTime = Date.now();
    self._lastUpdateDelta = currentTime - self._lastUpdate;

    var delta = this._frameTickCount - this._lastUpdateDelta;
    delta = delta < 0 ? 0 : delta;

    setTimeout(function () {
      self._lastUpdate = Date.now();
      self._gameObjects.forEach(function (go) {
        go.update();
      });
      self._update();
    }, delta);
  }
};

var gameManager = new GameManager();

module.exports = gameManager;
