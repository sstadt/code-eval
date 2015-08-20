
(function () {
    "use strict";

    /*
        In chess, the knight moves to any of the closest squares that are 
        not on the same rank, file, or diagonal. Thus the move is in the “L” 
        form: two squares vertically and one square horizontally, or two 
        squares horizontally and one square vertically:

        Your task is to find all possible positions for the next move of 
        the knight on the empty chessboard.

        INPUT SAMPLE:

        The first argument is a filename that contains positions of the 
        knight on the chessboard in the CN form, where:

        C is a letter from “a” to “h” and denotes a column.
        N is a number from 1 to 8 and denotes a row.
        Each position is indicated in a new line.

        For example:

        g2
        a1
        d6
        e5
        b1

        OUTPUT SAMPLE:

        Print to stdout all possible positions for the next move of the 
        knight ordered alphabetically.

        For example:

        e1 e3 f4 h4
        b3 c2
        b5 b7 c4 c8 e4 e8 f5 f7
        c4 c6 d3 d7 f3 f7 g4 g6
        a3 c3 d2
    */

    var chessBoardColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    var potentialMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

    var fs = [
        'g2',
        'a1',
        'd6',
        'e5',
        'b1'
    ];

    fs.forEach(function (line) {
        var startCol = chessBoardColumns.indexOf(line.split('')[0]) + 1,
            startRow = parseInt(line.split('')[1], 10),
            moves = [],
            output;

        for (var i = 0, j = potentialMoves.length; i < j; i++) {
            moves.push(getMove(startRow, startCol, potentialMoves[i][0], potentialMoves[i][1]));            
        }

        output = moves.sort(function (p, c) {
            if(p < c) return -1;
            if(p > c) return 1;
            return 0;
        }).filter(function (val) {
            return val !== 'invalid';
        }).join(' ');

        console.log(output);
    });

    function getMove(startX, startY, horizontalOffset, verticalOffset) {
        var newX = startX + horizontalOffset,
            newY = startY + verticalOffset;

        return (isValidPosition(newX, newY)) ? chessBoardColumns[newY - 1] + String(newX) : 'invalid'; 
    }

    function isValidPosition(x, y) {
        return (x > 0 && x < 9 && y > 0 && y < 9);
    }

}());
