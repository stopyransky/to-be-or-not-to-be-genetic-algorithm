var { pickRandomFrom } = require("./utils.js");

var DNA = require('./DNA');

var GA = (function(){

	function match(parent, pool) {

		var candidate = pickRandomFrom(pool);
		return parent.equals(candidate) ? match(parent, pool) : candidate;
	}

	function GA(pop, rate, fitFn) {
		this.popCount = pop || 150;
		this.population = [];
		this.matingPool = [];
		this.mutationRate = rate || 0.01;
		this.totalGenerations = 0;
		this.averageFitness = 0;
		this.bestFit = null;
		this.fitnessFn = fitFn;
	}

	GA.prototype = {

		setup: function() {
			for( var i = 0; i < this.popCount; i++ ) {
				this.population[i] = new DNA();
			}
			this.calcPopulationStats();
		},

		loop: function() {

			// clear mating pool
			this.matingPool = [];

			// put fit DNAs into mating pool,
			// more fit DNAs are represented in larger amount

			for( var i = 0; i < this.population.length; i++ ) {
				var n = this.population[i].fitness * 100;
				for( var j = 0; j < n; j++ ) {
					this.matingPool.push(this.population[i]);
				}
			}

			// match parents for next generation
			for( var i = 0; i < this.population.length; i++ ) {
				var parentA = pickRandomFrom(this.matingPool);
				var parentB = match(parentA, this.matingPool);
				var child = parentA.crossover(parentB);

				// mutate children (currently mutation of only wrong genes)
				child.mutate(this.mutationRate);
				// overwrite population with new generation
				this.population[i] = child;
			}

			// update fitness, also accepts custom fitness function
			// fitness function needs to return normalized fitness value (0...1)

			for( var i = 0; i < this.population.length; i++ ) {
				this.population[i].updateFitness(this.fitnessFn);
			}

			this.calcPopulationStats();
			this.totalGenerations++;

		},

		setFitnessFunction : function(fn) {
			this.fitnessFn = fn;
		},

		calcPopulationStats : function(){

			var fitnesses = this.population.map( dna => dna.fitness);
			var sum = fitnesses.reduce( (a, b) => a + b, 0);

			this.averageFitness = (sum / this.population.length) * 100;

			this.bestFit = this.population.sort(function(a,b) {
				return b.fitness - a.fitness;
			})[0];

		},
		printInfo : function(verbose) {
			if(verbose) {
				console.log("dna --- fitness%\nmask")
				for( var i = 0; i < this.population.length; i++ ) {
					if(this.population[i].fitness > 0) {
						//  console.log(this.population[i].toString());
						 console.log(this.population[i].toMask());
					}
				}
			}
			console.log("Total Generations: " + this.totalGenerations);
			console.log("Average Fitness: " + this.averageFitness);
			console.log("Total Population: " + this.population.length);
			console.log("Mutation Rate: " + this.mutationRate)
			console.log("Best Fit: " + this.bestFit.toString());
		},
	};

	return GA;

})();

module.exports = GA;
