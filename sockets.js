function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('newQuestion', data.getQuestion(d.pollId, eval(d.questionNumber)))
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
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
  })

  let i = 0;
  socket.on('getNextQ', function(d) {
    var thisPoll = data.getPoll(d.pollId);
    var thisPollLength = thisPoll.questions.length;
    if (eval(i) + eval(1) < eval(thisPollLength)){
      try{
        i += 1;
        socket.emit('newQuestion', data.getQuestion(d.pollId, i));
      }
      catch(err){
        console.log("Next question failed");
      }
    }
    else{
      socket.emit("redirectResults");

    }

  });

  socket.on('getPrevQ', function(d) {
    console.log("Previous question button clicked");
    if(i>0){
      i -= 1;
      socket.emit('newQuestion', data.getQuestion(d.pollId, i));
      console.log("Moved to previous question");
    }
  });


}



module.exports = sockets;