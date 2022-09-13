<template>
  <div>
    You are answering the poll: {{ pollId }}
  </div>
  <div>
    <Question v-bind:item="item"
              v-on:answer-clicked="submitAnswer(answerId)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

var questionNumber = 0;

export default {
  name: 'Poll',
  components: {
    Question
},
  data: function () {
    return {
      item: {
        itemId:"",
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
    socket.on("newQuestion", (itemQuestion) =>
        this.item = itemQuestion
    )
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("finished", () => {
      window.location.href = "#/result/" + this.pollId;
    })
/*    socket.on("answerClicked", (answerId) => {
      this.answerId = answerId;
      console.log("answerId received:", answerId)
    })*/
  },
  methods: {
    submitAnswer: function (answerId) {
      socket.emit("submitAnswer", {pollId: this.pollId, itemId: questionNumber, answerId: answerId})
      questionNumber += 1;
      socket.emit('finishedCheck', {pollId: this.pollId, itemId: questionNumber})
      socket.emit("runQuestion", {pollId: this.pollId, itemId: questionNumber})
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
