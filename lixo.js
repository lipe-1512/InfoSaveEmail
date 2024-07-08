const fs = require('fs');
const path = require('path');

const folderToWatch = '/storage/emulated/0/Download';

// Função para lidar com eventos de criação de arquivos
function handleFileCreation(filename) {
    console.log(`Arquivo ${filename} detectado. Aguardando 10 segundos antes de remover...`);

    // Contagem regressiva de 10 segundos
    let count = 10;
    const countdownInterval = setInterval(() => {
        console.log(count);
        count--;

        if (count === 0) {
            clearInterval(countdownInterval);
            removeFile(filename);
        }
    }, 1000);
}

// Função para remover o arquivo
function removeFile(filename) {
    const filePath = path.join(folderToWatch, filename);

    // Verifica se o arquivo existe antes de tentar remover
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            console.log(`Arquivo ${filename} removido com sucesso.`);
        } catch (err) {
            console.error(`Erro ao tentar remover o arquivo ${filename}:`, err);
        }
    } else {
        console.log(`O arquivo ${filename} não existe mais.`);
    }
}

// Configura o monitoramento da pasta
fs.watch(folderToWatch, (eventType, filename) => {
    if (filename && (filename === 'DB.txt' || filename === 'DB.js')) {
        handleFileCreation(filename);
    }
});

console.log(`Bot monitorando a pasta ${folderToWatch}. Pressione Ctrl+C para sair.`);
