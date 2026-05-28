document.addEventListener('DOMContentLoaded', () => {
    carregarTabela()

    let btn = document.getElementById('buscar');
    btn.addEventListener('click', () => {
        let placa = document.getElementById('placa').value
        carregarTabela(placa)
    })

    function carregarTabela(placa){
        fetch('/atendimento/listarDados' + (placa ? "?busca=" + placa : ""))
        .then(response => {
            return response.json();
        })
        .then( data => {
            montarTabela(data);
        })
    }

    function montarTabela(lista){
        let html =''

        for(let i = 0; i<lista.length; i++){
            html += `
                    <tr>
                        <td>${lista[i].vei_placa}</td>
                        <td>${lista[i].vei_modelo}</td>
                        <td>${lista[i].vei_marca}</td>
                        <td>${lista[i].serv_descricao}</td>
                        <td>${lista[i].serv_valor}</td>
                    </tr>
                `
        }
        document.getElementById('corpo').innerHTML = html
    }
})