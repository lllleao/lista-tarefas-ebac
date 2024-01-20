$(document).ready(function () {
    const name = $('.inputUsuario')
    $('.start form').submit(function (e) {
        e.preventDefault()
        $('.start').css('display', 'none')
        const nome = $('.texto-nome').val()
        $(`<span>${nome}</span>`).appendTo('header h1')
    })

    const verificarInput = () => {
        return $(name).val().trim().length == 0
    }

    const verificarSeMudou = () => {
        const validaInput = verificarInput()

        if (!validaInput) {
            $(name).removeClass('error')
        }

    }



    $(name).on('keydown', verificarSeMudou)

    const lixeira = $('.lixeira')

    $('.toDoList form').on('submit', adicionar)

    function adicionar(e) {
        e.preventDefault()
        if (verificarInput()) {
            return $(name).addClass('error')
        }

        $(name).removeClass('error')

        const tarefa = $('#text').val()
        const novoElemento = $(`<li name="local-item">${tarefa}</li>`)
        const elementoLixo = $(`<li class="local-lixo"><i class="fa-regular fa-trash-can"></i></li>`)
        const urgencia = $(`<li class="local-cor">Indefinível</li>`)

        $(novoElemento).appendTo('.task')
        $(elementoLixo).appendTo(lixeira)
        $(urgencia).appendTo('.color-task')
        colocarNoStorage()


        $('#text').val('')

        $(urgencia).click(() => colorUrgencia(urgencia))
        $(novoElemento).click(() => checar(novoElemento))
        $(elementoLixo).click(() => cliqueDelete(novoElemento, urgencia, elementoLixo))
        const peguei = $('.task li')

    }



    function checar(elemento) {
        $(elemento).toggleClass('linetext')
        colocarNoStorage()
    }

    let c = 1

    function colorUrgencia(elemento) {

        if ($(elemento).text() === 'Adiável') {
            $(elemento).text('Urgente')
            $(elemento).css('background-color', 'red')

        } else if ($(elemento).text() === 'Urgente') {
            $(elemento).text('Indefinível')
            $(elemento).css('background-color', 'gray')

        } else if ($(elemento).text() === 'Indefinível') {
            $(elemento).text('Adiável')
            $(elemento).css('background-color', 'green')

        }
        colocarNoStorage()
    }
    const cliqueDelete = (novoElemento, urgencia, elementoLixo) => {
        novoElemento.remove()
        urgencia.remove()
        elementoLixo.remove()
        colocarNoStorage()
    }


})


const colocarNoStorage = () => {
    const elementosTarefa = document.getElementsByName('local-item')
    const elementosCor = $(`.color-task li`)


    const tarefasItems = [...elementosTarefa].map((tarefaElemento) => {
        const paraFazer = tarefaElemento.innerText
        const estaCompleta = $(tarefaElemento).is('.linetext')
        const valorNome = $('header h1 span').text()

        return { paraFazer, estaCompleta, valorNome }
    })

    const tarefasCores = [...elementosCor].map((tarefaElemento) => {
        const elementoUrgencia = tarefaElemento.innerText
        const corUrgencia = $(tarefaElemento).is('.local-cor')


        return { elementoUrgencia, corUrgencia }
    })



    const saveDaLista = [...tarefasItems, ...tarefasCores]


    localStorage.setItem('tarefas', JSON.stringify(saveDaLista))
}

const atualizarComOLocalStorage = () => {
    const saveLocal = JSON.parse([localStorage.getItem('tarefas')])
    const start = $('.start')
    $(start).css('display', 'none')
    $(`<span>${saveLocal[0].valorNome}</span>`).appendTo('header h1')
    


    for (const tarefas of saveLocal) {
        const checarObjeto = tarefas.paraFazer !== undefined

        
        if (checarObjeto) {
            const novoElemento = $(`<li name="local-item">${tarefas.paraFazer}</li>`)
            $(novoElemento).appendTo('.task')
            $(novoElemento).click(() => checar(novoElemento))
            

            function checar(elemento) {
                $(elemento).toggleClass('linetext')
                colocarNoStorage()
            }




        } else if ((!checarObjeto)) {
            const urgencia = $(`<li class="local-cor">${tarefas.elementoUrgencia}</li>`)
            $(urgencia).appendTo('.color-task')
            $(urgencia).click(() => colorUrgencia(urgencia))

            if ($(urgencia).text() === 'Adiável') {
                $(urgencia).css('background-color', 'green')
                console.log('deu certo')
                colocarNoStorage()


            } else if ($(urgencia).text() === 'Urgente') {
                $(urgencia).css('background-color', 'red')
                colocarNoStorage()


            } else if ($(urgencia).text() === 'Indefinível') {
                $(urgencia).css('background-color', 'gray')

                colocarNoStorage()

            }
            colocarNoStorage()

            /*EVENTOS*/

            function colorUrgencia(elemento) {
                if ($(elemento).text() === 'Adiável') {
                    $(elemento).text('Urgente')
                    $(elemento).css('background-color', 'red')

                } else if ($(elemento).text() === 'Urgente') {
                    $(elemento).text('Indefinível')
                    $(elemento).css('background-color', 'gray')

                } else if ($(elemento).text() === 'Indefinível') {
                    $(elemento).text('Adiável')
                    $(elemento).css('background-color', 'green')

                }
                colocarNoStorage()
            }
        }

    }
    let c = 0
    for (let i = 0; i < (saveLocal.length / 2); i++) {
        const elementoLixo = $(`<li class="local-lixo"><i class="fa-regular fa-trash-can"></i></li>`)
        const lixeira = $('.lixeira')
        $(elementoLixo).appendTo(lixeira)
        $(elementoLixo).click(cliqueDelete(elementoLixo, c))
        c++
    }

    function cliqueDelete(elemento, c) {
        const urgencia = $('.local-cor')
        const novoElemento = $('[name="local-item"]')
        
        elemento.click(() => removeElemento(urgencia[c], novoElemento[c], elemento))
    
        
    }

    function removeElemento(urgencia, novoElemento, elementoLixo) {
        urgencia.remove()
        novoElemento.remove()
        elementoLixo.remove()
        colocarNoStorage()
    }

}

atualizarComOLocalStorage()