"use strict";


const seedRandom = require("seedrandom");
const RubiksCube = require("./RubiksCube/RubiksCube");


seedRandom(6, { global: true });

const cube = new RubiksCube();


cube.shuffle(100);

// cube.solveSide(3);

console.log(cube.toString());

// cube.turnFrontFaceClockwise();
// cube.turnDownFaceClockwise();
// cube.turnFrontFaceCounterClockwise();

// TODO: Face turning depends on orientation of cube, need to be able to change it

// Solve for Top face

// Check the cross

console.log(
    cube.faces[1].getTileByRowCol(0, 1),
    cube.faces[5].getTileByRowCol(0, 1)
);
console.log(
    cube.faces[1].getTileByRowCol(1, 0),
    cube.faces[0].getTileByRowCol(0, 1)
);
console.log(
    cube.faces[1].getTileByRowCol(1, 2),
    cube.faces[4].getTileByRowCol(0, 1)
);
console.log(
    cube.faces[1].getTileByRowCol(2, 1),
    cube.faces[2].getTileByRowCol(0, 1)
);




/*
// Cross for G[0]
cube.turnU();
cube.turnU();
cube.turnB();
cube.turnUi();
cube.turnF();
cube.turnL();
cube.turnL();
cube.turnU();
cube.turnU();
cube.turnFi();
cube.turnRi();
cube.turnBi();
*/

/*
// Solution!
cube.turnF();
cube.turnU();cube.turnU();
cube.turnB();
cube.turnUi();
cube.turnF();
cube.turnL();cube.turnL();
cube.turnU();cube.turnU();
cube.turnFi();
cube.turnRi();
cube.turnBi();
cube.turnU();cube.turnU();
cube.turnD();
cube.turnB();cube.turnB();
cube.turnU();cube.turnU();
cube.turnF();cube.turnF();
cube.turnU();
cube.turnL();cube.turnL();
cube.turnF();cube.turnF();
cube.turnUi();
cube.turnB();cube.turnB();
*/
console.log('------');

// console.log(cube.toString());

