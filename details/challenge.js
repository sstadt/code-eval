(function () {
    'use strict';

    /*
        There are two details on a M*N checkered field. The detail X covers several (at least 
        one first cell) cells in each line. The detail Y covers several (at least one last cell) 
        cells. Each cell is either fully covered with a detail or not.

        For example:

        Also, the details may have cavities (or other complex structures). Please see example 
        below (the detail Y is one detail):

        The detail Y starts moving left (without any turn) until it bumps into the X detail at 
        least with one cell. Determine by how many cells the detail Y will be moved.

        https://www.codeeval.com/open_challenges/183/
    */

    var fs = [
        'XX.YY,XXX.Y,X..YY,XX..Y',
        'XXX.YYYY,X...Y..Y,XX..YYYY,X.....YY,XX....YY',
        'XX...YY,X....YY,XX..YYY,X..YYYY',
        'XXYY,X..Y,XX.Y'
    ];

    fs.forEach(function (line) {
        var spaces = [],
            minSpaces = [],
            matrix = line.split(',').map(function (l) {
                return l.split('');
            }),
            output = '';

        for (var i = 0, j = matrix.length; i < j; i++) {
            spaces.push(getNumShifts(matrix[i]));
        }

        minSpaces = Math.min.apply(null, spaces);

        console.log(minSpaces);
    });

    function getNumShifts(row) {
        var xPos = 0,
            distance = 0;

        for (var i = 0, j = row.length; i < j; i++) {
            if (row[i] === 'X') {
                xPos = i;
            } else if (row[i] === 'Y') {
                distance = i - xPos;
                break;
            }
        }

        return distance - 1;
    }

}());
