const Database = require('../utils/database');

const conexao = new Database();

class VeiculoModel {

    #veiId;
    #veiPlaca;
    #veiModelo;
    #veiMarca;
    #veiAno;
    #veiKilometragem

    get veiId(){
        return this.#veiId;
    }

    set veiId(veiId) {
        this.#veiId = veiId;
    }

    get veiPlaca(){
        return this.#veiPlaca;
    }

    set veiPlaca(veiPlaca) {
        this.#veiPlaca = veiPlaca;
    }

    get veiModelo(){
        return this.#veiModelo;
    }

    set veiModelo(veiModelo) {
        this.#veiModelo = veiModelo;
    } 
    
    get veiMarca(){
        return this.#veiMarca;
    }

    set veiMarca(veiMarca) {
        this.#veiMarca = veiMarca;
    } 
    get veiAno(){
        return this.#veiAno;
    }

    set veiAno(veiAno) {
        this.#veiAno = veiAno;
    } 
    get veiKilometragem(){
        return this.#veiKilometragem;
    }

    set veiKilometragem(veiKilometragem) {
        this.#veiKilometragem = veiKilometragem;
    } 
    
    constructor(veiId, veiModelo, veiMarca, veiAno, veiKilometragem, veiPlaca){
        this.#veiId = veiId;
        this.#veiModelo = veiModelo;
        this.#veiMarca = veiMarca;
        this.#veiAno = veiAno;
        this.#veiKilometragem = veiKilometragem;
        this.#veiPlaca = veiPlaca;
    }

    async listar() {
        let sql = "select * from tb_veiculos";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new VeiculoModel(row["vei_id"], row["vei_modelo"], row["vei_marca"], row["vei_ano"], row["vei_kilometragem"], row["vei_placa"]));
        }

        return listaRetorno;
    }

    async buscarPelaPlaca(placa) {
        let sql = "select * from tb_veiculos where vei_placa = ?";
        let rows = await conexao.ExecutaComando(sql, [placa]);

        if(rows.length > 0){
            let row = rows[0];
            return new VeiculoModel(row["vei_id"], row["vei_modelo"], row["vei_marca"], row["vei_ano"], row["vei_kilometragem"], row["vei_placa"]);
        }

        return null;
    }

    async gravarVeiculo() {
        let result = false;
        let sql = "insert into tb_veiculos (vei_placa, vei_modelo, vei_marca, vei_ano, vei_kilometragem) values (?, ?, ?, ?, ?)";
        let valores = [this.#veiPlaca, this.#veiModelo, this.#veiMarca, this.#veiAno, this.#veiKilometragem];

        result = await conexao.ExecutaComandoLastInserted(sql, valores);

        return result;
    }

    toJSON (){
        return {
            veiId: this.#veiId,
            veiAno: this.#veiAno,
            veiMarca: this.#veiMarca,
            veiModelo: this.#veiModelo,
            veiKilometragem: this.#veiKilometragem
        }
    }

}

module.exports = VeiculoModel;