document.addEventListener("DOMContentLoaded", function() {

    var btnGravar = document.getElementById("btnGravarVeiculo");


    btnGravar.addEventListener("click", function() {
        gravarVeiculo();
    })
})

function gravarVeiculo() {

    limparErros();
    
    
    var inputPlaca = document.getElementById("inputPlaca");
    var inputModelo = document.getElementById("inputModelo");
    var inputMarca = document.getElementById("inputMarca");
    var inputAno = document.getElementById("inputAno");
    var inputKilometragem = document.getElementById("inputKilometragem");

    var listaErros = [];

    if(inputPlaca.value == "" || inputPlaca.value == undefined || inputPlaca.value == null){
        listaErros.push("inputPlaca");
    }
    if(inputModelo.value == "" || inputModelo.value == undefined || inputModelo.value == null){
        listaErros.push("inputModelo");
    }
    
    if(inputMarca.value == "" || inputMarca.value == undefined || inputMarca.value == null){
        listaErros.push("inputMarca");
    }

    if(inputAno.value == "" || inputAno.value == undefined || inputAno.value == null){
        listaErros.push("inputAno");
    }

    if(inputKilometragem.value == "" || inputKilometragem.value == undefined || inputKilometragem.value == null){
        listaErros.push("inputKilometragem");
    }

    if(listaErros.length == 0){

        var data = {
            placa: inputPlaca.value,
            modelo: inputModelo.value,
            marca: inputMarca.value,
            ano: inputAno.value,
            kilometragem: inputKilometragem.value,
        };

        fetch('/veiculos/cadastrar', { 
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {          
            if(r.ok) {
                inputPlaca.value = "";
                inputModelo.value = "";
                inputMarca.value = "";
                inputAno.value = "";
                inputKilometragem.value = "";

                document.getElementById("alertaSucesso").innerText = r.msg;
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = r.msg;
                document.getElementById("erros").style = "display:block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(listaErros)
    }
}

function mostrarErros(lista) {
    for(var i = 0; i<lista.length; i++){
        let id = lista[i];

        document.getElementById(id).classList.add("campoErro");

        document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

        document.getElementById("erros").style= "display:block";
    }
}

function limparErros() {
    
    document.getElementById("inputPlaca").classList.remove("campoErro");
    document.getElementById("inputModelo").classList.remove("campoErro");
    document.getElementById("inputMarca").classList.remove("campoErro");
    document.getElementById("inputAno").classList.remove("campoErro");
    document.getElementById("inputKilometragem").classList.remove("campoErro");

    document.getElementById("erros").style = "display:none";
    document.getElementById("alertaSucesso").style = "display:none";
}