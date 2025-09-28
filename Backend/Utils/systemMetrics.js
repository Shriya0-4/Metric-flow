const os = require("os");
const osUtils = require("os-utils");
const checkDiskSpace = require("check-disk-space");

function getSystemMetrics(callback) {
  osUtils.cpuUsage((cpuPercent) => {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    callback({
      cpuUsagePercent: (cpuPercent * 100).toFixed(2),
      memory: {
        totalMb: (total / 1024 / 1024).toFixed(2),
        freeMb: (free / 1024 / 1024).toFixed(2),
        usedMb: (used / 1024 / 1024).toFixed(2),
        usedPercent: ((used / total) * 100).toFixed(2),
      },
      platform: os.platform(),
      uptime: `${process.uptime().toFixed(2)} seconds`,
    });
  });
}

async function getDiskMetrics(path = "C:") {
  try {
    const disk = await checkDiskSpace(path);
    const totalMb = disk.size / (1024 * 1024);
    const freeMb = disk.free / (1024 * 1024);
    const usedMb = totalMb - freeMb;

    return {
      diskSpace: {
        totalMb: totalMb.toFixed(2),
        freeMb: freeMb.toFixed(2),
        usedMb: usedMb.toFixed(2),
        usedPercent: ((usedMb / totalMb) * 100).toFixed(2),
      },
    };
  } catch (err) {
    return { error: "Unable to fetch disk space info" };
  }
}

module.exports = { getSystemMetrics, getDiskMetrics };
