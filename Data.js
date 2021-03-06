'use strict';

const sockets = require("./sockets");

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
    console.log("question added to", pollId, q,"with question id:", poll.currentQuestion );
  }
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
    console.log("Poll:", pollId, "stored in", this.polls)
  }
  return this.polls[pollId];
}

Data.prototype.nextQuestion = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.currentQuestion += 1;
    console.log("The polls currentQuestion is now:", poll.currentQuestion)
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
Data.prototype.getPoll = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return poll;
  }
  return {};
}

Data.prototype.getQuestion = function(pollId, qId=0) { // changed qId=0 from =null, this got the submitAnswer func to work /Nils 30/06/22
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
      console.log("The polls currentQuestion is now:", poll.currentQuestion)
    }
    //Not sure what the code was even supposed to do before (the one that is commented out), properly displays on poll page now in ny case /Otto 17/06/22
    //return poll.questions[poll.currentQuestion];
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}
// This func is a counter of the answers submitted in the poll 
Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    console.log("let answers in submitAnswer:", answers, typeof answers)
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
      console.log("This is poll.answers:", poll.answers, "and answers:", answers, typeof answers, "\n --> answers[answer]=", answers[answer])
      if (poll.answers.length > 1) {
        answers = {};
        answers[answer] = 2;
        poll.answers.push(answers);
      }
    }
    else if (typeof answers[answer] === 'undefined') {
      answers[answer] = 1;
      console.log("else if answers is undefined:", answers[answer])
    }
    else {
      answers[answer] += 1
      console.log("else --> + 1")
    }
    console.log("answers looks like ", answers, typeof answers);
  }
}

module.exports = Data;



