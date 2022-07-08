'use strict';

const sockets = require("./sockets");
// const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.allPolls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

// Get language
Data.prototype.getUILabels = function (lang = "en") {
  return require("./data/labels-" + lang + ".json");
}

// Create a poll
Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.allPolls.pollId === "undefined") {
    let currentPoll = {};
    currentPoll.lang = lang;
    currentPoll.pollItems = [];
    currentPoll.pollItems[0]= {
      itemQuestion: '',
      itemAnswers: []
    };
    // New structure, see /instruction.md
    currentPoll.votersResponds = [[]];
    this.allPolls.pollId = currentPoll;
    console.log("poll created", pollId, currentPoll);
    console.log("Poll:", pollId, "stored in", this.allPolls)
  }
  return this.allPolls.pollId;
}

// Add poll content - Items
Data.prototype.addItem = function(pollId, itemId, itemQuestion, itemAnswers) {
  const currentPoll = this.allPolls.pollId;
  currentPoll.pollItems.push({});
  const currentItem = currentPoll.pollItems[itemId];
  if (typeof currentPoll !== 'undefined') {
    console.log(currentItem, itemQuestion)
    currentItem.itemQuestion = itemQuestion;
    // Only one question in an item
    currentItem.itemAnswers = itemAnswers;
    console.log("Question added to pollId:", pollId, ", item id:", itemId, ", question:", itemQuestion, ", answers:", itemAnswers)
  }
}
// Add question to the item
Data.prototype.getQuestion = function(pollId, itemId) {
  const currentPoll = this.allPolls.pollId;
  const currentItem = currentPoll.pollItems[itemId];
  console.log("All the items in this poll:", currentPoll.pollItems);
  if (typeof currentPoll !== 'undefined') {
    console.log("Item requested for pollId", pollId, ". getQuestion returns this currentItem:", currentItem, "with itemId", itemId)
    return currentItem;
  }
  return []
}
// Add answers to the item
Data.prototype.getAnswers = function(pollId, itemId) {
  const currentPoll = this.allPolls.pollId;
  const currentItem = currentPoll.pollItems[itemId];
  if (typeof currentPoll !== 'undefined') {
    if (typeof currentItem !== 'undefined') {
      return {itemQ: currentItem.itemQuestion, itemAs: currentItem.itemAnswers};
    }
  }
  return {}
}

/*Data.prototype.getPoll = function(pollId) {
  const currentPoll = this.allPolls.pollId;
  if (typeof currentPoll !== 'undefined') {
    return currentPoll;
  }
  return {};
}*/

// Count the amount of answers submitted
Data.prototype.submitAnswer = function(pollId, itemId, answerId) {
  const currentPoll = this.allPolls.pollId;
  let currentItemsResponds = currentPoll.votersResponds[itemId]
  // console.log("answer submitted for ", pollId, itemId, answerId);
  if (typeof currentPoll !== 'undefined') {
    console.log("let answers in submitAnswer:", currentItemsResponds, typeof currentItemsResponds)
    /*  if (typeof currentItemsResponds !== 'object') {
          currentItemsResponds = {};
          currentItemsResponds[answerId] = 1;
          currentPoll.votersResponds.push(currentAnswers);
          console.log("This is poll.answers:", currentPoll.votersResponds, "and answers:", currentItemsResponds, typeof currentItemsResponds, "\n --> answers[answer]=", currentItemsResponds[answerId])
          if (currentPoll.votersResponds.length > 1) {
            currentItemsResponds = {};
            currentItemsResponds[answerId] = 2;
            currentPoll.votersResponds.push(currentAnswers);
          }
        }*/
    if (typeof currentItemsResponds[answerId] === 'undefined') {
      currentItemsResponds[answerId] = 1;
      console.log("If answers is undefined then create and give 1:", currentItemsResponds[answerId])
    }
    else {
      currentItemsResponds[answerId] += 1;
      console.log("else --> + 1")
    }
    console.log("The amounts of answers in this item:", currentItemsResponds,", Type:", typeof currentItemsResponds);
  }
}

// Go to next item
Data.prototype.nextQuestion = function(pollId, itemId){
  const currentPoll = this.allPolls.pollId;
  if (typeof currentPoll !== 'undefined') {
    itemId += 1;
    console.log("The polls current item is now:", itemId)
  }
}

module.exports = Data;



