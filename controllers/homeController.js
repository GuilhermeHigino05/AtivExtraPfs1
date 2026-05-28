
class HomeController {

    constructor() {

    }
    
    homeView(req, res){
        res.render('Home/index', {  });
    }

    naoAutorizadoView(req, res) {
        res.render('Home/nao-autorizado', { layout: 'Home/nao-autorizado' });
    }

}
module.exports = HomeController;