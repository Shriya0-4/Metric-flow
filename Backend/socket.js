const { getSystemMetrics } = require("./Utils/systemMetrics");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    const interval = setInterval(() => {
      getSystemMetrics((data) => {
        socket.emit("systemMetrics", data);
      });
    }, 3000);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
};
