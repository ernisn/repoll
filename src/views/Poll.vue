<template>
  <header>
      <div v-bind:class="['hamburger', {'close': !hideNav}]"
          v-on:click="toggleNav">
      </div>
      <div class="logo"><img src="/img/logo.png">rePoll</div>
    </header>

    <ResponsiveNav v-bind:hideNav="hideNav">
      <router-link v-bind:to="'/'">{{uiLabels.joinPoll}}</router-link>
      <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
      <router-link v-bind:to="'/result/'+id">{{uiLabels.results}}</router-link>
      <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </ResponsiveNav>

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

<style scoped>
header {
  background-color: gray;
  width: 100%;
  display: grid;
  grid-template-columns: 2em auto;
}
.logo {
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 2.5rem;
  color: white;
  padding-top:0.2em;
}
.logo img {
  height:2.5rem;
  vertical-align: bottom;
  margin-right: 0.5rem;
}
.hamburger {
  color:white;
  width:1em;
  display: flex;
  align-items: center;
  justify-content: left;
  padding:0.5rem;
  top:0;
  left:0;
  height: 2rem;
  cursor: pointer;
  font-size: 1.5rem;
}

#hideBeforeCreate {
  display: none
}

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
}
</style>