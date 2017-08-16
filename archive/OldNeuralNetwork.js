class Neuron {
	/**
	 * New neuron that stores incoming weights. Weights are generated randomly
	 * @constructor
	 * @param  {Number} size Number of incoming connections/weights
	 *//**
	 * Crossover 2 parent neurons to form a child neuron
	 * @param  {Neuron} parent1 First crossover parent
	 * @param  {Neuron} parent2 Second crossover parent
	 */
	constructor(size, parent2) {
		if (parent2) {
			let parent1 = size;
			
			this.weights = [];
			
			// init weights with either from parent1 or parent2 (chosen by random)
			parent1.weights.forEach((weight, index) => {
				let newWeight = 0;
				if (random() < 0.5) {
					newWeight = weight;
				} else {
					newWeight = parent2.weights[index];
				}
				
				const mutationRate = 0.2;
				newWeight += random() * mutationRate - mutationRate/2;
				
				this.weights.push(newWeight);
			});
		} else {
			this.weights = [];
			// init weights with random numbers
			Array(size).fill(0).forEach(() => {
				this.weights.push(Math.random() * 2 - 1);
			});
		}
	}
	
	
	
	/**
	 * Computes this neuron given the previous layer
	 * @param  {Layer} previous Previous layer
	 */
	compute(previous) {
		let total = 0;
		
		// multiply each of the previous neuron's value by the weight and add to total
		for (let i = 0; i < previous.neurons.length; i++) {
			total += previous.neurons[i].value * this.weights[i];
		}
		
		// sigmoid
		this.value = 1 / (1 + Math.pow(Math.E, -total));
	}
	
}




class Layer {
	/**
	 * Layer containing neurons
	 * @param  {Number} size         Size of current layer
	 * @param  {Number} previousSize Size of previous layer. Set to 0 if this is the first layer.
	 *//**
	 * Crossover 2 parent layers to create a child layer
	 * @param  {Layer} parent1 First parent
	 * @param  {Layer} parent2 Second parent
	 */
 	constructor(size, previousSize) {
		if (typeof size == 'number') {
			this.neurons = [];
			
			// for every neuron in this layer, init it with previous' layer size
			Array(size).fill(0).forEach(() => {
				this.neurons.push(new Neuron(previousSize));
			});
		} else {
			let parent1 = size;
			let parent2 = previousSize;
			
			this.neurons = [];
			
			parent1.neurons.forEach((neuron, index) => {
				this.neurons.append(new Neuron(neuron, parent2.neurons[index]));
			});
		}
	}
	
	
	
	/**
	 * Computes this layer given the previous layer
	 * @param  {Layer} previous Previous layer
	 */
	compute(previous) {
		this.neurons.forEach(neuron => {
			neuron.compute(previous);
		});
	}
	
	
	
	/**
	 * Set the values of this layer
	 * @param {Number[]} values Values to set
	 */
	set(values) {
		for (let i = 0; i < this.neurons.length; i++) {
			this.neurons[i].value = values[i];
		}
	}
	
	
	
	/**
	 * Get the values of this layer
	 * @return {Number[]} Values of this layer
	 */
	get() {
		let values = [];
		this.neurons.forEach(neuron => {
			values.push(neuron.value);
		})
		
		return values;
	}
	
}




class Network {
	/**
	 * Construct a neural network.
	 * @param  {Number[]} sizes Sizes of the different layers
	 *//**
 	 * Crossover 2 parent networks to create a child network
 	 * @param  {Network} parent1 First parent
 	 * @param  {Network} parent2 Second parent
 	 */
	constructor(sizes, parent2) {
		if (parent2) {
			let parent1 = size;
			this.layers = [];
			
			parent1.layers.forEach((layer, index) => {
				this.layers.push(new Layer(layer, parent2.layers[index]));
			});
		} else {
			this.layers = [];
			
			// first layer has a previousSize of 0
			this.layers.push(new Layer(sizes[0], 0));
			// init layers with current layer size and previous layer size
			for (let i = 1; i < sizes.length; i++) {
				this.layers.push(new Layer(sizes[i], sizes[i-1]));
			};
		}
	}
	
	
	
	
	/**
	 * Compute the neural network
	 * @param  {Number[]} inputs Inputs to the neural network
	 * @return {Number[]}        Output of the neural network
	 */
	compute(inputs) {
		// feed inputs into first layer
		this.layers[0].set(inputs);
		
		// propagate subsequent layers
		for (let i = 1; i < this.layers.length; i++) {
			this.layers[i].compute(this.layers[i-1]);
		};
		
		// return the values of the last layer
		return this.layers[this.layers.length-1].get();
	}
	
}
