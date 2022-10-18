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
        Create Poll
      </div>
      <div v-on:click="switchLanguage"
           class="switch-language">
        🌍 {{uiLabels.changeLanguage}}
      </div>
    </header>

    <br>
    <input class="input-box-dark"
           type="text"
           placeholder="Choose your poll ID"
           v-model="pollId"
           id="pollIdEnter">
    <br>
    <button class="button-a hide-button"
            id ="hideAfterCreate"
            v-on:click="createPoll">
      {{uiLabels.createPoll}}
    </button>
    <main id ="hideBeforeCreate">
      <question>
        {{uiLabels.question}} No.
        <input type="number"
               readonly
               class="input-box-number"
               v-model="item.itemId">
        <input type="text"
               class="input-box-dark"
               placeholder="Question"
               v-model="item.itemQuestion">
      </question>
      <addQuestion>
        <button class="button-b"
                v-on:click="addItem">
          Save this question and add another one
        </button>
      </addQuestion>
      <answer>
        Answers:
        <input id="addAnotherAnswer"
               class="input-box-dark"
               placeholder="Answer"
               v-for="(_, i) in item.itemAnswers"
               v-model="item.itemAnswers[i]"
               v-bind:key="'answer'+ i">
        <button class="button-b"
                v-on:click="addAnotherAnswer">
          &plus;
        </button>
      </answer>
      <figure>
        <figcaption>Saved Questions Preview</figcaption>
        {{ pollData }}
        <div v-for="(item, itemId) in pollData.pollItems"
             v-bind:key="item">
          Question {{ itemId }} is: {{ item.itemQuestion }}
          <br>
          Provided answers are: {{ item.itemAnswers }}
          <br><br>
        </div>
        <button class="button-a run-poll"
                v-on:click="runPoll">
          Run Poll
        </button>
      </figure>
    </main>

  </page>
</template>

<script>
import '../assets/main.css';
import io from 'socket.io-client';
const socket = io();
var pageUpdated = false;

export default {
  name: 'Create',
  components: {

  },
  data: function () {
    return {
      lang: "",
      pollId: "",
      item: {
        itemId: 0,
        itemQuestion: "",
        itemAnswers: ["", ""]
      },
      pollData: {},
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
      this.pollData = data
    )
    socket.on("pollCreated", (data) =>
      this.pollData = data
    )
  },
  methods: {
    createPoll: function () {
      if(document.getElementById("pollIdEnter").value !== "") {
        var elementToDisplay = document.getElementById("hideBeforeCreate");
        elementToDisplay.style.display = "grid";
        var elementToHide = document.getElementById("hideAfterCreate");
        elementToHide.style.display = "none";
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      }
    },
    addItem: function () {
      // All answer field and question field not empty
      if (this.item.itemQuestion.length && this.item.itemAnswers.every(function(i){return i !== "";})) {
        socket.emit("addItem", {
          pollId: this.pollId,
          itemId: this.item.itemId,
          itemQuestion: this.item.itemQuestion,
          itemAnswers: this.item.itemAnswers
        } );
        this.item.itemId += 1;
        this.item.itemQuestion = "";
        this.item.itemAnswers = ['', ''];
      }
    },
    addAnotherAnswer: function () {
      // All answer field not empty
      if (this.item.itemAnswers.every(function(i){return i !== "";})) {
        this.item.itemAnswers.push("");
      }
    },
    runPoll: function () {
      // All answer field and question field not empty or saved
      if (this.item.itemQuestion.length && this.item.itemAnswers.every(function(i){return i !== "";}) || this.item.itemId > 0) {
        socket.emit("runQuestion", {pollId: this.pollId, itemId: this.item.itemId})
        console.log({pollId: this.pollId, itemId: this.item.itemId, itemQuestion: this.item.itemQuestion, itemAnswers: this.item.itemAnswers})
        window.location.href = "#/poll/" + this.pollId
      }
    },
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
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

<style scoped>

#hideBeforeCreate {
  display: none
}

main {
  display: grid;
  grid-template: "question     question"
                 "answers      figure"
                 "addQuestion  figure";
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 0;
  grid-column-gap: 10px;
  padding: 0 3em 0 4em;
}
main > question {
  grid-area: question;
}
main > answers {
  grid-area: answers;
}
main > addQuestion {
  grid-area: addQuestion;
  position: relative;
}
addQuestion .button-b{
  float: right;
  margin-top: 1em;
}
main > figure {
  grid-area: figure;
  text-align: left;
  position:relative;
}
figure .run-poll {
  position: absolute;
  bottom: 1.2em;
  right: 1.2em;
}


</style>