var cellTypes = {
  WALL: 0,
  GRASS: 1,
  BRICK: 2,
  getCellType: function (num) {
    num = num || 0;
    
    for (var type in cellTypes) {
      if (cellTypes[type] === num) {
        return type;
      }
    }
  }
}

module.exports = cellTypes;
