var gameField = $('.game-field');

var settings = {
  gameField: gameField,
  gameFieldWidth: 17,
  gameFieldHeight: 17,
  spawnPositions: [
    function () { return { x: 1, y: 1 }},
    function () { return { x: 1, y: settings.gameFieldWidth - 2 }},
    function () { return { x: settings.gameFieldHeight - 2, y: 1 }},
    function () { return { x: settings.gameFieldHeight - 2, y: settings.gameFieldWidth - 2 }}
  ],
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
