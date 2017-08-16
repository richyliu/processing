// generate train and test data
/*let train = [];
let trainLabel = [];
let test = [];
let testLabel = [];


function xor(a, b) {
    return a != b;
}
for (let i = 0; i < 1000; i++) {
    let a = random(2);
    let b = random(2);
    train.push([a, b]);
    trainLabel.push(xor(a, b) ? 1 : 0);
}
for (let i = 0; i < 100; i++) {
    let a = random(2);
    let b = random(2);
    test.push([a, b]);
    testLabel.push(xor(a, b) ? 1 : 0);
}



let network = [];
let population = 100;
const elite = 0.05; // percent of population to use for next generation
for (let i = 0; i < population; i++) {
    network.push(new Network([2, 3, 1]));
}


// loop through generations
for (let generation = 0; generation < 100; generation++) {
    // get scores of all networks
    let scores = [];
    for (let i = 0; i < population; i++) {
        let output = network[i].compute(train[generation])[0];
        scores.push([i, output - trainLabel[i]]);
    }
    
    // sort by score
    scores.sort((a, b) => {
        return b[1] - a[1];
    });
    
    // population new network
    network = [];
}*/