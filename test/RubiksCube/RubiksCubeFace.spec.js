"use strict";

const chai = require("chai");
chai.should();


const RubiksCubeFace = require("../../src/RubiksCube/RubiksCubeFace");

describe("RubiksCubeFace", function() {
    let face;

    describe("constructor", function() {
        beforeEach(function() {
            face = new RubiksCubeFace("RED");
        });

        it("sets the colour", function() {
            face.colour.should.equal("RED");
        });

        it("sets all the tiles to be that colour", function() {
            face.tiles.every(tile => tile === "RED").should.be.true;
        });
    });

    describe("isComplete", function() {
        beforeEach(function() {
            face = new RubiksCubeFace("RED");
        });

        it("returns true if all the tiles are the base colour", function() {
            face.isComplete().should.be.true;
        });

        it("returns false if all the tiles are the base colour", function() {
            face.tiles[2] = "YELLOW";
            face.isComplete().should.be.false;
        });
    });

    describe("getTileByRolCol", function() {
        let tests = [
            { x: 0, y: 0, res: 0 },
            { x: 0, y: 1, res: 1 },
            { x: 0, y: 2, res: 2 },
            { x: 1, y: 0, res: 3 },
            { x: 1, y: 1, res: 4 },
            { x: 1, y: 2, res: 5 },
            { x: 2, y: 0, res: 6 },
            { x: 2, y: 1, res: 7 },
            { x: 2, y: 2, res: 8 },
        ];

        beforeEach(function() {
            face = new RubiksCubeFace("");
            face.tiles = [
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ]
        });

        tests.forEach(function(test) {
            it(`Gets the tile at ${test.x}x${test.y}`, function() {
                face.getTileByRowCol(test.x, test.y).should.equal(test.res);
            });
        });
    });

    describe("setTileByRowCol", function() {
        beforeEach(function() {
            face = new RubiksCubeFace("");
        });

        it("Sets the tiles by row/col", function() {
            let colour = 0;
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    face.setTileByRowCol(row, col, colour);
                    colour++;
                }
            }

            face.tiles.should.deep.equal([
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ]);
        });
    });

    describe("getRow", function() {
        let tests = [
            { row: 0, res: [0, 1, 2] },
            { row: 1, res: [3, 4, 5] },
            { row: 2, res: [6, 7, 8] },
        ];

        beforeEach(function() {
            face = new RubiksCubeFace("");
            face.tiles = [
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ]
        });

        tests.forEach(function(test) {
            it(`Gets the row at ${test.row}`, function() {
                face.getRow(test.row).should.deep.equal(test.res);
            });
        });
    });

    describe("setRow", function() {
        beforeEach(function() {
            face = new RubiksCubeFace("");
        });

        it("Sets the entire row", function() {

            face.setRow(0, [0, 1, 2]);
            face.setRow(1, [3, 4, 5]);
            face.setRow(2, [6, 7, 8]);

            face.tiles.should.deep.equal([
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ]);
        });
    });

    describe("getCol", function() {
        let tests = [
            { col: 0, res: [0, 3, 6] },
            { col: 1, res: [1, 4, 7] },
            { col: 2, res: [2, 5, 8] },
        ];

        beforeEach(function() {
            face = new RubiksCubeFace("");
            face.tiles = [
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ]
        });

        tests.forEach(function(test) {
            it(`Gets the column at ${test.col}`, function() {
                face.getCol(test.col).should.deep.equal(test.res);
            });
        });
    });

    describe("setCol", function() {
        beforeEach(function() {
            face = new RubiksCubeFace("");
        });

        it("Sets the entire column", function() {
            face.setCol(0, [0, 3, 6]);
            face.setCol(1, [1, 4, 7]);
            face.setCol(2, [2, 5, 8]);

            face.tiles.should.deep.equal([
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ]);
        });
    });

    describe("rotateClockwise", function() {
        beforeEach(function() {
            face = new RubiksCubeFace("");
            face.tiles = [
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ];
        });

        it("rotates", function() {
            face.rotateClockwise();

            face.tiles.should.deep.equal([
                6, 3, 0,
                7, 4, 1,
                8, 5, 2
            ]);
        });
    });

    describe("rotateCounterClockwise", function() {
        beforeEach(function() {
            face = new RubiksCubeFace("");
            face.tiles = [
                0, 1, 2,
                3, 4, 5,
                6, 7, 8
            ];
        });

        it("rotates", function() {
            face.rotateCounterClockwise();

            face.tiles.should.deep.equal([
                2, 5, 8,
                1, 4, 7,
                0, 3, 6
            ]);
        });
    });
});
