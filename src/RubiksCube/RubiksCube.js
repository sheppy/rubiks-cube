"use strict";


const RubiksCubeFace = require("./RubiksCubeFace");

/**
 * The Rubiks Cube colours.
 *
 * @readonly
 * @enum {string}
 */
const RUBIKS_COLOURS = {
    GREEN: "G",
    WHITE: "W",
    RED: "R",
    YELLOW: "Y",
    BLUE: "B",
    ORANGE: "O"
};

const FACE_COLOUR = {
    GREEN: 0,
    YELLOW: 1,
    ORANGE: 2,
    WHITE: 3,
    BLUE: 4,
    RED: 5
};

const FACE_DIRECTION = {
    LEFT: 0,
    UP: 1,
    FRONT: 2,
    DOWN: 3,
    RIGHT: 4,
    BACK: 5
};

const RUBIKS_TURNS = {
    F: 0,
    R: 1,
    U: 2,
    B: 3,
    L: 4,
    D: 5,
    FI: 6,
    RI: 7,
    UI: 8,
    BI: 9,
    LI: 10,
    DI: 11
};


class RubiksCube {
    constructor() {
        this.faces = this._createFaces();
    }

    /**
     * Create all six sides of the cube.
     *
     * @returns {RubiksCubeFace[]}
     * @private
     */
    _createFaces() {
        /*
            [1]
         [0][2][4][5]
            [3]

            [Y]
         [G][O][B][R]
            [W]
         */
        return [
            new RubiksCubeFace(RUBIKS_COLOURS.GREEN),
            new RubiksCubeFace(RUBIKS_COLOURS.YELLOW),
            new RubiksCubeFace(RUBIKS_COLOURS.ORANGE),
            new RubiksCubeFace(RUBIKS_COLOURS.WHITE),
            new RubiksCubeFace(RUBIKS_COLOURS.BLUE),
            new RubiksCubeFace(RUBIKS_COLOURS.RED)
        ];
    }

    /**
     * Checks if the whole cube is complete.
     *
     * @returns {boolean}
     */
    isComplete() {
        return this.faces.every(face => face.isComplete());
    }

    /**
     *
     * @returns {RubiksCubeFace[]}
     */
    cloneFaces() {
        return this.faces.map(face => face.clone());
    }

    turnFaceClockwise() {

    }

    turnFaceCounterClockwise() {

    }

    turnL() {
        this.faces[FACE_COLOUR.GREEN].rotateClockwise();

        let faces = this.cloneFaces();

        this.faces[1].setCol(0, faces[5].getCol(2).reverse());
        this.faces[2].setCol(0, faces[1].getCol(0));
        this.faces[3].setCol(0, faces[2].getCol(0));
        this.faces[5].setCol(2, faces[3].getCol(0).reverse());
    }

    turnLi() {
        this.faces[FACE_COLOUR.GREEN].rotateCounterClockwise();

        let faces = this.cloneFaces();

        this.faces[1].setCol(0, faces[2].getCol(0));
        this.faces[2].setCol(0, faces[3].getCol(0));
        this.faces[3].setCol(0, faces[5].getCol(2).reverse());
        this.faces[5].setCol(2, faces[1].getCol(0).reverse()); // .reverse() or not?
    }

