<template>
  <header>
    <a href="/"><h3>This is the repoll</h3> </a>

  </header>

  <!-- Just a heading. If the poll has ended, the results will be shown. Shows the pollID and the answers. -->

  <h4 id="resultHeading"> {{uiLabels.results}}</h4>
  <div>
    <h3 id="resultQuestion" v-if="!end">
    <Question v-bind:questions="question" v-on:answers="submitAnswers"/>
    {{question}} 
    </h3>
    <p> {{uiLabels.pollId}}: {{pollId}}</p>
    <div v-if="!end"></div>
  </div>

  <ResponsiveNav v-bind:hideNav="hideNav">
    <router-link v-bind:to="'/'">{{uiLabels.joinPoll}}</router-link>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <router-link v-bind:to="'/result/'+id">{{uiLabels.results}}</router-link>
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
  </ResponsiveNav>



<!-- Added a button for the result page, clicking on it would send you back to the start page.
Does not work currently since result page crashes the server. -->

  <div v-if="pollEmpty">
  <p> {{uiLabels.noQuestion}}</p>
  <router-link v-bind:to = "'//'" tag ="button" >
    <button class="backToStart"> {{uiLabels.backToStart}}</button>
  </router-link>
  </div>

  <div>
    {{question}}
  </div>
  <Bars v-bind:data="data"/>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
import Question from '../components/Question.vue';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars,
    Question,
},
  data: function () {
    return {
      question: "",
      pollEmpty: false,

      data: {
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  }
}
</script>

<style scoped>
.screen {
  background-color: green;;
}
.backToStart {
  background-color: brown;
}

</style>