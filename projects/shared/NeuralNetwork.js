window.Network = class {
    /**
     * Create a neural network with many layers of different sizes
     * @param  {number[]} sizes Array of the different sizes of the layers
     *//**
     * Crossover 2 parent networks to form a child network. Both parents must have the same size layers
     * @param  {Network} parent1 First parent
     * @param  {Network} parent2 Second parent
     */
    constructor(sizes, parent2) {
        /**
         * Values of the different nodes
         * @type {number[][]}
         */
        this.values = [];
        /**
         * Weights of the network
         * @type {number[][][]}
         */
        this.weights = [];
        
        
        if (Array.isArray(sizes)) {
            // init values to arrays of zeros
            sizes.forEach(size => {
                this.values.push(Array(size).fill(0));
            });
            
            // init weights array starting at 1
            for (let i = 1; i < sizes.length; i++) {
                this.weights[i] = [];
                // each item in this layer
                for (let j = 0; j < sizes[i]; j++) {
                    this.weights[i].push([]);
                    // put the connecting weights to the previous layer
                    for (let k = 0; k < sizes[i-1]; k++) {
                        this.weights[i][j].push(Math.random() * 2 - 1);
                    }
                }
            }
        } else {
            // crossover
            let parent1 = sizes;
            
            // init values to arrays of zeros
            parent1.values.forEach(layer => {
                this.values.push(Array(layer.length).fill(0));
            });
            
            for (let i = 1; i < parent1.weights.length; i++) {
                if (parent1.weights.length != parent2.weights.length) {
                    throw new RangeError("Parents must have identical layer sizes");
                }
                this.weights[i] = [];
                // each item in this layer
                for (let j = 0; j < parent1.weights[i].length; j++) {
                    if (parent1.weights[i].length != parent2.weights[i].length) {
                        throw new RangeError("Parents must have identical layer sizes");
                    }
                    this.weights[i].push([]);
                    // choose weight from one of parents
                    for (let k = 0; k < parent1.weights[i].length; k++) {
                        let newItem = 0;
                        if (Math.random() < 0.5) {
                            newItem = parent1.weights[i][j][k];
                        } else {
                            newItem = parent2.weights[i][j][k];
                        }
                        
                        // TODO: mutation?
                        this.weights[i][j].push(newItem);
                    }
                }
            }
        }
        
    }
    
    
    
    /**
     * Compute the values for the network
     * @param  {number[]} input Input to the network
     * @return {number[]}       Output of the network
     */
    compute(input) {
        if (input.length != this.values[0].length) {
            throw new RangeError('Input to compute must be of the same length as the first layer of the neural network');
        }
        
        this.values[0] = input;
        // propagate the input through the network
        for (let layer = 1; layer < this.weights.length; layer++) {
            // for every node in this layer
            for (let node = 0; node < this.weights[layer].length; node++) {
                // multiply previous layer nodes by weights in this array and set to this node's value
                for (let weight = 0; weight < this.weights[layer][node].length; weight++) {
                    this.values[layer][node] = this.sigmoid(this.values[layer - 1][weight] * this.weights[layer][node][weight]);
                }
            }
        }
        
        // return last layer
        return this.values[this.values.length - 1];
    }
    
    
    
    /**
     * Sigmoid function
     * @param  {Number} value Input to the sigmoid function
     * @return {Number}       Output of sigmoid
     * @private
     */
    sigmoid(value) {
        return 1 / (1 + Math.pow(Math.E, -value));
    }
};