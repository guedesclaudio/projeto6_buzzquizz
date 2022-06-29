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
    //colocando as respostas em uma array e embaralhando a array para a ordem ficar aleatória
    let RespostasArray= []
    for(let index= 0 ; index< quizzesArray[quizz.id].questions[0].answers.length ; index++){
        RespostasArray.push(quizzesArray[quizz.id].questions[0].answers[index])
    }
    RespostasArray.sort(comparador)

    document.querySelector('.quiz').innerHTML = `
        <div class="ImgTopoQuiz">
            <img class="ImagemQuizBanner" src="${quizzesArray[quizz.id].image}" alt="">
            <h2 class="TituloQuizBanner">${quizzesArray[quizz.id].title}</h2>
        </div>
        <div class="QeAQuiz">
            <div class="Pergunta">
                <h3>${quizzesArray[quizz.id].questions[0].title}</h3>
            </div>
            <div class="Resposta">
                <div class="RespostaColuna1">
                    <div class="Resposta1">
                        <img class="imgresposta" src="${RespostasArray[0].image}" alt="">
                        <span>${RespostasArray[0].text}</span>
                    </div>
                    <div class="Resposta2">
                        <img class="imgresposta" src="${RespostasArray[1].image}" alt="">
                        <span>${RespostasArray[1].text}</span>
                    </div>
                </div>
            </div>
        </div>`
        if(RespostasArray[2] !== undefined){
            document.querySelector('.Resposta').innerHTML +=
            `<div class="RespostaColuna2">
                    <div class="Resposta3">
                        <img class="imgresposta" src="${RespostasArray[2].image}" alt="">
                        <span>${RespostasArray[2].text}</span>
                    </div>
                </div>`
        }
        if(RespostasArray[3] !== undefined){
            document.querySelector('.RespostaColuna2').innerHTML +=
            `   <div class="Resposta4">
                    <img class="imgresposta" src="${RespostasArray[3].image}" alt="">
                    <span>${RespostasArray[3].text}</span>
                </div>`
        }
}
/*FIM QUIZ*/




/*INÍCIO CRIAÇÃO*/


/*FIM CRIAÇÃO*/
