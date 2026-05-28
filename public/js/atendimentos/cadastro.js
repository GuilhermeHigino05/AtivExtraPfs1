document.addEventListener('DOMContentLoaded', () => {
    let btnCadastro = document.getElementById('btnCadastrar');

    let btnBuscar = document.getElementById('btnBuscarVeiculo');

    btnBuscar.addEventListener('click', () => {
        let placa = document.getElementById('inputPlaca');
        
        if(placa.value != '' && placa){
            fetch('/atendimento/buscarVeiculo' + `?busca=${placa.value}`, {
            }).then(response => {
                return response.json()
            }).then( data => {
                if(data && data.veiculo){
                    document.getElementById('inputModelo').value = data.veiculo.veiModelo;
                    document.getElementById('inputMarca').value = data.veiculo.veiMarca;
                    document.getElementById('inputAno').value = data.veiculo.veiAno;
                    document.getElementById('inputKilometragem').value = data.veiculo.veiKilometragem;
                }else{
                    alert('Veículo não cadastrado preencha todos os inputs manualmente');
                }
            })
        }else{
            alert('Preencha esse campo');
            placa.style.borderColor ='#ac0000'
        }
    })

    btnCadastro.addEventListener('click', () => {
        let modelo = document.getElementById('inputModelo')
        let marca = document.getElementById('inputMarca')
        let ano = document.getElementById('inputAno')
        let km = document.getElementById('inputKilometragem');
        let placa = document.getElementById('inputPlaca');
        let selectServ = document.getElementById('selectServicos');
        let listavalid = [];

        if(!modelo.value){
            listavalid.push(modelo)
        }
        if(!marca.value){
            listavalid.push(modelo)
        }
        if(!ano.value){
            listavalid.push(ano)
        }
        if(!km.value){
            listavalid.push(km)
        }
        if(!placa.value){
            listavalid.push(placa)
        }
        if(!selectServ.value){
            listavalid.push(selectServ)
        }
        
        if(listavalid.length == 0){
            let selectedOptions = Array.from(selectServ.selectedOptions);
            let servicosIds = selectedOptions.map(opt => opt.value);
            let servicosValores = selectedOptions.map(opt => parseFloat(opt.dataset.valor));

            fetch('/atendimento/cadastrar', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    placa: placa.value,
                    marca: marca.value,
                    modelo: modelo.value,
                    ano: ano.value,
                    km: km.value,
                    servicoId: servicosIds,
                    servicoVal: servicosValores
                })
            }).then(response => {
                return response.json()
            }).then(data => {
                if(data.ok){
                    alert(data.msg);
                    window.location.reload()
                }else{
                    alert(data.msg)
                }
            })
        }else{
            listavalid.forEach(value => {
                value.style.borderColor = 'Red'
            });
        }
    })
})