var GA = require('./GA');

// fitness function needs to return normalized fitness value (0...1)
var customFitnessFn = function(dna) {
	var score = 0;
	var l = dna.genes.length;
	for(var i = 0; i < l; i++) {
		if(dna.genes[i] === dna.target.charAt(i)) {
			score++;
		}
	}

	score = score === 1 ? 2 : score;

	var f = ((score * score) / (l * l));

	return f;
}

var Simulation = (function() {


	function Simulation(pop, rate, batchSize) {
		this.ml = new GA(pop, rate, customFitnessFn);
		this.batchSize = batchSize || 100;
		this.batchCounter = 0;
	}

	Simulation.prototype = {

		init: function() {
			this.ml.setup();
			this.ml.printInfo(true);
		},

		run : function() {

			while(this.batchCounter < this.batchSize) {
				this.ml.loop();
				this.batchCounter++;
				if(this.ml.bestFit.fitness > 0.9) break;
			}
			this.ml.printInfo(true);
			this.batchCounter = 0;
		},

		runOnce : function() {
			this.ml.loop();
			this.ml.printInfo(false);
		},

		printInfo: function(verbose) {
			this.ml.printInfo(verbose);
		},

		setBatchSize: function(count) {
			this.batchSize = count;
		},

		setFitnessFunction : function(fn) {
			this.ml.setFitnessFunction(fn);
		}
 	}

	return Simulation;
})();


var sim = new Simulation(150, 0.02, 100);
sim.init();

module.exports = Simulation;
