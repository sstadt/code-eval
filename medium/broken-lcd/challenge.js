
(function () {
    "use strict";

    /*
        You have a 12-digit LCD, each digit consists of 8 segments: 7 segments to display
        numbers and one segment to display a decimal mark:

         1
        6 2
         7
        5 3
         4 8

        The number in each digit is displayed by turning segments on or off. It can be
        represented as a binary 8-bit number, each bit of which is a segment, ordered in
        the following binary representation:

        |_|    01100111
          |    12345678

        For example, number ‘4.’ (with the decimal mark turned on) corresponds to the
        following binary representation:

        Some segments of the display are damaged and are always turned off. Your task is to
        determine whether a given number can be displayed on the damaged LCD. You can start
        displaying the number with the arbitrary digit of the LCD.

        INPUT SAMPLE:

        The first argument is a filename. Each line of the file contains binary 8-bit numbers,
        which represents the state of the segments, starting from the most left digit, and the
        number that you must show on the display. The binary numbers are separated by spaces,
        the number to display is separated by a semicolon.

        For example:

        10110001 11111000 11111110 11111111 11111111 11111111 11111111 11101101 11111111 01111111 11110010 10100111;84.525784
        11111111 11110110 11101111 11110111 10111110 11110110 10111011 10100111 11111100 01100100 11111101 01011110;5.57
        11000010 00001111 11111111 10111111 11101011 11110011 01111110 11011111 11111111 11111111 11111001 01101110;857.71284
        11111111 01110111 10111011 11001101 11111011 11101010 11110100 01001101 11011111 11111010 10010110 10111111;66.92
        11111011 10010001 11111011 11111101 10011111 10111110 01111100 11011101 10111001 11111110 11101111 11110110;188.87

        Every binary number represents the state of the segments in one digit. 1 means that a
        segment is working and can be turned on or off, 0 means that a segment is damaged and
        is always turned off.

        OUTPUT SAMPLE:

        Print to stdout 1 for each test case if the number can be displayed on a given LCD, or
        0 – if the number cannot be displayed. Print out one number in a line.

        For example:

        1
        1
        1
        0
        0
    */

    var fs = [
        '10110001 11111000 11111110 11111111 11111111 11111111 11111111 11101101 11111111 01111111 11110010 10100111;84.525784',
        '11111111 11110110 11101111 11110111 10111110 11110110 10111011 10100111 11111100 01100100 11111101 01011110;5.57',
        '11000010 00001111 11111111 10111111 11101011 11110011 01111110 11011111 11111111 11111111 11111001 01101110;857.71284',
        '11111111 01110111 10111011 11001101 11111011 11101010 11110100 01001101 11011111 11111010 10010110 10111111;66.92',
        '11111011 10010001 11111011 11111101 10011111 10111110 01111100 11011101 10111001 11111110 11101111 11110110;188.87'
    ];

    function Digit(binary) {
        this.positions = binary.split('').map(parseFloat);
        this.numMap = {
            '0': [1, 2, 3, 4, 5, 6],
            '1': [2, 3],
            '2': [1, 2, 4, 5, 7],
            '3': [1, 2, 3, 4, 7],
            '4': [2, 3, 6, 7],
            '5': [1, 3, 4, 6, 7],
            '6': [1, 3, 4, 5, 6, 7],
            '7': [1, 2, 3],
            '8': [1, 2, 3, 4, 5, 6, 7],
            '9': [1, 2, 3, 4, 6, 7]
        };
    }

    Digit.prototype.canDisplayDigit = function (digit) {
        var ok = true,
            position;

        if (digit.length > 1 && this.positions[7] === 0) {
            return false;
        }

        digit = (digit.length > 1) ? parseInt(digit.charAt(0), 10) : parseInt(digit, 10);

        for (var i = 0, j = this.numMap[digit].length; i < j; i++) {
            position = this.numMap[digit][i] - 1;

            if (this.positions[position] === 0) {
                ok = false;
                break;
            }
        }

        return ok;
    };

    function Led(status) {
        var newDigits = status.split(' ');

        this.digits = [];

        for (var i = 0, j = newDigits.length; i < j; i++) {
            this.digits.push(new Digit(newDigits[i]));
        }
    }

    Led.prototype.canDisplayNumber = function (num) {
        var nums = num.match(/[0-9](\.)?/g),
            ok;

        console.log(this.digits);
        console.log('  ' + JSON.stringify(nums));

        for (var start = 0, lastStart = this.digits.length - nums.length; start < lastStart; start++) {
            console.log('    starting at ' + start);
            ok = true;

            for (var i = 0, j = nums.length; i < j; i++) {
                console.log('    checking digit ' + nums[i] + ' against ' + this.digits[start + i].positions);
                if (!this.digits[start + i].canDisplayDigit(nums[i])) {
                    ok = false;
                    break;
                }
            }

            if (ok) break;
        }

        return ok;
    };

    fs.forEach(function (line) {
        var lineWithDecimal = (line.indexOf('.') === -1) ? line + '.' : line,
            params = lineWithDecimal.split(';'),
            status = params[0],
            displayNum = params[1],
            display = new Led(status);

        console.log('checking display against ' + displayNum);
        console.log('-------------------------------------------');
        console.log(display.canDisplayNumber(displayNum) ? 1 : 0);
    });
}());
