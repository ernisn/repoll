<template>

  <div>Question: {{item.itemQuestion}}</div>
  <div>Choose your answer:</div>

  <div v-for="(answerContent, answerId) in item.itemAnswers"
       v-bind:key="answerContent">
    <button v-on:click="clickAnswer(answerId)">
      Answer {{ answerId }}: {{ answerContent }}
    </button>
  </div>

</template>

<script>
export default {
  name: 'Question',
  props: {
    item: Object
  },
  data: function () {
    return {
      answerId: 0
    }
  },
  methods: {
    clickAnswer: function (answerId) {
      this.$emit("answer-clicked", answerId);
      console.log("Clicked on answer with answerId:", answerId);
    }
  }
}
</script>