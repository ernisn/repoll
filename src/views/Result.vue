<template>

  <header>
    <a href="/">
      <h3>This is the repoll</h3>
    </a>
  </header>
  <h4 id="resultHeading"> {{ uiLabels.results }}</h4>
  <h4>Poll ID: {{ pollId }} </h4>
  <h4>Question No.{{ resultData.itemId + 1 }} </h4>

  Question: {{ resultData.item.itemQuestion }}
  <br> ---------- <br>
  Answers: {{ resultData.item.itemAnswers }}
  <br> ---------- <br>
  Result:{{ resultData.votersResponds[resultData.itemId] }}
  <br> ---------- <br>
  <button v-on:click="prevQuestion" class="answerButton">
    {{uiLabels.previousQ}} button pre
  </button>
  <button v-on:click="nextQuestion" class="answerButton" id="nextQuestionButton">
    {{uiLabels.nextQ}} button next
  </button>
  <br> ---------- <br>
  HERE COMES THE DIAGRAM
<!--  <div>
    <ResultVis
        v-bind:resultVisData="resultData"/>
  </div>-->

</template>


<script>
// @ is an alias to /src
// import ResultVis from '@/components/ResultVis.vue';
import io from 'socket.io-client';

const socket = io();

export default {
  name: 'Result',
  components: {
    //ResultVis,
  },
  data: function () {
    return {
      pollEmpty: false,
      isClicked: false,
      lastQuestion: false,
      end: false,
      resultData: {
        item: {
          itemId:"",
          itemQuestion: "",
          itemAnswers: []
        },
        votersResponds: [[]],
      },
      pollId: "",
      currentItemNum: 0,
      uiLabels: {}
    }
  },

  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", (item) =>{
      this.resultData = item;
    })
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },

  methods: {
    switchLanguage: function () {
      if (this.lang === 'en')
        this.lang = 'sv'
      else
        this.lang = 'en'
      socket.emit("switchLanguage", this.lang)
    },

    nextQuestion: function () {
      socket.emit("getNextQ", {pollID: this.pollId });
      this.isClicked = false;
    },

    prevQuestion: function () {
      socket.emit("getPrevQ", { pollId: this.pollId });
      //Resets "next question" button if it has previously been changed to say "View Results"
      document.getElementById("nextButton").innerHTML = 'Next Question';
      document.getElementById("nextButton").onclick = 'nextQuestion';
      this.isClicked = false;
    },
  },
}

</script>

<style scoped>

</style>