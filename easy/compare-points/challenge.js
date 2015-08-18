
(function () {
    "use strict";

    /*
        Bob's hiking club is lost in the mountains on the way to a scenic overlook. 
        Fortunately, Bob has a GPS device, so that he can see the coordinates where 
        the group is currently at. The GPS gives the current X/Y coordinates as O, P, 
        and the scenic overlook is located at Q, R. Bob now just needs to tell the 
        group which way to go so they can get to the overlook in time for s'mores.

        INPUT SAMPLE:

        The input is a file with each line representing a test case. Each test case 
        consists of four integers O, P, Q, R on a line, separated by spaces.

        0 0 1 5
        12 13 12 13
        0 1 0 5

        OUTPUT SAMPLE:

        For each test case print a line containing one of the following: N, NE, E, 
        SE, S, SW, W, NW, here if the coordinates Q, R are (respectively) north, 
        northeast, east, southeast, south, southwest, west, northwest, or already at 
        ("here") the coordinates O, P. Note that N, S, E and W mean directly North, 
        South, East or West respectively, i.e. X or Y coordinates of two points are 
        exactly the same. In all other cases your output should be one of the NW, 
        NE, SW, SE or here.

        NE
        here
        N
    */
   

    var fs = [
        '-9600 -950 -9600 -7980', // S
        '990 3945 5478 3945',     // E
        '-8343 -7063 -1338 8181', // NE
        '-3674 6231 -5767 -9086', // SW
        '-6258 5310 2673 6763',   // NE
        '-6672 5527 -6672 1593',  // S
        '-1877 -326 -1877 -8029', // S
        '8448 -2999 -2298 7578',  // NW
        '-3538 8179 -2460 8179',  // E 
        '-8712 7840 5580 3909',   // SE
        '381 -8571 5368 -8571',   // E
        '-4675 8203 -4675 8203',  // here
        '-4784 8406 2364 8406',   // E
        '7052 6935 7052 6935',    // here
        '-6151 3765 -6151 3765',  // here
        '9234 7360 6652 3709',    // SW
        '6067 1558 -7060 -4983',  // SW
        '-983 6455 -983 6455',    // here
        '-4090 -914 -4090 -4802', // S
        '769 -2776 769 6308',     // N
        '-7118 3179 -4353 9686',  // NE
        '-2385 -1805 -2385 -5069',// S
        '-1820 -7150 -1820 -7903',// S
        '7535 -2271 7535 -2271',  // here
        '7024 -2901 7024 -692',   // N
        '-7512 -4791 9556 8393',  // NE
        '-2544 -9505 2436 -9505', // E
        '-1412 -5067 -1412 -5067',// here
        '-7008 -2749 -7008 -3946',// S
        '1087 9065 6043 9065',    // E
        '355 5894 355 5894',      // here
        '7164 1887 9176 1887',    // E
        '-2343 -3636 -2343 3389', // N
        '-2801 8465 -2801 -9178', // S
        '-2909 8759 -7574 -1005', // SW
        '-982 -2243 -982 -2243',  // here
        '-4760 379 -5419 8205',   // NW
        '4414 -852 -648 -852',    // W
        '6198 6756 1672 252',     // SW
        '-7976 7123 -7976 5561'   // S   ^ checked ^
    ];

    // var fs = [
    //     '0 0 1 5',
    //     '12 13 12 13',
    //     '0 1 0 5'
    // ];

    fs.forEach(function (line) {
        var coords = line.split(' ').map(parseFloat),
            o = coords[1],
            p = coords[0],
            q = coords[3],
            r = coords[2],
            output = '',
            x, y;

        x = getX(o, q);
        y = getY(p, r);

        if (x === 'here' && y === 'here') {
            output = x;
        } else if (x === 'here') {
            output = y;
        } else if (y === 'here') {
            output = x;
        } else {
            output = x + y;
        }

        console.log(output);
    });

    function getX(start, end) {
        if (start === end) {
            return 'here';
        }

        return (start < end) ? 'N' : 'S';
    }

    function getY(start, end) {
        if (start === end) {
            return 'here';
        }

        return (start < end) ? 'E' : 'W';
    }

}());
