# fetchDragos

This task gets all past `DragoCreated` events from block 0 for a particular network, and saves the dragos' address and Id on a redis hash, which is then to be retrieved later from other tasks.

The hash name on redis will be `dragos:${network}`.

It accepts the network's Id and an URL for web3 to be instantiated as properties on the initialData object.
