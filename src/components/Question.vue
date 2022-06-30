<template>
<p>{{question.q}}</p>
<button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a">
  {{ a }}
</button>
<div>
  <p>{{question.qNr}}</p>
    <button v-on:click="prevQuestion">
      Prev
    </button>
    <button v-on:click="nextQuestion(question.qNr)">
      Next
    </button>
  </div>
</template>
<script>
export default {
  name: 'Bars',
  props: {
    question: Object
  },
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
      console.log("Clicked on:", answer)
    },
    nextQuestion: function(qNr){
      //let qId = this.polls[this.pollId].currentQuestion;
      console.log('Next button clicked,', "\n Question number:", qNr)
      this.$emit("questionNumber", qNr);
    },

    prevQuestion: function(){
      //socket.emit("getPrevQ", {pollId: this.pollId});
      //Resets "next question" button if it has previously been changed to say "View Results"
      //document.getElementById("nextQuestionButton").innerHTML = 'Next Question';
      //document.getElementById("nextQuestionButton").onclick = 'nextQuestion';
      //this.isClicked = false;
      console.log('Prev button clicked')
      //this.$emit("questionNumber", qNr);
    }, 
  }
}
</script>