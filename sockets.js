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
    socket.emit('newQuestion', data.getQuestion(dataAddI.pollId, dataAddI.itemId))
    socket.emit('dataUpdate', data.getAnswers(dataAddI.pollId, dataAddI.itemId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId, 0))
    socket.emit('dataUpdate', data.getAnswers(pollId, 0));
  });

  socket.on('runPoll', function(dataRunQ) {
    io.to(dataRunQ.pollId).emit('newQuestion', data.getQuestion(dataRunQ.pollId, dataRunQ.itemId));
    io.to(dataRunQ.pollId).emit('dataUpdate', data.getAnswers(dataRunQ.pollId, dataRunQ.itemId));
  });

  socket.on('submitAnswer', function(dataSubmitA) {
    data.submitAnswer(dataSubmitA.pollId, dataSubmitA.answer);
    io.to(dataSubmitA.pollId).emit('dataUpdate', data.getAnswers(dataSubmitA.pollId, dataSubmitA.itemId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

  socket.on('finishedCheck', function(d) {
        if (data.getPoll(d.pollId).questions.length === d.questionNumber) {
          console.log("The poll is finished!")
          socket.emit('finished', data.getPoll(d.pollId));
        }
        else {
          console.log("The poll is not finished! (", data.getPoll(d.pollId).questions.length, "!==", d.questionNumber, ")")
        }
      }
  )
}

module.exports = sockets;