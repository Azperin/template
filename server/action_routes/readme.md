After creating a module, don't forget to spread it actions in `index.js`.
Property name must be a function which takes arguments in that order:
1. Current WebSocket connection `ws`;
2. WebSocket Instance `WSS`, usually to broadcast message;
3. Request itself `request`;
4. Global app state `GLOBAL_STATE`; 