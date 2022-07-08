<template>

  <div>
    pollid: {{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

var itemId = 0;

export default {
  name: 'Poll',
  components: {
    Question
},
  data: function () {
    return {
      question: {
        itemQuestion: "",
        itemAnswers: []
      },
      pollId: "",
      uiLabels: {}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", itemQuestion =>
        this.question = itemQuestion
    )
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("finished", () => {
      window.location.href = "#/result/" + this.pollId;
    })
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
      itemId += 1;
      socket.emit('finishedCheck', {pollId: this.pollId, itemId: itemId})
      socket.emit("runQuestion", {pollId: this.pollId, itemId: itemId})
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
