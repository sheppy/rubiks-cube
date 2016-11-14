"use strict";

const FACE_WIDTH = 3;
const FACE_HEIGHT = 3;

class RubiksCubeFace {
    constructor(colour, orientation) {
        this.colour = colour;
        this.orientation = orientation;
        this.tiles = new Array(FACE_WIDTH * FACE_HEIGHT).fill(colour);
    }

    isComplete() {
        return this.tiles.every(tile => tile === this.colour);
    }

    getTileByRowCol(row, col) {
        return this.tiles[row * FACE_WIDTH + col];
    }

    getRow(row) {
        return this.tiles.slice(row * FACE_WIDTH, row * FACE_WIDTH + FACE_WIDTH);
    }

    getCol(col) {
        return this.tiles.filter(n => (n % FACE_WIDTH) === col);
    }
}


module.exports = RubiksCubeFace;
