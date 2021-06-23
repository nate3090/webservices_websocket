// * You may uncomment one of these modules:
const express = require('express');
// const koa = require('koa');
// const hapi = require('@hapi/hapi');
// const restify = require('restify');

module.exports = (stepService) => {
  const REST_PORT = 8080;

  // * TODO: Write the GET endpoint, using `stepService` for data access
  const app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });
  const router = express.Router();
  router.route('/users/:username/steps').get((req, res) => {
    const {username} = req.params;
    console.log('user name =>', username);
    const user = stepService.get(username);
    if (!user) {
      return res.status(404).jsonp({"error": "User doesn't exist" });
    }
    const cumulativeSteps = user.cumulativeSteps;
    const ts = user.ts;
    res.status(200).jsonp({cumulativeSteps, ts});
  });
  app.use(router);
  return app.listen(REST_PORT);
};
