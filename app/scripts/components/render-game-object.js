var Render = require('../engine/components/render');

var settings = require('../controls/settings');

function RenderGameObject(object) {
  Render.call(this, object);

  var gameObject = $('<div></div>');
  gameObject.addClass('game-field__game-object');

  this.setTarget(settings.gameField);
  this.setElement(gameObject);

  this.appendElementToTarget();
  this.render();
}

RenderGameObject.prototype = Object.create(Render.prototype);
RenderGameObject.prototype.constructor = RenderGameObject;

$.extend(RenderGameObject.prototype, {
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

module.exports = RenderGameObject;
