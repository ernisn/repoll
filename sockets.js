function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(dataCreate) {
    socket.emit('pollCreated', data.createPoll(dataCreate.pollId, dataCreate.lang));
  });

  socket.on('addItem', function(dataAddI) {
    data.addItem(dataAddI.pollId, dataAddI.itemId, dataAddI.itemQuestion, dataAddI.itemAnswers);
    socket.emit('newQuestion', data.getQuestion(dataAddI.pollId, dataAddI.itemId));
    socket.emit('dataUpdate', data.getAnswers(dataAddI.pollId, dataAddI.itemId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId, 0));
    socket.emit('dataUpdate', data.getAnswers(pollId, 0));
  });

  socket.on('runQuestion', function(dataRunQ) {
    io.to(dataRunQ.pollId).emit('newQuestion', data.getQuestion(dataRunQ.pollId, dataRunQ.itemId));
    io.to(dataRunQ.pollId).emit('dataUpdate', data.getAnswers(dataRunQ.pollId, dataRunQ.itemId));
  });

  socket.on('submitAnswer', function(dataSubmitA) {
    data.submitAnswer(dataSubmitA.pollId, dataSubmitA.itemId, dataSubmitA.answerId);
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

  socket.on('finishedCheck', function(dataFinishedCheck) {
    let howManyLeft = data.getPoll(dataFinishedCheck.pollId).pollItems.length - dataFinishedCheck.itemId - 2;
    if ( howManyLeft === 0) {
      console.log("The poll is finished!")
      socket.emit('finished', data.getPoll(dataFinishedCheck.pollId));
    }
    else {
      console.log("The poll is not finished, current item has item ID:",
          dataFinishedCheck.itemId,
          ", but the poll has",
          data.getPoll(dataFinishedCheck.pollId).pollItems.length - 1,
          "items in total.")
    }
  })

  let resultPageNr = 0;
  socket.on('getNextQ', function(d) {
    if (resultPageNr < eval(data.getPoll(d.pollId).pollItems.length) - 2) {
      resultPageNr += 1;
      socket.emit('newQuestion', data.getQuestion(d.pollId, resultPageNr));
      console.log("Moved to net question");
    }
  })

  socket.on('getPrevQ', function(d) {
    console.log("Previous question button clicked");
    if(resultPageNr > 0){
      resultPageNr -= 1;
      socket.emit('newQuestion', data.getQuestion(d.pollId, resultPageNr));
      console.log("Moved to previous question");
    }
  })

}

module.exports = sockets;