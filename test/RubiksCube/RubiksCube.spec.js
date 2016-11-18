"use strict";

const chai = require("chai");
chai.should();


const RubiksCube = require("../../src/RubiksCube/RubiksCube");
const RUBIKS_COLOURS = require("../../src/RubiksCube/RubiksCube").RUBIKS_COLOURS;


function scrambleCube(cube) {
    cube.faces[0].tiles = [
        "R", "B", "Y",
        "Y", "G", "G",
        "O", "B", "G"
    ];
    cube.faces[1].tiles = [
        "B", "G", "B",
        "R", "Y", "R",
        "B", "W", "G"
    ];
    cube.faces[2].tiles = [
        "O", "B", "R",
        "W", "O", "W",
        "Y", "Y", "R"
    ];
    cube.faces[3].tiles = [
        "O", "B", "G",
        "O", "W", "Y",
        "W", "Y", "R"
    ];
    cube.faces[4].tiles = [
        "W", "G", "O",
        "R", "B", "W",
        "Y", "O", "B"
    ];
    cube.faces[5].tiles = [
        "W", "O", "W",
        "O", "R", "R",
        "Y", "G", "G"
    ];
}

function countCubeColor(cube, colour) {
    return cube.faces.reduce((count, face) => count + face.tiles.filter(tile => tile === colour).length, 0);
}

function checkCubeCorrectColorCount(cube) {
    countCubeColor(cube, RUBIKS_COLOURS.RED).should.equal(9, "RED");
    countCubeColor(cube, RUBIKS_COLOURS.BLUE).should.equal(9, "BLUE");
    countCubeColor(cube, RUBIKS_COLOURS.YELLOW).should.equal(9, "YELLOW");
    countCubeColor(cube, RUBIKS_COLOURS.GREEN).should.equal(9, "GREEN");
    countCubeColor(cube, RUBIKS_COLOURS.ORANGE).should.equal(9, "ORANGE");
    countCubeColor(cube, RUBIKS_COLOURS.WHITE).should.equal(9, "WHITE");
}

