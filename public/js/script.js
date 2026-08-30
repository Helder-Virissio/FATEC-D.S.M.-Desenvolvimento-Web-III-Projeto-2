fetch('/dados/aluno.json')
    .then(function(response){
        return response.json();
    })
    .then(function(dados){
        document.getElementById('alunoJSON').innerHTML =
            '<b style="font-family: Manrope;">Nome:</b> ' + dados.nomes + '<br>' +
            '<b style="font-family: Manrope;">Curso:</b> ' + dados.curso + '<br>' +
            '<b style="font-family: Manrope;">Semestre:</b> ' + dados.semestre + '<br>' +
            '<b style="font-family: Manrope;">Turno:</b> ' + dados.turno + '<br>'
    });