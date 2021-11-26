const express = require("express");
const app = express();
const connection = require("./database/database")
const Question = require("./database/Questions")
const Answer = require("./database/Answers")


// Banco de dados
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão realizada!")
    })
    .catch((msgerro)=>{
        console.log(msgerro);
    })
// Usando EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota que renderiza a pagina inicial junto das perguntas.
app.get("/",(req,res)=>{  

    Question.findAll({
        raw: true, 
        order:[ ['id','DESC']
    ]}).then(question =>{
        res.render("index",{
            pergunta: question
        });
    });

    
});
// Rota  que renderiza o formulário de criação da pergunta
app.get("/perguntar",(req,res)=>{  
    res.render("perguntar")
});

// criando pergunta no banco de dados 
app.post("/sendquestion",(req,res)=>{  
    var tituloq = req.body.titleq;
    var questiondesc = req.body.questiondesc;

    Question.create({
        titulo: tituloq,
        descricao: questiondesc
    }).then(()=>{
        res.redirect("/")
    });
});

// Essa rota pega o ID recebido pelo botão do index.ejs
// A partir dai, procura-se no banco de dados uma pergunta de ID igual
// Caso não haja ID a página redireciona para a home.
// Caso contrário a pagina é renderizada baseada no ID, junto com o titulo
// e descrição .

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;

    Question.findOne({
        where:{id: id}
    }).then(question =>{
        if(question != undefined){

            Answer.findAll({
                where: {perguntaId : question.id},
                order: [['id','DESC'] ]

            }).then(answers =>{
                res.render("pergunta",{
                    pergunta: question,
                    respostas: answers
                    });


            });        
        }else{
            res.redirect("/");
        }
    })
})

// Rota que cria a resposta no banco de dados na tabela Answer
app.post("/responder",(req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Answer.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    
    });


});

app.listen(8080,()=>{
    console.log("servidor rodando")
});