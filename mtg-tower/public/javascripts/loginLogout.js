var player;

$(document).ready(function(){
  socket.emit('requestLoginStatus');
  $(window).on("beforeunload",function(e){
    socket.emit('logout', {id: player.id});
  });
});

$('.player-select').on('click', function(event){
  playerId = $(event.currentTarget).parent().parent().find('.card-title').text();
  $(event.currentTarget).addClass('disabled');
  if(!player){
    socket.emit('login', {id: playerId, dysplayName: playerId});
  }else if(player.id !== playerId){
    let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
    $button.addClass('disabled');
    socket.emit('logout', {id: player.id});
    socket.emit('login', {id: playerId, dysplayName: playerId});
  }else{
    socket.emit('logout', {id: playerId});
  }
})

socket.on('login', function(message){
  if(message){
    if(player){
      let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
      $button.removeClass('disabled');
      $button.addClass('orange');
      $button.text('SELECT');
    }
    player = message;
    console.log('logged in.')
    console.log('dysplayName = ' + player.dysplayName)
    let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
    $button.removeClass('disabled');
    $button.removeClass('orange');
    $button.text(player.dysplayName);
  }
})

socket.on('logout', function(message){
  let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
  if(message){
    $button.addClass('orange');
    $button.text('SELECT');
    player = '';
    console.log('logged out.')
  }
  $button.removeClass('disabled');
})

socket.on('updateLoginStatus', function(players){
  for(let id in players){
    if(!player || players[id].id !== player.id){
      let $button = $('span.card-title:contains(' + players[id].id + ')').parent().parent().find('a');
      if(players[id].loggedIn){
        $button.addClass('disabled');
        $button.text(players[id].dysplayName);
      }else{
        $button.removeClass('disabled');
        $button.text('SELECT');
      }
    }
  }
})


