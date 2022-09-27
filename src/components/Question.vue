<template>

  <h4>Question No.{{ itemData.itemId + 1 }}:</h4>
  {{ itemData.item.itemQuestion }}

  <h4>Choose the answer you want to vote for:</h4>
  <div v-for="(answerContent, answerId) in itemData.item.itemAnswers"
       v-bind:key="answerContent">
    <button v-on:click="clickAnswer(answerId)">
      Answer {{ answerId + 1 }}: {{ answerContent }}
    </button>
  </div>

</template>

<script>
export default {
  name: 'Question',
  props: {
    itemData: Object
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