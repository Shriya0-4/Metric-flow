const express = require('express');
const router = express.Router();
const os = require('os');
const osUtils = require('os-utils');
const checkDiskSpace = require('check-disk-space');

router.get('/metrics', (req, res) => {
  osUtils.cpuUsage(cpuPercent => {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    res.json({
      cpuUsagePercent: (cpuPercent * 100).toFixed(2),
      memory: {
        totalMb: (total / 1024 / 1024).toFixed(2),
        freeMb: (free / 1024 / 1024).toFixed(2),
        usedMb: (used / 1024 / 1024).toFixed(2),
        usedPercent: ((used / total) * 100).toFixed(2)
      },
      platform: os.platform(),
      uptime: `${process.uptime().toFixed(2)} seconds`
    });
  });
});

router.get('/disk', async (req, res) => {
  try {
    const disk = await checkDiskSpace('/');
    const totalMb = disk.size / (1024 * 1024);
    const freeMb = disk.free / (1024 * 1024);
    const usedMb = totalMb - freeMb;

    res.json({
      diskSpace: {
        totalMb: totalMb.toFixed(2),
        freeMb: freeMb.toFixed(2),
        usedMb: usedMb.toFixed(2),
        usedPercent: ((usedMb / totalMb) * 100).toFixed(2)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch disk space info' });
  }
});

module.exports = router;
