const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const uploadDir = "uploads";
const cutsDir = "cuts";

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(cutsDir)) fs.mkdirSync(cutsDir);

const upload = multer({ dest: uploadDir });

app.get("/", (req, res) => {
  res.send("Backend de corte de vídeo rodando 🚀");
});

app.post("/upload", upload.single("video"), async (req, res) => {
  const inputPath = req.file.path;
  const outputPath = ${cutsDir}/cut-${Date.now()}.mp4;

  const cmd = ffmpeg -i ${inputPath} -ss 00:01:00 -t 00:02:30 -c copy ${outputPath};

  exec(cmd, (err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao cortar vídeo" });
    }

    res.json({
      videoUrl: /${outputPath},
      downloadUrl: /${outputPath}
    });
  });
});

app.use("/cuts", express.static(path.join(__dirname, "cuts")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