    turnR() {
        this.faces[FACE_COLOUR.BLUE].rotateClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.YELLOW].setCol(2, faces[FACE_COLOUR.ORANGE].getCol(2));
        this.faces[FACE_COLOUR.ORANGE].setCol(2, faces[FACE_COLOUR.WHITE].getCol(2));
        this.faces[FACE_COLOUR.WHITE].setCol(2, faces[FACE_COLOUR.RED].getCol(0).reverse());
        this.faces[FACE_COLOUR.RED].setCol(0, faces[FACE_COLOUR.YELLOW].getCol(2).reverse());
    }

    turnRi() {
        this.faces[FACE_COLOUR.BLUE].rotateCounterClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.YELLOW].setCol(2, faces[FACE_COLOUR.RED].getCol(0).reverse());
        this.faces[FACE_COLOUR.ORANGE].setCol(2, faces[FACE_COLOUR.YELLOW].getCol(2));
        this.faces[FACE_COLOUR.WHITE].setCol(2, faces[FACE_COLOUR.ORANGE].getCol(2));
        this.faces[FACE_COLOUR.RED].setCol(0, faces[FACE_COLOUR.WHITE].getCol(2).reverse());
    }

    turnU() {
        this.faces[FACE_COLOUR.YELLOW].rotateClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.GREEN].setRow(0, faces[FACE_COLOUR.ORANGE].getRow(0));
        this.faces[FACE_COLOUR.ORANGE].setRow(0, faces[FACE_COLOUR.BLUE].getRow(0));
        this.faces[FACE_COLOUR.BLUE].setRow(0, faces[FACE_COLOUR.RED].getRow(0));
        this.faces[FACE_COLOUR.RED].setRow(0, faces[FACE_COLOUR.GREEN].getRow(0));
    }

    turnUi() {
        this.faces[FACE_COLOUR.YELLOW].rotateCounterClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.GREEN].setRow(0, faces[FACE_COLOUR.RED].getRow(0));
        this.faces[FACE_COLOUR.ORANGE].setRow(0, faces[FACE_COLOUR.GREEN].getRow(0));
        this.faces[FACE_COLOUR.BLUE].setRow(0, faces[FACE_COLOUR.ORANGE].getRow(0));
        this.faces[FACE_COLOUR.RED].setRow(0, faces[FACE_COLOUR.BLUE].getRow(0));
    }

    turnD() {
        this.faces[FACE_COLOUR.WHITE].rotateClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.GREEN].setRow(2, faces[FACE_COLOUR.RED].getRow(2));
        this.faces[FACE_COLOUR.ORANGE].setRow(2, faces[FACE_COLOUR.GREEN].getRow(2));
        this.faces[FACE_COLOUR.BLUE].setRow(2, faces[FACE_COLOUR.ORANGE].getRow(2));
        this.faces[FACE_COLOUR.RED].setRow(2, faces[FACE_COLOUR.BLUE].getRow(2));
    }

    turnDi() {
        this.faces[FACE_COLOUR.WHITE].rotateCounterClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.GREEN].setRow(2, faces[FACE_COLOUR.ORANGE].getRow(2));
        this.faces[FACE_COLOUR.ORANGE].setRow(2, faces[FACE_COLOUR.BLUE].getRow(2));
        this.faces[FACE_COLOUR.BLUE].setRow(2, faces[FACE_COLOUR.RED].getRow(2));
        this.faces[FACE_COLOUR.RED].setRow(2, faces[FACE_COLOUR.GREEN].getRow(2));
    }

    turnF() {
        this.faces[2].rotateClockwise();

        let faces = this.cloneFaces();

        this.faces[0].transposeRowToColumn(0, 2, faces[3]);
        this.faces[1].transposeColumnToRow(2, 2, faces[0], true);
        this.faces[3].transposeColumnToRow(0, 0, faces[4], true);
        this.faces[4].transposeRowToColumn(2, 0, faces[1]);
    }

    turnFi() {
        this.faces[2].rotateCounterClockwise();

        let faces = this.cloneFaces();

        this.faces[0].transposeRowToColumn(2, 2, faces[1], true);
        this.faces[1].transposeColumnToRow(0, 2, faces[4]);
        this.faces[3].transposeColumnToRow(2, 0, faces[0]);
        this.faces[4].transposeRowToColumn(0, 0, faces[3], true);
    }

    turnB() {
        this.faces[FACE_COLOUR.RED].rotateClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.GREEN].transposeRowToColumn(0, 0, faces[FACE_COLOUR.YELLOW], true);
        this.faces[FACE_COLOUR.YELLOW].transposeColumnToRow(2, 0, faces[FACE_COLOUR.BLUE]);
        this.faces[FACE_COLOUR.WHITE].transposeColumnToRow(0, 2, faces[FACE_COLOUR.GREEN]);
        this.faces[FACE_COLOUR.BLUE].transposeRowToColumn(2, 2, faces[FACE_COLOUR.WHITE], true);
    }

    turnBi() {
        this.faces[FACE_COLOUR.RED].rotateCounterClockwise();

        let faces = this.cloneFaces();

        this.faces[FACE_COLOUR.GREEN].transposeRowToColumn(2, 0, faces[FACE_COLOUR.WHITE]);
        this.faces[FACE_COLOUR.YELLOW].transposeColumnToRow(0, 0, faces[FACE_COLOUR.GREEN], true);
        this.faces[FACE_COLOUR.WHITE].transposeColumnToRow(2, 2, faces[FACE_COLOUR.BLUE], true);
        this.faces[FACE_COLOUR.BLUE].transposeRowToColumn(0, 2, faces[FACE_COLOUR.YELLOW]);
    }

    // TODO: Test
    makeTurn(direction) {
        switch (direction) {
            case RUBIKS_TURNS.L: this.turnL(); break;
            case RUBIKS_TURNS.B: this.turnB(); break;
            case RUBIKS_TURNS.U: this.turnU(); break;
            case RUBIKS_TURNS.F: this.turnF(); break;
            case RUBIKS_TURNS.R: this.turnR(); break;
            case RUBIKS_TURNS.D: this.turnD(); break;
            case RUBIKS_TURNS.LI: this.turnLi(); break;
            case RUBIKS_TURNS.BI: this.turnBi(); break;
            case RUBIKS_TURNS.UI: this.turnUi(); break;
            case RUBIKS_TURNS.FI: this.turnFi(); break;
            case RUBIKS_TURNS.RI: this.turnRi(); break;
            case RUBIKS_TURNS.DI: this.turnDi(); break;
        }
    }

    /**
     * Shuffle the rubiks cube.
     *
     * @param {number} turns - The number of turns to make.
     */
    shuffle(turns) {
        for (let n = 0; n < turns; n++) {
            let face = Math.floor(Math.random() * 6);
            let clockwise = Math.floor(Math.random() * 2) * 6;
            this.makeTurn(face + clockwise);
        }
    }

    toString() {
        return `
        [${this.faces[1].getRow(0)}]
        [${this.faces[1].getRow(1)}]
        [${this.faces[1].getRow(2)}]
        
[${this.faces[0].getRow(0)}] [${this.faces[2].getRow(0)}] [${this.faces[4].getRow(0)}] [${this.faces[5].getRow(0)}]
[${this.faces[0].getRow(1)}] [${this.faces[2].getRow(1)}] [${this.faces[4].getRow(1)}] [${this.faces[5].getRow(1)}]
[${this.faces[0].getRow(2)}] [${this.faces[2].getRow(2)}] [${this.faces[4].getRow(2)}] [${this.faces[5].getRow(2)}]

        [${this.faces[3].getRow(0)}]
        [${this.faces[3].getRow(1)}]
        [${this.faces[3].getRow(2)}]`;
    }
}


module.exports = RubiksCube;
module.exports.RUBIKS_COLOURS = RUBIKS_COLOURS;
module.exports.FACE_COLOUR = FACE_COLOUR;
module.exports.FACE_DIRECTION = FACE_DIRECTION;
