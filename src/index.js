module.exports = function solveSudoku(matrix) {
    if (try_to_solve(matrix)) {
      return matrix;
    }
    return false;
  }

// возвращаем все значения строки
  function getRowValues(row_index, matrix) {
  //return Array.from(new Set(matrix[row_index]));
  return [...new Set(matrix[row_index])];
}

// возвращаем все значения колонки
function getColumnValues(column_index, matrix) {
  var col_values = [];
  for (let i = 0; i < 9; i++)
    col_values[i] = matrix[i][column_index];
  return col_values;
}

// возвращаем все значения блока
function getBlockValues(row_index, column_index, matrix) {
  var values = [];
  var rows = 3 * (Math.floor(row_index / 3));
  var cols = 3 * (Math.floor(column_index / 3));
  for (let r = 0; r < 3; ++r) {
    for (let c = 0; c < 3; ++c) {
      values.push(matrix[rows + r][cols + c]);
    }
  }
  return values;
}

// возвращаем массив унмкальных значений, валидных для ячейки
function findValues(row_index, column_index, matrix) {
  var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var values = [...getRowValues(row_index, matrix), ...getColumnValues(column_index, matrix), ...getBlockValues(row_index, column_index, matrix)];

  return array.filter(x => values.indexOf(x) == -1)

}

// поиск решения
function try_to_solve(matrix) {
  var minRow = -1;
  var minColumn = -1;
  var minValues = [];
  while (true) {
    minRow = -1;

    for (var row_index = 0; row_index < 9; ++row_index) {
      for (var column_index = 0; column_index < 9; ++column_index) {

        // ячейка не 0
        if (matrix[row_index][column_index] !== 0) {
          continue;
        }
        // если нет подходящих значений - нельзя решить
        var possibleValues = findValues(row_index, column_index, matrix)
        var possibleValueCount = possibleValues.length;
        if (possibleValueCount === 0) {
          return false;
        }

        // если одно значение - вставляем
        if (possibleValueCount === 1) {
          matrix[row_index][column_index] = possibleValues[0];
        }

        if (minRow < 0 || possibleValueCount < minValues.length) {
          minRow = row_index;
          minColumn = column_index;
          minValues = possibleValues;

        }
      }
    }

    if (minRow == -1) {
      return true;
    }
    else if (1 < minValues.length) {
      break;
    }
  }

  for (var i = 0; i < minValues.length; i++) {
    var mtxCopy = [];
    matrix.forEach(function (subArray) {
      mtxCopy.push(subArray.concat());
    });// копия матрицы
    mtxCopy[minRow][minColumn] = minValues[i];

    if (try_to_solve(mtxCopy)) {
      matrix.splice(0, matrix.length);
        mtxCopy.forEach(function (subArray) {
      matrix.push(subArray.concat());
    });

      return true;
    }
  }
  return false;
}
