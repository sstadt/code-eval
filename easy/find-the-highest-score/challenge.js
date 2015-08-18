
(function () {
    "use strict";

    /*
        The first argument is a path to a file. Each line includes 
        a test case with a table. Table rows are separated by pipes 
        '|'. All table rows contain scores for each category, so 
        all lines are of an equal length.

        For example:

        72 64 150 | 100 18 33 | 13 250 -6
        10 25 -30 44 | 5 16 70 8 | 13 1 31 12
        100 6 300 20 10 | 5 200 6 9 500 | 1 10 3 400 143

        OUTPUT SAMPLE:

        You need to print the highest score for each category.

        For example:

        100 250 150
        13 25 70 44
        100 200 300 400 500

    */

    var fs = [
        '72 64 150 | 100 18 33 | 13 250 -6',
        '10 25 -30 44 | 5 16 70 8 | 13 1 31 12',
        '100 6 300 20 10 | 5 200 6 9 500 | 1 10 3 400 143'
    ];

    fs.forEach(function (line) {
        var scoreCard = line.split(' | ').map(function (row) {
                return row.split(' ').map(parseFloat);
            }),
            output = '',
            colScores;

        for (var i = 0, j = scoreCard[0].length; i < j; i++) {
            colScores = [];

            for (var ii = 0, ij = scoreCard.length; ii < ij; ii++) {
                colScores.push(scoreCard[ii][i]);
            }

            output += Math.max.apply(null, colScores) + ' ';
        }

        console.log(output);
    });
}());
