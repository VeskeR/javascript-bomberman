var Render = require('./render');
var settings = require('./settings');

function RenderBomberman(object, target) {
  Render.call(this, 'RenderBomberman', object);

  var bomberman = $('<div></div>');
  bomberman.addClass('game-field__bomberman');

  this.setTarget(target);
  this.setElement(bomberman);

  this.appendElementToTarget();
  this.render(
    settings.gameFieldHeight,
    settings.gameFieldWidth,
    this._object.Transform.getPosition().x,
    this._object.Transform.getPosition().y,
    1,
    1
  );
}

RenderBomberman.prototype = Object.create(Render.prototype);
RenderBomberman.prototype.constructor = RenderBomberman;

$.extend(RenderBomberman.prototype, {

});

module.exports = RenderBomberman;
