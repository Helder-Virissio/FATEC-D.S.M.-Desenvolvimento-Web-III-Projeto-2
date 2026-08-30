// Busca e insere os dados do aluno no rodapé
fetch('/dados/aluno.json')
    .then(function(response){
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados do aluno');
        }
        return response.json();
    })
    .then(function(dados){
        var container = document.getElementById('alunoJSON');
        if (container) {
            container.innerHTML = 
                '<b style="font-family: Manrope;">Nome:</b> ' + dados.nomes + '<br>' +
                '<b style="font-family: Manrope;">Curso:</b> ' + dados.curso + '<br>' +
                '<b style="font-family: Manrope;">Semestre:</b> ' + dados.semestre + '<br>' +
                '<b style="font-family: Manrope;">Turno:</b> ' + dados.turno + '<br>';
        }
    })
    .catch(function(erro){
        console.error('Falha no fetch:', erro);
    });