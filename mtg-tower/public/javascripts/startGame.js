var players;

$(document).ready(function(){
  socket.emit('requestPlayerInfo');
  console.log('requestPlayerInfo sent.');
  $(window).on("beforeunload",function(e){
    socket.emit('logout', {id: players['ownPlayer'].id});
    //localStorage.removeItem('player');
  });
});

socket.on('replyPlayerInfo', function(playerInfo){
  let myPlayer = JSON.parse(localStorage.getItem('player'));
  let keyOrder = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
  let playerInfoArray = keyOrder.map(function(x){return playerInfo[x];});
  players = {
    ownPlayer: {id: myPlayer.id, dysplayName: myPlayer.dysplayName, icon: myPlayer.icon},
    leftPlayer: {id: '', dysplayName: '', icon: ''},
    frontPlayer: {id: '', dysplayName: '', icon: ''},
    rightPlayer: {id: '', dysplayName: '', icon: ''}
  };
  for(var i = 0; i < keyOrder.length; i++){
    if(keyOrder[i] === myPlayer.id){
      setPlayerInfo('leftPlayer', playerInfoArray[(i+1)%4]);
      setPlayerInfo('frontPlayer', playerInfoArray[(i+2)%4]);
      setPlayerInfo('rightPlayer', playerInfoArray[(i+3)%4]);
      console.log('i = ' + i);
      break;
    }
  }
  for(var id in players){
    dysplayPlayerIcon(id, players[id]);
  }
})

function setPlayerInfo(playerRole, playerInfo){
  players[playerRole].id = playerInfo.id;
  players[playerRole].dysplayName = playerInfo.dysplayName;
  players[playerRole].icon = playerInfo.icon;
}

function dysplayPlayerIcon(id, player){
  $('#' + id + ' img').attr('src', player.icon);
  $('#' + id + ' .card-title').text(player.id);
  $('#' + id + ' p').text(player.dysplayName);
}
