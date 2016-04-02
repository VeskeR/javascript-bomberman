var gameFieldTarget = $('.game-field-wrapper');

var settings = {
  gameFieldTarget: gameFieldTarget,
  cellTypes: {
    WALL: 0,
    GRASS: 1,
    BARRIER: 2,
    getCellTypeName: function (num) {
      num = num || 0;

      for (var typeName in this) {
        if (typeof typeName !== 'function' && this[typeName] === num) {
          return typeName;
        }
      }
    }
  }
};

module.exports = settings;
