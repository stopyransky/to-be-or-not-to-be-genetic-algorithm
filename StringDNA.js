var {randomInterval, random, pickRandomFrom } = require("./utils");

var StringDNA = (function() {

	var raise = function(target) {
		var genesis = [];
		for(var i = 0 ;  i < target.length; i++) {
			genesis[i] = String.fromCodePoint(randomInterval(32, 128));
		}
		return genesis;
	};

	// default fitness function
	var defaultFitnessFn = function(dna) {
		var score = 0;
		for(var i = 0; i < dna.genes.length; i++) {
			if(dna.genes[i] === dna.target.charAt(i)) {
				score++;
			}
		}
		return score / dna.target.length;
	};


	function StringDNA() {
		this.target = "to be or not to be";
		this.genes = raise(this.target);
		this.fitness = defaultFitnessFn(this);

	}

	StringDNA.prototype.crossover = function( partner ) {

		var child = new StringDNA();
		// var childGenes = [];
		var parentA = this.genes;
		var parentB = partner.genes;
		// var midpoint = random( this.genes.length ); // variable share
		var midpoint = Math.floor(parentA.length * 0.5); // 50% share of each parent

		for(var i = 0; i < parentA.length; i++) {

			if(this.target.charAt(i) === parentA[i])  {
				child.genes[i] = parentA[i];
			} else {
				if( i > midpoint ) {
					if(this.target.charAt(i) ===  parentA[i])
					child.genes[i] = parentA[i];
				}
				else {
					child.genes[i] = parentB[i];
				}
			}
		}

		return child;
	};

	StringDNA.prototype.mutate = function(rate) {

		for(var i =0; i < this.genes.length; i++ ) {
			if(this.genes[i] !== this.target.charAt(i)) {
				if(Math.random() < rate) {
					this.genes[i] = String.fromCodePoint(randomInterval(32, 128));
				}
			}
		}
	};

	StringDNA.prototype.updateFitness = function(fitnessFn) {

			this.fitness = fitnessFn(this) || defaultFitnessFn(this);

	};

	StringDNA.prototype.toString = function() {
		return this.genes.join("").concat(" --- "+(this.fitness *100));
	};

	StringDNA.prototype.toMask = function() {
		var t = this.target;
		var mask = this.genes.map( (g, i) => g === t.charAt(i) ? "1" :"0" );
		return mask.join("");
	};

	StringDNA.prototype.equals = function( other ) {
		if(this.genes.length !== other.genes.length) return false;

		for(var i = 0 ; i < this.genes.length; i++ ) {
			if(this.genes[i] !== other.genes[i]) return false;
		}
		return true;
	};

	return StringDNA;

})();

module.exports = StringDNA;
