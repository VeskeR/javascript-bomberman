var RenderGameObject = require('./render-game-object');
var settings = require('./settings');

function RenderBomberman(object) {
  RenderGameObject.call(this, object);

  this.getElement().addClass('game-field__bomberman');
}

RenderBomberman.prototype = Object.create(RenderGameObject.prototype);
RenderBomberman.prototype.constructor = RenderBomberman;

$.extend(RenderBomberman.prototype, {

});

module.exports = RenderBomberman;
