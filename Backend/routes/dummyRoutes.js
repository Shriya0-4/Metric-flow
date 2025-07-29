const express = require('express');
const router = express.Router();

const endpointStats = {
  '/dummy1': { count: 0 },
  '/dummy2': { count: 0 }
};

router.get('/dummy1', (req, res) => {
  endpointStats['/dummy1'].count++;
  res.send(`Dummy 1 endpoint accessed ${endpointStats['/dummy1'].count} times`);
});

router.post('/dummy2', (req, res) => {
  endpointStats['/dummy2'].count++;
  res.send(`Dummy 2 endpoint accessed ${endpointStats['/dummy2'].count} times`);
});

router.endpointStats = endpointStats;
module.exports = router;
