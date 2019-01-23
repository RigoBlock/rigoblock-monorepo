# fetchDragos

## _initialData_ properties:

- network (Network ID)
- web3Provider (web3 Provider url)

## Steps

- Instantiate `DragoEventful` contract
- Get a list of all Drago pools filtering past `DragoCreated` events
- Save the list of Dragos on _Redis_ as a **Redis Hash**
