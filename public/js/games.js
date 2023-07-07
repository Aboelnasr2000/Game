const $generatePlayerButton = document.querySelector('#generatePlayer')
const playerTemplate = document.querySelector('#player_template').innerHTML
const $players = document.querySelector('#players')


$generatePlayerButton.addEventListener('click', () => {

    $generatePlayerButton.setAttribute('disabled', 'disabled')

    // e.preventDefault()    
    generatePlayer()
    $generatePlayerButton.removeAttribute('disabled')
})

async function generatePlayer() {
    const response = await fetch('/passwordChallenge/player');
    const data = await response.json();
    const playerName = data[0].name
    const playerImage = data[0].image
    const html = Mustache.render(playerTemplate, { playerName, playerImage })
    document.querySelector('#players').innerHTML = html
}