<template>
  <div>
    You are answering the poll: {{ pollId }}
  </div>
  <div>
    <Question v-bind:item="item"
              v-on:answer-clicked="submitAnswer($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();
var currentItemNum = 0;

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
      currentItemNum: 0,
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
      socket.emit("submitAnswer", {pollId: this.pollId, itemId: currentItemNum, answerId: answerId})
      socket.emit('finishedCheck', {pollId: this.pollId, itemId: currentItemNum})
      currentItemNum += 1
      socket.emit("runQuestion", {pollId: this.pollId, itemId: currentItemNum})
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
