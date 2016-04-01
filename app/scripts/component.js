var GameObject = require('./game-object');

function Component(name, object) {
  if (name && typeof name === 'string') {
    this._name = name;
  } else {
    throw new TypeError('Component: name of component must be specified.');
  }
  if (object && typeof object === 'object') {
    this._object = object;
  } else {
    throw new TypeError('Component: object to inject component into must be specified.');
  }

  this._controller();
}

Component.prototype = Object.create(GameObject.prototype);
Component.prototype.constructor = Component;

$.extend(Component.prototype, {
  destroy: function () {
    GameObject.prototype.destroy.apply(this, arguments);
    delete this._object[this._name];
  },
  _controller: function () {
    GameObject.prototype._controller.apply(this, arguments);
    this._object[this._name] = this;
  }
});

module.exports = Component;
