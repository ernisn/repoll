<template>

  <div>Question: {{item.itemQuestion}}</div>
  <div>Choose your answer:</div>

  <button v-for="(answerContent, answerId) in item.itemAnswers"
          v-on:click="$emit('answer-clicked',answerId), console.log('Clicked on answer with answerId:', this.answerId)"
          v-bind:key="answerContent">
    Answer {{ answerId }}: {{ answerContent }}
  </button>

</template>

<script>
export default {
  name: 'Bars',
  props: {
    item: Object
  },
  data: function () {
    return {
      answerId: 0
    }
  }/*,
  methods: {
    clickAnswer: function (answerId) {
      console.log("Clicked on answer with answerId:", this.answerId);
      this.answerId = answerId;
      this.$emit("answer-clicked", this.answerId);
    }
  }*/
}
</script>