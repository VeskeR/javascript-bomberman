var gameEngine = require('../game-engine');

function GameObject() {
  this._timeCreated = Date.now();
  this._lastUpdate = this._timeCreated;
  this._lastUpdateDelta = 0;

  this._components = [];

  this._addToGameEngine();
}

GameObject.prototype = {
  addComponent: function (component) {
    if (component && typeof component === 'function') {
      this._components.push(new component(this));
    } else {
      throw new ReferenceError('GameObject: component parameter must be specified and it must be component constructor');
    }
  },
  removeComponent: function (component) {
    if (component && typeof component === 'function') {
      for (var i = 0; i < this._components.length; i++) {
        if (this._components[i] instanceof component) {
          this.removeComponentAt(i);
          break;
        }
      }
    } else {
      throw new ReferenceError('GameObject: component parameter must be specified and it must be component constructor');
    }
  },
  removeComponentAt: function (i) {
    if (!i) i = 0;
    if (this._components.length > 0) {
      var component = this._components.splice(i, 1)[0];
      component.destroy();
    }
  },
  getComponent: function (component) {
    if (component && typeof component === 'function') {
      for (var i = 0; i < this._components.length; i++) {
        var currComponent = this._components[i];
        if (currComponent instanceof component) {
          return currComponent;
        }
      }
    } else {
      throw new ReferenceError('GameObject: component parameter must be specified and it must be component constructor');
    }
  },
  getComponentAt: function (i) {
    if (!i) i = 0;
    return this._components[i];
  },
  getSecondsFromLastUpdate: function () {
    return this._lastUpdateDelta / 1000;
  },
  destroy: function () {
    while (this._components.length > 0) {
      this.removeComponentAt(0);
    }
    this._removeFromGameEngine();
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
