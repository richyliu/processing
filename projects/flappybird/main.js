window.mainCode = () => {
    const WIDTH = 600;
    const HEIGHT = 500;
    let b = new Bird(100, 300);
    let pipe = new Pipe(100, 450, 100, 50, 600);
    let w = new World(2, WIDTH, HEIGHT);
    this.w = w;
    
    
    p.preload = () => {
        
    };
    
    
    
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT + 100);
        p.background('deepskyblue');
        
    };
    
    
    
    p.draw = () => {
        p.background('deepskyblue');
        // b.draw();
        // pipe.draw();
        w.draw();
    };
    
    
    p.keyPressed = () => {
        if (p.keyCode == p.LEFT_ARROW) {
            w.birds[0].jump();
        } else {
            w.birds[1].jump();
        }
        
    };
};