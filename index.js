const express = require('express');
const { exec } = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path; // Pega o caminho do FFmpeg automaticamente
const path = require('path');
const app = express();

app.use(express.json());

app.post("/cortar", (req, res) => {
    const { input, inicio, duracao } = req.body;

    if (!input || !inicio || !duracao) {
        return res.status(400).send("Parâmetros obrigatórios ausentes.");
    }

    const output = corte-${Date.now()}.mp4;

    // O comando corrigido usando crases e o ffmpegPath da biblioteca
    const comando = "${ffmpegPath}" -i "${input}" -ss ${inicio} -t ${duracao} -c copy "${output}";

    exec(comando, (erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao cortar o vídeo.");
        }

        res.download(output);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Servidor rodando na porta ${PORT});
});