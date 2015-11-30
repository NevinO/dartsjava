var scoreBoard = scoreBoard || {};

scoreBoard.player1 = {id: "#player1", score: 501, active: false};
scoreBoard.player2 = {id: "#player2", score: 501, active: false};
scoreBoard.currentTurn = scoreBoard.player2
scoreBoard.nextTurn = scoreBoard.player1;

scoreBoard.validMoveChecker = function(points){
  var result = false;

  if ((points <= 162)&&(points != 1)){
    result = true
  } else {
    switch (parseInt(points)) {
      case 180:
      case 177:
      case 174:
      case 171:
      case 170:
      case 168:
      case 167:
      case 165:
      case 164:
        result = true;
        break;
      default:
      result = false;
    }
  }

  return result
}

scoreBoard.canPlayerWin = function(points){
  var result = false;

  if (points <= 158){
    result = true
  } else {
    switch(parseInt(points)){
      case 170:
      case 167:
      case 164:
      case 161:
      case 160:
      result = true
    }
  }

  return result;
}

scoreBoard.amendScore = function (player, new_score){
  player.score = new_score;
  $(player.id).append("<li>"+player.score+"</li>")
  if (scoreBoard.canPlayerWin(player.score)){
    alert(player.name + ', you are so close!')
  }
}

scoreBoard.setWinner = function(player){
  $(player.id).append("<li>winner</li>");
  alert(player.name + ' is the winner!!!')
  location.reload();
}

scoreBoard.bust = function(player){
  $(player.id).append("<li>bust</li>");
  alert(player.name + ' = busted!!!')
  location.reload();
}


scoreBoard.makeTurn = function(player, points){

  var new_score = player.score - points;
  $(player.id +'_score_input').val("");

  if (scoreBoard.validMoveChecker(points)) {
    if (new_score > 2){
    scoreBoard.amendScore(player, new_score);
    } else if (new_score == 0) {
      scoreBoard.setWinner(player);
    } else if (new_score < 0) {
      scoreBoard.bust(player);
    }
    scoreBoard.setNextTurn(player);
  } else {
  alert('Invalid move!');
  }

};

scoreBoard.setNextTurn = function(last_player){
  $(last_player.id + '_name').removeClass('next_up');
  scoreBoard.currentTurn = scoreBoard.nextTurn;
  scoreBoard.nextTurn = last_player;
  $(scoreBoard.currentTurn.id + '_score_input').prop('disabled', false);
  $(last_player.id + '_score_input').prop('disabled', true);
  $(scoreBoard.currentTurn.id + '_name').addClass('next_up');
}

scoreBoard.hasGameBegun = function(){
  if (scoreBoard.player1.active && scoreBoard.player2.active){
    scoreBoard.setNextTurn(scoreBoard.player2);
  }
}