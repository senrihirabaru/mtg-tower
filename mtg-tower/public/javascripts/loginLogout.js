var player;
var gameStarting = false;

$(document).ready(function(){
  $(window).on("beforeunload",function(e){
    if(!gameStarting){
      socket.emit('logout', {id: player.id});
    }
  });
});

$('#setDysplayName a').on('click', function(event){
  let $form = $('#dysplayName');
  let $button = $('#setDysplayName a');
  if($button.text() === 'Set'){
    if($form.val() !== ''){
      if(!$button.attr('clicked')){
        socket.emit('requestLoginStatus');
      }
      $button.attr('clicked', true);
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
    // プレーヤーを選択済みの場合、ボタンを未選択状態に戻す
    if(player){
      let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
      $button.removeClass('disabled');
      $button.addClass('orange');
      $button.text('SELECT');
    }
    // ボタンを選択状態にする
    player = message;
    let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
    $button.removeClass('disabled');
    $button.removeClass('orange');
    $button.text(player.dysplayName);
    // STARTボタンを有効化する
    $('#startGame').removeClass('disabled');
  }
})

socket.on('logout', function(message){
  let $button = $('span.card-title:contains(' + player.id + ')').parent().parent().find('a');
  // ログアウトできたらボタンを未選択状態に戻す
  if(message){
    $button.addClass('orange');
    $button.text('SELECT');
    player = '';
    console.log('logged out.')
  }
  // ボタンの無効化を解除する
  $button.removeClass('disabled');
  // STARTボタンを無効化する
  $('#startGame').addClass('disabled');
})

socket.on('updateLoginStatus', function(players){
  for(let id in players){
    if(!player || players[id].id !== player.id){
      let $button = $('span.card-title:contains(' + players[id].id + ')').parent().parent().find('a');
      if(players[id].loggedIn){
        $button.addClass('disabled');
        $button.text(players[id].dysplayName);
      }else{
        if($('#setDysplayName a').attr('clicked')){
          $button.removeClass('disabled');
        }
        $button.text('SELECT');
      }
    }
  }
})

$('#startGame').on('click', function(event){
  gameStarting = true;
  localStorage.setItem('player', JSON.stringify(player))
  execPost('/main', {});
  //execPost('/main', {id: player.id});
})

/**
* データをPOSTする
* @param String アクション
* @param Object POSTデータ連想配列
*/
function execPost(action, data) {
  // フォームの生成
  var form = document.createElement("form");
  form.setAttribute("action", action);
  form.setAttribute("method", "post");
  form.style.display = "none";
  document.body.appendChild(form);
  // パラメタの設定
  if (data !== undefined) {
    for (var paramName in data) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', paramName);
      input.setAttribute('value', data[paramName]);
      form.appendChild(input);
    }
  }
  // submit
  form.submit();
}

