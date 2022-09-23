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

// Go to next item
Data.prototype.nextQuestion = function(pollId, itemId){
  const currentPoll = this.allPolls.pollId;
  if (typeof currentPoll !== 'undefined') {
    itemId += 1;
    console.log("The polls current item is now:", itemId)
  }
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

Data.prototype.getPoll = function(pollId) {
  const currentPoll = this.allPolls.pollId;
  if (typeof currentPoll !== 'undefined') {
    return currentPoll;
  }
  return {};
}

// In Create Page: Add question to the item
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

// Get language
Data.prototype.getUILabels = function (lang = "en") {
  return require("./data/labels-" + lang + ".json");
}

// Count the amount of answers submitted
Data.prototype.submitAnswer = function(pollId, itemId, answerId) {
  const currentPoll = this.allPolls.pollId;
  if (typeof currentPoll.votersResponds === 'undefined') {
    currentPoll.votersResponds = [[]];
  }
  else {
    currentPoll.votersResponds.push([]);
  }
  //Remove empty arrays at the end
  if (currentPoll.votersResponds.length > 2){
    let len = currentPoll.votersResponds.length, i;
    let emptyArrayNum = 0;
    for(i = 0; i < len; i++ )
      if (currentPoll.votersResponds[i].length === 0)
        emptyArrayNum += 1 ;
    currentPoll.votersResponds = currentPoll.votersResponds.slice(0, len - emptyArrayNum + 1);
  }

  console.log("Previous voters responds of this item:", currentPoll.votersResponds[itemId], "itemId:", itemId);
  console.log("This answer ID was chosen:", answerId);
  let currentItemsResponds = currentPoll.votersResponds[itemId];
  // console.log("answer submitted for ", pollId, itemId, answerId);
  if (typeof currentPoll !== 'undefined') {
    /*console.log("let answers in submitAnswer:", currentItemsResponds, typeof currentItemsResponds)
      if (typeof currentItemsResponds !== 'object') {
          currentItemsResponds = {};
          currentItemsResponds[answerId] = 1;
          currentPoll.votersResponds.push(currentAnswers);
          console.log("This is poll.answers:", currentPoll.votersResponds, "and answers:", currentItemsResponds, typeof currentItemsResponds, "\n --> answers[answer]=", currentItemsResponds[answerId])
          if (currentPoll.votersResponds.length > 1) {
            currentItemsResponds = {};
            currentItemsResponds[answerId] = 2;
            currentPoll.votersResponds.push(currentAnswers);
          }
        }
    if (typeof currentItemsResponds[answerId] === 'undefined') {
      currentItemsResponds[answerId] = 1;
      console.log("If answers is undefined then create and give 1:", currentItemsResponds[answerId])
    }
    else {
      currentItemsResponds[answerId] += 1;
      console.log("else --> + 1")
    }*/
    if (typeof currentItemsResponds[answerId] === 'undefined') {
      currentItemsResponds[answerId] = 1;
    }
    else {
      currentItemsResponds[answerId] += 1;
    }
    console.log("The amounts of each answer in this item now:", currentItemsResponds);
    console.log("All voters responds:", currentPoll.votersResponds);
  }
}

module.exports = Data;



