<template>
  <div class="wrapperBars">
    RESULTVIS<br>
    {{resultData}}

<!--    <div class="bar"-->
<!--         v-for="(answerContent, answerId) in resultData.item.itemAnswers"-->
<!--         v-bind:key="answerContent">-->
<!--      {{resultData.item.itemId}}-->
<!--      {{resultData.votersResponds[resultData.item.itemId][answerId]}}-->
<!--      <div v-bind:style="{height: Amount + 'em'}">-->
<!--        <span> Votes: {{Amount}} </span>-->
<!--      </div>-->
<!--      <div>-->
<!--        Answer: {{resultData.item.itemAnswers}}-->
<!--      </div>-->
<!--    </div>-->
  </div>

  <!--  <div class="wrapperPie">

      <div class="pie" v-for="(Amount, Answer) in data" v-bind:key="Answer">
        <div v-bind:style="{height: Amount + '10px', width: Amount + '10px'}">
          <span> {{ Amount }} </span>
        </div>
      </div>

    </div>-->


</template>

<script>

export default {
  name: 'ResultVis',
  props: {
    resultData: Object
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




.wrapperPie {
  display: inline-block;
  width: 300px;
  vertical-align: bottom;
}

.pie {
  width: 300px;
  aspect-ratio: 1;
  border-radius: 100%;
  background: conic-gradient(
      brown 0 3.55%,
      black 0 5.00%,
      blue 0 6.08%,
      green 0 13.68%,
      yellow 0 23.27%,
      orange 0 60.47%,
      red 0 100%
  );
}

</style>