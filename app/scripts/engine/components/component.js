var GameObject = require('../core/game-object');

function Component(name, object) {
  GameObject.apply(this, arguments);

  if (name && typeof name === 'string') {
    this._name = name;
  } else {
    throw new TypeError('Component: name of component must be specified.');
  }
  if (object && typeof object === 'object') {
    this._object = object;
  } else {
    throw new TypeError('Component ' + this._name + ': object to inject component into must be specified.');
  }

  this._object[this._name] = this;
}

Component.prototype = Object.create(GameObject.prototype);
Component.prototype.constructor = Component;

$.extend(Component.prototype, {
  destroy: function () {
    GameObject.prototype.destroy.apply(this, arguments);
    delete this._object[this._name];
  }
});

module.exports = Component;
