var Component = require('./component');

function Transform(object, position) {
  Component.apply(this, Array.prototype.concat.apply(['Transform'], arguments));

  position = position || {};

  this.position = {
    x: position.x || 0,
    y: position.y || 0,
    z: position.z || 0,
  }
}

Transform.prototype = Object.create(Component.prototype);
Transform.prototype.constructor = Component;

$.extend(Transform.prototype, {
  move: function (vector) {
    this.position.x += vector.x;
    this.position.y += vector.y;
    this.position.z += vector.z;
  }
});

module.exports = Transform;
