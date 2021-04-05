const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");

const filename = "messages.txt";

const favicon = require("serve-favicon");
const path = require("path");

const port = process.env.PORT || 3001;

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
	res.redirect("index.html");
});

io.on("connection", (socket) => {
	console.log("connection!");
	socket.emit("connection", "person join");

	messages = fs.readFileSync("messages.txt", "utf-8").split(/\r?\n/);
	messages.forEach((l) => {
		console.log(socket.id);
		io.to(socket.id).emit("chat message", l);
	});

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
		console.log(msg);
		data = "\n" + msg;
		fs.open(filename, "a", (err, fd) => {
			if (err) {
				console.log(err.message);
			} else {
				fs.write(fd, data, (err, bytes) => {
					if (err) {
						console.log(err.message);
					} else {
						console.log(
							bytes + " bytes written"
						);
					}
				});
			}
		});
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
