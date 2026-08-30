// Carregar os Modulos:
const http = require('http');
const url  = require('url');
const path = require('path');
const fs   = require('fs');

const publicDir = path.join(__dirname, 'public');

// Content-Types:
const contentTypes = {
    '.html':    'text/html; charset=utf-8',
    '.css':     'text/css; charset=utf-8',
    '.js':      'text/javascript; charset=utf-8',
    '.json':    'application/json; charset=utf-8',
    '.jpg':     'image/jpeg',
    '.jpeg':    'image/jpeg',
    '.png':     'image/png',
    '.pdf':     'application/pdf',
    '.mp4':     'video/mp4'
};

// Rotas:
const routes = {
    '/': 'index.html',
    '/algebra': 'algebraLinear.html',
    '/dbnr': 'bancoDeDadosNaoRelacional.html',
    '/dw3': 'desenvolvimentoWeb03.html',
    '/gestao-agil': 'gestaoAgil.html',
    '/ihc': 'interacaoHumanoComputador.html',
    '/ingles': 'ingles.html',
    '/tp2': 'tecnicasDeProgramacao02.html',
    '/grade': 'pdf/Matriz-curricular-Software-Multiplataforma-29-12-2021.pdf'
};

// Função para renderizar a página 404 estilizada contida em public/:
function render404(response) {
    const caminho404 = path.join(publicDir, 'erro404.html');
    fs.readFile(caminho404, function(err, data) {
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            response.end('<h1>404 - Página Não Encontrada</h1>');
        } else {
            response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(data);
        }
    });
}

// Abrir Arquivos:
function readFile(response, file) {
    fs.readFile(file, function(err, data) {
        if (err) {
            return render404(response);
        }

        var extension = path.extname(file).toLowerCase();
        var contentType = contentTypes[extension] || 'application/octet-stream';

        response.writeHead(200, {'Content-Type': contentType});
        response.end(data);
    });
}

// Funcao CallBack para utilizar no server http:
var callback = function(request, response) {
    var pathname = decodeURIComponent(url.parse(request.url).pathname);

    // ROTAS (Procura todos os arquivos HTML/PDF dentro da pasta public):
    if (routes[pathname]) {
        return readFile(response, path.join(publicDir, routes[pathname]));
    }

    // Arquivos Estaticos (CSS, JS, Imagens, Vídeo, etc.):
    var file = path.join(publicDir, pathname);

    // Impedir acesso fora da pasta public:
    if (!file.startsWith(publicDir)) {
        return render404(response);
    }

    readFile(response, file);
};

// Servidor - Crie e Configura:
var server = http.createServer(callback);
server.listen(3000, function() {
    console.log(`Servidor iniciado em http://localhost:3000/ ....`);
});