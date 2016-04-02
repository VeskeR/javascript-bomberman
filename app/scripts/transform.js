var Component = require('./component');

function Transform(object, position) {
  Component.call(this, 'Transform', object);

  position = position || {};

  this._position = {
    x: position.x || 0,
    y: position.y || 0,
    z: position.z || 0
  }
}

Transform.prototype = Object.create(Component.prototype);
Transform.prototype.constructor = Transform;

$.extend(Transform.prototype, {
  getPosition: function () {
    return this._position;
  },
  setPosition: function (newPosition) {
    newPosition = newPosition || {};

    this._position.x = newPosition.x || 0;
    this._position.y = newPosition.y || 0;
    this._position.z = newPosition.z || 0;
  },
  move: function (vector) {
    vector = vector || {};

    this._position.x += vector.x || 0;
    this._position.y += vector.y || 0;
    this._position.z += vector.z || 0;
  }
});

module.exports = Transform;
