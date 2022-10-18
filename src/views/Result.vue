<template>
<page>

  <header id="header">
    <div class="logo"
         v-on:click="this.$router.push('/'); pageRedirected">
      <img src="/img/logo.png">
      rePoll
    </div>
    <div class="page-title">
      <i> {{uiLabels.result}} - # {{ pollId }} </i>
    </div>
    <div v-on:click="switchLanguage"
         class="switch-language">
      🌍 {{uiLabels.changeLanguage}}
    </div>
  </header>

  <h2>{{uiLabels.question}} No.{{ resultData.itemId }} </h2>
  {{ resultData.item.itemQuestion }}
  <br><br><br>

  <main>
    <button class="prevButton button-b"
            v-on:click="prevQuestion">
      ⇦ {{uiLabels.previous_question}}
    </button>
    <button class="nextButton button-b"
            v-on:click="nextQuestion"
            id="nextQuestionButton">
      {{uiLabels.next_question}} ⇨
    </button>
    <br><br><br>
    <ResultVis
        v-bind:resultData="resultData"/>
  </main>

  <router-link
      v-bind:to="'/poll/'+pollId"
      v-on:click="pageRedirected">
    {{uiLabels.back_to_poll}}
  </router-link>

</page>
</template>


<script>
// @ is an alias to /src
import '../assets/main.css';
import ResultVis from '@/components/ResultVis.vue';
import io from 'socket.io-client';

const socket = io();
var pageUpdated = false;

export default {
  name: 'Result',
  components: {
    ResultVis,
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
      socket.emit("getNextQ", { pollId: this.pollId });
      this.isClicked = false;
    },

    prevQuestion: function () {
      socket.emit("getPrevQ", { pollId: this.pollId });
      // Resets "next question" button if it has previously been changed to say "View Results"
      // document.getElementById("nextButton").innerHTML = 'Next Question';
      // document.getElementById("nextButton").onclick = 'nextQuestion';
      this.isClicked = false;
    },

    pageRedirected: function () {
      pageUpdated = false;
    }
  },
  watch: {
    // Reload when url changed, only update once to prevent redirect loop
    '$route': function() {
      if (!pageUpdated) {
        pageUpdated = true;
        window.location.reload();
      }
    }
  }
}

</script>

<style>
main {
  margin: auto;
  max-width: 50vw;
}
.prevButton {
  float:left;
  margin-left: 40px;
}
.nextButton {
  float:right;
  margin-right: 40px;
}

</style>