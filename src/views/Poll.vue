<template>
<page>

  <header id="header">
    <div class="logo"
         v-on:click="this.$router.push('/'); pageRedirected">
      <!--        <svg version="1.1" baseProfile="tiny" id="go-back" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
                   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                   x="0px" y="0px" width="36px" height="36px" viewBox="0 0 42 42" xml:space="preserve">
                <polygon fill="#ffffff"  points="27.066,1 7,21.068 26.568,40.637 31.502,35.704 16.865,21.068 32,5.933 "/>
              </svg>-->
      <img src="/img/logo.png">
      rePoll
    </div>
    <div class="page-title">
      <i> Poll - # {{ pollId }} </i>
    </div>
    <div v-on:click="switchLanguage"
         class="switch-language">
      🌍 {{uiLabels.changeLanguage}}
    </div>
  </header>

  <div>
    <Question v-bind:itemData="item"
              v-on:answer-clicked="submitAnswer($event)"/>
  </div>
</page>


</template>

<script>
// @ is an alias to /src
import '../assets/main.css';
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
    socket.on("newQuestion", (item) =>
        this.item = item
    )
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("finished", () => {
      window.location.href = "#/result/" + this.pollId;
    })
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

<style>

</style>
