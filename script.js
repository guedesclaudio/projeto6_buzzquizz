/*JavaScript organizado de acordo com ordem de aparição na página
/*Sendo disposto com 
/* 1° - Variáveis globais
/* 2° - Home page
/* 3° - Tela do quiz
/* 4° - Criação de quiz*/

/*INÍCIO GLOBAIS*/

let quizObjeto = {
	title: "",
	image: "",
	questions: [],//recebe templateQuestion
	levels: []//recebe templateLevel
}

let templateQuestion = {
        title: "",
        color: "#123456",
        answers: []
}

let templateAnswer = {
    text: "",
    image: "",
    isCorrectAnswer: true
}

let templateLevel = {
    title: "",
    image: "",
    text: "",
    minValue: 0
}

let DOM_home = document.querySelector(".home").innerHTML
let quizzesArray = []
let RespostasArray= []
let indice = 0

/* variáveis de criação */
let criarTitulo 
let criarImagem 
let criarNmrPerguntas 
let criarNmrNiveis 
let DOM_perguntas
let DOM_niveis

// variáveis criar perguntas // 
let textoPergunta
let corFundoPergunta
let respostaCorreta
let respostaCorretaURL
let respostaIncorreta_1
let respostaIncorretaURL_1
let respostaIncorreta_2
let respostaIncorretaURL_2
let respostaIncorreta_3
let respostaIncorretaURL_3

let nmrPergunta

// variáveis criar níveis //
let tituloNivel
let minValueNivel
let urlNivel
let decricaoNivel

let nmrNivel

/*FIM GLOBAIS*/

function refresh() {
    window.location.reload()
}
function comparador() { 
	return Math.random() - 0.5; 
}

/*INÍCIO HOME*/

function toggleHome() {  // função pra fazer aparecer e sumir a Homepage
    if (DOM_home === ""){ // caso esteja vazia
        document.querySelector(".home").innerHTML = "."//aqui entra todo html da home 
        //modifiquei aqui porque a função não estava sumindo o conteúdo
    } else { //caso esteja na tela
        document.querySelector(".home").innerHTML = "" // sai da tela pra abrir espaço
    }
}

//função para obter os quizzes da api
function ObterQuizzes(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes')
    promise.then(ObterQuizzesSucesso)
}
//função para renderizar os quizzes e criar uma array com todos os objetos dos quizzes
//elemento.data[i] === quizzesArray[i]
function ObterQuizzesSucesso(elemento){
    for(let i = 0; i < elemento.data.length; i++){
        quizzesArray.push(elemento.data[i])
        const quizzCardtemplate = `
        <div class="quizzCard" id="${i}" onclick="goToQuizz(this)">
            <img src=${elemento.data[i].image}>
            <span>${elemento.data[i].title}</span>
        </div>`
        document.querySelector('.quizzCards').innerHTML += quizzCardtemplate
    }
    

}
ObterQuizzes()
/*FIM HOME*/




