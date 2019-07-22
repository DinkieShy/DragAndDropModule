var dropArea1 = [];
var dropArea2 = [];
var dropArea3 = [];
var dropAreas = [dropArea1, dropArea2, dropArea3];
var itemBeingDragged;
var correctDropArea1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var correctDropArea2 = [13, 14, 15, 16, 17];
var correctDropArea3 = [18, 19, 20, 21, 22, 23, 24];
var amountOfItems = 24;
var correctDropAreas = [correctDropArea1, correctDropArea2, correctDropArea3];

$(document).ready(function(){
  $('.dropArea').droppable({
    drop: function(event, ui){
      tolerance: "pointer",
      ui.draggable.css({
        top:'50%',
        left:'50%',
        revert: 'invalid'
      });
      $(this).append(ui.draggable);
    }
  });
  $('.dragItem').draggable({
    cursor: "move",
    revert: 'invalid',
    helper: 'clone',
    appendTo: 'body',
    scroll: false
  });
  $('#resetButton').click(reset);
  $('#checkButton').click(checkAnswers);
  $('#closeButton').click(closePage);
  $('#quitButton').click(quit);
});

function quit(){
  parent.history.back();
  return false;
}

function closePage(){
  Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("COUNTDOWNTOLINCOLN://countdowntolincoln100-sandbox.mxapps.io/link/CompleteDragAndDrop/"));
  //startActivity(browserIntent);
}

function inIframe(){
  try{
    return window.self !== window.top;
  }
  catch(e){
    return true;
  }
}

function checkAnswers(){
  var correct = true;
  dropAreas[0] = [];
  dropAreas[1] = [];
  dropAreas[2] = [];
  unusedItems = [];
  for(var i = 1; i <= amountOfItems; i++){
    var area = $('#item' + i).parent()[0].id;
    switch(area){
      case 'drop1':
        dropAreas[0].push(i);
      break;
      case 'drop2':
        dropAreas[1].push(i);
      break;
      case 'drop3':
        dropAreas[2].push(i);
      break;
      default:
        unusedItems.push(i);
      break;
    }
  }
  for(var i = 0; i < 3; i++){
    for(var ii = 0; ii < dropAreas[i].length; ii++){
      if(correctDropAreas[i].includes(dropAreas[i][ii], 0)){
        $('#item' + dropAreas[i][ii]).addClass("correct");
        $('#item' + dropAreas[i][ii]).attr('data-sort', 1);
        $('#item' + dropAreas[i][ii]).removeClass("incorrect");
      }
      else{
        $('#item' + dropAreas[i][ii]).addClass("incorrect");
        $('#item' + dropAreas[i][ii]).attr('data-sort', 0);
        $('#item' + dropAreas[i][ii]).removeClass("correct");
        correct = false;
      }
    }
  }
  if(!correct){
    sortDropAreas();
    $('.dragItem').draggable({
      cursor: "move",
      revert: 'invalid',
      helper: 'clone',
      appendTo: 'body',
      scroll: false
    });
  }
  if(correct && unusedItems.length == 0){
    showEndScreen();
  }
  else if(unusedItems.length == 0){
    $('#tryAgainScreen').removeClass('hidden');
    $('#tryAgainScreen').animate({ left: '10%' }, 1000, function() {
      setTimeout(hideTryAgainScreen, 3000);
    });
  }
}

function sortDropAreas(){
  dropArea1 = $('#drop1 .dragItem').toArray().sort(function(a, b){
    return parseInt(a.dataset.sort) - parseInt(b.dataset.sort);
  });

  dropArea2 = $('#drop2 .dragItem').toArray().sort(function(a, b){
    return parseInt(a.dataset.sort) - parseInt(b.dataset.sort);
  });

  dropArea3 = $('#drop3 .dragItem').toArray().sort(function(a, b){
    return parseInt(a.dataset.sort) - parseInt(b.dataset.sort);
  });

  drop1Element = $('#drop1')[0];
  drop1Element.innerHTML = "";
  for(var i = 0; i < dropArea1.length; i++){
    drop1Element.innerHTML += dropArea1[i].outerHTML;
  }

  drop2Element = $('#drop2')[0];
  drop2Element.innerHTML = "";
  for(var i = 0; i < dropArea2.length; i++){
    drop2Element.innerHTML += dropArea2[i].outerHTML;
  }

  drop3Element = $('#drop3')[0];
  drop3Element.innerHTML = "";
  for(var i = 0; i < dropArea3.length; i++){
    drop3Element.innerHTML += dropArea3[i].outerHTML;
  }
}

function showEndScreen(){
  $('#endScreen').animate({ left: 0 }, 1000);
}

function hideTryAgainScreen(){
  console.log("hide!");
  $('#tryAgainScreen').animate({ left: '100%' }, 1000, function() {
    $('#tryAgainScreen').addClass('hidden');
  });
}

function reset(){
  window.location.reload();
}
