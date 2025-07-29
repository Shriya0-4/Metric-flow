module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    const interval = setInterval(() => {
      socket.emit('systemMetrics', {
        cpuUsage: Math.random().toFixed(2),
        memoryUsed: Math.floor(Math.random() * 8000)
      });
    }, 3000);

    socket.on('disconnect', () => {
      console.log(' Client disconnected');
      clearInterval(interval);
    });
  });
};
