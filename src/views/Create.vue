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

  <section class="screen">
    
  </section>

  <div>
    {{uiLabels.pollLink}}<input type="text" v-model="pollId" id="pollIdEnter">
    <div id ="hideAfterCreate">
    <button v-on:click="createPoll">
      {{uiLabels.createPoll}}
    </button>
    </div>

    <div id ="hideBeforeCreate">
    <div>
      {{uiLabels.question}} <input type="number" v-model="questionNumber">:
      <input type="text" v-model="question">
      <div>
        {{uiLabels.answerAlternatives}}<input id="answerAlternatives" v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i">
        <br>
        <button v-on:click="addAnswer">
          {{uiLabels.addAnswer}}
        </button>
        <button v-on:click="addQuestion">
          {{uiLabels.addQuestion}}
        </button>
      </div>
    </div>
    
    <br>

    <button v-on:click="runQuestion">
      {{uiLabels.runQuestion}}
    </button>
    <button v-on:click="joinPoll">
      {{uiLabels.joinPoll}}
    </button>
    <button v-on:click="checkResults">
      {{uiLabels.checkResults}}
    </button>
    </div>
  </div>
</template>

<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Create',
  components: {
    ResponsiveNav
  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data
    )
  },
  methods: {
    createPoll: function () {
      if(document.getElementById("pollIdEnter").value != "") {
        var elementToDisplay = document.getElementById("hideBeforeCreate");
        elementToDisplay.style.display = "block";
        var elementToHide = document.getElementById("hideAfterCreate");
        elementToHide.style.display = "none";
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      }
      else{
        console.log("You must enter a poll id before creating poll")
      }
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, questionNumber: this.questionNumber} );
      this.questionNumber +=1;
      this.question = "";
      this.answers = ['', ''];
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      console.log({pollId: this.pollId, questionNumber: this.questionNumber, q: this.question, a: this.answers})
    },
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    joinPoll: function () {
          window.location.href = "#/poll/" + this.pollId;
    },
    checkResults: function () {
          window.location.href = "#/result/" + this.pollId;
    },
  }
}
</script>

<style scoped>
header {
  background-color: black;
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