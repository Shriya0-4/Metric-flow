const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  cpuUsagePercent: Number,
  memory: {
    totalMb: Number,
    freeMb: Number,
    usedMb: Number,
    usedPercent: Number
  },
  diskSpace: {
    totalMb: Number,
    freeMb: Number,
    usedMb: Number,
    usedPercent: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Metric', metricSchema);
