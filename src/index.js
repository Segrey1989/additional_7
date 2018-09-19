module.exports = function solveSudoku(matrix) {
  fill_alone(matrix);

 var flag = false;
 do {
   flag = try_variant(matrix);
 } while (flag === false)

 return matrix;
}


// в матрице, где нет однозначных значений
// //подставляем случайные из тех, которые подходят,
// //если после этого 0 не остается - возвращаем true
function try_variant(matrix) {
 mat1 = [];
 matrix.forEach(function (subArray) {
   mat1.push(subArray.concat());
 });// копия матрицы

 var arr = []; // для хранения вариантов для ячейки
 var needToFeel = findSell(mat1);
 var size = needToFeel.length;
 for (var i = 0; i < size; i++) {
        var a = needToFeel[i][0];
        var b = needToFeel[i][1];
     if (mat1[a][b] === 0) {
       for (var num = 1; num <= 9; num++) {
         if (isValid(mat1, a, b, num))
           arr.push(num);
       }

       if (arr.length > 0) {
         var rand = Math.random() * arr.length;
         rand = Math.floor(rand);
         mat1[a][b] = arr[rand];
         fill_alone(mat1);
       }
     }
     arr = [];

 }
 //если в матрице остались 0 - значения неверны
 if (countZero(mat1) > 0) return false;
 else {
   matrix.splice(0, matrix.length);
   mat1.forEach(function (subArray) {
     matrix.push(subArray.concat());
   });
 }
 return true;

}

// заполнение ячеек с очевидными решениями
function fill_alone(matr) {

 var size = matr.length;
 var count1 = countZero(matr);
 var count2 = 0;
 var arr = [];
 while (count1 > count2) {
   count1 = count2;
   for (var i = 0; i < size; i++) {
     for (var j = 0; j < size; j++) {
       if (matr[i][j] === 0)
         for (var num = 1; num <= 9; num++) {
           if (isValid(matr, i, j, num))
             arr.push(num);
         }
       if (arr.length === 1) {
         matr[i][j] = arr[0];
         count2--;
       }
       arr = [];
     }
   }
 }
}

// проверка валидности ячейки
function isValid(mtx, i, j, num) {

  // в квадрате
 var length = 9;
 var i1, i2, j1, j2;
 if (i < 3) { i1 = 0; i2 = 3 }
 else if (i < 6) { i1 = 3; i2 = 6 }
 else { i1 = 6; i2 = 9 }


 if (j < 3) { j1 = 0; j2 = 3 }
 else if (j < 6) { j1 = 3; j2 = 6 }
 else { j1 = 6; j2 = 9 }

 for (let a = i1; a < i2; a++) {
   for (let b = j1; b < j2; b++) {
     if (mtx[a][b] == num)
       return false; //найдено совпадение
   }
 }
 // проверка строки
 for (let a = 0; a < length; a++)
   if (mtx[i][a] === num)
     return false;

 //проверка колонки
 for (let b = 0; b < length; b++)
   if (mtx[b][j] === num)
     return false;

 return true;

}

// подсчет количества нулей в матрице
function countZero(matrix) {
 var size = matrix.length;
 var count = 0;
 for (var i = 0; i < size; i++)
   for (var j = 0; j < size; j++)
     if (matrix[i][j] === 0)
       count++;
 return count;
}


// возвращает масси с координатами нулевых ячеек(не используется)
function findSell(matrix) {
 var coords = [];
 var size = matrix.length;
 for (var i = 0; i < size; i++)
   for (var j = 0; j < size; j++)
     if (matrix[i][j] === 0){
       coords.push([i, j]);
     }
 return coords;
}
