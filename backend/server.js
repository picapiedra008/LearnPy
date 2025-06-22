// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  let pythonProcess = null;

  socket.on("run_code", (code) => {
    if (pythonProcess) {
      socket.emit("output", "\n[Error] Ya hay un proceso corriendo\n");
      return;
    }

    pythonProcess = spawn("python", ["-u", "-c", code], {
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    });

    pythonProcess.stdout.on("data", (data) => {
      socket.emit("output", Buffer.from(data).toString("utf8"));
    });

    pythonProcess.stderr.on("data", (data) => {
      socket.emit("output", Buffer.from(data).toString("utf8"));
    });

    pythonProcess.on("close", (code) => {
      socket.emit("output", `\n[Proceso terminado con código ${code}]\n`);
      pythonProcess = null;
    });

    pythonProcess.on("error", (err) => {
      socket.emit("output", `[Error al ejecutar Python]: ${err.message}\n`);
      pythonProcess = null;
    });
  });

  socket.on("input", (inputText) => {
    if (pythonProcess) {
      pythonProcess.stdin.write(inputText + "\n");
    } else {
      socket.emit(
        "output",
        "[No hay proceso en ejecución para enviar input]\n"
      );
    }
  });

  socket.on("stop", () => {
    if (pythonProcess) {
      pythonProcess.kill();
      pythonProcess = null;
      socket.emit("output", "\n[Proceso detenido]\n");
    } else {
      socket.emit("output", "[No hay proceso en ejecución]\n");
    }
  });

  socket.on("disconnect", () => {
    if (pythonProcess) {
      pythonProcess.kill();
      pythonProcess = null;
    }
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