/*INÍCIO QUIZ*/
function goToQuizz(quizz) { // função pra limpar a home e abrir o quiz e renderizar as perguntas, as respostas e o banner no topo do quiz
    //a função também serve para pegar o id do quiz
    // quizz.id === i
    toggleHome()
    document.querySelector('.quiz').innerHTML = `
        <div class="ImgTopoQuiz">
            <img class="ImagemQuizBanner" src="${quizzesArray[quizz.id].image}" alt="">
            <h2 class="TituloQuizBanner">${quizzesArray[quizz.id].title}</h2>
        </div>`
        //for para adicionar todas as perguntas
    for(indice= 0 ; indice< quizzesArray[quizz.id].questions.length ; indice++){
        RespostasArray.push([])
        //colocando as respostas em uma array e embaralhando a array para a ordem ficar aleatória
        for(let index= 0 ; index< quizzesArray[quizz.id].questions[indice].answers.length ; index++){
            RespostasArray[indice].push(quizzesArray[quizz.id].questions[indice].answers[index])
        }
        RespostasArray[indice].sort(comparador)
        document.querySelector('.quiz').innerHTML += `
            <div class="QeAQuiz">
                <div class="Pergunta">
                    <h3>${quizzesArray[quizz.id].questions[indice].title}</h3>
                </div>
                <div class="Resposta questao${indice}">
                    <div class="RespostaColuna1">
                        <div class="Resposta1" onclick="VerificarResposta(this)">
                            <img class="imgresposta" src="${RespostasArray[indice][0].image}" alt="">
                            <span>${RespostasArray[indice][0].text}</span>
                        </div>
                    </div>
                    <div class="RespostaColuna2">
                        <div class="Resposta2" onclick="VerificarResposta(this)">
                            <img class="imgresposta" src="${RespostasArray[indice][1].image}" alt="">
                            <span>${RespostasArray[indice][1].text}</span>
                        </div>
                    </div>
                    
                </div>
            </div>`
            if(RespostasArray[indice][2] !== undefined){
                document.querySelector('.questao'+indice+' .RespostaColuna1').innerHTML +=
                    `<div class="Resposta3" onclick="VerificarResposta(this)">
                        <img class="imgresposta" src="${RespostasArray[indice][2].image}" alt="">
                        <span>${RespostasArray[indice][2].text}</span>
                    </div>`

            }
            if(RespostasArray[indice][3] !== undefined){
                document.querySelector('.questao'+indice+' .RespostaColuna2').innerHTML +=
                `   <div class="Resposta4" onclick="VerificarResposta(this)">
                        <img class="imgresposta" src="${RespostasArray[indice][3].image}" alt="">
                        <span>${RespostasArray[indice][3].text}</span>
                    </div>`
                    
            }
    }
    
}
//função para selecionar resposta e esbranquiçar as outras
//e para verificar se a resposta ta certa ou errada
function VerificarResposta(elemento){ //verificar jeito melhor de fazer
    let ClasseNumeroDaQuestao = elemento.parentNode.parentNode.classList[1]
    if(elemento.classList.contains('esbranquicado') === false){
        document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta1').classList.add('esbranquicado')
        document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta2').classList.add('esbranquicado')
        if(RespostasArray[ClasseNumeroDaQuestao[ClasseNumeroDaQuestao.length-1]][2] !== undefined){
            document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta3').classList.add('esbranquicado')
        }
        if(RespostasArray[ClasseNumeroDaQuestao[ClasseNumeroDaQuestao.length-1]][3] !== undefined){
            document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta4').classList.add('esbranquicado')
        }
        elemento.classList.remove('esbranquicado')
    }

    
    switch(true){
        case RespostasArray[ClasseNumeroDaQuestao[ClasseNumeroDaQuestao.length-1]][0].isCorrectAnswer:
            document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta1').classList.add('acertou')
            document.querySelector('.'+ClasseNumeroDaQuestao).classList.add('errou')
            break
        case RespostasArray[ClasseNumeroDaQuestao[ClasseNumeroDaQuestao.length-1]][1].isCorrectAnswer:
            document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta2').classList.add('acertou')
            document.querySelector('.'+ClasseNumeroDaQuestao).classList.add('errou')
            break
        case RespostasArray[ClasseNumeroDaQuestao[ClasseNumeroDaQuestao.length-1]][2].isCorrectAnswer:
            document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta3').classList.add('acertou')
            document.querySelector('.'+ClasseNumeroDaQuestao).classList.add('errou')
            break
        case RespostasArray[ClasseNumeroDaQuestao[ClasseNumeroDaQuestao.length-1]][3].isCorrectAnswer:
            document.querySelector('.'+ClasseNumeroDaQuestao +' .Resposta4').classList.add('acertou')
            document.querySelector('.'+ClasseNumeroDaQuestao).classList.add('errou')
            break
    }
    let NumeroDaQuestao = ClasseNumeroDaQuestao[ClasseNumeroDaQuestao.length-1]
    NumeroDaQuestao = Number(NumeroDaQuestao)
    const proximonumero = (NumeroDaQuestao + 1)
    const elementoatual = elemento.parentNode.parentNode.parentNode.querySelector('.Pergunta')
    const ultimoelemento = document.querySelector('.questao'+(RespostasArray.length - 1)).parentNode.querySelector('.Pergunta')
    if(elementoatual === ultimoelemento){
        return
    }
    const proximoelemento = document.querySelector('.questao'+proximonumero)//.parentNode.querySelector('.Pergunta')
    function scroll (){
        proximoelemento.scrollIntoView({behavior: "smooth", block:'end'})
    }
    setTimeout(scroll, 2000)
}

