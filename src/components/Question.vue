<template>

  <div>{{item.itemQuestion}}</div>

  <button v-for="answerContent in item.itemAnswers"
          v-on:click="clickAnswer(answerContent)"
          v-bind:key="answerContent">
    {{ answerContent }}
  </button>

</template>

<script>
export default {
  name: 'Bars',
  props: {
    item: Object
  },
  methods: {
    clickAnswer: function (answer) {
      this.$emit("answer", answer);
      console.log("Clicked on:", answer)
    }
  }
}
</script>