describe("RubiksCube", function() {
    let cube;

    beforeEach(function() {
        cube = new RubiksCube();
    });

    describe("_createFaces", function() {
        it("creates 6 faces", function() {
            cube.faces.length.should.equal(6);
        });

        it("creates different coloured sides", function() {
            cube.faces
                .map(face => face.colour)
                .filter((colour, index, colours) => colours.indexOf(colour) === index)
                .length.should.equal(6);
        });
    });

    describe("isComplete", function() {
        it("returns true when all of the sides colours are the same", function() {
            cube.isComplete().should.equal(true);
        });

        it("returns false when some of the sides colours are not the same", function() {
            cube.faces[0].tiles[2] = "1";
            cube.isComplete().should.equal(false);
        });
    });

    describe("Turns", function() {
        describe("turnL", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnL();
            });

            it("Leaves the right face alone", function() {
                cube.faces[4].tiles.should.deep.equal([
                    "W", "G", "O",
                    "R", "B", "W",
                    "Y", "O", "B"
                ]);
            });

            it("Rotates the left face clockwise", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "O", "Y", "R",
                    "B", "G", "B",
                    "G", "G", "Y"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "G", "G", "B",
                    "R", "Y", "R",
                    "W", "W", "G"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "B", "B", "R",
                    "R", "O", "W",
                    "B", "Y", "R"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "O", "B", "G",
                    "W", "W", "Y",
                    "Y", "Y", "R"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "W", "O", "W",
                    "O", "R", "O",
                    "Y", "G", "O"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnLi", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnLi();
            });

            it("Leaves the right face alone", function() {
                cube.faces[4].tiles.should.deep.equal([
                    "W", "G", "O",
                    "R", "B", "W",
                    "Y", "O", "B"
                ]);
            });

            it("Rotates the left face counter clockwise", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "Y", "G", "G",
                    "B", "G", "B",
                    "R", "Y", "O"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "O", "G", "B",
                    "W", "Y", "R",
                    "Y", "W", "G"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "O", "B", "R",
                    "O", "O", "W",
                    "W", "Y", "R"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "G", "B", "G",
                    "R", "W", "Y",
                    "W", "Y", "R"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "W", "O", "B",
                    "O", "R", "R",
                    "Y", "G", "B"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnR", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnR();
            });

            it("Leaves the left face alone", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "R", "B", "Y",
                    "Y", "G", "G",
                    "O", "B", "G"
                ]);
            });

            it("Rotates the right face clockwise", function() {
                cube.faces[4].tiles.should.deep.equal([
                    "Y", "R", "W",
                    "O", "B", "G",
                    "B", "W", "O"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "B", "G", "R",
                    "R", "Y", "W",
                    "B", "W", "R"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "O", "B", "G",
                    "W", "O", "Y",
                    "Y", "Y", "R"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "O", "B", "Y",
                    "O", "W", "O",
                    "W", "Y", "W"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "G", "O", "W",
                    "R", "R", "R",
                    "B", "G", "G"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnRi", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnRi();
            });

            it("Leaves the left face alone", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "R", "B", "Y",
                    "Y", "G", "G",
                    "O", "B", "G"
                ]);
            });

            it("Rotates the right face counter clockwise", function() {
                cube.faces[4].tiles.should.deep.equal([
                    "O", "W", "B",
                    "G", "B", "O",
                    "W", "R", "Y"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "B", "G", "Y",
                    "R", "Y", "O",
                    "B", "W", "W"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "O", "B", "B",
                    "W", "O", "R",
                    "Y", "Y", "G"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "O", "B", "R",
                    "O", "W", "W",
                    "W", "Y", "R"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "R", "O", "W",
                    "Y", "R", "R",
                    "G", "G", "G"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnU", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnU();
            });

            it("Leaves the down face alone", function() {
                cube.faces[3].tiles.should.deep.equal([
                    "O", "B", "G",
                    "O", "W", "Y",
                    "W", "Y", "R"
                ]);
            });

            it("Rotates the up face clockwise", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "B", "R", "B",
                    "W", "Y", "G",
                    "G", "R", "B"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "O", "B", "R",
                    "Y", "G", "G",
                    "O", "B", "G"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "W", "G", "O",
                    "W", "O", "W",
                    "Y", "Y", "R"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "W", "O", "W",
                    "R", "B", "W",
                    "Y", "O", "B"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "R", "B", "Y",
                    "O", "R", "R",
                    "Y", "G", "G"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnUi", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnUi();
            });

            it("Leaves the down face alone", function() {
                cube.faces[3].tiles.should.deep.equal([
                    "O", "B", "G",
                    "O", "W", "Y",
                    "W", "Y", "R"
                ]);
            });

            it("Rotates the up face counter clockwise", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "B", "R", "G",
                    "G", "Y", "W",
                    "B", "R", "B"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "W", "O", "W",
                    "Y", "G", "G",
                    "O", "B", "G"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "R", "B", "Y",
                    "W", "O", "W",
                    "Y", "Y", "R"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "O", "B", "R",
                    "R", "B", "W",
                    "Y", "O", "B"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "W", "G", "O",
                    "O", "R", "R",
                    "Y", "G", "G"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnD", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnD();
            });

            it("Leaves the up face alone", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "B", "G", "B",
                    "R", "Y", "R",
                    "B", "W", "G"
                ]);
            });

            it("Rotates the down face clockwise", function() {
                cube.faces[3].tiles.should.deep.equal([
                    "W", "O", "O",
                    "Y", "W", "B",
                    "R", "Y", "G"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "R", "B", "Y",
                    "Y", "G", "G",
                    "Y", "G", "G"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "O", "B", "R",
                    "W", "O", "W",
                    "O", "B", "G"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "W", "G", "O",
                    "R", "B", "W",
                    "Y", "Y", "R"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "W", "O", "W",
                    "O", "R", "R",
                    "Y", "O", "B"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnDi", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnDi();
            });

            it("Leaves the up face alone", function() {
                cube.faces[1].tiles.should.deep.equal([
                    "B", "G", "B",
                    "R", "Y", "R",
                    "B", "W", "G"
                ]);
            });

            it("Rotates the down face counter clockwise", function() {
                cube.faces[3].tiles.should.deep.equal([
                    "G", "Y", "R",
                    "B", "W", "Y",
                    "O", "O", "W"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "R", "B", "Y",
                    "Y", "G", "G",
                    "Y", "Y", "R"
                ]);
                cube.faces[2].tiles.should.deep.equal([
                    "O", "B", "R",
                    "W", "O", "W",
                    "Y", "O", "B"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "W", "G", "O",
                    "R", "B", "W",
                    "Y", "G", "G"
                ]);
                cube.faces[5].tiles.should.deep.equal([
                    "W", "O", "W",
                    "O", "R", "R",
                    "O", "B", "G"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnF", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnF();
            });

            it("Leaves the back face alone", function() {
                cube.faces[5].tiles.should.deep.equal([
                    "W", "O", "W",
                    "O", "R", "R",
                    "Y", "G", "G"
                ]);
            });

            it("Rotates the front face clockwise", function() {
                cube.faces[2].tiles.should.deep.equal([
                    "Y", "W", "O",
                    "Y", "O", "B",
                    "R", "W", "R"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "R", "B", "O",
                    "Y", "G", "B",
                    "O", "B", "G"
                ]);
                cube.faces[1].tiles.should.deep.equal([
                    "B", "G", "B",
                    "R", "Y", "R",
                    "G", "G", "Y"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "Y", "R", "W",
                    "O", "W", "Y",
                    "W", "Y", "R"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "B", "G", "O",
                    "W", "B", "W",
                    "G", "O", "B"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnFi", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnFi();
            });

            it("Leaves the back face alone", function() {
                cube.faces[5].tiles.should.deep.equal([
                    "W", "O", "W",
                    "O", "R", "R",
                    "Y", "G", "G"
                ]);
            });

            it("Rotates the front face counter clockwise", function() {
                cube.faces[2].tiles.should.deep.equal([
                    "R", "W", "R",
                    "B", "O", "Y",
                    "O", "W", "Y"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "R", "B", "G",
                    "Y", "G", "W",
                    "O", "B", "B"
                ]);
                cube.faces[1].tiles.should.deep.equal([
                    "B", "G", "B",
                    "R", "Y", "R",
                    "W", "R", "Y"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "Y", "G", "G",
                    "O", "W", "Y",
                    "W", "Y", "R"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "G", "G", "O",
                    "B", "B", "W",
                    "O", "O", "B"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnB", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnB();
            });

            it("Leaves the front face alone", function() {
                cube.faces[2].tiles.should.deep.equal([
                    "O", "B", "R",
                    "W", "O", "W",
                    "Y", "Y", "R"
                ]);
            });

            it("Rotates the back face clockwise", function() {
                cube.faces[5].tiles.should.deep.equal([
                    "Y", "O", "W",
                    "G", "R", "O",
                    "G", "R", "W"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "B", "B", "Y",
                    "G", "G", "G",
                    "B", "B", "G"
                ]);
                cube.faces[1].tiles.should.deep.equal([
                    "O", "W", "B",
                    "R", "Y", "R",
                    "B", "W", "G"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "O", "B", "G",
                    "O", "W", "Y",
                    "R", "Y", "O"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "W", "G", "R",
                    "R", "B", "Y",
                    "Y", "O", "W"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });

        describe("turnBi", function() {
            beforeEach(function() {
                scrambleCube(cube);
                cube.turnBi();
            });

            it("Leaves the front face alone", function() {
                cube.faces[2].tiles.should.deep.equal([
                    "O", "B", "R",
                    "W", "O", "W",
                    "Y", "Y", "R"
                ]);
            });

            it("Rotates the back face counter clockwise", function() {
                cube.faces[5].tiles.should.deep.equal([
                    "W", "R", "G",
                    "O", "R", "G",
                    "W", "O", "Y"
                ]);
            });

            it("turns the edges of the other faces", function() {
                cube.faces[0].tiles.should.deep.equal([
                    "W", "B", "Y",
                    "Y", "G", "G",
                    "R", "B", "G"
                ]);
                cube.faces[1].tiles.should.deep.equal([
                    "O", "Y", "R",
                    "R", "Y", "R",
                    "B", "W", "G"
                ]);
                cube.faces[3].tiles.should.deep.equal([
                    "O", "B", "G",
                    "O", "W", "Y",
                    "B", "W", "O"
                ]);
                cube.faces[4].tiles.should.deep.equal([
                    "W", "G", "B",
                    "R", "B", "G",
                    "Y", "O", "B"
                ]);
            });

            it("Has the correct amount of colours", function() {
                checkCubeCorrectColorCount(cube);
            });
        });
    });

    describe("shuffle", function() {
        it("shuffles", function() {
            cube.shuffle(100);
            checkCubeCorrectColorCount(cube);
        });
    });
});
