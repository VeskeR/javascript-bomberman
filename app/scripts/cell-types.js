var CellTypes = {
  WALL: 0,
  GRASS: 1,
  BARRIER: 2,
  getCellTypeName: function (num) {
    num = num || 0;

    for (var typeName in CellTypes) {
      if (typeof typeName !== 'function' && CellTypes[typeName] === num) {
        return typeName;
      }
    }
  }
}

module.exports = CellTypes;
