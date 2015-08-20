
(function () {
    "use strict";

    /*
        Given two axis aligned rectangles A and B, determine if the 
        two overlap. The rectangles considered overlapping if they 
        have at least one common point.

        INPUT SAMPLE:

        Your program should accept as its first argument a path to a 
        filename. Each line in this file contains 8 comma separated 
        co-ordinates. The co-ordinates are upper left x of A, upper 
        left y of A, lower right x of A, lower right y of A, upper 
        left x of B, upper left y of B, lower right x of B, lower 
        right y of B. E.g.

        -3,3,-1,1,1,-1,3,-3
        -3,3,-1,1,-2,4,2,2

        OUTPUT SAMPLE:

        Print out True or False if A and B intersect. E.g.

        False
        True
    */

    var fs = [
        '-3,3,-1,1,1,-1,3,-3',
        '-3,3,-1,1,-2,4,2,2',
        '-1,1,1,-1,-2,2,0,0',
    ];

    function Rectangle(left, top, right, bottom) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }

    Rectangle.prototype.contains = function (y, x) {
        console.log('checking point ' + x + ', ' + y);
        return (x >= this.left && x <= this.right && y >= this.bottom && y <= this.top);
    }

    Rectangle.prototype.overlapsRect = function (rect) {
        console.log('this: ', this);
        console.log('rect: ', rect);
        return (this.contains(rect.top, rect.left) || this.contains(rect.top, rect.right) || this.contains(rect.bottom, rect.left) || this.contains(rect.bottom, rect.right));
    }

    fs.forEach(function (line) {
        var params = line.split(',').map(parseFloat),
            rect1 = new Rectangle(params[0], params[1], params[2], params[3]),
            rect2 = new Rectangle(params[4], params[5], params[6], params[7]),
            output = (rect1.overlapsRect(rect2)) ? 'True' : 'False';

        console.log(output);
        console.log('-------------------');
    });

}());
