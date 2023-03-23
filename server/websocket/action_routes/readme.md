After creating a module, don't forget to spread it actions in `index.js`.
Property name must be a function which takes arguments in that order:
1. Current WebSocket connection `ws`;
3. Request message itself `message`;