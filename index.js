var gameSequence = [];
var userSequence = [];
var currentLvl = 1;
var guessBox = ['.green', '.red', '.yellow', '.blue'];


$(document).on('keydown', function(event){
    var lowKey = event.key.toLowerCase()
    console.log(event.key)
    if (lowKey === 's') {
        startGame();
        
    }
})


function startGame() {

    $('h1').css('color', 'white');
    $('h1').text('Level ' + currentLvl);
    setTimeout(function () {
        var comGuess = Math.floor(Math.random() * 4)
    
        var buttonLength = $('.block').length;
        // console.log(buttonLength);
    
        userSequence = []; // Reset user input each round 
        gameSequence.push(guessBox[comGuess]);
    
        animateSequence();
    }, 1245);


}

function animateSequence() {
    console.log(gameSequence);
    for (let n = 0; n < gameSequence.length; n++) {
        setTimeout(function () {
            var bgColor = $(gameSequence[n]).css('background-color');
            $(gameSequence[n]).css('box-shadow', '0 0 10px 15px ' + bgColor);

            // Remove glow after 400ms
            setTimeout(function () {
                $(gameSequence[n]).css('box-shadow', 'none');
            }, 700);

        }, n * 900); // Stagger each animation
    }
    guessingTime();
}

function guessingTime() {
    $('.block').css('cursor', 'pointer')
    $('.block').on('click', function(event) {
        var clickedGuess = $(this).attr('class').split(' ')[0]; 
        createSound(clickedGuess);
        userSequence.push('.' + clickedGuess);
        $(clickedGuess).css('box-shadow', '0 0 10px 15px ' + $(clickedGuess).css('background-color'))
        setTimeout(function () {
            $(clickedGuess).css('box-shadow', 'none');
        }, 200)
    
        var loggedGuess = userSequence.length - 1;
        if (gameSequence[loggedGuess] !== userSequence[loggedGuess]) {
            createSound('wrong')
            $('h1').text('GAME OVER');
            $('h1').css('color', '#bb1a0e');
            $('.block').off('click');
        }

        else if (userSequence.length === gameSequence.length) {
            $('h1').text('GG! PENDING NEXT LEVEL..');
            $('h1').css('color', '#39A56F');
            $('.block').off('click');
            currentLvl += 1 
            setTimeout(startGame, 2000);

        }
    }
)
}

function createSound(key) {
    let sound;
    switch (key) {
        case 'green':
            sound = new Audio('sounds/green.mp3');
            break;
        case 'red':
            sound = new Audio('sounds/red.mp3');
            break;
        case 'yellow':
            sound = new Audio('sounds/yellow.mp3');
            break;
        case 'blue':
            sound = new Audio('sounds/blue.mp3');
            break;
        case 'wrong':
            sound = new Audio('sounds/wrong.mp3');
            break;

        default:
            console.log('Invalid key: ', key);
            return;
    }
    sound.volume = 0.3;
    sound.play()

}