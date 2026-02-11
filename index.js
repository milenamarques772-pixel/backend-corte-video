const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.post("/cortar", upload.single("video"), (req, res) => {
  const { inicio, duracao } = req.body;

  if (!req.file) {
    return res.status(400).json({ erro: "Vídeo não enviado" });
  }

  const output = corte-${Date.now()}.mp4;

  const comando = ffmpeg -i ${req.file.path} -ss ${inicio} -t ${duracao} -c copy ${output};

  exec(comando, (erro) => {
    if (erro) {
      return res.status(500).json({ erro: "Erro ao cortar vídeo" });
    }

    res.download(output, () => {
      fs.unlinkSync(req.file.path);
      fs.unlinkSync(output);
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
