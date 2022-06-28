<template>

  <div>
    {{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  <div>
    <button v-on:click="prevQuestion">
      Prev
    </button>
    <button v-on:click="nextQuestion">
      Next
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
import ResponsiveNav from '../components/ResponsiveNav.vue';
const socket = io();

export default {
  name: 'Poll',
  components: {
    Question,
    ResponsiveNav
},
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll"
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
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
