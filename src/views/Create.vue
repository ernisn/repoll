<template>
  <header class = "MainScreen">
    <div v-bind:class="['hamburger', {'close': !hideNav}]"
         v-on:click="toggleNav">
    </div>
    <div class="logo"><img src="/img/logo.png">rePoll</div>
  </header>

  <ResponsiveNav v-bind:hideNav="hideNav">
    <router-link v-bind:to="'/'">{{uiLabels.joinPoll}}</router-link>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <router-link v-bind:to="'/result/'+id">{{uiLabels.results}}</router-link>
    <button class = "langButton" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
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
      {{uiLabels.question}} <input type="number" v-model.number="itemId">:
      <input type="text" v-model="question">
      <div>
        {{uiLabels.addAnswer}}<input id="addAnotherAnswer" v-for="(_, i) in answers"
               v-model="answers[i]" 
               v-bind:key="'answer'+ i">
        <br>
        <button v-on:click="addAnotherAnswer">
          {{uiLabels.addAnotherAnswer}}
        </button>
        <button v-on:click="addItem">
          {{uiLabels.addItem}}
        </button>
      </div>
    </div>

    <br>

    <button v-on:click="runPoll">
      {{uiLabels.runPoll}}
    </button>
      <button v-on:click="joinPoll">
        {{uiLabels.joinPoll}}
      </button>
      <button v-on:click="checkResults">
        {{uiLabels.checkResults}}
      </button>
    </div>

    <br>
    {{data}}
    <router-link v-bind:to="'/result/'+pollId">{{uiLabels.checkResults}}</router-link>
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
      itemId: 0,
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
    addItem: function () {
      socket.emit("addItem", {
        pollId: this.pollId,
        itemId: this.itemId,
        itemQuestion: this.question,
        itemAnswers: this.answers
      } );
      this.itemId += 1;
      this.question = "";
      this.answers = ['', ''];
    },
    addAnotherAnswer: function () {
      this.answers.push("");
    },
    runPoll: function () {
      socket.emit("runPoll", {pollId: this.pollId, itemId: this.itemId})
      console.log({pollId: this.pollId, itemId: this.itemId, itemQuestion: this.question, itemAnswers: this.answers})
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

.MainScreen {
  background-color: green;
}

.langButton {
  color: white;
  background-color: greenyellow;
  border-radius: 2em;
}
</style>