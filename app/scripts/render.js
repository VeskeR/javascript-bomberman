var Component = require('./component');

function Render(object, target, element) {
  Component.apply(this, Array.prototype.concat.apply(['Render'], arguments));

  this._target = target || $('body');
  this._element = element || $('<div></div>');

  this._configureElement();
  this._appendElementToTarget();
}

Render.prototype = Object.create(Component.prototype);
Render.prototype.constructor = Render;

$.extend(Render.prototype, {
  render: function (n, m, i, j) {
    this._element.css({
      left: i / n + '%',
      top: j / m + '%'
    });
  },
  _configureElement: function () {
    this._element.css({
      position: 'absolute',
      left: 0,
      top: 0
    });
  },
  _appendElementToTarget: function () {
    this._target.append(this._element);
  }
});

module.exports = Render;
