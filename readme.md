Simple genetic algorithm simulation as described in book "Nature of Code" by Daniel Shiffman.
Adapted to JavaScript and node.js.
to run, enter node and type:

> .load main.js;
> sim.printInfo(); to get info,
> sim.runOnce(); to move simulation one generation further
> sim.run(); - to move simulation 100 generations or > 90% fitness further
> sim.setFitnessFunction( yourFunctionReturningNormalizedFitness );
