var Component = require('./component');

function Render(object, position) {
  Component.apply(this, Array.prototype.concat.apply(['Render'], arguments));
}

Render.prototype = Object.create(Component.prototype);
Render.prototype.constructor = Render;

$.extend(Render.prototype, {

});

module.exports = Render;
