/*JavaScript organizado de acordo com ordem de aparição na página
/*Sendo disposto com 
/* 1° - Variáveis globais
/* 2° - Home page
/* 3° - Tela do quiz
/* 4° - Criação de quiz*/

/*INÍCIO GLOBAIS*/

let DOM_home = document.querySelector(".home").innerHTML
let quizzesArray = []

/*FIM GLOBAIS*/

function refresh() {
    window.location.reload()
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
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    promise.then(ObterQuizzesSucesso)
}
//função para renderizar os quizzes e criar uma array com todos os objetos dos quizzes
//elemento.data[i] === quizzesArray[i]
function ObterQuizzesSucesso(elemento){
    console.log(elemento)
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
            <h2>${quizzesArray[quizz.id].title}</h2>
        </div>
        <div class="QeAQuiz">
            <div class="Pergunta">
                <h3>${quizzesArray[quizz.id].questions[0].title}</h3>
            </div>
            <div class="Resposta">
                <div class="RespostaColuna1">
                    <div class="Resposta1">
                        <img class="imgresposta" src="${quizzesArray[quizz.id].questions[0].answers[0].image}" alt="">
                        <span>${quizzesArray[quizz.id].questions[0].answers[0].text}</span>
                    </div>
                    <div class="Resposta2">
                        <img class="imgresposta" src="${quizzesArray[quizz.id].questions[0].answers[1].image}" alt="">
                        <span>${quizzesArray[quizz.id].questions[0].answers[1].text}</span>
                    </div>
                </div>
                <div class="RespostaColuna2">
                    <div class="Resposta3">
                        <img class="imgresposta" src="${quizzesArray[quizz.id].questions[0].answers[2].image}" alt="">
                        <span>${quizzesArray[quizz.id].questions[0].answers[2].text}</span>
                    </div>
                    <div class="Resposta4">
                        <img class="imgresposta" src="${quizzesArray[quizz.id].questions[0].answers[2].image}" alt="">
                        <span>${quizzesArray[quizz.id].questions[0].answers[3].text}</span>
                    </div>
                </div>
            </div>
        </div>`
}
/*FIM QUIZ*/




/*INÍCIO CRIAÇÃO*/


/*FIM CRIAÇÃO*/
