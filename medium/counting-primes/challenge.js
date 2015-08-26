

(function () {
    "use strict";

    /*
        Given two integers N and M, count the number of prime numbers between N and M (both inclusive)
    */

    var fs = [
        '2,10',
        '20,30'
    ];

    fs.forEach(function (line) {
        var params = line.split(',').map(parseFloat),
            count = 0;

        for (var min = params[0], max = params[1]; min <= max; min++) {
            if (isPrime(min)) count++;
        }

        console.log(count);
    });

    function isPrime (number) {
        var start = 2;
        while (start <= Math.sqrt(number)) {
            if (number % start++ < 1) return false;
        }
        return number > 1;
    }

}());


