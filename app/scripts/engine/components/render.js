var Component = require('./component');

function Render(object) {
  Component.call(this, 'Render', object);

  this._target = null;
  this._element = null;
}

Render.prototype = Object.create(Component.prototype);
Render.prototype.constructor = Render;

$.extend(Render.prototype, {
  getTarget: function () {
    return this._target;
  },
  setTarget: function (newTarget) {
    this._target = newTarget || $('body');
  },
  getElement: function () {
    return this._element;
  },
  setElement: function (newElement) {
    this._element = newElement || $('<div></div>');
    this._configureElement();
  },
  appendElementToTarget: function () {
    this._target.append(this._element);
  },
  removeElementFromTarget: function () {
    this._element.remove();
  },
  render: function (n, m, x, y, w, h) {
    n = n || 1;
    m = m || 1;
    if (!x) x = 0;
    if (!y) y = 0;
    w = w || 1;
    h = h || 1;

    this._element.css({
      left: x / m * 100 + '%',
      top: y / n * 100 + '%',
      width: w * 100 / m + '%',
      height:  h * 100 / n + '%'
    });
  },
  destroy: function () {
    Component.prototype.destroy.apply(this, arguments);
    this.removeElementFromTarget();
  },
  _configureElement: function () {
    this._element.css({
      position: 'absolute',
      left: 0,
      top: 0,
      width: 0,
      height: 0
    });
  }
});

module.exports = Render;
