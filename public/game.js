function Game(width, height) {
    this.width = width;
    this.height = height;
    this.ctx = document.getElementById("gameCanvas").getContext("2d");

    //border on the sides of the board
    this.border = 40;

    //the distance x or y between two pieces
    this.pieceDistance = Math.round(Math.min((this.width - this.border * 2)/8, (this.height - this.border * 2) / 4));

    //piece settings
    this.blackPieceColor = "#483C32";
    this.whitePieceColor = "#E3DAC9";
    this.pieceRadius = Math.round(this.pieceDistance / 4);

    //piece array. 0 = empty, 1 = black, 2 = white
    this.pieces = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 2, 1, 0, 2, 1, 2, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2]
    ];
}

Game.prototype.start = function() {
    this.interval = setInterval(this.update.bind(this), 20);
    this.update();
}

Game.prototype.update = function() {
    this.clear();
    this.drawBoard();

    for(var x = 0; x < 9; x++) {
        for(var y = 0; y < 5; y++) {
            if (this.pieces[y][x] == 0) continue;
            this.drawPiece(x, y, this.pieces[y][x] == 1);
        }
    }
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

Game.prototype.drawBoard = function() {
    //draw the brown underboard
    this.ctx.fillStyle = "#E6BF83";
    this.ctx.fillRect(0, 0, this.width, this.height);

    //set the width and color of the lines we will draw in the board
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#A0793D";

    //draw horizontal and vertical lines using rectancles
    for(var x = 0; x < 8; x++) {
        for(var y = 0; y < 4; y++) {
            this.ctx.strokeRect(this.border + x * this.pieceDistance, this.border + y * this.pieceDistance, this.pieceDistance, this.pieceDistance);
        }
    }

    //draw diagonal lines
    for(var x = 0; x < 4; x++) {
        for(var y = 0; y < 2; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.border + this.pieceDistance * 2 * x, this.border + this.pieceDistance * 2 * y);
            this.ctx.lineTo(this.border + this.pieceDistance * 2 * (x+1), this.border + this.pieceDistance * 2 * (y+1));
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.border + this.pieceDistance * 2 * (x+1), this.border + this.pieceDistance * 2 * y);
            this.ctx.lineTo(this.border + this.pieceDistance * 2 * x, this.border + this.pieceDistance * 2 * (y+1));
            this.ctx.stroke();
        }
    }
}

Game.prototype.drawPiece = function(x, y, isBlack) {
    var pieceColor = isBlack ? this.blackPieceColor : this.whitePieceColor;

    this.ctx.beginPath();
    
    //the circle
    this.ctx.arc(this.border + this.pieceDistance * x, this.border + this.pieceDistance * y, this.pieceRadius, 0, 2 * Math.PI, false);
    
    //fill the circle with piece color
    this.ctx.fillStyle = pieceColor;
    this.ctx.fill();
    
    //black outline for the circle
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
}