/*JavaScript organizado de acordo com ordem de aparição na página
/*Sendo disposto com 
/* 1° - Variáveis globais
/* 2° - Home page
/* 3° - Tela do quiz
/* 4° - Criação de quiz*/

/*INÍCIO GLOBAIS*/

let DOM_home = document.querySelector(".home").innerHTML

/*FIM GLOBAIS*/




/*INÍCIO HOME*/

function toggleHome() {  // função pra fazer aparecer e sumir a Homepage
    if (DOM_home===""){ // caso esteja vazia
        DOM_home = "."//aqui entra todo html da home
    } else { //caso esteja na tela
        DOM_home = "" // sai da tela pra abrir espaço
    }
}

function goToQuizz(quizz) { // função pra limpar a home e abrir o quiz
    toggleHome()

}


/*FIM HOME*/




/*INÍCIO QUIZ*/


/*FIM QUIZ*/




/*INÍCIO CRIAÇÃO*/


/*FIM CRIAÇÃO*/
