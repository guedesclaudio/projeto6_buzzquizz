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




/*INÍCIO HOME*/

function toggleHome() {  // função pra fazer aparecer e sumir a Homepage
    if (DOM_home === ""){ // caso esteja vazia
        document.querySelector(".home").innerHTML = "."//aqui entra todo html da home //modifiquei aqui porque a função não estava sumindo o conteúdo
    } else { //caso esteja na tela
        document.querySelector(".home").innerHTML = "" // sai da tela pra abrir espaço
    }
}
function goToQuizz(quizz) { // função pra limpar a home e abrir o quiz
    console.log(quizz)
    toggleHome()
    document.querySelector('.quiz').innerHTML = `
        <div class="ImgTopoQuiz">
            <h2>${quizz.querySelector('span').innerHTML}</h2>
        </div>
        <div class="QeAQuiz">
            <div class="Pergunta">
                <h3>Pergunta Pergunta</h3>
            </div>
            <div class="Resposta">
                <div class="RespostaColuna1">
                    <div class="Resposta1">
                        <img class="imgresposta" src="./hidef.jpg" alt="">
                        <span>Resposta1</span>
                    </div>
                    <div class="Resposta2">
                        <img class="imgresposta" src="./hidef.jpg" alt="">
                        <span>Resposta2</span>
                    </div>
                </div>
                <div class="RespostaColuna2">
                    <div class="Resposta3">
                        <img class="imgresposta" src="./hidef.jpg" alt="">
                        <span>Resposta3</span>
                    </div>
                    <div class="Resposta4">
                        <img class="imgresposta" src="./hidef.jpg" alt="">
                        <span>Resposta4</span>
                    </div>
                    
                </div>
            </div>
        </div>`

}

function ObterQuizzes(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    promise.then(ObterQuizzesSucesso)
}
function ObterQuizzesSucesso(elemento){
    
    for(let i = 0; i < elemento.data.length; i++){
        quizzesArray.push(elemento.data[i])
        const quizzCardtemplate = `
        <div class="quizzCard" onclick="goToQuizz(this)">
            <img src=${elemento.data[i].image}>
            <span>${elemento.data[i].title}</span>
        </div>`
        document.querySelector('.quizzCards').innerHTML += quizzCardtemplate
    }
    console.log(elemento)
    console.log(quizzesArray)

}
ObterQuizzes()
/*FIM HOME*/




/*INÍCIO QUIZ*/


/*FIM QUIZ*/




/*INÍCIO CRIAÇÃO*/


/*FIM CRIAÇÃO*/
