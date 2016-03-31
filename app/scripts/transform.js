var asTransform = (function() {
  function move(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
  }

  return function() {
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.move = move;

    return this;
  };
})();

module.exports = asTransform;
