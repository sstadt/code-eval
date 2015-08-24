
(function () {
    "use strict";

    /*
        Challenge Description
    */

    var fs = [
        '1,2,3,4,6;5',
        '2,4,5,6,9,11,15;20',
        '1,2,3,4;50'
    ];

    fs.forEach(function (line) {
        var params = line.split(';'),
            nums = params[0].split(',').map(parseFloat),
            sum = parseFloat(params[1]),
            pairs = [];

        for (var i = 0, j = nums.length - 1; i < j; i++) {
            for (var ii = i + 1, ij = nums.length; ii < ij; ii++) {
                if (nums[i] + nums[ii] === sum) {
                    pairs.push(nums[i] + ',' + nums[ii]);
                }
            }
        }

        console.log((pairs.length > 0) ? pairs.join(';') : 'NULL');
    });
}());
