<template>

  <h2>Question No.{{ itemData.itemId }}:</h2>
  {{ itemData.item.itemQuestion }}

  <h2>Choose the answer you want to vote for:</h2>
  <div v-for="(answerContent, answerId) in itemData.item.itemAnswers"
       v-bind:key="answerContent">
    <button class="button-b"
            v-on:click="clickAnswer(answerId)">
      Answer {{ answerId }}: {{ answerContent }}
    </button>
    <br><br>
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