const WebSocketServer = require('ws').Server;

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;

  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.
  //         Make sure to return an instance of a WebSocketServer.

  const wsServer = new WebSocketServer({port: WEBSOCKET_PORT });
  wsServer.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      try {
        const json = JSON.parse(message)
        if (json.username && json.update_id && json.ts) {
          const user = stepService.get(json.username);
          if (!user) {
            return;
          }
          stepService.add(json.username, json.ts, json.newSteps)

        }
      } catch (e) {

      }
    });

    // ws.send('something');
  });
  return wsServer;
};
