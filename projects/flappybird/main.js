window.mainCode = () => {
    const WIDTH = 600;
    const HEIGHT = 500;
    
    let world = new World(10, WIDTH, HEIGHT);
    this.world = world;
    
    
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT + 100);
    };
    
    
    p.draw = () => {
        p.fill('deepskyblue');
        p.rect(0, 0, WIDTH, HEIGHT);
        world.draw();
    };
    
    
    p.keyPressed = () => {
        world.birds[0].jump();
    };
};