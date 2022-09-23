<template>
<div class="wrapperBars">
  <div class="bar" v-for="(Amount, Answer) in item.itemAnswers" v-bind:key="Answer">
    {{item}}
    <div v-bind:style="{height: Amount + '10px'}">
      <span> {{Amount}} </span>
    </div>
    <div> 
      {{Answer}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Bars',
  props: {
    item: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar {
  display: inline-block;
  width: 50px;
  vertical-align: bottom;
}

.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:green;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:blue;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:teal;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:purple;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:yellow;
}

.wrapperBars {
  padding:3em;
}
</style>
