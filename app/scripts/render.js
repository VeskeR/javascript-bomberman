var Component = require('./component');

function Render(name, object) {
  Component.call(this, name || 'Render', object);

  this._target = null;
  this._element = null;
}

Render.prototype = Object.create(Component.prototype);
Render.prototype.constructor = Render;

$.extend(Render.prototype, {
  setTarget: function (newTarget) {
    this._target = newTarget || $('body');
  },
  getTarget: function () {
    return this._target;
  },
  setElement: function (newElement) {
    this._element = newElement || $('<div></div>');
    this._configureElement();
  },
  getElement: function () {
    return this._element;
  },
  appendElementToTarget: function () {
    this._target.append(this._element);
  },
  removeElementFromTarget: function () {
    this._element.remove();
  },
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
  }
});

module.exports = Render;
