

(function () {
    "use strict";

    /*
        Sudoku is a number-based logic puzzle. It typically comprises of a 9*9 
        grid with digits so that each column, each row and each of the nine 
        3*3 sub-grids that compose the grid contains all the digits from 1 to 9. 
        For this challenge, you will be given an N*N grid populated with numbers 
        from 1 through N and you have to determine if it is a valid sudoku 
        solution. You may assume that N will be either 4 or 9. The grid can be 
        divided into square regions of equal size, where the size of a region is 
        equal to the square root of a side of the entire grid. Thus for a 9*9 
        grid there would be 9 regions of size 3*3 each.

        INPUT SAMPLE:

        Your program should accept as its first argument a path to a filename. 
        Each line in this file contains the value of N, a semicolon and the sqaure 
        matrix of integers in row major form, comma delimited. E.g.

        4;1,4,2,3,2,3,1,4,4,2,3,1,3,1,4,2
        4;2,1,3,2,3,2,1,4,1,4,2,3,2,3,4,1

        OUTPUT SAMPLE:

        Print out True/False if the grid is a valid sudoku layout. E.g.

        True
        False
    */

    var fs = [
        '4;1,4,2,3,2,3,1,4,4,2,3,1,3,1,4,2',
        '4;2,1,3,2,3,2,1,4,1,4,2,3,2,3,4,1',
        '9;1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9'
    ];

    fs.forEach(function (line) {
        var params = line.split(';'),
            gridType = parseFloat(params[0]),
            regexStr = Array.apply(null, Array(gridType)).map(String.prototype.valueOf, '[^,]+'),
            regex = new RegExp(regexStr, 'g'),
            solution = params[1].match(regex).map(function (row) {
                return row.split(',').map(parseFloat);
            });

        console.log(checkSolution(solution));
    });

    function ucFirst(str) {
        str = String(str);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function checkSolution(solution) {
        return ucFirst(checkRows(solution) && checkCols(solution) && checkBlocks(solution));
    }

    function verifyBlock(arr) {
        var nums = [];

        for (var i = 0, j = arr.length; i < j; i++) {
            if (nums.indexOf(arr[i]) === -1) {
                nums.push(arr[i]);
            } else {
                return false;
            }
        }

        return true;
    }

    function checkRows(solution) {
        var valid;

        for (var i = 0, j = solution.length; i < j; i++) {
            valid = verifyBlock(solution[i]);

            if (!valid) {
                return false;
            }
        }

        return true;
    }

    function checkCols(solution) {
        var size = solution.length,
            colVals,
            valid;

        for (var col = 0; col < size; col++) {
            colVals = [];

            for (var row = 0; row < size; row++) {
                colVals.push(solution[row][col]);
            }

            valid = verifyBlock(colVals);

            if (!valid) return false;
        }

        return true;
    }

    function checkBlocks(solution) {
        var blockSize = Math.sqrt(solution.length),
            column = 0,
            square, row, valid;

        for (var block = 0, numBlocks = solution.length; block < numBlocks; block++) {
            square = [];
            row = Math.floor(block / blockSize);

            for (var i = row * blockSize, j = i + blockSize; i < j; i++) {
                for (var ii = column * blockSize, ij = ii + blockSize; ii < ij; ii++) {
                    square.push(solution[i][ii]);
                }
            }

            column++;
            if (column >= blockSize) column = 0;

            valid = verifyBlock(square);

            if (!valid) return false;
        }

        return true;
    }

}());


