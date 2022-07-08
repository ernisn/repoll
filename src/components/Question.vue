<template>
<p>{{item.itemQuestion}}</p>
<button v-for="answerId in item.itemAnswers" v-on:click="answer(answerId)" v-bind:key="answerId">
  {{ answerId }}
</button>
</template>
<script>
export default {
  name: 'Bars',
  props: {
    item: Object
  },
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
      console.log("Clicked on:", answer)
    } 
  }
}
</script>