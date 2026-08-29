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
    '.jpeg':    'image/jpeg',
    '.png':     'image/png',
    '.pdf':     'application/pdf',
    '.mp4':     'video/mp4'
};
 
// Rotas:
const routes = {
    '/': 'index.html',
    '/algebra': 'algebra.html',
    '/tp2': 'tp2.html',
    '/dbnr': 'dadosNRel.html',
    '/dw3': 'dw3.html',
    '/gestao-agil': 'gestaoAgil.html',
    '/ihc': 'ihc.html',
    '/ingles': 'ingles.html',
    '/tp2': 'tp2.html',
    '/grade': 'pdf/Matriz-curricular-Software-Multiplataforma-29-12-2021.pdf'
};
 
// Abrir Arquivos:
function readFile(response, file){
    fs.readFile(file, function(err, data){
        if(err){
            response.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
            return fs.createReadStream(
                path.join(publicDir, 'erro404.html')
            ).pipe(response);
        }
 
        var extension = path.extname(file).toLowerCase();
        var contentType = contentTypes[extension] || 'application/octet-stream';
 
        response.writeHead(200, {'Content-Type':contentType});
        response.end(data);
    });
}
 
// Funcao CallBack para utilizar no server http:
var callback = function(request, response){
    var pathname = decodeURIComponent(url.parse(request.url).pathname);
 
    // ROTAS:
    if(routes[pathname])
        return readFile(response, path.join(publicDir, routes[pathname]));
 
    // Arquivos Estaticos:
    var file = path.join(publicDir, pathname);
 
    // Impedir acesso fora da pasta public:
    if(!file.startsWith(publicDir))
        return readFile(response, path.join(publicDir, 'erro404.html'));
 
    readFile(response, file);
}
 
// Servidor - Crie e Configura:
var server = http.createServer(callback);
server.listen(3000);
console.log(`Servidor iniciado em http://localhost:3000/ ....`)