/*FIM QUIZ*/




/*INÍCIO CRIAÇÃO*/

//

function goToCriar() {
    toggleHome()
    document.querySelector('.criacao').innerHTML = 
    `<div class="infoCriar">
        <span>Comece pelo começo</span>
        <div class="caixaInput">
            <input class='titulo' type="text" placeholder="  Escolha o titulo do seu quizz">
            <input class='imageURL' type="text" placeholder="  Insira a URL da imagem do seu quizz">
            <input class='nmrPerguntas' type="text" placeholder="  Quantas perguntas terá seu quizz?">
            <input class='nmrNiveis' type="text" placeholder="  Quantos níveis terá seu quizz?">
        </div>
        <button class="goToPerguntas" onclick="goToCriarPerguntas()">Prosseguir para criar perguntas</button>
    </div>`
    criarTitulo = document.querySelector(".titulo")
    criarImagem = document.querySelector(".imageURL")
    criarNmrPerguntas = document.querySelector(".nmrPerguntas")
    criarNmrNiveis = document.querySelector(".nmrNiveis")

}

//

function goToCriarPerguntas() { //verifica 1- se os campos foram preenchidos 2- se foram preenchidos corretamente.
        if (criarTitulo.value.length > 65 || criarTitulo.value.length < 20 || Number(criarNmrNiveis.value) < 2 || Number(criarNmrPerguntas.value) < 3) {
            alert("Os dados são inválidos. Preencha-os corretamente.\nMínimo de níveis: 2\nMínimo de perguntas: 3\nTítulo: entre 20 e 65 caracteres")
        } else {
            document.querySelector('.criacao').innerHTML = `<div class="perguntasCriar">
            <span>Crie suas perguntas</span>
            <div class="caixaInput">
                <span>Pergunta 1</span>
                
                <input class='textoPergunta' type="text" placeholder="  Texto da pergunta">
                <input class='corFundoPergunta' type="text" placeholder="  Cor de fundo da pergunta">
                <span>Resposta correta</span>
                <input class='respostaCorreta' type="text" placeholder="  Resposta correta">
                <input class='respostaCorretaURL' type="text" placeholder="  URL da imagem">
                <span>Respostas incorretas</span>
                <input class='respostaIncorreta_1' type="text" placeholder="  Resposta incorreta 1">
                <input class='respostaIncorretaURL_1' type="text" placeholder="  URL da imagem 1">
                <br>
                <input class='respostaIncorreta_2' type="text" placeholder="  Resposta incorreta 2">
                <input class='respostaIncorretaURL_2' type="text" placeholder="  URL da imagem 2">
                <br>
                <input class='respostaIncorreta_3' type="text" placeholder="  Resposta incorreta 3">
                <input class='respostaIncorretaURL_3' type="text" placeholder="  URL da imagem 3">
            </div>` // tela de perguntas (3.2)
            

            for (let i = 1; i < Number(criarNmrPerguntas.value); i++) {
                document.querySelector('.perguntasCriar').innerHTML += `<div class="caixaInputMini">
                <span>Pergunta ${i + 1}</span>
                <ion-icon name="create-outline" onclick="validaTudoPerguntas(this)"></ion-icon>
            </div>`
            }

            document.querySelector('.perguntasCriar').innerHTML += `<button class="goToNiveis" onclick="goToCriarNiveis()">Prosseguir para criar níveis</button>
            </div>`

            //------------------------------------//
            // Enviando dados pro Objeto do Quiz  //
            //
            quizObjeto.title = criarTitulo.value 
            quizObjeto.image = criarImagem.value      
            for (let i = 0; i < Number(criarNmrPerguntas.value); i++){
                quizObjeto.questions.push(templateQuestion)
            }
            for (let i = 0; i < Number(criarNmrNiveis.value); i++){
                quizObjeto.levels.push(templateLevel)
            }
        }
}

//

