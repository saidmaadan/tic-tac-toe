
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'Veggies';
var player2 = 'Junkfood';
var currentPlayer = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var tie = function() {
  for (var b = 0; b < spaces.length; b++) {
    if (!spaces[b]) {
      return false;
    }
  }
    return true;
}


var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer);
  }
  else if (tie()) {
    alert("The game is tie!");

    $('#board .space').removeClass(player1);
    $('#board .space').removeClass(player2);
    spaces = [
      NaN, NaN, NaN,
      NaN, NaN, NaN,
      NaN, NaN, NaN,
    ];
    console.log("The game is tie!")
    setNextTurn();
  }
};

$(document).on('click', '#board .space', function (event) {
  event.preventDefault
  //check if the current space has any classes other than "space"
  // check if current space has more than 1 class
  var spaceNum = $(event.currentTarget).index();

  if ($('#board .space')[spaceNum].classList.length > 1) {
    alert("Space has been taken, pick again.");
  } else {

    console.log('You clicked on space #' + spaceNum);

    // Marks the space with the current player's name
    // TODO: Don't mark it unless the space is blank
    spaces[spaceNum] = currentPlayer;
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

    checkForWinner();
    setNextTurn();
  }
});


$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert(winner + "! Congratulation.. You won this game")
  $('#board .space').removeClass(player1);
  $('#board .space').removeClass(player2);
  spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
  ];
  setNextTurn();

});

// Start the game
setNextTurn();

