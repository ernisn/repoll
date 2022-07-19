<template>
<p>{{question.q}}</p>
<button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a">
  {{ a }}
</button>
<div>
  <p>{{question}}</p>
    <button v-on:click="prevQuestion(questions)">
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
      console.log('Next button clicked in Question.vue,', "\n Question number:", qNr)
      this.$emit("nextQuestion", qNr);
    },

    prevQuestion: function(question){
      console.log('Prev button clicked')
      console.log(question)
      //this.$emit("questionNumber", qNr);
    }, 
  }
}
</script>