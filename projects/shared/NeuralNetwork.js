window.Network = class {
    /**
     * Create a neural network with many layers of different sizes
     * @param  {Number[]} sizes Array of the different sizes of the layers
     *//**
     * Crossover 2 parent networks to form a child network. Both parents must have the same size layers
     * @param  {Network} parent1 First parent
     * @param  {Network} parent2 Second parent
     */
    constructor(sizes, parent2) {
        /**
         * Values of the different nodes
         * @type {Number[][]}
         */
        this.values = [];
        /**
         * Weights of the network
         * @type {Number[][][]}
         */
        this.weights = [];
        /**
         * Bias of the network. Represents a set of weights from previous layer
         * bias node to next layer. No first element because no bias going into
         * input nodes.
         * @type {Number[][]}
         */
        this.bias = [];
        /**
         * Percentage of neurons that will be mutated
         * @constant {Number}
         */
        this.MUTATION_RATE = 0.2;
        
        
        if (Array.isArray(sizes)) {
            // init values to arrays of zeros
            sizes.forEach(size => {
                this.values.push(Array(size).fill(0));
            });
            
            // init weights array starting at 1 (no weights going into input layer)
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
            
            // init bias array starting at 1 (no bias going into input layer)
            for (let i = 1; i < sizes.length; i++) {
                this.bias[i] = [];
                for (let j = 0; j < sizes[i]; j++) {
                    this.bias[i].push(Math.random() * 2 - 1);
                }
            }
        } else {
            // crossover from 2 parents
            let parent1 = sizes;
            
            // init values to arrays of zeros
            parent1.values.forEach(layer => {
                this.values.push(Array(layer.length).fill(0));
            });
            
            if (parent1.weights.length != parent2.weights.length) {
                throw new RangeError("Parents must have identical layer sizes");
            }
            
            // crossover weights
            for (let i = 1; i < parent1.weights.length; i++) {
                this.weights[i] = [];
                // each item in this layer
                for (let j = 0; j < parent1.weights[i].length; j++) {
                    this.weights[i].push([]);
                    // choose weight from one of parents
                    for (let k = 0; k < parent1.weights[i].length; k++) {
                        let newItem = 0;
                        if (Math.random() < 0.5) {
                            newItem = parent1.weights[i][j][k];
                        } else {
                            newItem = parent2.weights[i][j][k];
                        }
                        
                        // mutate offspring
                        if (Math.random() < this.MUTATION_RATE) {
                            // https://github.com/ssusnic/Machine-Learning-Flappy-Bird/blob/master/source/genetic.js#L181
                            newItem *= 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5));
                        }
                        this.weights[i][j].push(newItem);
                    }
                }
            }
            
            // crossover bias
            for (let i = 0; i < parent1.bias.length; i++) {
                this.bias[i] = [];
                // each bias in this layer
                for (let j = 0; j < parent1.bias[i].length; j++) {
                    // choose weight from one of parents
                    let newItem = 0;
                    if (Math.random() < 0.5) {
                        newItem = parent1.bias[i][j];
                    } else {
                        newItem = parent2.bias[i][j];
                    }
                    
                    // mutate offspring
                    if (Math.random() < this.MUTATION_RATE) {
                        // https://github.com/ssusnic/Machine-Learning-Flappy-Bird/blob/master/source/genetic.js#L181
                        newItem *= 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5));
                    }
                    this.bias[i][j] = newItem;
                }
            }
        }
        
    }
    
    
    
    /**
     * Compute the values for the network
     * @param  {Number[]} input Input to the network
     * @return {Number[]}       Output of the network
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
                // multiply previous layer nodes by weights in this array and
                // add & sigmoid and then set to this node's value
                let total = 0;
                for (let weight = 0; weight < this.weights[layer][node].length; weight++) {
                    total += this.values[layer - 1][weight] * this.weights[layer][node][weight];
                }
                // console.log(total);
                // add bias
                total += this.bias[layer][node];
                this.values[layer][node] = this.sigmoid(total);
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