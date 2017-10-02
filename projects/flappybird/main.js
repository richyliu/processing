window.mainCode = () => {
    const WIDTH = 800;
    const HEIGHT = 500;
    
    let world;
    
    
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT + 200);
        world = new World(40, WIDTH, HEIGHT);
        this.world = world;
    };
    
    
    p.draw = () => {
        // p.fill('deepskyblue');
        // p.rect(0, 0, WIDTH, HEIGHT);
        p.background('deepskyblue');
        world.draw();
    };
    
    
    p.keyPressed = () => {
        world.birds[0].jump();
    };
};