function goToCriarNiveis() { 
    document.querySelector('.criacao').innerHTML = `   <div class="niveisCriar">
    <span>Agora, decida os níveis</span>
    <div class="caixaInput">
        <span>Nível 1</span>
        
        <input class='tituloNivel' type="text" placeholder="  Título do nivel">
        <input class='minValueNivel' type="text" placeholder="  % mínima de acerto">
        <input class='urlNivel' type="text" placeholder="  URL da imagem do nível">
        <input class='descricaoNivel' type="text" placeholder="  Descrição do nível">
        </div>
        `     
        for (let i = 1; i < Number(criarNmrNiveis.value); i++) {
            document.querySelector('.niveisCriar').innerHTML += `<div class="caixaInputMini">
            <span>Nível ${i + 1}</span>
            <ion-icon name="create-outline" onclick="expandirCaixaInputN(this)"></ion-icon>
        </div>`
        }

        document.querySelector('.niveisCriar').innerHTML += `<button class="goToSucesso" onclick="goToSucessoCriar()">Finalizar Quizz</button>
        </div>`

}

//

function getInfoPergunta(){
    textoPergunta = document.querySelector(".textoPergunta")
    corFundoPergunta = document.querySelector(".corFundoPergunta")
    respostaCorreta = document.querySelector(".respostaCorreta")
    respostaCorretaURL = document.querySelector(".respostaCorretaURL")
    respostaIncorreta_1 = document.querySelector(".respostaIncorreta_1")
    respostaIncorretaURL_1 = document.querySelector(".respostaIncorretaURL_1")
    respostaIncorreta_2 = document.querySelector(".respostaIncorreta_2")
    respostaIncorretaURL_2 = document.querySelector(".respostaIncorretaURL_2")
    respostaIncorreta_3 = document.querySelector(".respostaIncorreta_3")
    respostaIncorretaURL_3 = document.querySelector(".respostaIncorretaURL_3")
}

//

function getInfoNivel(){
    tituloNivel = document.querySelector(".tituloNivel")
    minValueNivel = document.querySelector(".minValueNivel")
    urlNivel = document.querySelector(".urlNivel")
    decricaoNivel = document.querySelector(".descricaoNivel")
}

//

function expandirCaixaInputP(iconeExpandir) {
    DOM_perguntas = document.querySelectorAll(".perguntasCriar div");
    const miniCaixaInput = iconeExpandir.parentNode;
    nmrPergunta = miniCaixaInput.querySelector("span").innerHTML
    console.log(DOM_perguntas)
    for(let i = 0; i < DOM_perguntas.length; i++){
        console.log(DOM_perguntas[i])
        if (DOM_perguntas[i].classList.contains("caixaInput")){
            toggleCaixaInput(DOM_perguntas[i])
        }
    }
    toggleCaixaInput(miniCaixaInput)
    miniCaixaInput.innerHTML = `<span>${nmrPergunta}</span>
                        
    <input class='textoPergunta' type="text" placeholder="  Texto da pergunta">
    <input class='corFundoPergunta' type="text" placeholder="  Cor de fundo da pergunta">
    <span>Resposta correta</span>
    <input class='respostaCorreta' type="text" placeholder="  Resposta correta">
    <input class='respostaCorretaURL' type="text" placeholder="  URL da imagem">
    <span>Respostas incorretas</span>
    <input class='respostaIncorreta_1' type="text" placeholder="  Resposta incorreta 1">
    <input class='respostaIncorretaURL_1' type="text" placeholder="  URL da imagem 1">
    <br>
    <input class='respostaIncorreta_2' type="text" placeholder="  Resposta incorreta 2">
    <input class='respostaIncorretaURL_2' type="text" placeholder="  URL da imagem 2">
    <br>
    <input class='respostaIncorreta_3' type="text" placeholder="  Resposta incorreta 3">
    <input class='respostaIncorretaURL_3' type="text" placeholder="  URL da imagem 3">
</div>`

}

//

