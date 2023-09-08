$(document).ready(function() {
    $('.start form').submit(function(e){
        e.preventDefault()

        $('.start').css('display', 'none')
        const nome = $('.texto-nome').val()
        $(`<span>${nome}</span>`).appendTo('header h1')
    })

    $('.main form').on('submit', adicionar)
    

    
    function adicionar(e) {
        e.preventDefault()

        const tarefa = $('.main #texto').val()
        const novoElemento = $(`<li>${tarefa}</li>`)

        $(novoElemento).appendTo('.task')
        
        $('#texto').val('')

        $(novoElemento).click(function(){
            $(novoElemento).toggleClass('linetext')
        })

        adicioarUrgencia()
    }
    
    function adicioarUrgencia() {
        const urgencia = $(`<li>Urgência</li>`)
        urgencia.appendTo('.color-task')

        $(urgencia).click(colorUrgencia) 
        let c = 0
        function colorUrgencia() {
            
            c++
            if (c % 2 === 0) {
                $(urgencia).text('Adiável')
                $(urgencia).css('background-color', 'green')
                
            } else {
                $(urgencia).text('Urgente')
                $(urgencia).css('background-color', 'red')
            }
            
        }
    }
})
