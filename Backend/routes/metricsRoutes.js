const express = require('express');
const router = express.Router();

const dummyRoutes = require('./dummyRoutes');

router.get('/', (req, res) => {
  res.json({
    endpointStats: dummyRoutes.endpointStats,
    uptime: `${process.uptime().toFixed(2)} seconds`
  });
});

module.exports = router;
