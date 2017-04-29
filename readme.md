Simple genetic algorithm simulation as described in book "Nature of Code" by Daniel Shiffman.
Adapted to JavaScript and runnable in Node.

To run, navigate to repository directory, enter "node" in terminal and type:

```javascript
.load main.js;
sim.printInfo(); // to get info, pass true for verbose, false for short info
sim.runOnce(); // to move simulation one generation further
sim.run();  // to move simulation 100 generations or > 90% fitness further
sim.setFitnessFunction( yourFunctionReturningNormalizedFitness );
```
