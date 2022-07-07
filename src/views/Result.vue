<template>
  <header>
    <a href="/">
      <h3>This is the repoll</h3>
    </a>

  </header>

  <!-- Just a heading. If the poll has ended, the results will be shown. Shows the pollID and the answers. -->

  <h4 id="resultHeading"> {{ uiLabels.results }}</h4>
  <div>
    <h3 id="resultQuestion" v-if="!end">
      <Question v-bind:questions="question" v-on:answers="submitAnswers" />
      {{ question }}
    </h3>
    <p> {{ uiLabels.pollId }}: {{ pollId }}</p>
    <div v-if="!end"></div>
  </div>

  <ResponsiveNav v-bind:hideNav="hideNav">
    <router-link v-bind:to="'/'">{{ uiLabels.joinPoll }}</router-link>
    <router-link v-bind:to="'/create/' + lang">{{ uiLabels.createPoll }}</router-link>
    <router-link v-bind:to="'/result/' + id">{{ uiLabels.results }}</router-link>
    <button v-on:click="switchLanguage">{{ uiLabels.changeLanguage }}</button>
  </ResponsiveNav>



  <!-- Added a button for the result page, clicking on it would send you back to the start page.
Does not work currently since result page crashes the server. -->

  <div v-if="pollEmpty">
    <p> {{ uiLabels.noQuestion }}</p>
    <router-link v-bind:to="'//'" tag="button">
      <button class="backToStart"> {{ uiLabels.backToStart }}</button>
    </router-link>
  </div>

  <main class="resultPage" v-if="!pollEmpty">
    <section v-if="!end" class="showResults">
      <div v-if="isClicked && !end" class="theResultBars">
        <div class="clicked" v-if="isClicked"></div>
        <Bars v-if="result == 'Bars'" v-bind:data="data"></Bars>
        <Diagram v-if="result == 'Diagram'" v-bind:data="data"></Diagram>
      </div>

      <div class="yourAnswers">
        <p> {{ uiLabels.question }} {{ numberOfAnswers }}</p>
        <h2 class="correctAnswer"> {{ theCorrectAnswer }}></h2>
      </div>

      <div class="questionButtons" v-if="!end">
        <div class="resultButtons">
          <button class="prevButton" v-on:click="prevQuestion">
            {{ uiLabels.prevQuestion }}
          </button>
          <button class="nextButton" v-if="!lastQuestion" v-on:click="nextQuestion">
            {{ uiLabels.nextQuestion }}
          </button>
          <button class="beginButton" v-on:click="clicked">
            {{ uiLabels.fromTop }}
          </button>
          <button class="endButton" v-if="lastQuestion" v-on:click="endResults">
            {{ uiLabels.pollDone }}
          </button>

        </div>
      </div>
    </section>
    <div class="endOfResult">
      <div class="endResult" v-if="end">
        <div>
          <h2>{{ uiLabels.pollDone }}</h2>
        </div>
        <div>
          <router-link v-bind:to="'//'" tag=button>
            <button class="backToStart"> {{ uiLabels.backToStart }}</button>
          </router-link>
        </div>
      </div>

    </div>

  </main>
</template>


<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
import Question from '../components/Question.vue';
import Diagram from '../components/Diagram.vue';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars,
    Question,
    Diagram,
  },
  data: function () {
    return {
      question: "",
      pollEmpty: false,
      uiLabels: {},
      isClicked: false,
      lastQuestion: false,
      end: false,
      data: {
      }
    }
  },

  computed: {
    numberOfAnswers: function () {
      let tot = 0;
      if (typeof this.data == 'undefined') {
        return;
      }
      for (let a of Object.keys(this.data)) tot += this.data(a);
      return tot;
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.id


    socket.emit('joinPoll', this.pollId)


    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });

    socket.on("newQuestion", (update) => {
      this.question = update.q;
      this.data = {};
      this.result = update.result;
    });

    socket.on("allQuestions", (questions) => {
      this.questions = questions;
      if (this.questions.length == 1) {
        this.lastQuestion = true;
      }
      if (this.questions.length == 0) {
        this.pollEmpty = true;
      }
    });
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
      socket.emit("getNextQ", { pollID: this.pollId });
      this.isClicked = false;
    },

    previousQuestion: function () {
      socket.emit("getPrevQ", { pollId: this.pollId });
      //Resets "next question" button if it has previously been changed to say "View Results"
      document.getElementById("nextButton").innerHTML = 'Next Question';
      document.getElementById("nextButton").onclick = 'nextQuestion';
      this.isClicked = false;
    },
    showTheResults: function () {
      socket.emit("showResults", { pollId: this.pollId });
      socket.on("sendPoll", function (d) {
        let ans = d.answers;
        let q = d.questions;
        let i = 0;
        q.forEach(element => {
          console.log(element.q);
          console.log(element.a);
          console.log(ans[i]);
          console.log(element.isCorrect);
          for (var k = 0; k < element.isCorrect.length; k++) {
            if ((element.isCorrect[k] == true)) {
              console.log(k);
              const correctBar = document.getElementsByClassName('bar')[k];
              correctBar.style.color = "#33cc33";
            }
          }

          i++;
        });
      })
    },
  },
  mounted: function () {
    this.$nextTick(this.showResults);
  }
}

</script>

<style scoped>
.screen {
  background-color: white;
  ;
}

.backToStart {
  background-color: white;
}
</style>