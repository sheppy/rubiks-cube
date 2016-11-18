"use strict";

const FACE_WIDTH = 3;
const FACE_HEIGHT = 3;


class RubiksCubeFace {
    /**
     * Create the face with the given colour.
     *
     * @param {string} colour
     */
    constructor(colour) {
        this.colour = colour;
        this.tiles = new Array(FACE_WIDTH * FACE_HEIGHT).fill(colour);
    }

    /**
     * Check if the face is complete.
     *
     * @returns {boolean}
     */
    isComplete() {
        return this.tiles.every(tile => tile === this.colour);
    }

    /**
     * Gets the tile at row x col.
     *
     * @param {number} row
     * @param {number} col
     * @returns {string}
     */
    getTileByRowCol(row, col) {
        return this.tiles[row * FACE_WIDTH + col];
    }

    /**
     * Sets the tile at row x col.
     *
     * @param {number} row
     * @param {number} col
     * @param {string} colour
     */
    setTileByRowCol(row, col, colour) {
        this.tiles[row * FACE_WIDTH + col] = colour;
    }

    /**
     * Gets the given row.
     *
     * @param {number} row
     * @returns {string[]}
     */
    getRow(row) {
        return this.tiles.slice(row * FACE_WIDTH, row * FACE_WIDTH + FACE_WIDTH);
    }

    /**
     * Sets the given row.
     *
     * @param {number} rowIndex
     * @param {string[]} row
     */
    setRow(rowIndex, row) {
        for (let i = 0; i < 3; i++) {
            this.tiles[(rowIndex * FACE_WIDTH) + i] = row[i]
        }
    }

    /**
     * Gets the given column.
     *
     * @param {number} col
     * @returns {string[]}
     */
    getCol(col) {
        return this.tiles.filter((c, n) => (n % FACE_WIDTH) === col);
    }

    /**
     * Sets the given column.
     *
     * @param {number} colIndex
     * @param {string[]} col
     */
    setCol(colIndex, col) {
        for (let i = 0; i < 3; i++) {
            this.tiles[i * FACE_WIDTH + colIndex] = col[i];
        }
    }

    rotateClockwise() {
        // Transpose
        this.tiles = this.tiles.map((c, n) => {
            let row = Math.floor(n / FACE_WIDTH);
            let col = (n % FACE_WIDTH);
            return this.tiles[row + col * FACE_WIDTH];
        });

        // Reverse each row
        this.tiles = this.tiles.map((c, n) => {
            if (n % 3 === 0) {
                return this.tiles[n + 2];
            }

            if (n % 3 - 2 === 0) {
                return this.tiles[n - 2];
            }

            return this.tiles[n];
        });
    }

    rotateCounterClockwise() {
        // Transpose
        this.tiles = this.tiles.map((c, n) => {
            let row = Math.floor(n / FACE_WIDTH);
            let col = (n % FACE_WIDTH);
            return this.tiles[row + col * FACE_WIDTH];
        });

        // Reverse each column
        this.tiles = this.tiles.map((c, n) => {
            if (n <= 2) {
                return this.tiles[n + 6];
            }

            if (n >= 6) {
                return this.tiles[n - 6];
            }

            return this.tiles[n];
        });
    }

    clone() {
        let clone = new RubiksCubeFace(this.colour);
        clone.tiles = this.tiles.slice(0);
        return clone;
    }

    transposeRowToColumn(rowIndex, colIndex, face, reverse) {
        let row = face.getRow(rowIndex);
        if (reverse) {
            row.reverse();
        }
        this.setCol(colIndex, row);
    }

    transposeColumnToRow(colIndex, rowIndex, face, reverse) {
        let col = face.getCol(colIndex);
        if (reverse) {
            col.reverse();
        }

        this.setRow(rowIndex, col);
    }
}


module.exports = RubiksCubeFace;
