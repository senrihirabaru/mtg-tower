var player;

$(document).ready(function(){
  $(window).on("beforeunload",function(e){
    socket.emit('logout', {id: player.id});
  });
});

$('#setDysplayName a').on('click', function(event){
  $form = $('#dysplayName');
  $button = $('#setDysplayName a');
  if($button.text() === 'Set'){
    if($form.val() !== ''){
      if(!$form.prop('clicked')){
        socket.emit('requestLoginStatus');
      }
      $form.prop('clicked', true);
      $form.prop('disabled', true);
      $button.text('Modify');
      $button.addClass('orange');
    }
  }else{
    $button.text('Set');
    $button.removeClass('orange');
    $form.prop('disabled', false);
  }
})

$('.player-select').on('click', function(event){
  let dysplayName = $('#dysplayName').val();
  let playerId = $(event.currentTarget).parent().parent().find('.card-title').text();
  $(event.currentTarget).addClass('disabled');
  if(!player){
    socket.emit('login', {id: playerId, dysplayName: dysplayName});
  }else if(player.id !== playerId){
    let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
    $button.addClass('disabled');
    socket.emit('logout', {id: player.id});
    socket.emit('login', {id: playerId, dysplayName: dysplayName});
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


