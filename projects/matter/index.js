// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.getElementById('output'),
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
// Render.run(render);


function setup() {
    let cnv = createCanvas(600, 600);
    cnv.parent('output');
    
    rectMode(CORNERS);
    background('white');
}

function draw() {
    fill('black');
    rect(boxA.vertices[0].x, boxA.vertices[0].y, boxA.vertices[2].x, boxA.vertices[2].y);
    
    fill('blue');
    // rect(boxB.position.x, boxB.position.y, 10, 10);
}