function expandirCaixaInputN(iconeExpandir) {
    DOM_niveis = document.querySelectorAll(".niveisCriar div");
    const miniCaixaInput = iconeExpandir.parentNode;
    nmrNivel = miniCaixaInput.querySelector("span").innerHTML
    console.log(DOM_niveis)
    for(let i = 0; i < DOM_niveis.length; i++){
        console.log(DOM_niveis[i])
        if (DOM_niveis[i].classList.contains("caixaInput")){
            toggleCaixaInput(DOM_niveis[i])
        }
    }
    toggleCaixaInput(miniCaixaInput)
    miniCaixaInput.innerHTML = `<span>${nmrNivel}</span>
        <input class='tituloNivel' type="text" placeholder="  Título do nivel">
        <input class='minValueNivel' type="text" placeholder="  % mínima de acerto">
        <input class='urlNivel' type="text" placeholder="  URL da imagem do nível">
        <input class='descricaoNivel' type="text" placeholder="  Descrição do nível">`

}

//

function toggleCaixaInput(caixaInput){
    if (caixaInput.classList.contains("caixaInputMini")){
        caixaInput.classList.remove("caixaInputMini")
        caixaInput.classList.add("caixaInput")
    } else {
        caixaInput.classList.add("caixaInputMini")
        caixaInput.classList.remove("caixaInput")
        caixaInput.classList.add("Concluido")
        
        if (caixaInput.parentNode.classList.contains("perguntasCriar")){
        caixaInput.innerHTML = ` <span>Pergunta concluída</span>`
    } else {
        caixaInput.innerHTML = ` <span>Nível definido</span>`
        }
    }
}

function goToSucessoCriar() {
    document.querySelector('.criacao').innerHTML = `        <div class="sucessoCriar">
    <span>Seu quizz está pronto!</span>
    <div class="previewCard">
        <img src="${quizObjeto.image}" alt="">
        <span>${quizObjeto.title}</span>
    </div>
    <button class="" onclick="trabalhandoNisso()">Acessar Quizz</button>
    <div class="backHome" onclick="refresh()">Voltar pra home</div>
</div>`
}
/*FIM CRIAÇÃO*/


function trabalhandoNisso() {
    alert("Essa função ainda não está pronta")
}



//CRIAÇÃO DAS VALIDAÇÕES DAS PERGUNTAS - CLAUDIO
function validaPergunta() { 
    const perguntaCriada = document.querySelector("input.textoPergunta").value 
    
    if (perguntaCriada.length < 20) {
        alert("As perguntas devem possuir no minímo 20 caracteres")
        return false
    }
}

function validaCorDeFundo() {
    const corDeFundo = document.querySelector("input.corFundoPergunta").value //talvez precise alterar para let
    const letrasMaiusculas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                             "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const letrasMinusculas = []
    for (let i = 0; i < letrasMaiusculas.length; i++) {
        let caracterMinusculo = letrasMaiusculas[i].toLowerCase()
        letrasMinusculas.push(caracterMinusculo)
    }
    const numeros = ["0","1","2","3","4","5","6","7","8","9"]

    if (corDeFundo.length === 7 && corDeFundo[0] === "#") {
        //console.log("passou no primeiro")
        for (let i = 1; i < corDeFundo.length; i++) {
            if (letrasMaiusculas.indexOf(corDeFundo[i]) > -1 || letrasMinusculas.indexOf(corDeFundo[i]) > -1 || numeros.indexOf(corDeFundo[i]) > -1) console.log("ok")
            else {
                alert("Digite uma cor de fundo corretamente")
                return false
            }

        }
    }
    else return false
}

/*Acho que nao vai precisar dessa
function validaResposta() {
    const resposta = prompt("Digite a resposta") //talvez precise alterar para let
    if (resposta === "") { //talvez precise acrescentar null e undefined para cobrir tudo
        console.log("resposta ta vazia")
        // return false
    }
}*/

