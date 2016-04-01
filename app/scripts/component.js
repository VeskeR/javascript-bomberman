function Component(name, object) {
  this._name = name;
  this._controller();
}

$.extend(Component.prototype, {
  _controller: function () {
    object[this._name] = this;
  }
});

module.exports = Component;
