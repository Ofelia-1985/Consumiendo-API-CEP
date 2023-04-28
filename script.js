async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCep.json();

        if(consultaCEPConvertida.erro){
            throw Error('CEP não existente!');
        }

        //valores en html x ID(cidade, endereco, estado )
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var complemento = document.getElementById('complemento');

        //valores de la api(localidade, logradouro, uf)
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;
        complemento.value = consultaCEPConvertida.complemento;
        
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
        
    } catch (erro) {
        mensagemErro.innerHTML= `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)

    }
}
var cep = document.getElementById('cep');
cep.addEventListener("focusout",() => buscaEndereco(cep.value));
