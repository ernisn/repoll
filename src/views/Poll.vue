<template>

  <div>
    {{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  <div>
    <button v-on:click="prevQuestion">
      {{uiLabels.prevQuestion}}
    </button>
    <button v-on:click="nextQuestion">
      {{uiLabels.nextQuestion}}
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

var qID = 0;

export default {
  name: 'Poll',
  components: {
    Question
},
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      uiLabels: {}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
    nextQuestion: function(){
      console.log('Next button clicked')
      qID = qID + 1;
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: qID})
      //socket.emit("getNextQ", {pollId: this.pollId});
    },
    prevQuestion: function(){
      //socket.emit("getPrevQ", {pollId: this.pollId});
      //Resets "next question" button if it has previously been changed to say "View Results"
      //document.getElementById("nextQuestionButton").innerHTML = 'Next Question';
      //document.getElementById("nextQuestionButton").onclick = 'nextQuestion';
      //this.isClicked = false;
      console.log('Prev button clicked')
    },
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    }
  }
}
</script>
