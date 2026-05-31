//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const homeRouter = require('./routes/homeRoute');
const loginRouter = require('./routes/loginRoute');
const usuarioRouter = require('./routes/usuariosRoute');
const servicoRouter = require('./routes/servicosRoute');
const veiculoRouter = require('./routes/veiculosRoute');
const atendimentoRouter = require('./routes/atendimentoRoute');
const AuthMiddleware = require('./middlewares/AuthMiddleware')
const cookieParser = require('cookie-parser');

const app = express();

//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))
app.use(cookieParser());
//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');


//Configuração de onde ficará nossas views
app.set('views', './views');


//define um title generico para todas as nossas páginas
// a variavel title será chamada no nosso arquivo layout na tag title
app.locals.title = "Programação FullStack 1";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração da nossa página de layout
app.set('layout', './layout');
app.use(expressLayouts);
let auth = new AuthMiddleware
//definindo as rotas que o nosso sistema vai reconhecer através da url do navegador

app.use('/login', loginRouter);
app.use(auth.validaUser)
app.use('/', homeRouter)
app.use(auth.validaUserAdmin)
app.use('/servicos', servicoRouter);
app.use('/usuarios', usuarioRouter);
app.use('/veiculos', veiculoRouter);
app.use('/atendimento', atendimentoRouter);
//ponto de inicio do nosso servidor web
const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});
