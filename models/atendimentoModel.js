const Database = require("../utils/database");

class AtendimentoModel {
    #id
    #data
    #veiId
    #valTotal
    #placa
    #modelo
    #marca
    #descricao
    #val

    get id () {return this.#id} set id ( id ) { this.#id = id }
    get data () {return this.#data} set data (data) {this.#data = data}
    get veiId () {return this.#veiId} set veiId (veiId) {this.#veiId = veiId} 
    get valTotal () {return this.#valTotal} set valTotal (valTotal) {this.#valTotal = valTotal}
    constructor(id, data, veiId, valTotal, placa, modelo, marca, descricao, val){
        this.#id = id
        this.#data = data
        this.#veiId = veiId
        this.#valTotal = valTotal
        this.#placa = placa
        this.#modelo = modelo
        this.#marca = marca
        this.#descricao = descricao
        this.#val = val
    }

    async List(placa){
        let where = ''
        let values = [];
        if(placa){
            where = " where v.vei_placa = ? "
            values.push(placa);
        }
        let sql = ` select v.vei_placa, v.vei_modelo, v.vei_marca, s.serv_descricao, s.serv_valor
                    from tb_veiculos v
                    inner join tb_atendimento at on v.vei_id = at.vei_id
                    inner join tb_atendimentoservicos ats on at.ate_id = ats.ate_id
                    inner join tb_servicos s on s.serv_id = ats.serv_id
                    ${where}
                    order by v.vei_id;`
        let banco = new Database();
        let result = await banco.ExecutaComando(sql,values);
        return result;
    }

    async Gravar(){
        let sql = 'insert into tb_atendimento (ate_data, vei_id, ate_valortotal) values (?,?,?)'
        const timestamp = Date.now();
        const dataAtual = new Date(timestamp);

        const formatoBrasil = new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short' // ou 'full', 'long', 'medium'
        });
        let values = [formatoBrasil.format(dataAtual), this.#veiId, this.#valTotal]
        let banco = new Database();
        let result = banco.ExecutaComandoLastInserted(sql, values);
        return result;
    }

    toJSON() {
        return {
            id: this.#id,
            data: this.#data,
            veiId: this.#veiId,
            valTotal: this.#valTotal,
            placa: this.#placa,
            modelo: this.#modelo,
            marca: this.#marca,
            descricao: this.#descricao,
            valor: this.#val
        }
    }
}


module.exports = AtendimentoModel