function validaURL() {
    const urlrespostaCorreta = document.querySelector("input.respostaCorretaURL").value
    const urlrespostaIncorreta1 = document.querySelector("input.respostaIncorretaURL_1").value
    const urlrespostaIncorreta2 = document.querySelector("input.respostaIncorretaURL_2").value
    const urlrespostaIncorreta3 = document.querySelector("input.respostaIncorretaURL_3").value
    const resposta1 = document.querySelector("input.respostaIncorreta_1").value 
    const resposta2 = document.querySelector("input.respostaIncorreta_2").value 
    const resposta3 = document.querySelector("input.respostaIncorreta_3").value 

    try {let url1 = new URL(urlrespostaCorreta) } 
    catch(err) {

        alert("Digite o link válido para a resposta correta")
        return false
    }
    try {let url2 = new URL(urlrespostaIncorreta1)}
    catch(err) {
        if (resposta1.trim() === "" && urlrespostaIncorreta1.trim() === "") {return true}
        alert("Digite o link vaĺido para a resposta incorreta 1")
        return false
    }
    try {let url3 = new URL(urlrespostaIncorreta2)}
    catch(err) {
        if (resposta2.trim() === "" && urlrespostaIncorreta2.trim() === "") {return true}
        alert("Digite o link vaĺido para a resposta incorreta 2")
        return false
    }
    try {let url4 = new URL(urlrespostaIncorreta3)}
    catch(err) {
        if (resposta3.trim() === "" && urlrespostaIncorreta3.trim() === "") {return true}
        alert("Digite o link vaĺido para a resposta incorreta 3")
        return false
    }
    
 }

 function validaRespostaCorreta() {
    let respostaCorreta = document.querySelector("input.respostaCorreta").value ;  respostaCorreta = respostaCorreta.trim() ;
    if (respostaCorreta === "" ) return false 
 }

 function validaQtdRespostasIncorretas() {
    const respostasIncorretas = []
    let resposta1 = document.querySelector("input.respostaIncorreta_1").value ; resposta1 = resposta1.trim() ;
    let resposta2 = document.querySelector("input.respostaIncorreta_2").value ; resposta2 = resposta2.trim() ;
    let resposta3 = document.querySelector("input.respostaIncorreta_3").value ; resposta3 = resposta3.trim() ;
    respostasIncorretas.push(resposta1, resposta2, resposta3)
    console.log(respostasIncorretas)
    if (respostasIncorretas[0] === "" && respostasIncorretas[1] === "" && respostasIncorretas[2] === "") {
        alert("Precisa de pelo menos uma resposta incorreta")
        return false
    }
 }

 //Essa é a ideia final
function validaTudoPerguntas(icone) {
    if (validaPergunta() === false ||
        validaCorDeFundo() === false ||
        validaURL() === false ||
        validaRespostaCorreta() === false || 
        validaQtdRespostasIncorretas() === false) {
        alert("Digite corretamente")
        return
    }
    console.log("passou")
    expandirCaixaInputP(icone)
}
 
//FIM DA CRIAÇÃO DA VALIDAÇÃO DE PERGUNTAS - CLAUDIO

//CRIAÇÃO DA VALIDAÇÃO DOS NÍVEIS - CLAUDIO

function validaTituloNivel() {
    const tituloNivel = prompt("Digite o titulo")
    if (tituloNivel.length < 10) {
        alert("Digite pelo menos 10 caracteres para o título") 
        return false
    }
}

function porcentagemAcerto() {
    let porcentagemNivel = prompt ("Digite a porcentagem minima")
    porcentagemNivel = Number(porcentagemNivel)
    console.log(porcentagemNivel)
    if (porcentagemNivel < 0 || porcentagemNivel > 100 || isNaN(porcentagemNivel)) {
        alert("Digite uma porcentagem entre 0 e 100")
        return false
    }
}

function validaUrlNivel() {
    const urlNivel = ""

    try {let url = new URL(urlNivel) } 
    catch(err) {
        alert("Digite o link válido ")
        return false
    }
}

function validaDescricaoNivel() {
    const descricaoNivel = prompt("Digite o titulo")
    if (descricaoNivel.length < 30) {
        alert("Digite pelo menos 30 caracteres para a descrição do nível")
        return false
    }
}


function validaTudoNiveis(icone) {
    if (validaTituloNivel() === false ||
        porcentagemAcerto() === false ||
        validaUrlNivel() === false ||
        validaDescricaoNivel() === false) {
            return
        }
    console.log("passou")
    expandirCaixaInputN(icone)
}

//FIM DA CRIAÇÃO DA VALIDAÇÃO DOS NÍVEIS - CLAUDIO