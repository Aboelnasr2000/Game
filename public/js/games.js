const $generatePlayerButton = document.querySelector('#generatePlayer')
const playerTemplate = document.querySelector('#player_template').innerHTML
const $players = document.querySelector('#players')

players = []
async function allPlayers() {
    try {
        const response = await fetch('/passwordChallenge/player');
        const data = await response.json();
        players = data
        const shuffledPlayers = shuffleArray(players);
        return shuffledPlayers
    }
    catch (e) {
        console.log(e)
        return null
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
$generatePlayerButton.addEventListener('click', async () => {

    $generatePlayerButton.setAttribute('disabled', 'disabled')

    // e.preventDefault() 
    if (players.length == 0) {
        await allPlayers()
    }
    console.log(players)
    index = Math.floor(Math.random() * (players.length))
    
    const playerName = players[index].name
    const playerImage = players[index].image
    players.splice(index,1)
    console.log(players)
    const html = Mustache.render(playerTemplate, { playerName, playerImage })
    document.querySelector('#players').innerHTML = html
    $generatePlayerButton.removeAttribute('disabled')
})

// async function generatePlayer() {
//     // const response = await fetch('/passwordChallenge/player');
//     // const data = await response.json();
//     // console.log(data)

//     let players = await allPlayers()
//     // console.log(players)
//     // const playerName = data[0].name
//     // const playerImage = data[0].image
//     // const html = Mustache.render(playerTemplate, { playerName, playerImage })
//     // document.querySelector('#players').innerHTML = html
// }

// 