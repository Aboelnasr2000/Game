const $generatePlayerButton = document.querySelector('#generatePlayer')
const playerTemplate = document.querySelector('#player_template').innerHTML
const $players = document.querySelector('#players')

async function allPlayers() {
    try {
        const response = await fetch('/passwordChallenge/player');
        const data = await response.json();
        const shuffledPlayers = shuffleArray(data);
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

    //Get Data From Local Storage 
    let myPlayers = undefined
    try {
        //Find The Data Locally
        myPlayers = await localStorage.getItem('players');
        myPlayers = await JSON.parse(myPlayers);
        //Make Sure Local Data Is not Empty
        if (myPlayers.length === 0){
            throw Error()
        }
        console.log("Local")
    }
    catch (e) {
        // If No Local Data Get From Database 
        myPlayers = await allPlayers()
        console.log("Database")
    }


    //Choose Player At Random 
    index = Math.floor(Math.random() * (myPlayers.length))
    const playerName = myPlayers[index].name
    const playerImage = myPlayers[index].image

    //Remove Choosen Player
    myPlayers.splice(index, 1)

    //Display Choosen Player
    const html = Mustache.render(playerTemplate, { playerName, playerImage })
    document.querySelector('#players').innerHTML = html

    //Store Remaining Players Locally
    myPlayers = JSON.stringify(myPlayers);
    localStorage.setItem('players', myPlayers);
    
    //Re-enable Button
    $generatePlayerButton.removeAttribute('disabled')
})

