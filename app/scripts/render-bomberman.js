var Render = require('./render');

function RenderBomberman(object, target) {
  Render.call(this, 'RenderBomberman', object);

  var bomberman = $('<div></div>');
  bomberman.addClass('game-field__bomberman');

  this.setTarget(target);
  this.setElement(bomberman);

  this.appendElementToTarget();
  this.render();
}

RenderBomberman.prototype = Object.create(Render.prototype);
RenderBomberman.prototype.constructor = RenderBomberman;

$.extend(RenderBomberman.prototype, {

});

module.exports = RenderBomberman;
