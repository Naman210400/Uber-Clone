const http = require("http");
const app = require("./app");
const { initSocket } = require("./socket");
const port = process.env.PORT || 5001;

const server = http.createServer(app);

initSocket(server);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
