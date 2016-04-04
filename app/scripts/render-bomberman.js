var Render = require('./render');
var settings = require('./settings');

function RenderBomberman(object) {
  Render.call(this, 'RenderBomberman', object);

  var bomberman = $('<div></div>');
  bomberman.addClass('game-field__bomberman');

  this.setTarget(settings.gameField);
  this.setElement(bomberman);

  this.appendElementToTarget();
  this.render();
}

RenderBomberman.prototype = Object.create(Render.prototype);
RenderBomberman.prototype.constructor = RenderBomberman;

$.extend(RenderBomberman.prototype, {
  render: function () {
    Render.prototype.render.call(
      this,
      settings.gameFieldHeight,
      settings.gameFieldWidth,
      this._object.Transform.getPosition().x,
      this._object.Transform.getPosition().y,
      1,
      1
    )
  },
  update: function () {
    this._update();
    this.render();
  }
});

module.exports = RenderBomberman;
