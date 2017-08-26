window.mainCode = () => {
    const SCREEN_WIDTH = 600;
    const SCREEN_HEIGHT = 600;

    let world = {};



    p.preload = () => {
        
    };



    p.setup = () => {
        p.createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

        world = new World({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            LAYER_SIZES: [3, 3, 2],
            /*
                Inputs:
                    1. Closest blob direction in terms of TWO_PI
                    2. Closest blob distance
                    3. Closest blob bigger than self (0.01 or 0.99)
                Outpts:
                    1. direction to move in terms of TWO_PI
                    2. how far to move
             */
            population: 30,
            initialSize: 20,
            viewRange: 3,
            elite: 0.1,
            moveSpeed: 30,
            foodRatio: 5,
            foodSize: 10,
            stillFrameLimit: 500,
            noDraw: false,
            offsetX: 0,
            offsetY: 0,
        });
        
        window.world = world;
    };


    p.draw = () => {
        world.draw();
    };
};