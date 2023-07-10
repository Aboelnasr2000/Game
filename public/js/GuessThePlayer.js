const $generatePlayerButton = document.querySelector('#generatePlayer')
const $showAnswer = document.querySelector('#showAnswer')
const answerTemplate = document.querySelector('#answer_template').innerHTML
const clueTemplate = document.querySelector('#clue_template').innerHTML
const $clues = document.querySelector('#clues')
const $answer = document.querySelector('#answer')


async function allPlayers() {
    try {
        const response = await fetch('/guessThePlayer/player');
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
        myPlayers = await localStorage.getItem('GuessPlayers');
        myPlayers = await JSON.parse(myPlayers);
        console.log(myPlayers)
        //Make Sure Local Data Is not Empty
        if (myPlayers.length === 0) {
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
    const clues = myPlayers[index].clues
    const answer = myPlayers[index].answer

    // console.log(playerName)

    //Remove Choosen Player
    myPlayers.splice(index, 1)

    //Display Choosen Player
    let clueIndex = 0
    const html = ''
    document.querySelector('#clues').innerHTML = html
    document.querySelector('#answer').innerHTML = html

    clues.forEach((clue) => {
        clueIndex = clueIndex + 1
        clue = clue.clue
        const html = Mustache.render(clueTemplate, { clueIndex, clue })
        $clues.insertAdjacentHTML('beforeend', html)
    });


    localStorage.setItem('currentAsnwer', answer)

    //Store Remaining Players Locally
    myPlayers = JSON.stringify(myPlayers);
    localStorage.setItem('GuessPlayers', myPlayers);

    //Re-enable Button
    $showAnswer.removeAttribute('disabled')
    // $generatePlayerButton.removeAttribute('disabled')
})


$showAnswer.addEventListener('click', async () => {
    $showAnswer.setAttribute('disabled', 'disabled')

    let answer = undefined
    try {
        //Find The Data Locally
        answer = await localStorage.getItem('currentAsnwer');
       
        //Make Sure Local Data Is not Empty
        if (!answer) {
            throw Error()
        }
        const html = Mustache.render(answerTemplate, { answer })
        document.querySelector('#answer').innerHTML = html
        console.log("Found")
    }
    catch (e) {
        console.log(e)
    }
    $generatePlayerButton.removeAttribute('disabled')

})

