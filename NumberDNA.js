var {randomInterval, random, pickRandomFrom } = require("./utils");

var NumberDNA = (function() {

	var raise = function(target) {

		return Math.random() * target;
	};

	// default fitness function
	var defaultFitnessFn = function(dna) {

		return Math.abs(dna.genes)/dna.target;
	};

	var dfn = (g, target) => Math.abs(g)/target;

	function NumberDNA(target) {
		this.target = target || 0;
		this.genes = raise(this.target) || Math.random();
		this.fitness = defaultFitnessFn(this);

	}

	NumberDNA.prototype.crossover = function( partner ) {

		var child = new NumberDNA();
		child.target = this.target;
		// var childGenes = [];
		var parentA = this.genes;
		var parentB = partner.genes;
		var arsenal = [ (a,b)=> a+b, (a,b)=> a*b ];

		child.genes = (function() {
			var candidates = [parentA, parentB];
			arsenal.forEach( operation => {
				var g = operation(parentA, parentB);
				if( dfn(g,this.target) > this.fitness) {
					candidates.push(g);
				}
			} );
			candidates.sort((a,b)=> b-a);
			return candidates[0];
		})();

		return child;
	};

	NumberDNA.prototype.mutate = function(rate) {

		if(Math.random() < rate) {
			this.genes *= Math.random();
		}

	};

	NumberDNA.prototype.updateFitness = function(fitnessFn) {

			this.fitness = fitnessFn(this) || defaultFitnessFn(this);

	};

	NumberDNA.prototype.toString = function() {
		var tgt = Math.round(this.target * 100) / 100;
		var f = Math.round(this.fitness * 100) / 100;
		var g = Math.round(this.genes * 100) / 100;
		return "target: "+tgt+" genes: "+g+" fitness: "+f ;
	};

	NumberDNA.prototype.toMask = function() {
		return this.genes;
	};

	NumberDNA.prototype.equals = function( other ) {

		return this.genes === other.genes;
	};

	return NumberDNA;

})();
var dna = new NumberDNA(12);
console.log(dna.toString());
module.exports = NumberDNA;
